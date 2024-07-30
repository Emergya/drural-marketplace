from datetime import date

import graphene
from django.core.exceptions import ValidationError

from saleor.core.tracing import traced_resolver

from ...account.utils import (
    requestor_is_seller,
    requestor_is_staff_and_has_permissions,
    requestor_is_staff_member_or_app,
)
from ...core.exceptions import PermissionDenied
from ...core.permissions import (
    OrderPermissions,
    ProductPermissions,
    StatPermissions,
    has_one_of_permissions_as_staff,
)
from ...graphql.core.types.common import DateTimeRangeInput
from ...product.models import ALL_PRODUCTS_PERMISSIONS
from ..channel import ChannelContext
from ..channel.utils import get_default_channel_slug_or_graphql_error
from ..core.enums import ProductErrorCode, ReportingPeriod
from ..core.fields import (
    ChannelContextFilterConnectionField,
    FilterInputConnectionField,
    PrefetchingConnectionField,
)
from ..core.types.common import DateRangeInput
from ..core.utils import from_global_id_or_error
from ..core.validators import validate_one_of_args_is_in_query
from ..decorators import login_or_app_required, permission_required
from ..product.types.bookable_resources import (
    BookableResourceAvalabilityByDay,
    BookableResourceAvalabilityByPeriods,
    Booking,
)
from ..translations.mutations import (
    CategoryTranslate,
    CollectionTranslate,
    ProductTranslate,
    ProductVariantTranslate,
)
from ..utils import get_user_or_app_from_context
from .bulk_mutations.products import (
    CategoryBulkDelete,
    CollectionBulkDelete,
    ProductBulkDelete,
    ProductMediaBulkDelete,
    ProductTypeBulkDelete,
    ProductVariantBulkDelete,
    ProductVariantStocksCreate,
    ProductVariantStocksDelete,
    ProductVariantStocksUpdate,
    ProductVariantCreate,
)
from .filters import (
    BookableResourceFilterInput,
    CategoryFilterInput,
    CollectionFilterInput,
    ProductFilterInput,
    ProductTypeFilterInput,
    ProductVariantFilterInput,
)
from .mutations.attributes import (
    ProductAttributeAssign,
    ProductAttributeUnassign,
    ProductReorderAttributeValues,
    ProductTypeReorderAttributes,
    ProductVariantReorderAttributeValues,
)
from .mutations.bookable_resources import (
    BookableResourceBulkDelete,
    BookableResourceCreate,
    BookableResourceDelete,
    BookableResourceUpdate,
    BookResource,
    BookResourceBulk,
)
from .mutations.channels import (
    CollectionChannelListingUpdate,
    ProductChannelListingUpdate,
    ProductVariantChannelListingUpdate,
)
from .mutations.digital_contents import (
    DigitalContentCreate,
    DigitalContentDelete,
    DigitalContentUpdate,
    DigitalContentUrlCreate,
)
from .mutations.products import (
    CategoryCreate,
    CategoryDelete,
    CategoryUpdate,
    CollectionAddProducts,
    CollectionCreate,
    CollectionDelete,
    CollectionRemoveProducts,
    CollectionReorderProducts,
    CollectionUpdate,
    FraudulentProductReportCreate,
    ProductCreate,
    ProductDelete,
    ProductDisable,
    ProductEnable,
    ProductMediaCreate,
    ProductMediaDelete,
    ProductMediaReorder,
    ProductMediaUpdate,
    ProductRatingCreate,
    ProductRatingDelete,
    ProductTypeCreate,
    ProductTypeDelete,
    ProductTypeUpdate,
    ProductUpdate,
    ProductVariantDelete,
    ProductVariantReorder,
    ProductVariantSetDefault,
    ProductVariantUpdate,
    VariantMediaAssign,
    VariantMediaUnassign,
)
from .resolvers import (
    resolve_bookable_resource,
    resolve_bookable_resources,
    resolve_booking_by_booking_reference,
    resolve_booking_by_id,
    resolve_categories,
    resolve_category_by_id,
    resolve_category_by_slug,
    resolve_collection_by_id,
    resolve_collection_by_slug,
    resolve_collections,
    resolve_digital_content_by_id,
    resolve_digital_contents,
    resolve_fraudulent_product_report,
    resolve_product_addition_stat,
    resolve_product_by_id,
    resolve_product_by_slug,
    resolve_product_consumption_stat,
    resolve_product_type_by_id,
    resolve_product_types,
    resolve_product_variant_by_sku,
    resolve_product_variants,
    resolve_products,
    resolve_report_product_sales,
    resolve_resource_availability_by_date,
    resolve_resource_calendar_availability,
    resolve_variant_by_id,
)
from .sorters import (
    BookableResourceSortingInput,
    CategorySortingInput,
    CollectionSortingInput,
    ProductOrder,
    ProductTypeSortingInput,
    ProductVariantOrder,
)
from .types import (
    BookableResource,
    Category,
    Collection,
    DigitalContent,
    FraudulentProductReport,
    Product,
    ProductStat,
    ProductType,
    ProductVariant,
)


