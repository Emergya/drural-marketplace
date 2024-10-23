import datetime
from collections import defaultdict
from typing import List, Tuple

import graphene
from django.contrib.gis.geos import Point
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import transaction
from django.db.models import Q
from django.core.validators import URLValidator
from django.utils.text import slugify

from ....attribute import AttributeInputType, AttributeType
from ....attribute import models as attribute_models
from ....core.exceptions import PermissionDenied
from ....core.permissions import (
    CategoryPermissions,
    CollectionPermissions,
    ProductPermissions,
    ProductTypePermissions,
)
from ....core.tracing import traced_atomic_transaction
from ....core.utils.draftjs import json_content_to_raw_text
from ....core.utils.editorjs import clean_editor_js
from ....core.utils.validators import get_oembed_data
from ....graphql.utils import get_user_or_app_from_context
from ....order import OrderStatus
from ....order import events as order_events
from ....order import models as order_models
from ....order.tasks import recalculate_orders_task
from ....payment.models import PaymentMethod
from ....product import ProductMediaTypes, models, notifications
from ....product.error_codes import CollectionErrorCode, ProductErrorCode
from ....product.tasks import (
    update_product_discounted_price_task,
    update_products_discounted_prices_of_catalogues_task,
    update_variants_names,
)
from ....product.thumbnails import (
    create_collection_background_image_thumbnails,
    create_product_thumbnails,
)
from ....product.utils import delete_categories, get_products_ids_without_variants
from ....product.utils.variants import generate_and_set_variant_name
from ....seo.models import Keyword
from ...attribute.types import AttributeValueInput
from ...attribute.utils import AttributeAssignmentMixin, AttrValuesInput
from ...channel import ChannelContext
from ...company.types import CompanyType
from ...core.inputs import ReorderInput
from ...core.mutations import BaseMutation, ModelDeleteMutation, ModelMutation
from ...core.scalars import WeightScalar
from ...core.types import SeoInput, Upload
from ...core.types.common import CollectionError, ProductError, RatingError, ReportError
from ...core.utils import (
    add_hash_to_file_name,
    clean_seo_fields,
    from_global_id_or_error,
    get_duplicated_values,
    validate_image_file,
    validate_slug_and_generate_if_needed,
)
from ...core.utils.reordering import perform_reordering
from ...warehouse.types import Warehouse
from ..types import (
    Category,
    Collection,
    Product,
    ProductMedia,
    ProductRating,
    ProductType,
    ProductVariant,
)
from ..utils import (
    create_stocks,
    get_draft_order_lines_data_for_variants,
    get_used_attribute_values_for_variant,
    get_used_variants_attribute_values,
    is_product_owner_or_can_manage_products,
)


class CategoryInput(graphene.InputObjectType):
    description = graphene.JSONString(description="Category description (JSON).")
    name = graphene.String(description="Category name.")
    slug = graphene.String(description="Category slug.")
    seo = SeoInput(description="Search engine optimization fields.")
    icon_id = graphene.String(description="Category icon identifier", required=False)


class CategoryCreate(ModelMutation):
    class Arguments:
        input = CategoryInput(
            required=True, description="Fields required to create a category."
        )
        parent_id = graphene.ID(
            description=(
                "ID of the parent category. If empty, category will be top level "
                "category."
            ),
            name="parent",
        )

    class Meta:
        description = "Creates a new category."
        model = models.Category
        permissions = (CategoryPermissions.MANAGE_CATEGORIES,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        description = json_content_to_raw_text(cleaned_input.get("description"))
        # Description: Max 120 chars
        if len(description) > 120:
            raise ValidationError(
                {
                    "description": ValidationError(
                        "Max 120 characters.", code="description_too_long"
                    )
                }
            )
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = ProductErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})
        # Two or more categories cannot have the same name with the same parent
        parent_id = data["parent_id"]
        parent = None
        if parent_id:
            parent = cls.get_node_or_error(
                info, parent_id, field="parent", only_type=Category
            )
            cleaned_input["parent"] = parent
        name = cleaned_input.get("name")
        if getattr(instance, "name", None) != name:
            if models.Category.objects.filter(name=name, parent=parent).exists():
                raise ValidationError(
                    {
                        "name": ValidationError(
                            "There cannot be 2 categories with the same name without"
                            " a superior category or with the same superior category"
                        )
                    }
                )
        clean_seo_fields(cleaned_input)
        return cleaned_input

    @classmethod
    def perform_mutation(cls, root, info, **data):
        parent_id = data.pop("parent_id", None)
        data["input"]["parent_id"] = parent_id
        return super().perform_mutation(root, info, **data)

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.save()


