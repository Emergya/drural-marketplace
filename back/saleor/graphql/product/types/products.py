from collections import defaultdict
from dataclasses import asdict
from typing import List, Optional

import graphene
from django.conf import settings
from django.db.models.expressions import Exists, OuterRef
from django_countries.fields import Country
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_federation import key
from promise import Promise

from ....account.utils import (
    requestor_is_staff_and_has_permissions,
    requestor_is_staff_member_or_app,
)
from ....attribute import models as attribute_models
from ....channel.models import Channel
from ....core.exceptions import PermissionDenied
from ....core.permissions import (
    OrderPermissions,
    ProductPermissions,
    has_one_of_permissions_as_staff,
)
from ....core.tracing import traced_resolver
from ....core.utils import get_currency_for_country
from ....core.weight import convert_weight_to_default_weight_unit
from ....product import models
from ....seo.models import Keyword
from ....product.models import ALL_PRODUCTS_PERMISSIONS
from ....product.product_images import get_product_image_thumbnail, get_thumbnail
from ....product.utils import calculate_revenue_for_variant
from ....product.utils.availability import (
    get_product_availability,
    get_variant_availability,
)
from ....product.utils.variants import get_variant_selection_attributes
from ...account import types as account_types
from ...account.enums import CountryCodeEnum
from ...attribute.filters import AttributeFilterInput
from ...attribute.resolvers import resolve_attributes
from ...attribute.types import Attribute, SelectedAttribute
from ...channel import ChannelContext, ChannelQsContext
from ...channel.dataloaders import ChannelBySlugLoader
from ...channel.types import ChannelContextType, ChannelContextTypeWithMetadata
from ...channel.utils import get_default_channel_slug_or_graphql_error
from ...company.types import CompanyType
from ...core.connection import CountableDjangoObjectType
from ...core.enums import ReportingPeriod
from ...core.federation import resolve_federation_references
from ...core.fields import (
    ChannelContextFilterConnectionField,
    FilterInputConnectionField,
    PrefetchingConnectionField,
)
from ...core.types import Image, TaxedMoney, TaxedMoneyRange, TaxType
from ...core.types.common import ReviewPercentages
from ...core.utils import from_global_id_or_error
from ...decorators import (
    login_or_app_required,
    one_of_permissions_required,
    permission_required,
)
from ...discount.dataloaders import DiscountsByDateTimeLoader
from ...meta.types import ObjectWithMetadata
from ...order.dataloaders import (
    OrderByIdLoader,
    OrderLinesByVariantIdAndChannelIdLoader,
)
from ...payment.types import PaymentMethod
from ...product.dataloaders.products import (
    AvailableProductVariantsByProductIdAndChannel,
    ProductVariantsByProductIdAndChannel,
)
from ...translations.fields import TranslationField
from ...translations.types import (
    CategoryTranslation,
    CollectionTranslation,
    ProductTranslation,
    ProductVariantTranslation,
)
from ...utils import get_user_or_app_from_context
from ...utils.filters import reporting_period_to_date
from ...warehouse.dataloaders import (
    AvailableQuantityByProductVariantIdCountryCodeAndChannelSlugLoader,
    StocksWithAvailableQuantityByProductVariantIdCountryCodeAndChannelLoader,
)
from ...warehouse.types import Stock
from ..dataloaders import (
    CategoryChildrenByCategoryIdLoader,
    CollectionChannelListingByCollectionIdAndChannelSlugLoader,
    CollectionChannelListingByCollectionIdLoader,
    CollectionsByProductIdLoader,
    ImagesByProductIdLoader,
    ImagesByProductVariantIdLoader,
    MediaByProductIdLoader,
    MediaByProductVariantIdLoader,
    ProductAttributesByProductTypeIdLoader,
    ProductByIdLoader,
    ProductChannelListingByProductIdAndChannelSlugLoader,
    ProductChannelListingByProductIdLoader,
    ProductTypeByIdLoader,
    ProductVariantByIdLoader,
    ProductVariantsByProductIdLoader,
    SelectedAttributesByProductIdLoader,
    SelectedAttributesByProductVariantIdLoader,
    VariantAttributesByProductTypeIdLoader,
    VariantChannelListingByVariantIdAndChannelSlugLoader,
    VariantChannelListingByVariantIdLoader,
    VariantsChannelListingByProductIdAndChannelSlugLoader,
)
from ..enums import VariantAttributeScope
from ..filters import (
    BookableResourceFilterInput,
    ProductFilterInput,
    ProductRatingFilterInput,
)
from ..resolvers import (
    resolve_my_review,
    resolve_product_variants,
    resolve_products,
    resolve_review_percentages,
    resolve_reviews_from_product,
)
from ..sorters import (
    BookableResourceSortingInput,
    ProductOrder,
    ProductRatingSortingInput,
)
from ..utils import is_product_owner
from . import BookableResource
from .channels import (
    CollectionChannelListing,
    ProductChannelListing,
    ProductVariantChannelListing,
)
from .digital_contents import DigitalContent

destination_address_argument = graphene.Argument(
    account_types.AddressInput,
    description=(
        "Destination address used to find warehouses where stock availability "
        "for this product is checked. If address is empty, uses "
        "`Shop.companyAddress` or fallbacks to server's "
        "`settings.DEFAULT_COUNTRY` configuration."
    ),
)


class Margin(graphene.ObjectType):
    start = graphene.Int()
    stop = graphene.Int()


class BasePricingInfo(graphene.ObjectType):
    on_sale = graphene.Boolean(description="Whether it is in sale or not.")
    discount = graphene.Field(
        TaxedMoney, description="The discount amount if in sale (null otherwise)."
    )
    discount_local_currency = graphene.Field(
        TaxedMoney, description="The discount amount in the local currency."
    )


class VariantPricingInfo(BasePricingInfo):
    discount_local_currency = graphene.Field(
        TaxedMoney, description="The discount amount in the local currency."
    )
    price = graphene.Field(
        TaxedMoney, description="The price, with any discount subtracted."
    )
    price_undiscounted = graphene.Field(
        TaxedMoney, description="The price without any discount."
    )
    price_local_currency = graphene.Field(
        TaxedMoney, description="The discounted price in the local currency."
    )

    class Meta:
        description = "Represents availability of a variant in the storefront."


class ProductPricingInfo(BasePricingInfo):
    price_range = graphene.Field(
        TaxedMoneyRange,
        description="The discounted price range of the product variants.",
    )
    price_range_undiscounted = graphene.Field(
        TaxedMoneyRange,
        description="The undiscounted price range of the product variants.",
    )
    price_range_local_currency = graphene.Field(
        TaxedMoneyRange,
        description=(
            "The discounted price range of the product variants "
            "in the local currency."
        ),
    )

    class Meta:
        description = "Represents availability of a product in the storefront."