class ProductQueries(graphene.ObjectType):
    digital_content = graphene.Field(
        DigitalContent,
        description="Look up digital content by ID.",
        id=graphene.Argument(
            graphene.ID, description="ID of the digital content.", required=True
        ),
    )
    digital_contents = PrefetchingConnectionField(
        DigitalContent, description="List of digital content."
    )
    categories = FilterInputConnectionField(
        Category,
        filter=CategoryFilterInput(description="Filtering options for categories."),
        sort_by=CategorySortingInput(description="Sort categories."),
        level=graphene.Argument(
            graphene.Int,
            description="Filter categories by the nesting level in the category tree.",
        ),
        description="List of the shop's categories.",
    )
    category = graphene.Field(
        Category,
        id=graphene.Argument(graphene.ID, description="ID of the category."),
        slug=graphene.Argument(graphene.String, description="Slug of the category"),
        description="Look up a category by ID or slug.",
    )
    collection = graphene.Field(
        Collection,
        id=graphene.Argument(
            graphene.ID,
            description="ID of the collection.",
        ),
        slug=graphene.Argument(graphene.String, description="Slug of the category"),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description="Look up a collection by ID.",
    )
    collections = ChannelContextFilterConnectionField(
        Collection,
        filter=CollectionFilterInput(description="Filtering options for collections."),
        sort_by=CollectionSortingInput(description="Sort collections."),
        description="List of the shop's collections.",
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
    )
    product = graphene.Field(
        Product,
        id=graphene.Argument(
            graphene.ID,
            description="ID of the product.",
        ),
        slug=graphene.Argument(graphene.String, description="Slug of the product."),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        seller_request=graphene.Boolean(
            description="Flag used if request is made by sellers from dashboard.",
        ),
        description="Look up a product by ID.",
    )
    products = ChannelContextFilterConnectionField(
        Product,
        filter=ProductFilterInput(description="Filtering options for products."),
        sort_by=ProductOrder(description="Sort products."),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        description="List of the shop's products.",
    )
    product_type = graphene.Field(
        ProductType,
        id=graphene.Argument(
            graphene.ID, description="ID of the product type.", required=True
        ),
        description="Look up a product type by ID.",
    )
    product_types = FilterInputConnectionField(
        ProductType,
        filter=ProductTypeFilterInput(
            description="Filtering options for product types."
        ),
        sort_by=ProductTypeSortingInput(description="Sort product types."),
        description="List of the shop's product types.",
    )
    product_variant = graphene.Field(
        ProductVariant,
        id=graphene.Argument(
            graphene.ID,
            description="ID of the product variant.",
        ),
        sku=graphene.Argument(
            graphene.String, description="Sku of the product variant."
        ),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        seller_request=graphene.Boolean(
            description="Flag used if request is made by sellers from dashboard.",
        ),
        description="Look up a product variant by ID or SKU.",
    )
    product_variants = ChannelContextFilterConnectionField(
        ProductVariant,
        ids=graphene.List(
            graphene.ID, description="Filter product variants by given IDs."
        ),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        filter=ProductVariantFilterInput(
            description="Filtering options for product variant."
        ),
        sort_by=ProductVariantOrder(description="Sort product variants."),
        description="List of product variants.",
    )
    report_product_sales = ChannelContextFilterConnectionField(
        ProductVariant,
        period=graphene.Argument(
            ReportingPeriod, required=True, description="Span of time."
        ),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned.",
            required=True,
        ),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        description="List of top selling products.",
    )
    fraudulent_product_reports = PrefetchingConnectionField(FraudulentProductReport)
    bookable_resource = graphene.Field(
        BookableResource,
        id=graphene.Argument(
            graphene.ID,
            required=True,
            description="ID of the bookable resource.",
        ),
        description="Look up a bookable resouce by ID.",
    )
    bookable_resources = FilterInputConnectionField(
        BookableResource,
        filter=BookableResourceFilterInput(description="Filtering bookable resources."),
        sort_by=BookableResourceSortingInput(description="Sort bookable resources."),
        company=graphene.Argument(
            graphene.ID,
            description="ID of the company.",
        ),
        description="List of the bookable resouces.",
    )
    resource_calendar_availability = graphene.List(
        BookableResourceAvalabilityByDay,
        id=graphene.Argument(
            graphene.ID,
            required=True,
            description="ID of the bookable resource.",
        ),
        product_variant=graphene.Argument(
            graphene.ID,
            required=True,
            description="ID of the product.",
        ),
        period=graphene.Argument(
            DateRangeInput, required=True, description="Format date year and month"
        ),
    )
    resource_availability_by_date = graphene.List(
        BookableResourceAvalabilityByPeriods,
        id=graphene.Argument(
            graphene.ID,
            required=True,
            description="ID of the bookable resource.",
        ),
        product_variant=graphene.Argument(
            graphene.ID,
            required=True,
            description="ID of the product.",
        ),
        date=graphene.Date(
            required=True, description="Date for check periods availables"
        ),
    )

    product_addition_stat = graphene.List(
        ProductStat,
        period=graphene.Argument(DateTimeRangeInput, required=True),
    )

    product_consumption_stat = graphene.List(
        ProductStat,
        period=graphene.Argument(DateTimeRangeInput, required=True),
    )

    booking = graphene.Field(
        Booking,
        id=graphene.Argument(
            graphene.ID,
            description="ID of the booking.",
        ),
        booking_reference=graphene.String(
            description="Reference code of the booking.",
        ),
        description="Look up a booking by ID or reference code.",
    )

    def resolve_categories(self, info, level=None, **kwargs):
        return resolve_categories(info, level=level, **kwargs)

    @traced_resolver
    def resolve_category(self, info, id=None, slug=None, **kwargs):
        validate_one_of_args_is_in_query("id", id, "slug", slug)
        if id:
            _, id = from_global_id_or_error(id, Category)
            return resolve_category_by_id(id)
        if slug:
            return resolve_category_by_slug(slug=slug)

    @traced_resolver
    def resolve_collection(self, info, id=None, slug=None, channel=None, **_kwargs):
        validate_one_of_args_is_in_query("id", id, "slug", slug)
        requestor = get_user_or_app_from_context(info.context)

        has_required_permissions = has_one_of_permissions_as_staff(
            requestor, ALL_PRODUCTS_PERMISSIONS
        )
        if channel is None and not has_required_permissions:
            channel = get_default_channel_slug_or_graphql_error()
        if id:
            _, id = from_global_id_or_error(id, Collection)
            collection = resolve_collection_by_id(info, id, channel, requestor)
        else:
            collection = resolve_collection_by_slug(
                info, slug=slug, channel_slug=channel, requestor=requestor
            )
        return (
            ChannelContext(node=collection, channel_slug=channel)
            if collection
            else None
        )

    def resolve_collections(self, info, channel=None, *_args, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        has_required_permissions = has_one_of_permissions_as_staff(
            requestor, ALL_PRODUCTS_PERMISSIONS
        )
        if channel is None and not has_required_permissions:
            channel = get_default_channel_slug_or_graphql_error()
        return resolve_collections(info, channel)

    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_digital_content(self, info, id):
        _, id = from_global_id_or_error(id, DigitalContent)
        return resolve_digital_content_by_id(id)

    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_digital_contents(self, info, **_kwargs):
        return resolve_digital_contents(info)

    @traced_resolver
    def resolve_product(
        self, info, id=None, slug=None, channel=None, seller_request=False, **_kwargs
    ):
        validate_one_of_args_is_in_query("id", id, "slug", slug)
        requestor = get_user_or_app_from_context(info.context)

        has_required_permissions = has_one_of_permissions_as_staff(
            requestor, ALL_PRODUCTS_PERMISSIONS
        )
        if channel is None and not has_required_permissions:
            channel = get_default_channel_slug_or_graphql_error()
        if id:
            _type, id = from_global_id_or_error(id, Product)
            product = resolve_product_by_id(
                info,
                id,
                channel_slug=channel,
                requestor=requestor,
                seller_request=seller_request,
            )
        else:
            product = resolve_product_by_slug(
                info,
                product_slug=slug,
                channel_slug=channel,
                requestor=requestor,
                seller_request=seller_request,
            )
        return ChannelContext(node=product, channel_slug=channel) if product else None

    @traced_resolver
    def resolve_products(self, info, channel=None, company=None, **kwargs):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            has_required_permissions = has_one_of_permissions_as_staff(
                requestor, ALL_PRODUCTS_PERMISSIONS
            )
            if not requestor.is_authenticated or not (
                requestor.is_company_manager(company_id) or has_required_permissions
            ):
                raise PermissionDenied()
        if channel is None and not requestor_is_staff_member_or_app(requestor):
            channel = get_default_channel_slug_or_graphql_error()
        return resolve_products(
            info, requestor, channel_slug=channel, company_id=company_id, **kwargs
        )

    def resolve_product_type(self, info, id, **_kwargs):
        _, id = from_global_id_or_error(id, ProductType)
        return resolve_product_type_by_id(id)

    def resolve_product_types(self, info, **kwargs):
        return resolve_product_types(info, **kwargs)

    @traced_resolver
    def resolve_product_variant(
        self,
        info,
        id=None,
        sku=None,
        channel=None,
        seller_request=False,
    ):
        validate_one_of_args_is_in_query("id", id, "sku", sku)
        requestor = get_user_or_app_from_context(info.context)
        has_required_permissions = has_one_of_permissions_as_staff(
            requestor, ALL_PRODUCTS_PERMISSIONS
        )
        # is_staff = requestor_is_staff_member_or_app(requestor)
        if channel is None and not has_required_permissions:
            channel = get_default_channel_slug_or_graphql_error()
        if id:
            _, id = from_global_id_or_error(id, ProductVariant)
            variant = resolve_variant_by_id(
                info,
                id,
                channel_slug=channel,
                requestor=requestor,
                requestor_has_access_to_all=has_required_permissions,
                seller_request=seller_request,
            )
        else:
            variant = resolve_product_variant_by_sku(
                info,
                sku=sku,
                channel_slug=channel,
                requestor=requestor,
                requestor_has_access_to_all=has_required_permissions,
                seller_request=seller_request,
            )
        return ChannelContext(node=variant, channel_slug=channel) if variant else None

    def resolve_product_variants(self, info, ids=None, channel=None, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        has_required_permissions = has_one_of_permissions_as_staff(
            requestor, ALL_PRODUCTS_PERMISSIONS
        )
        if channel is None and not has_required_permissions:
            channel = get_default_channel_slug_or_graphql_error()
        return resolve_product_variants(
            info,
            ids=ids,
            channel_slug=channel,
            requestor_has_access_to_all=has_required_permissions,
            requestor=requestor,
        )

    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    @traced_resolver
    def resolve_report_product_sales(
        self, info, period, channel, company=None, **_kwargs
    ):
        company_id = None
        requestor = info.context.user
        if requestor_is_seller(requestor) and company is None:
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()

        return resolve_report_product_sales(
            period, channel_slug=channel, company_id=company_id
        )

    @traced_resolver
    def resolve_fraudulent_product_reports(self, info, **_kwargs):
        requestor = info.context.user
        has_required_permissions = has_one_of_permissions_as_staff(
            requestor, ALL_PRODUCTS_PERMISSIONS
        )
        if has_required_permissions:
            return resolve_fraudulent_product_report()
        raise PermissionDenied

    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_bookable_resource(self, info, id, **kwargs):
        requestor = get_user_or_app_from_context(info.context)
        _, bookable_id = from_global_id_or_error(id, only_type=BookableResource)
        bookable_resource = resolve_bookable_resource(bookable_id)
        if bookable_resource:
            company = bookable_resource.company.pk
            if not (requestor.is_company_manager(company) or requestor.is_staff):
                raise PermissionDenied()
        return bookable_resource

    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_bookable_resources(self, info, company=None, **kwargs):
        requestor = get_user_or_app_from_context(info.context)

        if not company:
            if not requestor_is_staff_member_or_app(requestor):
                raise PermissionDenied()
            return resolve_bookable_resources()

        _, company_id = from_global_id_or_error(company, only_type="CompanyType")
        if not (requestor.is_company_manager(company_id) or requestor.is_staff):
            raise PermissionDenied()
        return resolve_bookable_resources(company_id=company_id)

    def resolve_resource_calendar_availability(
        self, info, id, product_variant, period, **kwargs
    ):
        _, resource_id = from_global_id_or_error(id, only_type="BookableResource")
        _, variant_id = from_global_id_or_error(
            product_variant, only_type="ProductVariant"
        )
        return resolve_resource_calendar_availability(resource_id, variant_id, period)

    def resolve_resource_availability_by_date(
        self, info, id, product_variant, date, **kwargs
    ):
        _, resource_id = from_global_id_or_error(id, only_type="BookableResource")
        _, variant_id = from_global_id_or_error(
            product_variant, only_type="ProductVariant"
        )
        return resolve_resource_availability_by_date(resource_id, variant_id, date)

    @permission_required(StatPermissions.MANAGE_PRODUCT_STATS)
    @traced_resolver
    def resolve_product_addition_stat(self, info, period, **_kwargs):
        if period.lte.date() > date.today():
            raise ValidationError(
                "You can't request stats for future dates.", code="future_stats"
            )
        total_days = period.lte - period.gte
        if total_days.days > 2000:
            raise ValidationError(
                "You can't request more than 2000 days.", code="too_much_entries"
            )
        return resolve_product_addition_stat(period.gte, period.lte)

    @permission_required(StatPermissions.MANAGE_PRODUCT_STATS)
    @traced_resolver
    def resolve_product_consumption_stat(self, info, period, **_kwargs):
        if period.lte.date() > date.today():
            raise ValidationError(
                "You can't request stats for future dates.", code="future_stats"
            )
        total_days = period.lte - period.gte
        if total_days.days > 2000:
            raise ValidationError(
                "You can't request more than 2000 days.", code="too_much_entries"
            )
        return resolve_product_consumption_stat(period.gte, period.lte)

    @traced_resolver
    @login_or_app_required
    def resolve_booking(self, info, id=None, booking_reference=None, **_kwargs):
        # Get booking details by id or booking_reference
        requestor = get_user_or_app_from_context(info.context)

        if id and booking_reference:
            raise ValidationError("You have to fill one field, ID or booking reference")
        if id:
            _, booking_id = from_global_id_or_error(id, only_type=Booking)
            booking = resolve_booking_by_id(booking_id)
        else:
            booking = resolve_booking_by_booking_reference(booking_reference)

        if not (
            booking.user == requestor
            or requestor.is_company_manager(booking.company.pk)
            or requestor_is_staff_and_has_permissions(
                requestor, [OrderPermissions.MANAGE_ORDERS]
            )
        ):
            raise PermissionDenied
        return booking


class ProductMutations(graphene.ObjectType):
    product_attribute_assign = ProductAttributeAssign.Field()
    product_attribute_unassign = ProductAttributeUnassign.Field()

    category_create = CategoryCreate.Field()
    category_delete = CategoryDelete.Field()
    category_bulk_delete = CategoryBulkDelete.Field()
    category_update = CategoryUpdate.Field()
    category_translate = CategoryTranslate.Field()

    collection_add_products = CollectionAddProducts.Field()
    collection_create = CollectionCreate.Field()
    collection_delete = CollectionDelete.Field()
    collection_reorder_products = CollectionReorderProducts.Field()
    collection_bulk_delete = CollectionBulkDelete.Field()
    collection_remove_products = CollectionRemoveProducts.Field()
    collection_update = CollectionUpdate.Field()
    collection_translate = CollectionTranslate.Field()
    collection_channel_listing_update = CollectionChannelListingUpdate.Field()

    product_create = ProductCreate.Field()
    product_delete = ProductDelete.Field()
    product_bulk_delete = ProductBulkDelete.Field()
    product_update = ProductUpdate.Field()
    product_translate = ProductTranslate.Field()
    product_enable = ProductEnable.Field()
    product_disable = ProductDisable.Field()

    product_channel_listing_update = ProductChannelListingUpdate.Field()

    product_media_create = ProductMediaCreate.Field()
    product_variant_reorder = ProductVariantReorder.Field()
    product_media_delete = ProductMediaDelete.Field()
    product_media_bulk_delete = ProductMediaBulkDelete.Field()
    product_media_reorder = ProductMediaReorder.Field()
    product_media_update = ProductMediaUpdate.Field()

    product_type_create = ProductTypeCreate.Field()
    product_type_delete = ProductTypeDelete.Field()
    product_type_bulk_delete = ProductTypeBulkDelete.Field()
    product_type_update = ProductTypeUpdate.Field()
    product_type_reorder_attributes = ProductTypeReorderAttributes.Field()
    product_reorder_attribute_values = ProductReorderAttributeValues.Field()

    digital_content_create = DigitalContentCreate.Field()
    digital_content_delete = DigitalContentDelete.Field()
    digital_content_update = DigitalContentUpdate.Field()

    digital_content_url_create = DigitalContentUrlCreate.Field()

    
    product_variant_create = ProductVariantCreate.Field()
    # product_variant_bulk_create = ProductVariantBulkCreate.Field()
    product_variant_delete = ProductVariantDelete.Field()
    product_variant_bulk_delete = ProductVariantBulkDelete.Field()
    product_variant_stocks_create = ProductVariantStocksCreate.Field()
    product_variant_stocks_delete = ProductVariantStocksDelete.Field()
    product_variant_stocks_update = ProductVariantStocksUpdate.Field()
    product_variant_update = ProductVariantUpdate.Field()
    product_variant_set_default = ProductVariantSetDefault.Field()
    product_variant_translate = ProductVariantTranslate.Field()
    product_variant_channel_listing_update = ProductVariantChannelListingUpdate.Field()
    product_variant_reorder_attribute_values = (
        ProductVariantReorderAttributeValues.Field()
    )

    variant_media_assign = VariantMediaAssign.Field()
    variant_media_unassign = VariantMediaUnassign.Field()

    fraudulent_product_report_create = FraudulentProductReportCreate.Field()

    product_rating_create = ProductRatingCreate.Field()
    product_rating_delete = ProductRatingDelete.Field()

    bookable_resource_create = BookableResourceCreate.Field()
    bookable_resource_update = BookableResourceUpdate.Field()
    bookable_resource_delete = BookableResourceDelete.Field()
    bookable_resource_bulk_delete = BookableResourceBulkDelete.Field()

    book_resource = BookResource.Field()
    book_resource_bulk = BookResourceBulk.Field()