class CategoryUpdate(CategoryCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a category to update.")
        input = CategoryInput(
            required=True, description="Fields required to update a category."
        )

    class Meta:
        description = "Updates a category."
        model = models.Category
        permissions = (CategoryPermissions.MANAGE_CATEGORIES,)
        error_type_class = ProductError
        error_type_field = "product_errors"


class CategoryDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a category to delete.")

    class Meta:
        description = "Deletes a category."
        model = models.Category
        permissions = (CategoryPermissions.MANAGE_CATEGORIES,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        if not cls.check_permissions(info.context):
            raise PermissionDenied()
        node_id = data.get("id")
        instance = cls.get_node_or_error(info, node_id, only_type=Category)

        db_id = instance.id

        delete_categories([db_id], manager=info.context.plugins)

        instance.id = db_id
        return cls.success_response(instance)


class CollectionInput(graphene.InputObjectType):
    is_published = graphene.Boolean(
        description="Informs whether a collection is published."
    )
    name = graphene.String(description="Name of the collection.")
    slug = graphene.String(description="Slug of the collection.")
    description = graphene.JSONString(
        description="Description of the collection (JSON)."
    )
    background_image = Upload(description="Background image file.")
    background_image_alt = graphene.String(description="Alt text for an image.")
    seo = SeoInput(description="Search engine optimization fields.")
    publication_date = graphene.Date(description="Publication date. ISO 8601 standard.")


class CollectionCreateInput(CollectionInput):
    products = graphene.List(
        graphene.ID,
        description="List of products to be added to the collection.",
        name="products",
    )


class CollectionCreate(ModelMutation):
    class Arguments:
        input = CollectionCreateInput(
            required=True, description="Fields required to create a collection."
        )

    class Meta:
        description = "Creates a new collection."
        model = models.Collection
        permissions = (CollectionPermissions.MANAGE_COLLECTIONS,)
        error_type_class = CollectionError
        error_type_field = "collection_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = CollectionErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})
        if data.get("background_image"):
            image_data = info.context.FILES.get(data["background_image"])
            validate_image_file(image_data, "background_image", CollectionErrorCode)
            add_hash_to_file_name(image_data)
        is_published = cleaned_input.get("is_published")
        publication_date = cleaned_input.get("publication_date")
        if is_published and not publication_date:
            cleaned_input["publication_date"] = datetime.date.today()
        clean_seo_fields(cleaned_input)
        return cleaned_input

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.save()
        if cleaned_input.get("background_image"):
            create_collection_background_image_thumbnails.delay(instance.pk)

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        products = instance.products.prefetched_for_webhook(single_object=False)
        for product in products:
            info.context.plugins.product_updated(product)

    @classmethod
    def perform_mutation(cls, _root, info, **kwargs):
        result = super().perform_mutation(_root, info, **kwargs)
        return CollectionCreate(
            collection=ChannelContext(node=result.collection, channel_slug=None)
        )


class CollectionUpdate(CollectionCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a collection to update.")
        input = CollectionInput(
            required=True, description="Fields required to update a collection."
        )

    class Meta:
        description = "Updates a collection."
        model = models.Collection
        permissions = (CollectionPermissions.MANAGE_COLLECTIONS,)
        error_type_class = CollectionError
        error_type_field = "collection_errors"

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        """Override this method with `pass` to avoid triggering product webhook."""
        pass

    @classmethod
    def save(cls, info, instance, cleaned_input):
        if cleaned_input.get("background_image"):
            create_collection_background_image_thumbnails.delay(instance.pk)
        instance.save()


class CollectionDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a collection to delete.")

    class Meta:
        description = "Deletes a collection."
        model = models.Collection
        permissions = (CollectionPermissions.MANAGE_COLLECTIONS,)
        error_type_class = CollectionError
        error_type_field = "collection_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **kwargs):
        node_id = kwargs.get("id")

        instance = cls.get_node_or_error(info, node_id, only_type=Collection)
        products = list(instance.products.prefetched_for_webhook(single_object=False))

        result = super().perform_mutation(_root, info, **kwargs)
        for product in products:
            info.context.plugins.product_updated(product)
        return CollectionDelete(
            collection=ChannelContext(node=result.collection, channel_slug=None)
        )


class MoveProductInput(graphene.InputObjectType):
    product_id = graphene.ID(
        description="The ID of the product to move.", required=True
    )
    sort_order = graphene.Int(
        description=(
            "The relative sorting position of the product (from -inf to +inf) "
            "starting from the first given product's actual position."
            "1 moves the item one position forward, -1 moves the item one position "
            "backward, 0 leaves the item unchanged."
        )
    )


class CollectionReorderProducts(BaseMutation):
    collection = graphene.Field(
        Collection, description="Collection from which products are reordered."
    )

    class Meta:
        description = "Reorder the products of a collection."
        permissions = (CollectionPermissions.MANAGE_COLLECTIONS,)
        error_type_class = CollectionError
        error_type_field = "collection_errors"

    class Arguments:
        collection_id = graphene.Argument(
            graphene.ID, required=True, description="ID of a collection."
        )
        moves = graphene.List(
            MoveProductInput,
            required=True,
            description="The collection products position operations.",
        )

    @classmethod
    def perform_mutation(cls, _root, info, collection_id, moves):
        pk = cls.get_global_id_or_error(
            collection_id, only_type=Collection, field="collection_id"
        )

        try:
            collection = models.Collection.objects.prefetch_related(
                "collectionproduct"
            ).get(pk=pk)
        except ObjectDoesNotExist:
            raise ValidationError(
                {
                    "collection_id": ValidationError(
                        f"Couldn't resolve to a collection: {collection_id}",
                        code=ProductErrorCode.NOT_FOUND,
                    )
                }
            )

        m2m_related_field = collection.collectionproduct

        operations = {}

        # Resolve the products
        for move_info in moves:
            product_pk = cls.get_global_id_or_error(
                move_info.product_id, only_type=Product, field="moves"
            )

            try:
                m2m_info = m2m_related_field.get(product_id=int(product_pk))
            except ObjectDoesNotExist:
                raise ValidationError(
                    {
                        "moves": ValidationError(
                            f"Couldn't resolve to a product: {move_info.product_id}",
                            code=CollectionErrorCode.NOT_FOUND.value,
                        )
                    }
                )
            operations[m2m_info.pk] = move_info.sort_order

        with traced_atomic_transaction():
            perform_reordering(m2m_related_field, operations)
        collection = ChannelContext(node=collection, channel_slug=None)
        return CollectionReorderProducts(collection=collection)


class CollectionAddProducts(BaseMutation):
    collection = graphene.Field(
        Collection, description="Collection to which products will be added."
    )

    class Arguments:
        collection_id = graphene.Argument(
            graphene.ID, required=True, description="ID of a collection."
        )
        products = graphene.List(
            graphene.ID, required=True, description="List of product IDs."
        )

    class Meta:
        description = "Adds products to a collection."
        permissions = (CollectionPermissions.MANAGE_COLLECTIONS,)
        error_type_class = CollectionError
        error_type_field = "collection_errors"

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, collection_id, products):
        collection = cls.get_node_or_error(
            info, collection_id, field="collection_id", only_type=Collection
        )
        products = cls.get_nodes_or_error(
            products,
            "products",
            Product,
            qs=models.Product.objects.prefetched_for_webhook(single_object=False),
        )

        cls.clean_products(products)
        collection_previous_state = (
            list(collection.products.all())
            if collection.slug == "featured-products"
            else None
        )
        collection.products.add(*products)
        if collection.sale_set.exists():
            # Updated the db entries, recalculating discounts of affected products
            update_products_discounted_prices_of_catalogues_task.delay(
                product_ids=[pq.pk for pq in products]
            )
        transaction.on_commit(
            lambda: [
                info.context.plugins.product_updated(product) for product in products
            ]
        )
        # We send a notifications to all managers of the products company
        if collection.slug == "featured-products":
            for product in products:
                if product not in collection_previous_state:
                    for manager in product.company.managers.all():
                        notifications.send_featured_product_notification(
                            manager, info.context.plugins, product.name
                        )
        return CollectionAddProducts(
            collection=ChannelContext(node=collection, channel_slug=None)
        )

    @classmethod
    def clean_products(cls, products):
        products_ids_without_variants = get_products_ids_without_variants(products)
        if products_ids_without_variants:
            code = CollectionErrorCode.CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT.value
            raise ValidationError(
                {
                    "products": ValidationError(
                        "Cannot manage products without variants.",
                        code=code,
                        params={"products": products_ids_without_variants},
                    )
                }
            )


class CollectionRemoveProducts(BaseMutation):
    collection = graphene.Field(
        Collection, description="Collection from which products will be removed."
    )

    class Arguments:
        collection_id = graphene.Argument(
            graphene.ID, required=True, description="ID of a collection."
        )
        products = graphene.List(
            graphene.ID, required=True, description="List of product IDs."
        )

    class Meta:
        description = "Remove products from a collection."
        permissions = (CollectionPermissions.MANAGE_COLLECTIONS,)
        error_type_class = CollectionError
        error_type_field = "collection_errors"

    @classmethod
    def perform_mutation(cls, _root, info, collection_id, products):
        collection = cls.get_node_or_error(
            info, collection_id, field="collection_id", only_type=Collection
        )
        products = cls.get_nodes_or_error(
            products,
            "products",
            only_type=Product,
            qs=models.Product.objects.prefetched_for_webhook(single_object=False),
        )
        collection.products.remove(*products)
        for product in products:
            info.context.plugins.product_updated(product)
        if collection.sale_set.exists():
            # Updated the db entries, recalculating discounts of affected products
            update_products_discounted_prices_of_catalogues_task.delay(
                product_ids=[p.pk for p in products]
            )
        return CollectionRemoveProducts(
            collection=ChannelContext(node=collection, channel_slug=None)
        )


class ProductAddressInput(graphene.InputObjectType):
    street = graphene.String(required=False, description="Determines the street.")
    street_second_line = graphene.String(
        required=False, description="Determines the second street."
    )
    postal_code = graphene.String(
        required=False, description="Determines the postal code."
    )
    locality = graphene.String(
        required=False, description="Determines the municipality."
    )
    region = graphene.String(required=False, description="Determines the province.")
    country = graphene.String(required=False, description="Determines the country.")
    latitude = graphene.Float(required=True, description="Latitude point")
    longitude = graphene.Float(required=True, description="longitude point")


class PurchaseEmailInput(graphene.InputObjectType):
    title = graphene.String(
        required=True, description="Title of the custom email for purchase"
    )
    subject = graphene.String(
        required=True, description="Title of the custom email for purchase"
    )
    content = graphene.String(
        required=True, description="Title of the custom email for purchase"
    )


class ProductInput(graphene.InputObjectType):
    attributes = graphene.List(
        graphene.NonNull(AttributeValueInput), description="List of attributes."
    )
    category = graphene.ID(description="ID of the main category", required=False)

    categories = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of IDs of categories that the product belongs to.",
        name="categories",
    )
    charge_taxes = graphene.Boolean(
        description="Determine if taxes are being charged for the product."
    )
    collections = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of IDs of collections that the product belongs to.",
        name="collections",
    )
    payment_methods = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of payment methods IDs related to the product.",
    )
    bookable_resources = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of bookable resource IDs related to the product.",
    )
    description = graphene.JSONString(description="Product description (JSON).")
    details = graphene.JSONString(description="Product details (JSON).")
    name = graphene.String(description="Product name.")
    slug = graphene.String(description="Product slug.")
    tax_code = graphene.String(description="Tax rate for enabled tax gateway.")
    seo = SeoInput(description="Search engine optimization fields.")
    weight = WeightScalar(description="Weight of the Product.", required=False)
    rating = graphene.Float(description="Defines the product rating value.")
    address = graphene.Argument(
        ProductAddressInput,
        required=False,
        description="Determines the address of product.",
    )
    duration = graphene.Int(
        description="Determines the duration of bookable product.",
    )
    purchase_email = graphene.Argument(
        PurchaseEmailInput,
        required=False,
        description="Determines a custom purchase email for a product.",
    )
    url = graphene.String(
        description="Determines the url of external product.",
    )
    has_no_price = graphene.Boolean(
        description="Determines if product has no price.",
    )