class PurchaseEmail(CountableDjangoObjectType):

    title = graphene.String(
        description="Title of the custom email template.",
        required=True,
    )
    subject = graphene.String(
        description="Subject of the custom email template.",
        required=True,
    )
    content = graphene.String(
        description="Body of the custom email template.",
        required=True,
    )

    class Meta:
        description = "Defines data of custom email for purchase."
        interface = [relay.Node]
        model = models.PurchaseEmail
        only_fields = (
            "title",
            "subject",
            "content",
        )


class ProductRating(CountableDjangoObjectType):
    user = graphene.String(
        description="Reason of the report.",
        required=True,
    )
    created_by_user = graphene.Boolean(
        description="Chek if this is my review.",
        required=True,
    )

    class Meta:
        description = "Defines ProductRating data."
        interfaces = [relay.Node]
        model = models.ProductRating
        only_fields = (
            "user",
            "product",
            "rating",
            "comment",
            "created_at",
        )

    @staticmethod
    @traced_resolver
    def resolve_user(root: models.ProductRating, info):
        return f"{root.user.first_name} {root.user.last_name}"

    @staticmethod
    @traced_resolver
    def resolve_created_by_user(root: models.ProductRating, info):
        return root.user == info.context.user

    @staticmethod
    def resolve_product(root: ChannelContext[models.ProductRating], info):
        product = ProductByIdLoader(info.context).load(root.product_id)
        return product.then(
            lambda product: ChannelContext(node=product, channel_slug="default-channel")
        )