class StockInput(graphene.InputObjectType):
    warehouse = graphene.ID(
        required=True, description="Warehouse in which stock is located."
    )
    quantity = graphene.Int(
        required=True, description="Quantity of items available for sell."
    )


class ProductCreateInput(ProductInput):
    is_billable = graphene.Boolean(
        description="Determines if the product is billable.",
    )
    is_bookable = graphene.Boolean(
        description="Determines if the product is bookable.",
    )
    address = graphene.Argument(
        ProductAddressInput,
        required=False,
        description="Determines the address of product.",
    )
    product_type = graphene.ID(
        description="ID of the type that product belongs to.",
        name="productType",
        required=False,
    )
    skip_stock = graphene.Boolean(
        required=False,
        description="Determines if stock is used.",
    )
    company = graphene.ID(
        description="ID of the company.",
        name="company",
        required=True,
    )
    category = graphene.ID(description="ID of the main category", required=True)
    purchase_email = graphene.Argument(
        PurchaseEmailInput,
        required=False,
        description="Determines a custom purchase email for a product.",
    )


T_INPUT_MAP = List[Tuple[attribute_models.Attribute, AttrValuesInput]]


class ProductCreate(ModelMutation):
    class Arguments:
        input = ProductCreateInput(
            required=True, description="Fields required to create a product."
        )

    class Meta:
        description = "Creates a new product."
        model = models.Product
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def clean_attributes(
        cls, attributes: dict, product_type: models.ProductType
    ) -> T_INPUT_MAP:
        attributes_qs = product_type.product_attributes
        attributes = AttributeAssignmentMixin.clean_input(
            attributes, attributes_qs, is_variant=False
        )
        return attributes

    @classmethod
    def validate_bookable_products(cls, instance, cleaned_input):
        # Check bookable product conditions
        bookable = (
            instance.is_bookable if instance.pk else cleaned_input.get("is_bookable")
        )
        if bookable:
            bookable_resources = cleaned_input.get("bookable_resources")
            if not bookable_resources:
                raise ValidationError(
                    {
                        "bookable_resources": ValidationError(
                            "A bookable product must have at least "
                            "one bookable resource.",
                            code=ProductErrorCode.REQUIRED.value,
                        )
                    }
                )
            duration = cleaned_input.get("duration")
            if not duration:
                raise ValidationError(
                    {
                        "duration": ValidationError(
                            "A bookable product must have a duration in minutes.",
                            code=ProductErrorCode.REQUIRED.value,
                        )
                    }
                )
            if duration and duration % 15 != 0:
                raise ValidationError(
                    {
                        "duration": ValidationError(
                            "duration field must be a mutiple of 15 in minutes.",
                            code=ProductErrorCode.INVALID.value,
                        )
                    }
                )

    @classmethod
    def validate_billable_products(cls, instance, cleaned_input):
        # Check billable product conditions
        billable = (
            instance.is_billable if instance.pk else cleaned_input.get("is_billable")
        )
        payment_methods = cleaned_input.get("payment_methods")
        if billable and not payment_methods:
            raise ValidationError(
                {
                    "payment_methods": ValidationError(
                        "A billable product must have at least one payment method.",
                        code=ProductErrorCode.REQUIRED.value,
                    )
                }
            )

    @classmethod
    def validate_url(cls, url):
        validate_url = URLValidator()
        if url:
            try:
                validate_url(url)
            except ValidationError as error:
                raise ValidationError(
                    {
                        "url": ValidationError(
                            "Invalid URL format.",
                            code=ProductErrorCode.INVALID_URL.value,
                        )
                    }
                )

    @classmethod
    def validate_has_no_price(cls, has_no_price, is_billable):
        if has_no_price and is_billable:
            raise ValidationError(
                {
                    "has_no_price": ValidationError(
                        "A billable product cannot have no price.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )

    @classmethod
    def check_ownership_product(cls, _root, info, **data):
        requestor = get_user_or_app_from_context(info.context)

        id_company = data["company"]
        company = cls.get_node_or_error(info, id_company, only_type=CompanyType)

        if not requestor.is_company_manager(company.id):
            raise PermissionDenied()

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)

        description = cleaned_input.get("description")
        details = cleaned_input.get("details")
        no_has_price = cleaned_input.get("has_no_price", False)
        is_billable = cleaned_input.get("is_billable", False)
        cleaned_input["description_plaintext"] = (
            clean_editor_js(description, to_string=True) if description else ""
        )
        cleaned_input["details_plaintext"] = (
            clean_editor_js(details, to_string=True) if details else ""
        )

        weight = cleaned_input.get("weight")
        if weight and weight.value < 0:
            raise ValidationError(
                {
                    "weight": ValidationError(
                        "Product can't have negative weight.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )
        cls.validate_has_no_price(no_has_price, is_billable)
        cls.validate_url(cleaned_input.get("url", None));
        cls.check_ownership_product(cls, info, **data)
        cls.validate_billable_products(instance, cleaned_input)
        cls.validate_bookable_products(instance, cleaned_input)

        # Attributes are provided as list of `AttributeValueInput` objects.
        # We need to transform them into the format they're stored in the
        # `Product` model, which is HStore field that maps attribute's PK to
        # the value's PK.

        attributes = cleaned_input.get("attributes")

        if cleaned_input.get("product_type"):
            product_type = cleaned_input.get("product_type")
        else:
            if instance.pk:
                product_type = instance.product_type
            else:
                tuple = models.ProductType.objects.get_or_create(
                    slug="simple",
                    defaults={
                        "name": "Simple",
                        "has_variants": False,
                        "is_shipping_required": False,
                        "is_digital": True,
                    },
                )
                product_type = tuple[0]
        instance.product_type = product_type

        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = ProductErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})

        if "tax_code" in cleaned_input:
            info.context.plugins.assign_tax_code_to_object_meta(
                instance, cleaned_input["tax_code"]
            )

        if attributes and product_type:
            try:
                cleaned_input["attributes"] = cls.clean_attributes(
                    attributes, product_type
                )
            except ValidationError as exc:
                raise ValidationError({"attributes": exc})

        clean_seo_fields(cleaned_input)
        return cleaned_input

    @classmethod
    def create_product_address(cls, instance, data):
        address = data.get("address")
        # If Address is sent, we add it into the new service
        if address:
            latitude = address.pop("latitude", None)
            longitude = address.pop("longitude", None)
            if latitude and longitude:
                location_point = Point(latitude, longitude, srid=4326)
                address["location_point"] = location_point
            models.ProductAddress.objects.create(product=instance, **address)
        # If not, we assign it the company address by default
        elif instance.company.address:
            address = {}
            address["street"] = instance.company.address.street
            address["street_second_line"] = instance.company.address.street_second_line
            address["postal_code"] = instance.company.address.postal_code
            address["locality"] = instance.company.address.locality
            address["region"] = instance.company.address.region
            address["country"] = instance.company.address.country
            if instance.company.address.location_point:
                address["location_point"] = instance.company.address.location_point
            models.ProductAddress.objects.create(product=instance, **address)

    @classmethod
    def create_purchase_email(cls, instance, data):
        email_purchase = data.get("purchase_email")
        # If purchase email is sent, we add it into the new service
        if email_purchase:
            models.PurchaseEmail.objects.create(product=instance, **email_purchase)

    @classmethod
    def get_instance(cls, info, **data):
        """Prefetch related fields that are needed to process the mutation."""
        # If we are updating an instance and want to update its attributes,
        # prefetch them.

        object_id = data.get("id")
        if object_id and data.get("attributes"):
            # Prefetches needed by AttributeAssignmentMixin and
            # associate_attribute_values_to_instance
            qs = cls.Meta.model.objects.prefetch_related(
                "product_type__product_attributes__values",
                "product_type__attributeproduct",
                "product_address",
            )
            return cls.get_node_or_error(info, object_id, only_type="Product", qs=qs)

        return super().get_instance(info, **data)

    @classmethod
    @traced_atomic_transaction()
    def save(cls, info, instance, cleaned_input):
        instance.save()
        cls.add_keyword_to_product(instance, cleaned_input)
        cls.create_product_address(instance, cleaned_input)
        cls.create_purchase_email(instance, cleaned_input)
        attributes = cleaned_input.get("attributes")
        if attributes:
            AttributeAssignmentMixin.save(instance, attributes)

    @classmethod
    def _save_m2m(cls, info, instance, cleaned_data):
        collections = cleaned_data.get("collections", None)
        if collections is not None:
            instance.collections.set(collections)
        categories = cleaned_data.get("categories", None)
        if categories is not None:
            instance.categories.set(categories)
        payment_methods = cleaned_data.get("payment_methods", None)
        if payment_methods is not None:
            instance.payment_methods.set(payment_methods)
        bookable_resources = cleaned_data.get("bookable_resources")
        if bookable_resources is not None:
            instance.bookable_resources.set(bookable_resources)

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        info.context.plugins.product_created(instance)

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        response = super().perform_mutation(_root, info, **data)
        product = getattr(response, cls._meta.return_field_name)

        # Wrap product instance with ChannelContext in response
        setattr(
            response,
            cls._meta.return_field_name,
            ChannelContext(node=product, channel_slug=None),
        )
        return response

    @classmethod
    def add_keyword_to_product(cls, product, cleaned_input):
        seo_keywords = cleaned_input.get("seo_keywords", False)

        if seo_keywords:
            for keyword in seo_keywords:
                keyword_obj = Keyword.objects.get_or_create(name_keyword=keyword)
                product.keywords.add(keyword_obj[0])


class ProductUpdate(ProductCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product to update.")
        input = ProductInput(
            required=True, description="Fields required to update a product."
        )

    class Meta:
        description = "Updates an existing product."
        model = models.Product
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    @traced_atomic_transaction()
    def save(cls, info, instance, cleaned_input):
        cls.validate_url(cleaned_input.get("url", None))
        instance.save()
        cls.update_keyword_to_product(instance, cleaned_input)
        cls.update_product_address(instance, cleaned_input)
        cls.update_purchase_email(instance, cleaned_input)
        cls.update_category(instance, cleaned_input)
        attributes = cleaned_input.get("attributes")
        if attributes:
            AttributeAssignmentMixin.save(instance, attributes)

    @classmethod
    def check_ownership_product(cls, _root, info, **data):
        pass

    @classmethod
    def update_keyword_to_product(cls, product, cleaned_input):
        seo_keywords = cleaned_input.get("seo_keywords", False)

        # Remove all keywords from product if seo_keywords is empty but not None
        if not bool(seo_keywords) and type(seo_keywords) is list:
            product.keywords.clear()

        if seo_keywords:
            product.keywords.clear()
            for keyword in seo_keywords:
                keyword_obj = Keyword.objects.get_or_create(name_keyword=keyword)
                product.keywords.add(keyword_obj[0])

    @classmethod
    def update_product_address(cls, instance, data):
        address = data.get("address")
        # If Address is sent, we add it into the new service
        if address:
            latitude = address.pop("latitude", None)
            longitude = address.pop("longitude", None)
            if latitude and longitude:
                location_point = Point(latitude, longitude, srid=4326)
                address["location_point"] = location_point
            models.ProductAddress.objects.filter(product=instance).update(
                **data["address"]
            )

    @classmethod
    def update_purchase_email(cls, instance, data):
        email_purchase = data.get("purchase_email")
        if "purchase_email" in data.keys():
            cls.validate_purchase_email(instance, email_purchase)
            if email_purchase is None:
                models.PurchaseEmail.objects.filter(product=instance).delete()
            elif models.PurchaseEmail.objects.filter(product=instance).exists():
                data["purchase_email"]["product"] = instance
                models.PurchaseEmail.objects.filter(product=instance).update(
                    subject=email_purchase.subject,
                    title=email_purchase.title,
                    content=email_purchase.content,
                )
            else:
                data["purchase_email"]["product"] = instance
                models.PurchaseEmail.objects.create(**data["purchase_email"])

    @classmethod
    def validate_purchase_email(cls, instance, email_purchase):
        if email_purchase is not None:
            subject = email_purchase["subject"]
            title = email_purchase["title"]
            content = email_purchase["content"]
            if not subject:
                raise ValidationError(
                    {
                        "subject": ValidationError(
                            "Email subject is cannot be blank.",
                            code=ProductErrorCode.REQUIRED.value,
                        )
                    }
                )
            if not title:
                raise ValidationError(
                    {
                        "title": ValidationError(
                            "Email title is cannot be blank.",
                            code=ProductErrorCode.REQUIRED.value,
                        )
                    }
                )
            if not content:
                raise ValidationError(
                    {
                        "content": ValidationError(
                            "Email content is cannot be blank.",
                            code=ProductErrorCode.REQUIRED.value,
                        )
                    }
                )
            if len(subject) > 65:
                raise ValidationError(
                    {
                        "subject": ValidationError(
                            "Max 65 characters for subject.",
                            code=ProductErrorCode.INVALID.value,
                        )
                    }
                )
            if len(title) > 65:
                raise ValidationError(
                    {
                        "title": ValidationError(
                            "Max 65 characters for title.",
                            code=ProductErrorCode.INVALID.value,
                        )
                    }
                )

    @classmethod
    def validate_bookable_products(cls, instance, cleaned_input):
        duration = cleaned_input.get("duration")
        if duration and duration % 15 != 0:
            raise ValidationError(
                {
                    "duration": ValidationError(
                        "duration field must be a mutiple of 15 in minutes.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )

    @classmethod
    def validate_billable_products(cls, instance, cleaned_input):
        payment_methods = cleaned_input.get("payment_methods")
        if payment_methods:
            card_method = PaymentMethod.objects.filter(name="Card").get()
            if (
                card_method in payment_methods
                and not instance.company.stripe_credentials.is_enabled
            ):
                raise ValidationError(
                    {
                        "payment_methods": ValidationError(
                            "You have to enable Stripe\
                                 to enable the card payment method.",
                            code=ProductErrorCode.INVALID.value,
                        )
                    }
                )

    @classmethod
    def validate_url(cls, url):
        validate_url = URLValidator()
        if url:
            try:
                validate_url(url)
            except ValidationError as error:
                raise ValidationError(
                    {
                        "url": ValidationError(
                            "Invalid URL format.",
                            code=ProductErrorCode.INVALID_URL.value,
                        )
                    }
                )

    @classmethod
    def update_category(cls, product, cleaned_input):
        if not product.category and len(cleaned_input.get("categories")) > 0:
            product.category = cleaned_input.get("categories")[0]
            product.save()

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        info.context.plugins.product_updated(instance)


class ProductDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product to delete.")

    class Meta:
        description = "Deletes a product."
        model = models.Product
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def success_response(cls, instance):
        instance = ChannelContext(node=instance, channel_slug=None)
        return super().success_response(instance)

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, **data):
        node_id = data.get("id")

        instance = cls.get_node_or_error(info, node_id, only_type=Product)
        variants_id = list(instance.variants.all().values_list("id", flat=True))

        cls.delete_assigned_attribute_values(instance)

        draft_order_lines_data = get_draft_order_lines_data_for_variants(variants_id)

        response = super().perform_mutation(_root, info, **data)

        # delete order lines for deleted variant
        order_models.OrderLine.objects.filter(
            pk__in=draft_order_lines_data.line_pks
        ).delete()

        # run order event for deleted lines
        for order, order_lines in draft_order_lines_data.order_to_lines_mapping.items():
            lines_data = [(line.quantity, line) for line in order_lines]
            order_events.order_line_product_removed_event(
                order, info.context.user, info.context.app, lines_data
            )

        order_pks = draft_order_lines_data.order_pks
        if order_pks:
            recalculate_orders_task.delay(list(order_pks))
        info.context.plugins.product_deleted(instance, variants_id)

        return response

    @staticmethod
    def delete_assigned_attribute_values(instance):
        attribute_models.AttributeValue.objects.filter(
            productassignments__product_id=instance.id,
            attribute__input_type__in=AttributeInputType.TYPES_WITH_UNIQUE_VALUES,
        ).delete()


class ProductVariantInput(graphene.InputObjectType):
    attributes = graphene.List(
        graphene.NonNull(AttributeValueInput),
        required=False,
        description="List of attributes specific to this variant.",
    )
    sku = graphene.String(description="Stock keeping unit.")
    track_inventory = graphene.Boolean(
        description=(
            "Determines if the inventory of this variant should be tracked. If false, "
            "the quantity won't change when customers buy this item."
        )
    )
    weight = WeightScalar(description="Weight of the Product Variant.", required=False)


class ProductVariantCreateInput(ProductVariantInput):
    attributes = graphene.List(
        graphene.NonNull(AttributeValueInput),
        required=True,
        description="List of attributes specific to this variant.",
    )
    product = graphene.ID(
        description="Product ID of which type is the variant.",
        name="product",
        required=True,
    )
    stocks = graphene.List(
        graphene.NonNull(StockInput),
        description=("Stocks of a product available for sale."),
        required=False,
    )


class ProductVariantCreate(ModelMutation):
    class Arguments:
        input = ProductVariantCreateInput(
            required=True, description="Fields required to create a product variant."
        )

    class Meta:
        description = "Creates a new variant for a product."
        model = models.ProductVariant
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"
        errors_mapping = {"price_amount": "price"}

    @classmethod
    def check_number_of_variants(cls, info, data):
        product = cls.get_node_or_error(info, data["product"], only_type=Product)

        if product.variants.count() > 0:
            raise ValidationError(
                {
                    "product": ValidationError(
                        "Product can only have one variant.",
                        code=ProductErrorCode.ONLY_ONE_VARIANT,
                    )
                }
            )

    @classmethod
    def clean_attributes(
        cls, attributes: dict, product_type: models.ProductType
    ) -> T_INPUT_MAP:
        attributes_qs = product_type.variant_attributes
        attributes = AttributeAssignmentMixin.clean_input(
            attributes, attributes_qs, is_variant=True
        )
        return attributes

    @classmethod
    def validate_duplicated_attribute_values(
        cls, attributes_data, used_attribute_values, instance=None
    ):
        attribute_values = defaultdict(list)
        for attr, attr_data in attributes_data:
            if attr.input_type == AttributeInputType.FILE:
                values = (
                    [slugify(attr_data.file_url.split("/")[-1])]
                    if attr_data.file_url
                    else []
                )
            else:
                values = attr_data.values
            attribute_values[attr_data.global_id].extend(values)
        if attribute_values in used_attribute_values:
            raise ValidationError(
                "Duplicated attribute values for product variant.",
                code=ProductErrorCode.DUPLICATED_INPUT_ITEM.value,
                params={"attributes": attribute_values.keys()},
            )
        else:
            used_attribute_values.append(attribute_values)

    @classmethod
    def clean_input(
        cls, info, instance: models.ProductVariant, data: dict, input_cls=None
    ):
        cls.check_number_of_variants(info, data)
        cleaned_input = super().clean_input(info, instance, data)

        weight = cleaned_input.get("weight")
        if weight and weight.value < 0:
            raise ValidationError(
                {
                    "weight": ValidationError(
                        "Product variant can't have negative weight.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )

        stocks = cleaned_input.get("stocks")
        if stocks:
            cls.check_for_duplicates_in_stocks(stocks)

        if instance.pk:
            # If the variant is getting updated,
            # simply retrieve the associated product type
            product_type = instance.product.product_type
            used_attribute_values = get_used_variants_attribute_values(instance.product)
        else:
            # If the variant is getting created, no product type is associated yet,
            # retrieve it from the required "product" input field
            product_type = cleaned_input["product"].product_type
            used_attribute_values = get_used_variants_attribute_values(
                cleaned_input["product"]
            )

        # Run the validation only if product type is configurable
        if product_type.has_variants:
            # Attributes are provided as list of `AttributeValueInput` objects.
            # We need to transform them into the format they're stored in the
            # `Product` model, which is HStore field that maps attribute's PK to
            # the value's PK.
            attributes = cleaned_input.get("attributes")
            try:
                if attributes:
                    cleaned_attributes = cls.clean_attributes(attributes, product_type)
                    cls.validate_duplicated_attribute_values(
                        cleaned_attributes, used_attribute_values, instance
                    )
                    cleaned_input["attributes"] = cleaned_attributes
                elif not instance.pk and not attributes:
                    # if attributes were not provided on creation
                    raise ValidationError(
                        "All attributes must take a value.",
                        ProductErrorCode.REQUIRED.value,
                    )
            except ValidationError as exc:
                raise ValidationError({"attributes": exc})

        return cleaned_input

    @classmethod
    def check_for_duplicates_in_stocks(cls, stocks_data):
        warehouse_ids = [stock["warehouse"] for stock in stocks_data]
        duplicates = get_duplicated_values(warehouse_ids)
        if duplicates:
            error_msg = "Duplicated warehouse ID: {}".format(", ".join(duplicates))
            raise ValidationError(
                {
                    "stocks": ValidationError(
                        error_msg, code=ProductErrorCode.UNIQUE.value
                    )
                }
            )

    @classmethod
    def get_instance(cls, info, **data):
        """Prefetch related fields that are needed to process the mutation.

        If we are updating an instance and want to update its attributes,
        # prefetch them.
        """

        object_id = data.get("id")
        if object_id and data.get("attributes"):
            # Prefetches needed by AttributeAssignmentMixin and
            # associate_attribute_values_to_instance
            qs = cls.Meta.model.objects.prefetch_related(
                "product__product_type__variant_attributes__values",
                "product__product_type__attributevariant",
            )
            return cls.get_node_or_error(
                info, object_id, only_type="ProductVariant", qs=qs
            )

        return super().get_instance(info, **data)

    @classmethod
    @traced_atomic_transaction()
    def save(cls, info, instance, cleaned_input):
        if not instance.product.product_type.has_variants:
            instance.name = instance.product.name
        instance.save()
        if not instance.product.default_variant:
            instance.product.default_variant = instance
            instance.product.save(update_fields=["default_variant", "updated_at"])
        # Recalculate the "discounted price" for the parent product
        update_product_discounted_price_task.delay(instance.product_id)
        stocks = cleaned_input.get("stocks")
        if stocks:
            cls.create_variant_stocks(instance, stocks)

        attributes = cleaned_input.get("attributes")
        if attributes:
            AttributeAssignmentMixin.save(instance, attributes)
            generate_and_set_variant_name(instance, cleaned_input.get("sku"))

    @classmethod
    def create_variant_stocks(cls, variant, stocks):
        warehouse_ids = [stock["warehouse"] for stock in stocks]
        warehouses = cls.get_nodes_or_error(
            warehouse_ids, "warehouse", only_type=Warehouse
        )
        create_stocks(variant, stocks, warehouses)

    @classmethod
    def success_response(cls, instance):
        instance = ChannelContext(node=instance, channel_slug=None)
        return super().success_response(instance)


class ProductVariantUpdate(ProductVariantCreate):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of a product variant to update."
        )
        input = ProductVariantInput(
            required=True, description="Fields required to update a product variant."
        )

    class Meta:
        description = "Updates an existing variant for product."
        model = models.ProductVariant
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"
        errors_mapping = {"price_amount": "price"}

    @classmethod
    def check_number_of_variants(cls, info, data):
        pass

    @classmethod
    def validate_duplicated_attribute_values(
        cls, attributes_data, used_attribute_values, instance=None
    ):
        # Check if the variant is getting updated,
        # and the assigned attributes do not change
        if instance.product_id is not None:
            assigned_attributes = get_used_attribute_values_for_variant(instance)
            input_attribute_values = defaultdict(list)
            for attr, attr_data in attributes_data:
                if attr.input_type == AttributeInputType.FILE:
                    values = (
                        [slugify(attr_data.file_url.split("/")[-1])]
                        if attr_data.file_url
                        else []
                    )
                else:
                    values = attr_data.values
                input_attribute_values[attr_data.global_id].extend(values)
            if input_attribute_values == assigned_attributes:
                return
        # if assigned attributes is getting updated run duplicated attribute validation
        super().validate_duplicated_attribute_values(
            attributes_data, used_attribute_values
        )


class ProductVariantDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of a product variant to delete."
        )

    class Meta:
        description = "Deletes a product variant."
        model = models.ProductVariant
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def success_response(cls, instance):
        # Update the "discounted_prices" of the parent product
        update_product_discounted_price_task.delay(instance.product_id)
        product = models.Product.objects.get(id=instance.product_id)
        # if the product default variant has been removed set the new one
        if not product.default_variant:
            product.default_variant = product.variants.first()
            product.save(update_fields=["default_variant"])
        instance = ChannelContext(node=instance, channel_slug=None)
        return super().success_response(instance)

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, **data):
        node_id = data.get("id")
        instance = cls.get_node_or_error(info, node_id, only_type=ProductVariant)

        draft_order_lines_data = get_draft_order_lines_data_for_variants([instance.pk])

        # Get cached variant with related fields to fully populate webhook payload.
        variant = (
            models.ProductVariant.objects.prefetch_related(
                "channel_listings", "attributes__values", "variant_media"
            )
        ).get(id=instance.id)

        cls.delete_assigned_attribute_values(variant)
        response = super().perform_mutation(_root, info, **data)

        # delete order lines for deleted variant
        order_models.OrderLine.objects.filter(
            pk__in=draft_order_lines_data.line_pks
        ).delete()

        # run order event for deleted lines
        for order, order_lines in draft_order_lines_data.order_to_lines_mapping.items():
            lines_data = [(line.quantity, line) for line in order_lines]
            order_events.order_line_variant_removed_event(
                order, info.context.user, info.context.app, lines_data
            )

        order_pks = draft_order_lines_data.order_pks
        if order_pks:
            recalculate_orders_task.delay(list(order_pks))

        transaction.on_commit(
            lambda: info.context.plugins.product_variant_deleted(variant)
        )

        return response

    @staticmethod
    def delete_assigned_attribute_values(instance):
        attribute_models.AttributeValue.objects.filter(
            variantassignments__variant_id=instance.id,
            attribute__input_type__in=AttributeInputType.TYPES_WITH_UNIQUE_VALUES,
        ).delete()


class ProductTypeInput(graphene.InputObjectType):
    name = graphene.String(description="Name of the product type.")
    slug = graphene.String(description="Product type slug.")
    has_variants = graphene.Boolean(
        description=(
            "Determines if product of this type has multiple variants. This option "
            "mainly simplifies product management in the dashboard. There is always at "
            "least one variant created under the hood."
        )
    )
    product_attributes = graphene.List(
        graphene.ID,
        description="List of attributes shared among all product variants.",
        name="productAttributes",
    )
    variant_attributes = graphene.List(
        graphene.ID,
        description=(
            "List of attributes used to distinguish between different variants of "
            "a product."
        ),
        name="variantAttributes",
    )
    is_shipping_required = graphene.Boolean(
        description="Determines if shipping is required for products of this variant."
    )
    is_digital = graphene.Boolean(
        description="Determines if products are digital.", required=False
    )
    weight = WeightScalar(description="Weight of the ProductType items.")
    tax_code = graphene.String(description="Tax rate for enabled tax gateway.")


class ProductTypeCreate(ModelMutation):
    class Arguments:
        input = ProductTypeInput(
            required=True, description="Fields required to create a product type."
        )

    class Meta:
        description = "Creates a new product type."
        model = models.ProductType
        permissions = (ProductTypePermissions.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)

        weight = cleaned_input.get("weight")
        if weight and weight.value < 0:
            raise ValidationError(
                {
                    "weight": ValidationError(
                        "Product type can't have negative weight.",
                        code=ProductErrorCode.INVALID,
                    )
                }
            )

        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = ProductErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})

        tax_code = cleaned_input.pop("tax_code", "")
        if tax_code:
            info.context.plugins.assign_tax_code_to_object_meta(instance, tax_code)

        cls.validate_attributes(cleaned_input)

        return cleaned_input

    @classmethod
    def validate_attributes(cls, cleaned_data):
        errors = {}
        for field in ["product_attributes", "variant_attributes"]:
            attributes = cleaned_data.get(field)
            if not attributes:
                continue
            not_valid_attributes = [
                graphene.Node.to_global_id("Attribute", attr.pk)
                for attr in attributes
                if attr.type != AttributeType.PRODUCT_TYPE
            ]
            if not_valid_attributes:
                errors[field] = ValidationError(
                    "Only Product type attributes are allowed.",
                    code=ProductErrorCode.INVALID.value,
                    params={"attributes": not_valid_attributes},
                )
        if errors:
            raise ValidationError(errors)

    @classmethod
    def _save_m2m(cls, info, instance, cleaned_data):
        super()._save_m2m(info, instance, cleaned_data)
        product_attributes = cleaned_data.get("product_attributes")
        variant_attributes = cleaned_data.get("variant_attributes")
        if product_attributes is not None:
            instance.product_attributes.set(product_attributes)
        if variant_attributes is not None:
            instance.variant_attributes.set(variant_attributes)


class ProductTypeUpdate(ProductTypeCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product type to update.")
        input = ProductTypeInput(
            required=True, description="Fields required to update a product type."
        )

    class Meta:
        description = "Updates an existing product type."
        model = models.ProductType
        permissions = (ProductTypePermissions.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def save(cls, info, instance, cleaned_input):
        variant_attr = cleaned_input.get("variant_attributes")
        if variant_attr:
            variant_attr = set(variant_attr)
            variant_attr_ids = [attr.pk for attr in variant_attr]
            update_variants_names.delay(instance.pk, variant_attr_ids)
        super().save(info, instance, cleaned_input)


class ProductTypeDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product type to delete.")

    class Meta:
        description = "Deletes a product type."
        model = models.ProductType
        permissions = (ProductTypePermissions.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, **data):
        node_id = data.get("id")
        product_type_pk = cls.get_global_id_or_error(
            node_id, only_type=ProductType, field="pk"
        )
        variants_pks = models.Product.objects.filter(
            product_type__pk=product_type_pk
        ).values_list("variants__pk", flat=True)
        # get draft order lines for products
        order_line_pks = list(
            order_models.OrderLine.objects.filter(
                variant__pk__in=variants_pks, order__status=OrderStatus.DRAFT
            ).values_list("pk", flat=True)
        )
        cls.delete_assigned_attribute_values(product_type_pk)

        response = super().perform_mutation(_root, info, **data)

        # delete order lines for deleted variants
        order_models.OrderLine.objects.filter(pk__in=order_line_pks).delete()

        return response

    @staticmethod
    def delete_assigned_attribute_values(instance_pk):
        attribute_models.AttributeValue.objects.filter(
            Q(attribute__input_type__in=AttributeInputType.TYPES_WITH_UNIQUE_VALUES)
            & (
                Q(productassignments__assignment__product_type_id=instance_pk)
                | Q(variantassignments__assignment__product_type_id=instance_pk)
            )
        ).delete()


class ProductMediaCreateInput(graphene.InputObjectType):
    alt = graphene.String(description="Alt text for a product media.")
    image = Upload(
        required=False, description="Represents an image file in a multipart request."
    )
    product = graphene.ID(
        required=True, description="ID of an product.", name="product"
    )
    media_url = graphene.String(
        required=False, description="Represents an URL to an external media."
    )


class ProductMediaCreate(BaseMutation):
    product = graphene.Field(Product)
    media = graphene.Field(ProductMedia)

    class Arguments:
        input = ProductMediaCreateInput(
            required=True, description="Fields required to create a product media."
        )

    class Meta:
        description = (
            "Create a media object (image or video URL) associated with product. "
            "For image, this mutation must be sent as a `multipart` request. "
            "More detailed specs of the upload format can be found here: "
            "https://github.com/jaydenseric/graphql-multipart-request-spec"
        )
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def validate_input(cls, data):
        image = data.get("image")
        media_url = data.get("media_url")

        if not image and not media_url:
            raise ValidationError(
                {
                    "input": ValidationError(
                        "Image or external URL is required.",
                        code=ProductErrorCode.REQUIRED,
                    )
                }
            )
        if image and media_url:
            raise ValidationError(
                {
                    "input": ValidationError(
                        "Either image or external URL is required.",
                        code=ProductErrorCode.DUPLICATED_INPUT_ITEM,
                    )
                }
            )

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        data = data.get("input")
        cls.validate_input(data)
        product = cls.get_node_or_error(
            info, data["product"], field="product", only_type=Product
        )

        alt = data.get("alt", "")
        image = data.get("image")
        media_url = data.get("media_url")
        if image:
            image_data = info.context.FILES.get(image)
            validate_image_file(image_data, "image", ProductErrorCode)
            add_hash_to_file_name(image_data)
            media = product.media.create(
                image=image_data, alt=alt, type=ProductMediaTypes.IMAGE
            )
            create_product_thumbnails.delay(media.pk)
        else:
            oembed_data, media_type = get_oembed_data(media_url, "media_url")
            media = product.media.create(
                external_url=oembed_data["url"],
                alt=oembed_data.get("title", alt),
                type=media_type,
                oembed_data=oembed_data,
            )
        # If product does not have variant we set it default image of product
        if not product.product_type.has_variants:
            if not product.default_variant.media.exists():
                product.default_variant.media.set([product.media.first()])
        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return ProductMediaCreate(product=product, media=media)


class ProductMediaUpdateInput(graphene.InputObjectType):
    alt = graphene.String(description="Alt text for a product media.")


class ProductMediaUpdate(BaseMutation):
    product = graphene.Field(Product)
    media = graphene.Field(ProductMedia)

    class Arguments:
        id = graphene.ID(required=True, description="ID of a product media to update.")
        input = ProductMediaUpdateInput(
            required=True, description="Fields required to update a product media."
        )

    class Meta:
        description = "Updates a product media."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        media = cls.get_node_or_error(info, data.get("id"), only_type=ProductMedia)
        product = media.product
        alt = data.get("input").get("alt")
        if alt is not None:
            media.alt = alt
            media.save(update_fields=["alt"])
        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return ProductMediaUpdate(product=product, media=media)


class ProductMediaReorder(BaseMutation):
    product = graphene.Field(Product)
    media = graphene.List(graphene.NonNull(ProductMedia))

    class Arguments:
        product_id = graphene.ID(
            required=True,
            description="ID of product that media order will be altered.",
        )
        media_ids = graphene.List(
            graphene.ID,
            required=True,
            description="IDs of a product media in the desired order.",
        )

    class Meta:
        description = "Changes ordering of the product media."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, product_id, media_ids):
        product = cls.get_node_or_error(
            info, product_id, field="product_id", only_type=Product
        )
        if len(media_ids) != product.media.count():
            raise ValidationError(
                {
                    "order": ValidationError(
                        "Incorrect number of media IDs provided.",
                        code=ProductErrorCode.INVALID,
                    )
                }
            )

        ordered_media = []
        for media_id in media_ids:
            media = cls.get_node_or_error(
                info, media_id, field="order", only_type=ProductMedia
            )
            if media and media.product != product:
                raise ValidationError(
                    {
                        "order": ValidationError(
                            "Media %(media_id)s does not belong to this product.",
                            code=ProductErrorCode.NOT_PRODUCTS_IMAGE,
                            params={"media_id": media_id},
                        )
                    }
                )
            ordered_media.append(media)

        for order, media in enumerate(ordered_media):
            media.sort_order = order
            media.save(update_fields=["sort_order"])

        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return ProductMediaReorder(product=product, media=ordered_media)


class ProductVariantSetDefault(BaseMutation):
    product = graphene.Field(Product)

    class Arguments:
        product_id = graphene.ID(
            required=True,
            description="Id of a product that will have the default variant set.",
        )
        variant_id = graphene.ID(
            required=True,
            description="Id of a variant that will be set as default.",
        )

    class Meta:
        description = (
            "Set default variant for a product. "
            "Mutation triggers PRODUCT_UPDATED webhook."
        )
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, product_id, variant_id):
        qs = models.Product.objects.prefetched_for_webhook()
        product = cls.get_node_or_error(
            info, product_id, field="product_id", only_type=Product, qs=qs
        )
        variant = cls.get_node_or_error(
            info,
            variant_id,
            field="variant_id",
            only_type=ProductVariant,
            qs=models.ProductVariant.objects.select_related("product"),
        )
        if variant.product != product:
            raise ValidationError(
                {
                    "variant_id": ValidationError(
                        "Provided variant doesn't belong to provided product.",
                        code=ProductErrorCode.NOT_PRODUCTS_VARIANT,
                    )
                }
            )
        product.default_variant = variant
        product.save(update_fields=["default_variant", "updated_at"])
        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return ProductVariantSetDefault(product=product)


class ProductVariantReorder(BaseMutation):
    product = graphene.Field(Product)

    class Arguments:
        product_id = graphene.ID(
            required=True,
            description="Id of product that variants order will be altered.",
        )
        moves = graphene.List(
            ReorderInput,
            required=True,
            description="The list of variant reordering operations.",
        )

    class Meta:
        description = (
            "Reorder the variants of a product. "
            "Mutation updates updated_at on product and "
            "triggers PRODUCT_UPDATED webhook."
        )
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, product_id, moves):
        pk = cls.get_global_id_or_error(product_id, only_type=Product)

        try:
            product = models.Product.objects.prefetched_for_webhook().get(pk=pk)
        except ObjectDoesNotExist:
            raise ValidationError(
                {
                    "product_id": ValidationError(
                        (f"Couldn't resolve to a product type: {product_id}"),
                        code=ProductErrorCode.NOT_FOUND,
                    )
                }
            )

        variants_m2m = product.variants
        operations = {}

        for move_info in moves:
            variant_pk = cls.get_global_id_or_error(
                move_info.id, only_type=ProductVariant, field="moves"
            )

            try:
                m2m_info = variants_m2m.get(id=int(variant_pk))
            except ObjectDoesNotExist:
                raise ValidationError(
                    {
                        "moves": ValidationError(
                            f"Couldn't resolve to a variant: {move_info.id}",
                            code=ProductErrorCode.NOT_FOUND,
                        )
                    }
                )
            operations[m2m_info.pk] = move_info.sort_order

        with traced_atomic_transaction():
            perform_reordering(variants_m2m, operations)

        product.save(update_fields=["updated_at"])
        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return ProductVariantReorder(product=product)


class ProductMediaDelete(BaseMutation):
    product = graphene.Field(Product)
    media = graphene.Field(ProductMedia)

    class Arguments:
        id = graphene.ID(required=True, description="ID of a product media to delete.")

    class Meta:
        description = "Deletes a product media."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        media_obj = cls.get_node_or_error(info, data.get("id"), only_type=ProductMedia)
        media_id = media_obj.id
        media_obj.delete()
        media_obj.id = media_id
        product = media_obj.product
        # If product does not have variant we set it default image of product
        if not product.product_type.has_variants:
            if media := product.media.first() is not None:
                product.default_variant.media.set([media])
        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return ProductMediaDelete(product=product, media=media_obj)


class VariantMediaAssign(BaseMutation):
    product_variant = graphene.Field(ProductVariant)
    media = graphene.Field(ProductMedia)

    class Arguments:
        media_id = graphene.ID(
            required=True, description="ID of a product media to assign to a variant."
        )
        variant_id = graphene.ID(required=True, description="ID of a product variant.")

    class Meta:
        description = "Assign an media to a product variant."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, media_id, variant_id):
        media = cls.get_node_or_error(
            info, media_id, field="media_id", only_type=ProductMedia
        )
        qs = models.ProductVariant.objects.prefetched_for_webhook()
        variant = cls.get_node_or_error(
            info, variant_id, field="variant_id", only_type=ProductVariant, qs=qs
        )
        if media and variant:
            # check if the given image and variant can be matched together
            media_belongs_to_product = variant.product.media.filter(pk=media.pk).first()
            if media_belongs_to_product:
                media.variant_media.create(variant=variant)
            else:
                raise ValidationError(
                    {
                        "media_id": ValidationError(
                            "This media doesn't belong to that product.",
                            code=ProductErrorCode.NOT_PRODUCTS_IMAGE,
                        )
                    }
                )
        variant = ChannelContext(node=variant, channel_slug=None)
        transaction.on_commit(
            lambda: info.context.plugins.product_variant_updated(variant.node)
        )
        return VariantMediaAssign(product_variant=variant, media=media)


class VariantMediaUnassign(BaseMutation):
    product_variant = graphene.Field(ProductVariant)
    media = graphene.Field(ProductMedia)

    class Arguments:
        media_id = graphene.ID(
            required=True,
            description="ID of a product media to unassign from a variant.",
        )
        variant_id = graphene.ID(required=True, description="ID of a product variant.")

    class Meta:
        description = "Unassign an media from a product variant."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, media_id, variant_id):
        media = cls.get_node_or_error(
            info, media_id, field="image_id", only_type=ProductMedia
        )
        qs = models.ProductVariant.objects.prefetched_for_webhook()
        variant = cls.get_node_or_error(
            info, variant_id, field="variant_id", only_type=ProductVariant, qs=qs
        )

        try:
            variant_media = models.VariantMedia.objects.get(
                media=media, variant=variant
            )
        except models.VariantMedia.DoesNotExist:
            raise ValidationError(
                {
                    "media_id": ValidationError(
                        "Media is not assigned to this variant.",
                        code=ProductErrorCode.NOT_PRODUCTS_IMAGE,
                    )
                }
            )
        else:
            variant_media.delete()

        variant = ChannelContext(node=variant, channel_slug=None)
        transaction.on_commit(
            lambda: info.context.plugins.product_variant_updated(variant.node)
        )
        return VariantMediaUnassign(product_variant=variant, media=media)


class ProductEnable(BaseMutation):
    product = graphene.Field(Product)

    class Arguments:
        id = graphene.ID(
            required=True,
            description="ID of a product to enable.",
        )
        channel = graphene.String(
            required=True, description="Slug of channel assigned to the product."
        )

    class Meta:
        description = "Enable a product."
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def perform_mutation(cls, _root, info, id, channel):
        _, product_id = from_global_id_or_error(id, "Product", raise_error=True)
        if not is_product_owner_or_can_manage_products(info.context.user, product_id):
            raise PermissionDenied()

        try:
            product_channel = models.ProductChannelListing.objects.get(
                product_id=product_id, channel__slug=channel
            )
        except models.ProductChannelListing.DoesNotExist:
            raise ValidationError(
                {
                    "channel": ValidationError(
                        f"Channel {channel} is not assigned to"
                        " this product or not exists.",
                        code=ProductErrorCode.NOT_FOUND,
                    )
                }
            )
        product_channel.is_published = True
        product_channel.save(update_fields=["is_published"])
        product = ChannelContext(node=product_channel.product, channel_slug=None)
        return cls(product=product)


class ProductDisable(BaseMutation):
    product = graphene.Field(Product)

    class Arguments:
        id = graphene.ID(
            required=True,
            description="ID of a product to disable.",
        )
        channel = graphene.String(
            required=True, description="Slug of channel assigned to the product."
        )

    class Meta:
        description = "Disable a product."
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def perform_mutation(cls, _root, info, id, channel):
        _, product_id = from_global_id_or_error(id, "Product", raise_error=True)

        if not is_product_owner_or_can_manage_products(info.context.user, product_id):
            raise PermissionDenied()

        try:
            product_channel = models.ProductChannelListing.objects.get(
                product_id=product_id, channel__slug=channel
            )
        except models.ProductChannelListing.DoesNotExist:
            raise ValidationError(
                {
                    "channel": ValidationError(
                        f"Channel {channel} is not assigned"
                        " to this product or not exists.",
                        code=ProductErrorCode.NOT_FOUND,
                    )
                }
            )
        product_channel.is_published = False
        product_channel.save(update_fields=["is_published"])
        product = ChannelContext(node=product_channel.product, channel_slug=None)
        return cls(product=product)


class FraudulentProductReportCreateInput(graphene.InputObjectType):
    product = graphene.ID(
        description="Product wich will be reported.",
        name="product",
        required=True,
    )
    reason = graphene.String(
        description="Reason of the report.",
        required=True,
    )
    phone = graphene.String(
        description="Phone of the user who report the product.",
        required=True,
    )
    image = Upload(
        required=False, description="Represents an file in a multipart request."
    )


class FraudulentProductReportCreate(ModelMutation):
    class Arguments:
        input = FraudulentProductReportCreateInput(
            required=True, description="Fields required to create a product report."
        )

    class Meta:
        description = "Report a fraudulent product."
        model = models.FraudulentProductReport
        permission_group = ProductPermissions.MANAGE_PRODUCTS
        error_type_class = ReportError
        error_type_field = "report_error"

    @classmethod
    def clean_input(cls, info, instance, data):
        requestor = get_user_or_app_from_context(info.context)
        cleaned_input = super().clean_input(info, instance, data)
        cleaned_input["user"] = requestor
        return cleaned_input

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        if not info.context.user.is_authenticated:
            raise PermissionDenied

        # Get images from the petition (Max 5 images)
        images = info.context.FILES.values()
        if len(data["input"]["image"]) > 5:
            raise ValidationError(
                {
                    "image": ValidationError(
                        "You can upload 5 images max.", code="too_much_images"
                    )
                }
            )
        data["input"].pop("image")
        instance = super().perform_mutation(_root, info, **data)
        fraudulent_product_report = getattr(instance, cls._meta.return_field_name)

        # Uplaod and link every image
        images_email = []
        for image in images:
            new_image = models.FraudulentProductReportMedia(
                fraudulent_product_report=fraudulent_product_report,
                image=image,
                alt="Report image: " + image.name,
            )
            new_image.save()
            images_email.append(new_image.image.url)

        # Send a message to all administrators
        notifications.send_fraudulent_product_report_notification(
            info.context.plugins, fraudulent_product_report, images_email
        )
        return instance


class ProductRatingInput(graphene.InputObjectType):
    product = graphene.ID(
        description="ID of a product to rate.",
        required=True,
    )
    rating = graphene.Float(
        description="User rating valued from 0 to 5.",
        required=True,
    )
    comment = graphene.String(
        description="User comment related to product",
        required=False,
    )


class ProductRatingCreate(ModelMutation):
    product = graphene.Field(Product, description="Product with review included.")
    review = graphene.Field(ProductRating, description="A newly created review.")

    class Arguments:
        input = ProductRatingInput(
            description="Fields required to create a product rating.",
            required=True,
        )

    class Meta:
        description = "Creates a new rating for product"
        model = models.ProductRating
        return_field_name = "review"
        error_type_class = RatingError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        cleaned_input["user"] = info.context.user
        return cleaned_input

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        user = info.context.user
        product = data["input"].get("product")
        _, product_id = from_global_id_or_error(product, Product, raise_error=True)
        if hasattr(user, "product_ratings"):
            if user.product_ratings.filter(product__id=product_id).exists():
                raise ValidationError(
                    {
                        "product": ValidationError(
                            "This product has already been rated by you.",
                            code=ProductErrorCode.INVALID,
                        )
                    }
                )
        response = super().perform_mutation(_root, info, **data)
        instance = response.review
        product = ChannelContext(node=instance.product, channel_slug=None)
        return cls(review=instance, product=product)

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        """Perform an action after saving an object and its m2m."""
        instance.product.calcule_rating()

    @classmethod
    @traced_atomic_transaction()
    def save(cls, info, instance, cleaned_input):
        user = info.context.user
        if not user.product_consumed(instance.product):
            raise PermissionDenied("You must first consume this product to rate it.")
        instance.save()


class ProductRatingDelete(ModelDeleteMutation):
    product = graphene.Field(Product, description="Product with without review.")
    review = graphene.Field(ProductRating, description="A newly deleted review.")

    class Arguments:
        id = graphene.ID(
            description="ID of a product rating to delete.",
            required=True,
        )

    class Meta:
        description = "Creates a new rating for product"
        model = models.ProductRating
        return_field_name = "review"
        error_type_class = RatingError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, **data):
        """Perform a mutation that deletes a model instance."""
        if not cls.check_permissions(info.context):
            raise PermissionDenied()

        node_id = data.get("id")
        model_type = cls.get_type_for_model()
        instance = cls.get_node_or_error(info, node_id, only_type=model_type)
        product_instance = instance.product

        # Check if the review is created by current user and if current user has the MANAGE_PRODUCTS permision.
        if info.context.user != instance.user and not info.context.user.has_perms([ProductPermissions.MANAGE_PRODUCTS]):    
            raise PermissionDenied()

        if instance:
            cls.clean_instance(info, instance)

        db_id = instance.id
        instance.delete()

        # After the instance is deleted, set its ID to the original database's
        # ID so that the success response contains ID of the deleted object.
        instance.id = db_id
        cls.post_delete_action(product_instance)
        product = ChannelContext(node=product_instance, channel_slug=None)
        return cls(review=instance, product=product)
        user_reporter = get
        print(user_reporter)
    @classmethod
    def post_delete_action(cls, product):
        """Perform an action after delete an object."""
        product.calcule_rating()

class ProductReviewReportInput(graphene.InputObjectType): 
    review_id = graphene.ID(
        description="ID of a product rating reported.",
        required=True,
    )
    reasons = graphene.List(graphene.String, required=True)
    
class ProductReviewReport(ModelMutation):
    success = graphene.Boolean()
    class Arguments:
        input = ProductReviewReportInput(required=True) 

    class Meta:
        description = "Send an email when an user report a review."
        model = models.ProductRating
        permission_group = ProductPermissions.MANAGE_PRODUCTS
        error_type_class = ReportError
        error_type_field = "report_error"    

    @classmethod
    def perform_mutation(cls, root, info, input):  
        reasons = input["reasons"]
        reporter_user = info.context.user        

        # Geting review information from the Id
        node_id = input["review_id"]
        model_type = cls.get_type_for_model()
        reported_review = cls.get_node_or_error(info, node_id, only_type=model_type)

        reported_info = {
            "reported_review": reported_review,
            "reporter_user": reporter_user,
            "reasons": reasons
        }
        # Send a message to all administrators with manage_product permission
        notifications.send_product_review_report(
            info.context.plugins, reported_info
        )
        
        return ProductReviewReport(success=True)