@key(fields="id channel")
class ProductVariant(ChannelContextTypeWithMetadata, CountableDjangoObjectType):
    channel = graphene.String(
        description=(
            "Channel given to retrieve this product variant. Also used by federation "
            "gateway to resolve this object in a federated query."
        ),
    )
    channel_listings = graphene.List(
        graphene.NonNull(ProductVariantChannelListing),
        description="List of price information in channels for the product.",
    )
    pricing = graphene.Field(
        VariantPricingInfo,
        address=destination_address_argument,
        description=(
            "Lists the storefront variant's pricing, the current price and discounts, "
            "only meant for displaying."
        ),
    )
    attributes = graphene.List(
        graphene.NonNull(SelectedAttribute),
        required=True,
        description="List of attributes assigned to this variant.",
        variant_selection=graphene.Argument(
            VariantAttributeScope,
            description="Define scope of returned attributes.",
        ),
    )
    margin = graphene.Int(description="Gross margin percentage value.")
    quantity_ordered = graphene.Int(description="Total quantity ordered.")
    revenue = graphene.Field(
        TaxedMoney,
        period=graphene.Argument(ReportingPeriod),
        description=(
            "Total revenue generated by a variant in given period of time. Note: this "
            "field should be queried using `reportProductSales` query as it uses "
            "optimizations suitable for such calculations."
        ),
    )
    images = graphene.List(
        lambda: ProductImage,
        description="List of images for the product variant.",
        deprecation_reason="Will be removed in Saleor 4.0. Use the `media` instead.",
    )
    media = graphene.List(
        graphene.NonNull(lambda: ProductMedia),
        description="List of media for the product variant.",
    )
    translation = TranslationField(
        ProductVariantTranslation,
        type_name="product variant",
        resolver=ChannelContextType.resolve_translation,
    )
    digital_content = graphene.Field(
        DigitalContent, description="Digital content for the product variant."
    )
    stocks = graphene.Field(
        graphene.List(Stock),
        description="Stocks for the product variant.",
        address=destination_address_argument,
        country_code=graphene.Argument(
            CountryCodeEnum,
            description=(
                "DEPRECATED: use `address` argument instead. This argument will be "
                "removed in Saleor 4.0. Two-letter ISO 3166-1 country code."
            ),
        ),
    )
    quantity_available = graphene.Int(
        required=True,
        description="Quantity of a product available for sale in one checkout.",
        address=destination_address_argument,
        country_code=graphene.Argument(
            CountryCodeEnum,
            description=(
                "DEPRECATED: use `address` argument instead. This argument will be "
                "removed in Saleor 4.0."
                "Two-letter ISO 3166-1 country code. When provided, the exact quantity "
                "from a warehouse operating in shipping zones that contain this "
                "country will be returned. Otherwise, it will return the maximum "
                "quantity from all shipping zones."
            ),
        ),
    )

    class Meta:
        default_resolver = ChannelContextType.resolver_with_context
        description = (
            "Represents a version of a product such as different size or color."
        )
        only_fields = [
            "id",
            "name",
            "product",
            "sku",
            "track_inventory",
            "weight",
        ]
        interfaces = [relay.Node, ObjectWithMetadata]
        model = models.ProductVariant

    @staticmethod
    def resolve_channel(root: ChannelContext[models.Product], info):
        return root.channel_slug

    @staticmethod
    @one_of_permissions_required(
        [ProductPermissions.MANAGE_PRODUCTS, OrderPermissions.MANAGE_ORDERS]
    )
    def resolve_stocks(
        root: ChannelContext[models.ProductVariant],
        info,
        address=None,
        country_code=None,
    ):
        requestor = info.context.user
        variant = root.node
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, variant.product)
        if not is_staff_or_owner:
            raise PermissionDenied()
        if address is not None:
            country_code = address.country
        return StocksWithAvailableQuantityByProductVariantIdCountryCodeAndChannelLoader(
            info.context
        ).load((variant.id, country_code, root.channel_slug))

    @staticmethod
    def resolve_quantity_available(
        root: ChannelContext[models.ProductVariant],
        info,
        address=None,
        country_code=None,
    ):
        if address is not None:
            country_code = address.country

        if not root.node.track_inventory:
            return settings.MAX_CHECKOUT_LINE_QUANTITY

        return AvailableQuantityByProductVariantIdCountryCodeAndChannelSlugLoader(
            info.context
        ).load((root.node.id, country_code, str(root.channel_slug)))

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_digital_content(
        root: ChannelContext[models.ProductVariant], info, *_args
    ):
        requestor = info.context.user
        variant = root.node
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, variant.product)
        if not is_staff_or_owner:
            raise PermissionDenied()
        return getattr(variant, "digital_content", None)

    @staticmethod
    @traced_resolver
    def resolve_attributes(
        root: ChannelContext[models.ProductVariant],
        info,
        variant_selection: Optional[str] = None,
    ):
        def apply_variant_selection_filter(selected_attributes):
            if not variant_selection or variant_selection == VariantAttributeScope.ALL:
                return selected_attributes
            attributes = [
                selected_att["attribute"] for selected_att in selected_attributes
            ]
            variant_selection_attrs = get_variant_selection_attributes(attributes)

            if variant_selection == VariantAttributeScope.VARIANT_SELECTION:
                return [
                    selected_attribute
                    for selected_attribute in selected_attributes
                    if selected_attribute["attribute"] in variant_selection_attrs
                ]
            return [
                selected_attribute
                for selected_attribute in selected_attributes
                if selected_attribute["attribute"] not in variant_selection_attrs
            ]

        return (
            SelectedAttributesByProductVariantIdLoader(info.context)
            .load(root.node.id)
            .then(apply_variant_selection_filter)
        )

    @staticmethod
    @login_or_app_required
    def resolve_channel_listings(
        root: ChannelContext[models.ProductVariant], info, **_kwargs
    ):
        requestor = get_user_or_app_from_context(info.context)
        variant = root.node
        is_staff_or_owner = requestor_is_staff_and_has_permissions(
            requestor, [ProductPermissions.MANAGE_PRODUCTS]
        ) or is_product_owner(requestor, variant.product)
        if not is_staff_or_owner:
            raise PermissionDenied()
        return VariantChannelListingByVariantIdLoader(info.context).load(variant.id)

    @staticmethod
    @traced_resolver
    def resolve_pricing(
        root: ChannelContext[models.ProductVariant], info, address=None
    ):
        if not root.channel_slug:
            return None

        channel_slug = str(root.channel_slug)
        context = info.context

        product = ProductByIdLoader(context).load(root.node.product_id)
        product_channel_listing = ProductChannelListingByProductIdAndChannelSlugLoader(
            context
        ).load((root.node.product_id, channel_slug))
        variant_channel_listing = VariantChannelListingByVariantIdAndChannelSlugLoader(
            context
        ).load((root.node.id, channel_slug))
        collections = CollectionsByProductIdLoader(context).load(root.node.product_id)
        channel = ChannelBySlugLoader(context).load(channel_slug)

        address_country = address.country if address is not None else None

        def calculate_pricing_info(discounts):
            def calculate_pricing_with_channel(channel):
                def calculate_pricing_with_product_variant_channel_listings(
                    variant_channel_listing,
                ):
                    def calculate_pricing_with_product(product):
                        def calculate_pricing_with_product_channel_listings(
                            product_channel_listing,
                        ):
                            def calculate_pricing_with_collections(collections):
                                if (
                                    not variant_channel_listing
                                    or not product_channel_listing
                                ):
                                    return None

                                country_code = (
                                    address_country or channel.default_country.code
                                )

                                local_currency = None
                                local_currency = get_currency_for_country(country_code)

                                availability = get_variant_availability(
                                    variant=root.node,
                                    variant_channel_listing=variant_channel_listing,
                                    product=product,
                                    product_channel_listing=product_channel_listing,
                                    collections=collections,
                                    discounts=discounts,
                                    channel=channel,
                                    country=Country(country_code),
                                    local_currency=local_currency,
                                    plugins=context.plugins,
                                )
                                return VariantPricingInfo(**asdict(availability))

                            return collections.then(calculate_pricing_with_collections)

                        return product_channel_listing.then(
                            calculate_pricing_with_product_channel_listings
                        )

                    return product.then(calculate_pricing_with_product)

                return variant_channel_listing.then(
                    calculate_pricing_with_product_variant_channel_listings
                )

            return channel.then(calculate_pricing_with_channel)

        return (
            DiscountsByDateTimeLoader(context)
            .load(info.context.request_time)
            .then(calculate_pricing_info)
        )

    @staticmethod
    def resolve_product(root: ChannelContext[models.ProductVariant], info):
        product = ProductByIdLoader(info.context).load(root.node.product_id)
        return product.then(
            lambda product: ChannelContext(node=product, channel_slug=root.channel_slug)
        )

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_quantity_ordered(
        root: ChannelContext[models.ProductVariant], info, *_args
    ):
        # This field is added through annotation when using the
        # `resolve_report_product_sales` resolver.
        requestor = get_user_or_app_from_context(info.context)
        variant = root.node
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, variant.product)
        if not is_staff_or_owner:
            raise PermissionDenied()
        return getattr(variant, "quantity_ordered", None)

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    @traced_resolver
    def resolve_revenue(root: ChannelContext[models.ProductVariant], info, period):
        start_date = reporting_period_to_date(period)
        variant = root.node
        channel_slug = root.channel_slug
        requestor = get_user_or_app_from_context(info.context)
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, variant.product)
        if not is_staff_or_owner:
            raise PermissionDenied()

        def calculate_revenue_with_channel(channel):
            if not channel:
                return None

            def calculate_revenue_with_order_lines(order_lines):
                def calculate_revenue_with_orders(orders):
                    orders_dict = {order.id: order for order in orders}
                    return calculate_revenue_for_variant(
                        variant,
                        start_date,
                        order_lines,
                        orders_dict,
                        channel.currency_code,
                    )

                order_ids = [order_line.order_id for order_line in order_lines]
                return (
                    OrderByIdLoader(info.context)
                    .load_many(order_ids)
                    .then(calculate_revenue_with_orders)
                )

            return (
                OrderLinesByVariantIdAndChannelIdLoader(info.context)
                .load((variant.id, channel.id))
                .then(calculate_revenue_with_order_lines)
            )

        return (
            ChannelBySlugLoader(info.context)
            .load(channel_slug)
            .then(calculate_revenue_with_channel)
        )

    @staticmethod
    def resolve_media(root: ChannelContext[models.ProductVariant], info, *_args):
        return MediaByProductVariantIdLoader(info.context).load(root.node.id)

    @staticmethod
    def resolve_images(root: ChannelContext[models.ProductVariant], info, *_args):
        return ImagesByProductVariantIdLoader(info.context).load(root.node.id)

    @staticmethod
    def resolve_weight(root: ChannelContext[models.ProductVariant], _info, **_kwargs):
        return convert_weight_to_default_weight_unit(root.node.weight)

    @staticmethod
    def __resolve_references(roots: List["ProductVariant"], info, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        requestor_has_access_to_all = has_one_of_permissions_as_staff(
            requestor, ALL_PRODUCTS_PERMISSIONS
        )

        channels = defaultdict(set)
        roots_ids = []
        for root in roots:
            roots_ids.append(f"{root.channel}_{root.id}")
            channels[root.channel].add(root.id)

        variants = {}
        for channel, ids in channels.items():
            qs = resolve_product_variants(
                info,
                requestor_has_access_to_all,
                requestor,
                ids=ids,
                channel_slug=channel,
            ).qs
            for variant in qs:
                global_id = graphene.Node.to_global_id("ProductVariant", variant.id)
                variants[f"{channel}_{global_id}"] = ChannelContext(
                    channel_slug=channel, node=variant
                )

        return [variants.get(root_id) for root_id in roots_ids]


@key(fields="id channel")
class ProductAddressType(DjangoObjectType):
    latitude = graphene.Float()
    longitude = graphene.Float()

    class Meta:
        description = "Defines Product Address."
        interfaces = (relay.Node,)
        model = models.ProductAddress
        fields = (
            "street",
            "street_second_line",
            "postal_code",
            "locality",
            "region",
            "country",
        )

    def resolve_latitude(root: models.ProductAddress, info, **_kwargs):
        if root.location_point:
            return root.location_point[0]
        return None

    def resolve_longitude(root: models.ProductAddress, info, **_kwargs):
        if root.location_point:
            return root.location_point[1]
        return None


class Keywords(DjangoObjectType):
    class Meta:
        description = "Represents a keywords."
        interfaces = [relay.Node]
        model = Keyword
        fields = ("name_keyword",)

@key(fields="id")
class Product(ChannelContextTypeWithMetadata, CountableDjangoObjectType):
    channel = graphene.String(
        description=(
            "Channel given to retrieve this product. Also used by federation "
            "gateway to resolve this object in a federated query."
        ),
    )
    description_json = graphene.JSONString(
        description="Description of the product (JSON).",
        deprecation_reason=(
            "Will be removed in Saleor 4.0. Use the `description` field instead."
        ),
    )
    thumbnail = graphene.Field(
        Image,
        description="The main thumbnail for a product.",
        size=graphene.Argument(graphene.Int, description="Size of thumbnail."),
    )
    pricing = graphene.Field(
        ProductPricingInfo,
        address=destination_address_argument,
        description=(
            "Lists the storefront product's pricing, the current price and discounts, "
            "only meant for displaying."
        ),
    )
    is_available = graphene.Boolean(
        address=destination_address_argument,
        description="Whether the product is in stock and visible or not.",
    )
    tax_type = graphene.Field(
        TaxType, description="A type of tax. Assigned by enabled tax gateway"
    )
    attributes = graphene.List(
        graphene.NonNull(SelectedAttribute),
        required=True,
        description="List of attributes assigned to this product.",
    )
    channel_listings = graphene.List(
        graphene.NonNull(ProductChannelListing),
        description="List of availability in channels for the product.",
    )
    media_by_id = graphene.Field(
        lambda: ProductMedia,
        id=graphene.Argument(graphene.ID, description="ID of a product media."),
        description="Get a single product media by ID.",
    )
    image_by_id = graphene.Field(
        lambda: ProductImage,
        id=graphene.Argument(graphene.ID, description="ID of a product image."),
        description="Get a single product image by ID.",
        deprecation_reason=(
            "Will be removed in Saleor 4.0. Use the `mediaById` field instead."
        ),
    )
    variants = graphene.List(
        ProductVariant, description="List of variants for the product."
    )
    media = graphene.List(
        graphene.NonNull(lambda: ProductMedia),
        description="List of media for the product.",
    )
    images = graphene.List(
        lambda: ProductImage,
        description="List of images for the product.",
        deprecation_reason=(
            "Will be removed in Saleor 4.0. Use the `media` field instead."
        ),
    )
    collections = graphene.List(
        lambda: Collection, description="List of collections for the product."
    )
    translation = TranslationField(
        ProductTranslation,
        type_name="product",
        resolver=ChannelContextType.resolve_translation,
    )
    available_for_purchase = graphene.Date(
        description="Date when product is available for purchase. "
    )
    is_available_for_purchase = graphene.Boolean(
        description="Whether the product is available for purchase."
    )
    reviews = FilterInputConnectionField(
        ProductRating,
        filter=ProductRatingFilterInput(description="Filtering options for reviews."),
        description="Reviews of the products by users.",
        sort_by=ProductRatingSortingInput(description="Sort reviews."),
    )
    review_percentages = graphene.List(
        ReviewPercentages, description="Pergentages for all possible number of stars"
    )
    my_review = graphene.Field(
        ProductRating,
        description="It shows your review of the product if you made one.",
    )
    consumed_by_user = graphene.Boolean(
        description="True if the product has been consumed by user"
    )
    payment_methods = graphene.List(
        PaymentMethod, description="List of payment method allowed."
    )
    bookable_resources = FilterInputConnectionField(
        BookableResource,
        filter=BookableResourceFilterInput(description="Filtering bookable resources."),
        sort_by=BookableResourceSortingInput(description="Sort bookable resources."),
        description="List of the bookable resouces.",
    )
    class Meta:
        default_resolver = ChannelContextType.resolver_with_context
        description = "Represents an individual item for sale in the storefront."
        interfaces = [relay.Node, ObjectWithMetadata]
        model = models.Product
        only_fields = [
            "category",
            "categories",
            "charge_taxes",
            "description",
            "details",
            "id",
            "name",
            "url",
            "slug",
            "has_no_price",
            "company",
            "product_type",
            "seo_description",
            "seo_title",
            "keywords",
            "created_at",
            "updated_at",
            "weight",
            "default_variant",
            "rating",
            "is_billable",
            "is_bookable",
            "duration",
            "address",
            "purchase_email",
        ]

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolver_purchase_email(root: ChannelContext[models.Product], info, **_kwargs):
        requestor = info.context.user
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, root)
        if not is_staff_or_owner:
            raise PermissionDenied
        else:
            return root.purchase_email

    @staticmethod
    def resolve_my_review(root: ChannelContext[models.Product], info, **_kwargs):
        return resolve_my_review(root.node, info)

    @staticmethod
    def resolve_review_percentages(
        root: ChannelContext[models.Product], info, **_kwargs
    ):
        return resolve_review_percentages(root.node, info)

    @staticmethod
    def resolve_reviews(root: ChannelContext[models.Product], info, **_kwargs):
        return resolve_reviews_from_product(root.node, info)

    @staticmethod
    def resolve_channel(root: ChannelContext[models.Product], info):
        return root.channel_slug

    @staticmethod
    def resolve_default_variant(root: ChannelContext[models.Product], info):
        default_variant_id = root.node.default_variant_id
        if default_variant_id is None:
            return None

        def return_default_variant_with_channel_context(variant):
            return ChannelContext(node=variant, channel_slug=root.channel_slug)

        return (
            ProductVariantByIdLoader(info.context)
            .load(default_variant_id)
            .then(return_default_variant_with_channel_context)
        )

    @staticmethod
    def resolve_description_json(root: ChannelContext[models.Product], info):
        description = root.node.description
        return description if description is not None else {}

    @staticmethod
    def resolve_tax_type(root: ChannelContext[models.Product], info):
        tax_data = info.context.plugins.get_tax_code_from_object_meta(root.node)
        return TaxType(tax_code=tax_data.code, description=tax_data.description)

    @staticmethod
    @traced_resolver
    def resolve_thumbnail(root: ChannelContext[models.Product], info, *, size=255):
        def return_first_thumbnail(product_media):
            if product_media:
                image = product_media[0]
                oembed_data = image.oembed_data

                if oembed_data.get("thumbnail_url"):
                    return Image(
                        alt=oembed_data["title"], url=oembed_data["thumbnail_url"]
                    )

                url = get_product_image_thumbnail(image, size, method="thumbnail")
                alt = image.alt
                return Image(alt=alt, url=info.context.build_absolute_uri(url))
            return None

        return (
            MediaByProductIdLoader(info.context)
            .load(root.node.id)
            .then(return_first_thumbnail)
        )


    @staticmethod
    @traced_resolver
    def resolve_pricing(root: ChannelContext[models.Product], info, address=None):
        if not root.channel_slug:
            return None

        channel_slug = str(root.channel_slug)
        context = info.context

        product_channel_listing = ProductChannelListingByProductIdAndChannelSlugLoader(
            context
        ).load((root.node.id, channel_slug))
        variants = ProductVariantsByProductIdLoader(context).load(root.node.id)
        variants_channel_listing = (
            VariantsChannelListingByProductIdAndChannelSlugLoader(context).load(
                (root.node.id, channel_slug)
            )
        )
        collections = CollectionsByProductIdLoader(context).load(root.node.id)
        channel = ChannelBySlugLoader(context).load(channel_slug)

        address_country = address.country if address is not None else None

        def calculate_pricing_info(discounts):
            def calculate_pricing_with_channel(channel):
                def calculate_pricing_with_product_channel_listings(
                    product_channel_listing,
                ):
                    def calculate_pricing_with_variants(variants):
                        def calculate_pricing_with_variants_channel_listings(
                            variants_channel_listing,
                        ):
                            def calculate_pricing_with_collections(collections):
                                if not variants_channel_listing:
                                    return None

                                local_currency = None
                                country_code = (
                                    address_country or channel.default_country.code
                                )
                                local_currency = get_currency_for_country(country_code)

                                availability = get_product_availability(
                                    product=root.node,
                                    product_channel_listing=product_channel_listing,
                                    variants=variants,
                                    variants_channel_listing=variants_channel_listing,
                                    collections=collections,
                                    discounts=discounts,
                                    channel=channel,
                                    manager=context.plugins,
                                    country=Country(country_code),
                                    local_currency=local_currency,
                                )
                                return ProductPricingInfo(**asdict(availability))

                            return collections.then(calculate_pricing_with_collections)

                        return variants_channel_listing.then(
                            calculate_pricing_with_variants_channel_listings
                        )

                    return variants.then(calculate_pricing_with_variants)

                return product_channel_listing.then(
                    calculate_pricing_with_product_channel_listings
                )

            return channel.then(calculate_pricing_with_channel)

        return (
            DiscountsByDateTimeLoader(context)
            .load(info.context.request_time)
            .then(calculate_pricing_info)
        )

    @staticmethod
    @traced_resolver
    def resolve_is_available(root: ChannelContext[models.Product], info, address=None):
        if not root.channel_slug:
            return None

        product = root.node
        channel_slug = str(root.channel_slug)
        country_code = address.country if address is not None else None

        requestor = get_user_or_app_from_context(info.context)
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, product)
        channel_slug = str(root.channel_slug)

        def calculate_is_available(quantities):
            for qty in quantities:
                if qty > 0:
                    return True
            return False

        def load_variants_availability(variants):
            keys = [(variant.id, country_code, channel_slug) for variant in variants]
            return AvailableQuantityByProductVariantIdCountryCodeAndChannelSlugLoader(
                info.context
            ).load_many(keys)

        def check_variant_availability():
            if is_staff_or_owner and not channel_slug:
                variants = ProductVariantsByProductIdLoader(info.context).load(
                    product.id
                )
            elif is_staff_or_owner and channel_slug:
                variants = ProductVariantsByProductIdAndChannel(info.context).load(
                    (product.id, channel_slug)
                )
            else:
                variants = AvailableProductVariantsByProductIdAndChannel(
                    info.context
                ).load((product.id, channel_slug))
            return variants.then(load_variants_availability).then(
                calculate_is_available
            )

        def check_is_available_for_purchase(product_channel_listing):
            if product_channel_listing:
                if product_channel_listing.is_available_for_purchase():
                    return check_variant_availability()
            return False

        return (
            ProductChannelListingByProductIdAndChannelSlugLoader(info.context)
            .load((product.id, channel_slug))
            .then(check_is_available_for_purchase)
        )

    @staticmethod
    def resolve_attributes(root: ChannelContext[models.Product], info):
        return SelectedAttributesByProductIdLoader(info.context).load(root.node.id)

    @staticmethod
    def resolve_media_by_id(root: ChannelContext[models.Product], info, id):
        _type, pk = from_global_id_or_error(id, ProductMedia)
        return root.node.media.filter(pk=pk).first()

    @staticmethod
    def resolve_image_by_id(root: ChannelContext[models.Product], info, id):
        _type, pk = from_global_id_or_error(id, ProductImage)
        return root.node.media.filter(pk=pk).first()

    @staticmethod
    def resolve_media(root: ChannelContext[models.Product], info, **_kwargs):
        return MediaByProductIdLoader(info.context).load(root.node.id)

    @staticmethod
    def resolve_images(root: ChannelContext[models.Product], info, **_kwargs):
        return ImagesByProductIdLoader(info.context).load(root.node.id)

    @staticmethod
    def resolve_variants(root: ChannelContext[models.Product], info, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        product = root.node
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, product)
        if is_staff_or_owner and not root.channel_slug:
            variants = ProductVariantsByProductIdLoader(info.context).load(root.node.id)
        elif is_staff_or_owner and root.channel_slug:
            variants = ProductVariantsByProductIdAndChannel(info.context).load(
                (root.node.id, root.channel_slug)
            )
        else:
            variants = AvailableProductVariantsByProductIdAndChannel(info.context).load(
                (root.node.id, root.channel_slug)
            )

        def map_channel_context(variants):
            return [
                ChannelContext(node=variant, channel_slug=root.channel_slug)
                for variant in variants
            ]

        return variants.then(map_channel_context)

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_channel_listings(root: ChannelContext[models.Product], info, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        product = root.node
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, product)
        if not is_staff_or_owner:
            raise PermissionDenied()
        return ProductChannelListingByProductIdLoader(info.context).load(root.node.id)

    @staticmethod
    @traced_resolver
    def resolve_collections(root: ChannelContext[models.Product], info, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        product = root.node
        is_staff_or_owner = requestor_is_staff_member_or_app(
            requestor
        ) or is_product_owner(requestor, product)

        def return_collections(collections):
            if is_staff_or_owner:
                return [
                    ChannelContext(node=collection, channel_slug=root.channel_slug)
                    for collection in collections
                ]

            dataloader_keys = [
                (collection.id, str(root.channel_slug)) for collection in collections
            ]
            CollectionChannelListingLoader = (
                CollectionChannelListingByCollectionIdAndChannelSlugLoader
            )
            channel_listings = CollectionChannelListingLoader(info.context).load_many(
                dataloader_keys
            )

            def return_visible_collections(channel_listings):
                visible_collections = []
                channel_listings_dict = {
                    channel_listing.collection_id: channel_listing
                    for channel_listing in channel_listings
                    if channel_listing
                }

                for collection in collections:
                    channel_listing = channel_listings_dict.get(collection.id)
                    if channel_listing and channel_listing.is_visible:
                        visible_collections.append(collection)

                return [
                    ChannelContext(node=collection, channel_slug=root.channel_slug)
                    for collection in visible_collections
                ]

            return channel_listings.then(return_visible_collections)

        return (
            CollectionsByProductIdLoader(info.context)
            .load(root.node.id)
            .then(return_collections)
        )

    @staticmethod
    def resolve_weight(root: ChannelContext[models.Product], _info, **_kwargs):
        return convert_weight_to_default_weight_unit(root.node.weight)

    @staticmethod
    @traced_resolver
    def resolve_is_available_for_purchase(root: ChannelContext[models.Product], info):
        if not root.channel_slug:
            return None
        channel_slug = str(root.channel_slug)

        def calculate_is_available_for_purchase(product_channel_listing):
            if not product_channel_listing:
                return None
            return product_channel_listing.is_available_for_purchase()

        return (
            ProductChannelListingByProductIdAndChannelSlugLoader(info.context)
            .load((root.node.id, channel_slug))
            .then(calculate_is_available_for_purchase)
        )

    @staticmethod
    @traced_resolver
    def resolve_available_for_purchase(root: ChannelContext[models.Product], info):
        if not root.channel_slug:
            return None
        channel_slug = str(root.channel_slug)

        def calculate_available_for_purchase(product_channel_listing):
            if not product_channel_listing:
                return None
            return product_channel_listing.available_for_purchase

        return (
            ProductChannelListingByProductIdAndChannelSlugLoader(info.context)
            .load((root.node.id, channel_slug))
            .then(calculate_available_for_purchase)
        )

    @staticmethod
    def resolve_product_type(root: ChannelContext[models.Product], info):
        return ProductTypeByIdLoader(info.context).load(root.node.product_type_id)

    @staticmethod
    def resolve_consumed_by_user(root: ChannelContext[models.Product], info, **_kwargs):
        user = info.context.user
        product = root.node
        if not user.is_authenticated:
            return False
        return user.product_consumed(product)

    @staticmethod
    def resolve_payment_methods(root: ChannelContext[models.Product], info, **_kwargs):
        return root.node.payment_methods.filter(is_active=True)

    def resolve_bookable_resources(
        root: ChannelContext[models.Product], info, **_kwargs
    ):
        return root.node.bookable_resources.all()

    def __resolve_references(roots: List["Product"], info, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        channels = defaultdict(set)
        roots_ids = []
        for root in roots:
            _, root_id = from_global_id_or_error(root.id, Product, raise_error=True)
            if root_id:
                roots_ids.append(f"{root.channel}_{root_id}")
                channels[root.channel].add(root_id)

        products = {}
        for channel, ids in channels.items():
            queryset = resolve_products(
                info, requestor, channel_slug=channel
            ).qs.filter(id__in=ids)

            for product in queryset:
                products[f"{channel}_{product.id}"] = ChannelContext(
                    channel_slug=channel, node=product
                )

        return [products.get(root_id) for root_id in roots_ids]


@key(fields="id")
class ProductType(CountableDjangoObjectType):
    products = ChannelContextFilterConnectionField(
        Product,
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="List of products of this type.",
        deprecation_reason=(
            "Will be removed in Saleor 4.0. "
            "Use the top-level `products` query with the `productTypes` filter."
        ),
    )
    tax_type = graphene.Field(
        TaxType, description="A type of tax. Assigned by enabled tax gateway"
    )
    variant_attributes = graphene.List(
        Attribute,
        description="Variant attributes of that product type.",
        variant_selection=graphene.Argument(
            VariantAttributeScope,
            description="Define scope of returned attributes.",
        ),
    )
    product_attributes = graphene.List(
        Attribute, description="Product attributes of that product type."
    )
    available_attributes = FilterInputConnectionField(
        Attribute, filter=AttributeFilterInput()
    )

    class Meta:
        description = (
            "Represents a type of product. It defines what attributes are available to "
            "products of this type."
        )
        interfaces = [relay.Node, ObjectWithMetadata]
        model = models.ProductType
        only_fields = [
            "has_variants",
            "id",
            "is_digital",
            "is_shipping_required",
            "name",
            "slug",
            "weight",
            "tax_type",
        ]

    @staticmethod
    def resolve_tax_type(root: models.ProductType, info):
        tax_data = info.context.plugins.get_tax_code_from_object_meta(root)
        return TaxType(tax_code=tax_data.code, description=tax_data.description)

    @staticmethod
    def resolve_product_attributes(root: models.ProductType, info):
        return ProductAttributesByProductTypeIdLoader(info.context).load(root.pk)

    @staticmethod
    @traced_resolver
    def resolve_variant_attributes(
        root: models.ProductType,
        info,
        variant_selection: Optional[str] = None,
    ):
        def apply_variant_selection_filter(attributes):
            if not variant_selection or variant_selection == VariantAttributeScope.ALL:
                return attributes
            variant_selection_attrs = get_variant_selection_attributes(attributes)
            if variant_selection == VariantAttributeScope.VARIANT_SELECTION:
                return variant_selection_attrs
            return [attr for attr in attributes if attr not in variant_selection_attrs]

        return (
            VariantAttributesByProductTypeIdLoader(info.context)
            .load(root.pk)
            .then(apply_variant_selection_filter)
        )

    @staticmethod
    def resolve_products(root: models.ProductType, info, channel=None, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        if channel is None:
            channel = get_default_channel_slug_or_graphql_error()
        qs = root.products.visible_to_user(requestor, channel)  # type: ignore
        return ChannelQsContext(qs=qs, channel_slug=channel)

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_available_attributes(root: models.ProductType, info, **kwargs):
        qs = attribute_models.Attribute.objects.get_unassigned_product_type_attributes(
            root.pk
        )
        return resolve_attributes(info, qs=qs, **kwargs)

    @staticmethod
    def resolve_weight(root: models.ProductType, _info, **_kwargs):
        return convert_weight_to_default_weight_unit(root.weight)

    @staticmethod
    def __resolve_references(roots: List["ProductType"], _info, **_kwargs):
        return resolve_federation_references(
            ProductType, roots, models.ProductType.objects
        )


@key(fields="id channel")
class Collection(ChannelContextTypeWithMetadata, CountableDjangoObjectType):
    channel = graphene.String(
        description=(
            "Channel given to retrieve this collection. Also used by federation "
            "gateway to resolve this object in a federated query."
        ),
    )
    description_json = graphene.JSONString(
        description="Description of the collection (JSON).",
        deprecation_reason=(
            "Will be removed in Saleor 4.0. Use the `description` field instead."
        ),
    )
    products = ChannelContextFilterConnectionField(
        Product,
        filter=ProductFilterInput(description="Filtering options for products."),
        sort_by=ProductOrder(description="Sort products."),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        description="List of products in this collection.",
    )
    background_image = graphene.Field(
        Image, size=graphene.Int(description="Size of the image.")
    )
    translation = TranslationField(
        CollectionTranslation,
        type_name="collection",
        resolver=ChannelContextType.resolve_translation,
    )
    channel_listings = graphene.List(
        graphene.NonNull(CollectionChannelListing),
        description="List of channels in which the collection is available.",
    )

    class Meta:
        default_resolver = ChannelContextType.resolver_with_context
        description = "Represents a collection of products."
        only_fields = [
            "description",
            "id",
            "name",
            "seo_description",
            "seo_title",
            "slug",
        ]
        interfaces = [relay.Node, ObjectWithMetadata]
        model = models.Collection

    @staticmethod
    def resolve_channel(root: ChannelContext[models.Product], info):
        return root.channel_slug

    @staticmethod
    def resolve_background_image(
        root: ChannelContext[models.Collection], info, size=None, **_kwargs
    ):
        if root.node.background_image:
            node = root.node
            return Image.get_adjusted(
                image=node.background_image,
                alt=node.background_image_alt,
                size=size,
                rendition_key_set="background_images",
                info=info,
            )

    @staticmethod
    def resolve_products(
        root: ChannelContext[models.Collection], info, company=None, **kwargs
    ):
        company_id = None
        requestor = info.context.user
        if company:
            _, company_id = from_global_id_or_error(company, only_type=CompanyType)
            has_required_permissions = has_one_of_permissions_as_staff(
                requestor, ALL_PRODUCTS_PERMISSIONS
            )
            if not requestor.is_authenticated or not (
                requestor.is_company_manager(company_id) or has_required_permissions
            ):
                raise PermissionDenied()
            qs = root.node.products.visible_by_company(  # type: ignore
                company_id, root.channel_slug
            )
        else:
            qs = root.node.products.visible_to_user(  # type: ignore
                requestor, root.channel_slug
            )
        return ChannelQsContext(qs=qs, channel_slug=root.channel_slug)

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_channel_listings(root: ChannelContext[models.Collection], info):
        requestor = info.context.user
        is_staff = requestor_is_staff_member_or_app(requestor)
        if not is_staff:
            raise PermissionDenied()
        return CollectionChannelListingByCollectionIdLoader(info.context).load(
            root.node.id
        )

    @staticmethod
    def resolve_description_json(root: ChannelContext[models.Collection], info):
        description = root.node.description
        return description if description is not None else {}

    @staticmethod
    def __resolve_references(roots: List["Collection"], info, **_kwargs):
        from ..resolvers import resolve_collections

        channels = defaultdict(set)
        roots_ids = []
        for root in roots:
            _, root_id = from_global_id_or_error(root.id, Collection, raise_error=True)
            roots_ids.append(f"{root.channel}_{root_id}")
            channels[root.channel].add(root_id)

        collections = {}
        for channel, ids in channels.items():
            queryset = resolve_collections(info, channel).qs.filter(id__in=ids)

            for collection in queryset:
                collections[f"{channel}_{collection.id}"] = ChannelContext(
                    channel_slug=channel, node=collection
                )

        return [collections.get(root_id) for root_id in roots_ids]


@key(fields="id")
class Category(CountableDjangoObjectType):
    description_json = graphene.JSONString(
        description="Description of the category (JSON).",
        deprecation_reason=(
            "Will be removed in Saleor 4.0. Use the `description` field instead."
        ),
    )
    ancestors = PrefetchingConnectionField(
        lambda: Category, description="List of ancestors of the category."
    )
    products = ChannelContextFilterConnectionField(
        Product,
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        description="List of products in the category.",
    )
    children = PrefetchingConnectionField(
        lambda: Category, description="List of children of the category."
    )
    translation = TranslationField(CategoryTranslation, type_name="category")

    class Meta:
        description = (
            "Represents a single category of products. Categories allow to organize "
            "products in a tree-hierarchies which can be used for navigation in the "
            "storefront."
        )
        only_fields = [
            "description",
            "id",
            "level",
            "name",
            "parent",
            "seo_description",
            "seo_title",
            "slug",
            "icon_id",
        ]
        interfaces = [relay.Node, ObjectWithMetadata]
        model = models.Category

    @staticmethod
    def resolve_ancestors(root: models.Category, info, **_kwargs):
        return root.get_ancestors()

    @staticmethod
    def resolve_description_json(root: models.Category, info):
        description = root.description
        return description if description is not None else {}

    @staticmethod
    def resolve_children(root: models.Category, info, **_kwargs):
        return CategoryChildrenByCategoryIdLoader(info.context).load(root.pk)

    @staticmethod
    def resolve_url(root: models.Category, _info):
        return ""

    @staticmethod
    @traced_resolver
    def resolve_products(
        root: models.Category, info, channel=None, company=None, **_kwargs
    ):
        company_id = None
        requestor = info.context.user
        is_staff = requestor_is_staff_member_or_app(requestor)
        tree = root.get_descendants(include_self=True)
        if channel is None and not is_staff:
            channel = get_default_channel_slug_or_graphql_error()

        if company:
            _, company_id = from_global_id_or_error(
                company, only_type=CompanyType, raise_error=True
            )
            has_required_permissions = has_one_of_permissions_as_staff(
                requestor, ALL_PRODUCTS_PERMISSIONS
            )
            if not requestor.is_authenticated or not (
                requestor.is_company_manager(company_id) or has_required_permissions
            ):
                raise PermissionDenied()
            qs = models.Product.objects.visible_by_company(company_id, channel)
        else:
            qs = models.Product.objects.visible_to_user(requestor, channel)
            if not requestor_is_staff_member_or_app(requestor):
                channels = Channel.objects.filter(slug=str(channel))
                product_channel_listings = models.ProductChannelListing.objects.filter(
                    Exists(channels.filter(pk=OuterRef("channel_id"))),
                    visible_in_listings=True,
                )
                qs = qs.filter(
                    Exists(product_channel_listings.filter(product_id=OuterRef("pk"))),
                )
        qs = qs.filter(categories__in=tree).distinct()
        return ChannelQsContext(qs=qs, channel_slug=channel)

    @staticmethod
    def __resolve_references(roots: List["Category"], _info, **_kwargs):
        return resolve_federation_references(Category, roots, models.Category.objects)


@key(fields="id")
class ProductMedia(CountableDjangoObjectType):
    url = graphene.String(
        required=True,
        description="The URL of the media.",
        size=graphene.Int(description="Size of the image."),
    )

    class Meta:
        description = "Represents a product media."
        fields = ["alt", "id", "sort_order", "type", "oembed_data"]
        interfaces = [relay.Node]
        model = models.ProductMedia

    @staticmethod
    def resolve_url(root: models.ProductMedia, info, *, size=None):
        if root.external_url:
            return root.external_url

        if size:
            url = get_thumbnail(root.image, size, method="thumbnail")
        else:
            url = root.image.url
        return info.context.build_absolute_uri(url)

    @staticmethod
    def __resolve_references(roots: List["ProductMedia"], _info, **_kwargs):
        return resolve_federation_references(
            ProductMedia, roots, models.ProductMedia.objects
        )


class ProductImage(graphene.ObjectType):
    id = graphene.ID(required=True, description="The ID of the image.")
    alt = graphene.String(description="The alt text of the image.")
    sort_order = graphene.Int(
        required=False,
        description=(
            "The new relative sorting position of the item (from -inf to +inf). "
            "1 moves the item one position forward, -1 moves the item one position "
            "backward, 0 leaves the item unchanged."
        ),
    )
    url = graphene.String(
        required=True,
        description="The URL of the image.",
        size=graphene.Int(description="Size of the image."),
    )

    class Meta:
        description = "Represents a product image."

    @staticmethod
    def resolve_id(root: models.ProductMedia, info):
        return graphene.Node.to_global_id("ProductImage", root.id)

    @staticmethod
    def resolve_url(root: models.ProductMedia, info, *, size=None):
        if size:
            url = get_thumbnail(root.image, size, method="thumbnail")
        else:
            url = root.image.url
        return info.context.build_absolute_uri(url)


@key(fields="id")
class FraudulentProductReportMedia(CountableDjangoObjectType):
    url = graphene.String(
        required=True,
        description="The URL of the media.",
        size=graphene.Int(description="Size of the image."),
    )

    class Meta:
        description = "Represents a product media."
        fields = ["alt", "id", "oembed_data"]
        interfaces = [relay.Node]
        model = models.FraudulentProductReportMedia

    @staticmethod
    def resolve_url(root: models.ProductMedia, info, *, size=None):
        if root.external_url:
            return root.external_url

        if size:
            url = get_thumbnail(root.image, size, method="thumbnail")
        else:
            url = root.image.url
        return info.context.build_absolute_uri(url)

    @staticmethod
    def __resolve_reference(root, _info, **_kwargs):
        return graphene.Node.get_node_from_global_id(_info, root.id)


@key(fields=id)
class FraudulentProductReport(CountableDjangoObjectType):
    user = graphene.Field(
        account_types.User,
        description="User who make the report.",
        required=True,
    )
    product = graphene.Field(
        "saleor.graphql.product.types.products.Product",
        description="Product that will be reported.",
    )
    reason = graphene.String(
        description="Reason of the report.",
        required=True,
    )
    phone = graphene.String(
        description="Phone number of the user who reports the product.",
        required=True,
    )
    date = graphene.types.datetime.DateTime(
        description="Date when report happened at in ISO 8601 format."
    )
    media = graphene.List(
        graphene.NonNull(lambda: FraudulentProductReportMedia),
        description="List of media for the report.",
    )

    class Meta:
        description = "Represents a report of a possible fraudulent report."
        interfaces = [graphene.relay.Node]
        model = models.FraudulentProductReport
        only_fields = [
            "id",
            "user",
            "product",
            "reason",
            "phone",
            "date",
        ]

    @staticmethod
    def resolve_media(root: models.FraudulentProductReport, info, *_args):
        return models.FraudulentProductReportMedia.objects.filter(
            fraudulent_product_report=root
        )

    @staticmethod
    @traced_resolver
    def resolve_product(root: models.FraudulentProductReport, info):
        context = info.context
        if not root.product_id:
            return None

        def requestor_has_access_to_product(data):
            product, channel = data

            requestor = get_user_or_app_from_context(context)
            is_staff = requestor_is_staff_member_or_app(requestor)
            if is_staff:
                return ChannelContext(node=product, channel_slug=channel.slug)

            def product_is_available(product_channel_listing):
                if product_channel_listing and product_channel_listing.is_visible:
                    return ChannelContext(node=product, channel_slug=channel.slug)
                return None

            return (
                ProductChannelListingByProductIdAndChannelSlugLoader(context)
                .load((product.id, channel.slug))
                .then(product_is_available)
            )

        product = ProductByIdLoader(context).load(root.product_id)
        channel = Channel.objects.get(slug="default-channel")

        return Promise.all([product, channel]).then(requestor_has_access_to_product)


class ProductStat(graphene.ObjectType):
    total = graphene.Int(description="Products added in a single day")
    date = graphene.Date(description="Date when products have been added.")
