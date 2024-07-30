import datetime
from typing import TYPE_CHECKING, Iterable, Optional, Union
from uuid import uuid4

from django.conf import settings
from django.contrib.gis.db import models as models_geo
from django.contrib.postgres.aggregates import StringAgg
from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import JSONField  # type: ignore
from django.db.models import (
    Avg,
    BooleanField,
    Case,
    Count,
    DateField,
    Exists,
    ExpressionWrapper,
    F,
    FilteredRelation,
    OuterRef,
    Q,
    Subquery,
    Sum,
    TextField,
    Value,
    When,
)
from django.db.models.functions import Coalesce
from django.urls import reverse
from django.utils import timezone
from django.utils.encoding import smart_text
from django.utils.timezone import get_current_timezone
from django_countries.fields import CountryField
from django_measurement.models import MeasurementField
from django_prices.models import MoneyField
from measurement.measures import Weight
from mptt.managers import TreeManager
from mptt.models import MPTTModel
from phonenumber_field.modelfields import PhoneNumberField
from versatileimagefield.fields import PPOIField, VersatileImageField

from ..account.models import User
from ..account.utils import requestor_is_seller, requestor_is_staff_member_or_app
from ..account.validators import validate_possible_number
from ..channel.models import Channel
from ..company.models import Company
from ..core.db.fields import SanitizedJSONField
from ..core.models import ModelWithMetadata, PublishableModel, SortableModel
from ..core.permissions import (
    CategoryPermissions,
    CollectionPermissions,
    DiscountPermissions,
    OrderPermissions,
    ProductPermissions,
    ProductTypePermissions,
    StatPermissions,
    has_one_of_permissions_as_staff,
)
from ..core.units import WeightUnits
from ..core.utils import (
    build_absolute_uri,
    convert_time_to_timedelta,
    convert_timedelta_to_time,
)
from ..core.utils.draftjs import json_content_to_raw_text
from ..core.utils.editorjs import clean_editor_js
from ..core.utils.translations import Translation, TranslationProxy
from ..core.weight import zero_weight
from ..discount import DiscountInfo
from ..discount.utils import calculate_discounted_price
from ..payment.models import PaymentMethod
from ..seo.models import SeoModel, SeoModelTranslation
from . import BookableResourceDay, BookingStatus, ProductMediaTypes

if TYPE_CHECKING:
    # flake8: noqa
    from django.db.models import OrderBy
    from prices import Money

    from ..app.models import App

ALL_PRODUCTS_PERMISSIONS = [
    # List of permissions, where each of them allows viewing all products
    # (including unpublished).
    OrderPermissions.MANAGE_ORDERS,
    DiscountPermissions.MANAGE_DISCOUNTS,
    ProductPermissions.MANAGE_PRODUCTS,
    StatPermissions.MANAGE_PRODUCT_STATS,
    CategoryPermissions.MANAGE_CATEGORIES,
    CollectionPermissions.MANAGE_COLLECTIONS,
]


class Category(ModelWithMetadata, MPTTModel, SeoModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    description = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)
    description_plaintext = TextField(blank=True)
    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="children", on_delete=models.CASCADE
    )
    icon_id = models.CharField(max_length=50, default="", blank=True, null=True)

    objects = models.Manager()
    tree = TreeManager()
    translated = TranslationProxy()

    class Meta:
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                name="category_search_name_slug_gin",
                # `opclasses` and `fields` should be the same length
                fields=["name", "slug", "description_plaintext"],
                opclasses=["gin_trgm_ops"] * 3,
            ),
        ]
        permissions = (
            (
                CategoryPermissions.MANAGE_CATEGORIES.codename,
                "Manage categories.",
            ),
        )

    def __str__(self) -> str:
        return self.name


class CategoryTranslation(SeoModelTranslation):
    category = models.ForeignKey(
        Category, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=128, blank=True, null=True)
    description = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)

    class Meta:
        unique_together = (("language_code", "category"),)

    def __str__(self) -> str:
        return self.name if self.name else str(self.pk)

    def __repr__(self) -> str:
        class_ = type(self)
        return "%s(pk=%r, name=%r, category_pk=%r)" % (
            class_.__name__,
            self.pk,
            self.name,
            self.category_id,
        )

    def get_translated_object_id(self):
        return "Category", self.category_id

    def get_translated_keys(self):
        translated_keys = super().get_translated_keys()
        translated_keys.update(
            {
                "name": self.name,
                "description": self.description,
            }
        )
        return translated_keys


class ProductType(ModelWithMetadata):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    has_variants = models.BooleanField(default=True)
    is_shipping_required = models.BooleanField(default=True)
    is_digital = models.BooleanField(default=False)
    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,  # type: ignore
        default=zero_weight,
    )

    class Meta(ModelWithMetadata.Meta):
        ordering = ("slug",)
        app_label = "product"
        permissions = (
            (
                ProductTypePermissions.MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.codename,
                "Manage product types and attributes.",
            ),
        )
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                name="product_type_search_gin",
                # `opclasses` and `fields` should be the same length
                fields=["name", "slug"],
                opclasses=["gin_trgm_ops"] * 2,
            ),
        ]

    def __str__(self) -> str:
        return self.name

    def __repr__(self) -> str:
        class_ = type(self)
        return "<%s.%s(pk=%r, name=%r)>" % (
            class_.__module__,
            class_.__name__,
            self.pk,
            self.name,
        )


class ProductsQueryset(models.QuerySet):
    def published(self, channel_slug: str):
        today = datetime.date.today()
        channels = Channel.objects.filter(
            slug=str(channel_slug), is_active=True
        ).values("id")
        channel_listings = ProductChannelListing.objects.filter(
            Q(publication_date__lte=today) | Q(publication_date__isnull=True),
            Exists(channels.filter(pk=OuterRef("channel_id"))),
            is_published=True,
        ).values("id")
        return self.filter(
            Exists(channel_listings.filter(product_id=OuterRef("pk"))),
            company__status=Company.Status.ACCEPTED,
            company__is_enabled=True,
        )

    def not_published(self, channel_slug: str):
        today = datetime.date.today()
        return self.annotate_publication_info(channel_slug).filter(
            Q(publication_date__gt=today) & Q(is_published=True)
            | Q(is_published=False)
            | Q(is_published__isnull=True)
            | ~Q(company__status=Company.Status.ACCEPTED)
            | Q(company__is_enabled=False)
        )

    def published_with_variants(self, channel_slug: str):
        published = self.published(channel_slug)
        channels = Channel.objects.filter(
            slug=str(channel_slug), is_active=True
        ).values("id")
        variant_channel_listings = ProductVariantChannelListing.objects.filter(
            Exists(channels.filter(pk=OuterRef("channel_id"))),
            price_amount__isnull=False,
        ).values("id")
        variants = ProductVariant.objects.filter(
            Exists(variant_channel_listings.filter(variant_id=OuterRef("pk")))
        )
        return published.filter(Exists(variants.filter(product_id=OuterRef("pk"))))

    def visible_to_seller(self, requestor: Union["User", "App"], channel_slug: str):
        channels = Channel.objects.filter(slug=str(channel_slug)).values("id")
        channel_listings = ProductChannelListing.objects.filter(
            Exists(channels.filter(pk=OuterRef("channel_id")))
        ).values("id")
        return self.filter(
            Exists(channel_listings.filter(product_id=OuterRef("pk"))),
            company__managers__in=[requestor],
        )

    def visible_by_company(self, company_id, channel_slug: str):
        channels = Channel.objects.filter(slug=str(channel_slug))
        channel_listings = ProductChannelListing.objects.filter(
            Exists(channels.filter(pk=OuterRef("channel_id"))),
        )
        return self.filter(
            Exists(channel_listings.filter(product_id=OuterRef("pk"))),
            company_id=company_id,
        )

    def visible_to_user(
        self, requestor: Union["User", "App"], channel_slug: str, seller_request=False
    ):
        if requestor_is_staff_member_or_app(requestor):
            if channel_slug:
                channels = Channel.objects.filter(slug=str(channel_slug)).values("id")
                channel_listings = ProductChannelListing.objects.filter(
                    Exists(channels.filter(pk=OuterRef("channel_id")))
                ).values("id")
                return self.filter(
                    Exists(channel_listings.filter(product_id=OuterRef("pk")))
                )
            return self.all()
        if requestor_is_seller(requestor) and seller_request:
            return self.visible_to_seller(requestor, channel_slug)
        return self.published_with_variants(channel_slug)

    def annotate_publication_info(self, channel_slug: str):
        return self.annotate_is_published(channel_slug).annotate_publication_date(
            channel_slug
        )

    def annotate_is_published(self, channel_slug: str):
        query = Subquery(
            ProductChannelListing.objects.filter(
                product_id=OuterRef("pk"), channel__slug=str(channel_slug)
            ).values_list("is_published")[:1]
        )
        return self.annotate(
            is_published=ExpressionWrapper(query, output_field=BooleanField())
        )

    def annotate_publication_date(self, channel_slug: str):
        query = Subquery(
            ProductChannelListing.objects.filter(
                product_id=OuterRef("pk"), channel__slug=str(channel_slug)
            ).values_list("publication_date")[:1]
        )
        return self.annotate(
            publication_date=ExpressionWrapper(query, output_field=DateField())
        )

    def annotate_visible_in_listings(self, channel_slug):
        query = Subquery(
            ProductChannelListing.objects.filter(
                product_id=OuterRef("pk"), channel__slug=str(channel_slug)
            ).values_list("visible_in_listings")[:1]
        )
        return self.annotate(
            visible_in_listings=ExpressionWrapper(query, output_field=BooleanField())
        )

    def sort_by_attribute(
        self, attribute_pk: Union[int, str], descending: bool = False
    ):
        """Sort a query set by the values of the given product attribute.

        :param attribute_pk: The database ID (must be a numeric) of the attribute
                             to sort by.
        :param descending: The sorting direction.
        """
        from ..attribute.models import AttributeProduct, AttributeValue

        qs: models.QuerySet = self
        # If the passed attribute ID is valid, execute the sorting
        if not (isinstance(attribute_pk, int) or attribute_pk.isnumeric()):
            return qs.annotate(
                concatenated_values_order=Value(
                    None, output_field=models.IntegerField()
                ),
                concatenated_values=Value(None, output_field=models.CharField()),
            )

        # Retrieve all the products' attribute data IDs (assignments) and
        # product types that have the given attribute associated to them
        associated_values = tuple(
            AttributeProduct.objects.filter(attribute_id=attribute_pk).values_list(
                "pk", "product_type_id"
            )
        )

        if not associated_values:
            qs = qs.annotate(
                concatenated_values_order=Value(
                    None, output_field=models.IntegerField()
                ),
                concatenated_values=Value(None, output_field=models.CharField()),
            )

        else:
            attribute_associations, product_types_associated_to_attribute = zip(
                *associated_values
            )

            qs = qs.annotate(
                # Contains to retrieve the attribute data (singular) of each product
                # Refer to `AttributeProduct`.
                filtered_attribute=FilteredRelation(
                    relation_name="attributes",
                    condition=Q(attributes__assignment_id__in=attribute_associations),
                ),
                # Implicit `GROUP BY` required for the `StringAgg` aggregation
                grouped_ids=Count("id"),
                # String aggregation of the attribute's values to efficiently sort them
                concatenated_values=Case(
                    # If the product has no association data but has
                    # the given attribute associated to its product type,
                    # then consider the concatenated values as empty (non-null).
                    When(
                        Q(product_type_id__in=product_types_associated_to_attribute)
                        & Q(filtered_attribute=None),
                        then=models.Value(""),
                    ),
                    default=StringAgg(
                        F("filtered_attribute__values__name"),
                        delimiter=",",
                        ordering=(
                            [
                                f"filtered_attribute__values__{field_name}"
                                for field_name in AttributeValue._meta.ordering or []
                            ]
                        ),
                    ),
                    output_field=models.CharField(),
                ),
                concatenated_values_order=Case(
                    # Make the products having no such attribute be last in the sorting
                    When(concatenated_values=None, then=2),
                    # Put the products having an empty attribute value at the bottom of
                    # the other products.
                    When(concatenated_values="", then=1),
                    # Put the products having an attribute value to be always at the top
                    default=0,
                    output_field=models.IntegerField(),
                ),
            )

        # Sort by concatenated_values_order then
        # Sort each group of products (0, 1, 2, ...) per attribute values
        # Sort each group of products by name,
        # if they have the same values or not values
        ordering = "-" if descending else ""
        return qs.order_by(
            f"{ordering}concatenated_values_order",
            f"{ordering}concatenated_values",
            f"{ordering}name",
        )

    def prefetched_for_webhook(self, single_object=True):
        common_fields = (
            "attributes__values",
            "attributes__assignment__attribute",
            "media",
            "variants__attributes__values",
            "variants__attributes__assignment__attribute",
            "variants__variant_media__media",
            "variants__stocks__allocations",
        )
        if single_object:
            return self.prefetch_related(*common_fields)
        return self.prefetch_related("collections", "category", *common_fields)


class CategoryProduct(SortableModel):
    product = models.ForeignKey(
        "Product", related_name="categoryproduct", on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category, related_name="categoryproduct", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = (("product", "category"),)

    def get_ordering_queryset(self):
        return self.product.productcategory.all()


class PaymentMethodProduct(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("product", "payment_method"),)


class BookableResourceProduct(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    bookable_resource = models.ForeignKey("BookableResource", on_delete=models.CASCADE)

    class Meta:
        unique_together = (("product", "bookable_resource"),)


class ProductAddress(models.Model):
    street = models.CharField(max_length=2000, blank=True, null=True)
    street_second_line = models.CharField(max_length=2000, blank=True, null=True)
    postal_code = models.CharField(max_length=10, blank=True, null=True)
    locality = models.CharField(max_length=100, blank=True, null=True)
    region = models.CharField(max_length=100, blank=True, null=True)
    location_point = models_geo.PointField(null=True, blank=True)
    country = CountryField(blank=True, null=True)
    product = models.OneToOneField(
        "Product", related_name="address", on_delete=models.CASCADE
    )


class Product(SeoModel, ModelWithMetadata):
    product_type = models.ForeignKey(
        ProductType, related_name="products", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    description = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)
    description_plaintext = TextField(blank=True)
    details = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)
    details_plaintext = TextField(blank=True)
    search_vector = SearchVectorField(null=True, blank=True)
    company = models.ForeignKey(
        Company,
        related_name="products",
        on_delete=models.CASCADE,
    )
    category = models.ForeignKey(
        Category,
        related_name="products",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    categories = models.ManyToManyField(
        Category,
        related_name="products_cat",
        through=CategoryProduct,
        through_fields=("product", "category"),
    )
    payment_methods = models.ManyToManyField(
        PaymentMethod,
        related_name="products",
        through=PaymentMethodProduct,
        through_fields=("product", "payment_method"),
    )
    bookable_resources = models.ManyToManyField(
        "BookableResource",
        related_name="products",
        through=BookableResourceProduct,
        through_fields=("product", "bookable_resource"),
    )
    updated_at = models.DateTimeField(auto_now=True, null=True)
    created_at = models.DateTimeField(auto_now=True, null=True)
    charge_taxes = models.BooleanField(default=True)
    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,  # type: ignore
        blank=True,
        null=True,
    )
    default_variant = models.OneToOneField(
        "ProductVariant",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    is_billable = models.BooleanField(default=False)
    is_bookable = models.BooleanField(default=False)
    duration = models.IntegerField(null=True, blank=True)  # Only used if it's bookable
    rating = models.FloatField(default=0)

    skip_stock = models.BooleanField(default=False)

    objects = models.Manager.from_queryset(ProductsQueryset)()
    translated = TranslationProxy()

    url = models.URLField(max_length=200, blank=True, null=True)
    has_no_price = models.BooleanField(default=False, blank=True, null=True)
    class Meta:
        app_label = "product"
        ordering = ("slug",)
        permissions = (
            (ProductPermissions.MANAGE_PRODUCTS.codename, "Manage products."),
            (
                StatPermissions.MANAGE_PRODUCT_STATS.codename,
                "Permission view for product stats.",
            ),
        )
        indexes = [GinIndex(fields=["search_vector"])]
        indexes.extend(ModelWithMetadata.Meta.indexes)

    def __iter__(self):
        if not hasattr(self, "__variants"):
            setattr(self, "__variants", self.variants.all())
        return iter(getattr(self, "__variants"))

    def __repr__(self) -> str:
        class_ = type(self)
        return "<%s.%s(pk=%r, name=%r)>" % (
            class_.__module__,
            class_.__name__,
            self.pk,
            self.name,
        )

    def __str__(self) -> str:
        return self.name

    @property
    def plain_text_description(self) -> str:
        return json_content_to_raw_text(self.description)

    def get_first_image(self):
        all_media = self.media.all()
        images = [media for media in all_media if media.type == ProductMediaTypes.IMAGE]
        return images[0] if images else None

    @staticmethod
    def sort_by_attribute_fields() -> list:
        return ["concatenated_values_order", "concatenated_values", "name"]

    def calcule_rating(self):
        if hasattr(self, "ratings"):
            # Calcule average company and product rating
            result = self.ratings.aggregate(
                rating_avg=Coalesce(Avg("rating"), Value(0.0))
            )
            self.rating = round(result["rating_avg"], 1)
            self.save(update_fields=["rating"])

            company_rating = ProductRating.objects.filter(
                product__company=self.company
            ).aggregate(rating_avg=Coalesce(Avg("rating"), Value(0.0)))
            self.company.rating = round(company_rating["rating_avg"], 1)
            self.company.save(update_fields=["rating"])

    def is_available(self):
        channel_listing = self.channel_listings.filter(
            channel__slug=settings.DEFAULT_CHANNEL_SLUG
        ).first()
        return channel_listing and channel_listing.is_visible


class ProductTranslation(SeoModelTranslation):
    product = models.ForeignKey(
        Product, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250, blank=True, null=True)
    description = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)

    class Meta:
        unique_together = (("language_code", "product"),)

    def __str__(self) -> str:
        return self.name if self.name else str(self.pk)

    def __repr__(self) -> str:
        class_ = type(self)
        return "%s(pk=%r, name=%r, product_pk=%r)" % (
            class_.__name__,
            self.pk,
            self.name,
            self.product_id,
        )

    def get_translated_object_id(self):
        return "Product", self.product_id

    def get_translated_keys(self):
        translated_keys = super().get_translated_keys()
        translated_keys.update(
            {
                "name": self.name,
                "description": self.description,
            }
        )
        return translated_keys


class ProductVariantQueryset(models.QuerySet):
    def annotate_quantities(self):
        return self.annotate(
            quantity=Coalesce(Sum("stocks__quantity"), 0),
            quantity_allocated=Coalesce(
                Sum("stocks__allocations__quantity_allocated"), 0
            ),
        )

    def available_in_channel(self, channel_slug):
        return self.filter(
            channel_listings__price_amount__isnull=False,
            channel_listings__channel__slug=str(channel_slug),
        )

    def prefetched_for_webhook(self):
        return self.prefetch_related(
            "attributes__values",
            "attributes__assignment__attribute",
            "variant_media__media",
        )


class ProductChannelListing(PublishableModel):
    product = models.ForeignKey(
        Product,
        null=False,
        blank=False,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        null=False,
        blank=False,
        related_name="product_listings",
        on_delete=models.CASCADE,
    )
    visible_in_listings = models.BooleanField(default=False)
    available_for_purchase = models.DateField(blank=True, null=True)
    currency = models.CharField(max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH)
    discounted_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    discounted_price = MoneyField(
        amount_field="discounted_price_amount", currency_field="currency"
    )

    class Meta:
        unique_together = [["product", "channel"]]
        ordering = ("pk",)
        indexes = [
            models.Index(fields=["publication_date"]),
        ]

    def is_available_for_purchase(self):
        return (
            self.available_for_purchase is not None
            and datetime.date.today() >= self.available_for_purchase
        )


class ProductVariant(SortableModel, ModelWithMetadata):
    sku = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True)
    product = models.ForeignKey(
        Product, related_name="variants", on_delete=models.CASCADE
    )
    media = models.ManyToManyField("ProductMedia", through="VariantMedia")
    track_inventory = models.BooleanField(default=True)

    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,  # type: ignore
        blank=True,
        null=True,
    )

    objects = models.Manager.from_queryset(ProductVariantQueryset)()
    translated = TranslationProxy()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("sort_order", "sku")
        app_label = "product"

    def __str__(self) -> str:
        return self.name or self.sku

    def get_price(
        self,
        product: Product,
        collections: Iterable["Collection"],
        channel: Channel,
        channel_listing: "ProductVariantChannelListing",
        categories: Iterable["Category"],
        discounts: Optional[Iterable[DiscountInfo]] = None,
    ) -> "Money":
        return calculate_discounted_price(
            product=product,
            price=channel_listing.price,
            discounts=discounts,
            collections=collections,
            channel=channel,
            categories=categories,
        )

    def get_weight(self):
        return self.weight or self.product.weight or self.product.product_type.weight

    def is_shipping_required(self) -> bool:
        return self.product.product_type.is_shipping_required

    def is_digital(self) -> bool:
        is_digital = self.product.product_type.is_digital
        return not self.is_shipping_required() and is_digital

    def display_product(self, translated: bool = False) -> str:
        if translated:
            product = self.product.translated
            variant_display = str(self.translated)
        else:
            variant_display = str(self)
            product = self.product
        product_display = (
            f"{product} ({variant_display})" if variant_display else str(product)
        )
        return smart_text(product_display)

    def get_ordering_queryset(self):
        return self.product.variants.all()


class ProductVariantTranslation(Translation):
    product_variant = models.ForeignKey(
        ProductVariant, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255, blank=True)

    translated = TranslationProxy()

    class Meta:
        unique_together = (("language_code", "product_variant"),)

    def __repr__(self):
        class_ = type(self)
        return "%s(pk=%r, name=%r, variant_pk=%r)" % (
            class_.__name__,
            self.pk,
            self.name,
            self.product_variant_id,
        )

    def __str__(self):
        return self.name or str(self.product_variant)

    def get_translated_object_id(self):
        return "ProductVariant", self.product_variant_id

    def get_translated_keys(self):
        return {"name": self.name}


class ProductVariantChannelListing(models.Model):
    variant = models.ForeignKey(
        ProductVariant,
        null=False,
        blank=False,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        null=False,
        blank=False,
        related_name="variant_listings",
        on_delete=models.CASCADE,
    )
    currency = models.CharField(max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH)
    price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    price = MoneyField(amount_field="price_amount", currency_field="currency")

    cost_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    cost_price = MoneyField(amount_field="cost_price_amount", currency_field="currency")

    class Meta:
        unique_together = [["variant", "channel"]]
        ordering = ("pk",)


class DigitalContent(ModelWithMetadata):
    FILE = "file"
    TYPE_CHOICES = ((FILE, "digital_product"),)
    use_default_settings = models.BooleanField(default=True)
    automatic_fulfillment = models.BooleanField(default=False)
    content_type = models.CharField(max_length=128, default=FILE, choices=TYPE_CHOICES)
    product_variant = models.OneToOneField(
        ProductVariant, related_name="digital_content", on_delete=models.CASCADE
    )
    content_file = models.FileField(upload_to="digital_contents", blank=True)
    max_downloads = models.IntegerField(blank=True, null=True)
    url_valid_days = models.IntegerField(blank=True, null=True)

    def create_new_url(self) -> "DigitalContentUrl":
        return self.urls.create()


class DigitalContentUrl(models.Model):
    token = models.UUIDField(editable=False, unique=True)
    content = models.ForeignKey(
        DigitalContent, related_name="urls", on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
    download_num = models.IntegerField(default=0)
    line = models.OneToOneField(
        "order.OrderLine",
        related_name="digital_content_url",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.token:
            self.token = str(uuid4()).replace("-", "")
        super().save(force_insert, force_update, using, update_fields)

    def get_absolute_url(self) -> Optional[str]:
        url = reverse("digital-product", kwargs={"token": str(self.token)})
        return build_absolute_uri(url)


class ProductMedia(SortableModel):
    product = models.ForeignKey(Product, related_name="media", on_delete=models.CASCADE)
    image = VersatileImageField(
        upload_to="products", ppoi_field="ppoi", blank=True, null=True
    )
    ppoi = PPOIField()
    alt = models.CharField(max_length=128, blank=True)
    type = models.CharField(
        max_length=32,
        choices=ProductMediaTypes.CHOICES,
        default=ProductMediaTypes.IMAGE,
    )
    external_url = models.CharField(max_length=256, blank=True, null=True)
    oembed_data = JSONField(blank=True, default=dict)

    class Meta:
        ordering = ("sort_order", "pk")
        app_label = "product"

    def get_ordering_queryset(self):
        return self.product.media.all()


class VariantMedia(models.Model):
    variant = models.ForeignKey(
        "ProductVariant", related_name="variant_media", on_delete=models.CASCADE
    )
    media = models.ForeignKey(
        ProductMedia, related_name="variant_media", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("variant", "media")


class CollectionProduct(SortableModel):
    collection = models.ForeignKey(
        "Collection", related_name="collectionproduct", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product, related_name="collectionproduct", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = (("collection", "product"),)

    def get_ordering_queryset(self):
        return self.product.collectionproduct.all()


class CollectionsQueryset(models.QuerySet):
    def published(self, channel_slug: str):
        today = datetime.date.today()
        return self.filter(
            Q(channel_listings__publication_date__lte=today)
            | Q(channel_listings__publication_date__isnull=True),
            channel_listings__channel__slug=str(channel_slug),
            channel_listings__channel__is_active=True,
            channel_listings__is_published=True,
        )

    def visible_to_user(self, requestor: Union["User", "App"], channel_slug: str):
        if has_one_of_permissions_as_staff(requestor, ALL_PRODUCTS_PERMISSIONS):
            if channel_slug:
                return self.filter(channel_listings__channel__slug=str(channel_slug))
            return self.all()
        return self.published(channel_slug)


class Collection(SeoModel, ModelWithMetadata):
    name = models.CharField(max_length=250, unique=True)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    products = models.ManyToManyField(
        Product,
        blank=True,
        related_name="collections",
        through=CollectionProduct,
        through_fields=("collection", "product"),
    )
    background_image = VersatileImageField(
        upload_to="collection-backgrounds", blank=True, null=True
    )
    background_image_alt = models.CharField(max_length=128, blank=True)
    description = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)

    objects = models.Manager.from_queryset(CollectionsQueryset)()

    translated = TranslationProxy()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("slug",)
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            GinIndex(
                name="collection_search_gin",
                # `opclasses` and `fields` should be the same length
                fields=["name", "slug"],
                opclasses=["gin_trgm_ops"] * 2,
            ),
        ]
        permissions = (
            (
                CollectionPermissions.MANAGE_COLLECTIONS.codename,
                "Manage collections.",
            ),
        )

    def __str__(self) -> str:
        return self.name


class CollectionChannelListing(PublishableModel):
    collection = models.ForeignKey(
        Collection,
        null=False,
        blank=False,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        null=False,
        blank=False,
        related_name="collection_listings",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = [["collection", "channel"]]
        ordering = ("pk",)


class CollectionTranslation(SeoModelTranslation):
    collection = models.ForeignKey(
        Collection, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=128, blank=True, null=True)
    description = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)

    class Meta:
        unique_together = (("language_code", "collection"),)

    def __repr__(self):
        class_ = type(self)
        return "%s(pk=%r, name=%r, collection_pk=%r)" % (
            class_.__name__,
            self.pk,
            self.name,
            self.collection_id,
        )

    def __str__(self) -> str:
        return self.name if self.name else str(self.pk)

    def get_translated_object_id(self):
        return "Collection", self.collection_id

    def get_translated_keys(self):
        translated_keys = super().get_translated_keys()
        translated_keys.update(
            {
                "name": self.name,
                "description": self.description,
            }
        )
        return translated_keys


class PossiblePhoneNumberField(PhoneNumberField):
    """Less strict field for phone numbers written to database."""

    default_validators = [validate_possible_number]


class FraudulentProductReport(models.Model):
    user = models.ForeignKey(
        User,
        related_name="userreport",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
    )
    product = models.ForeignKey(
        Product,
        related_name="productreport",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
    )
    reason = models.CharField(max_length=1000, blank=False)
    date = models.DateTimeField(default=timezone.now, editable=False)
    phone = PossiblePhoneNumberField(blank=True, default="", db_index=True)


class FraudulentProductReportMedia(models.Model):
    fraudulent_product_report = models.ForeignKey(
        FraudulentProductReport, related_name="media", on_delete=models.CASCADE
    )
    image = VersatileImageField(
        upload_to="fraudulent_product_reports", blank=True, null=True
    )
    alt = models.CharField(max_length=128, blank=True)

    external_url = models.CharField(max_length=256, blank=True, null=True)
    oembed_data = JSONField(blank=True, default=dict)


class ProductRating(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User,
        related_name="product_ratings",
        on_delete=models.CASCADE,
    )
    product = models.ForeignKey(
        Product,
        related_name="ratings",
        on_delete=models.CASCADE,
    )
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.CharField(max_length=560, blank=True, default="")

    class Meta:
        ordering = ("rating", "pk")
        unique_together = ("user", "product")

    def __str__(self) -> str:
        return f"{self.product}: {self.rating}"


class BookableResource(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField(default=0)
    quantity_infinite = models.BooleanField(default=False)
    company = models.ForeignKey(
        Company, related_name="bookable_resources", on_delete=models.CASCADE
    )
    full_day = models.BooleanField(default=False)

    class Meta:
        ordering = ("name", "pk")
        unique_together = ("name", "company")

    def periods_by_calendar_days(self, duration_in_minutes):
        # Get list of all periods
        periods_by_weekday = {}
        for calendar in self.calendar.all():
            slots = calendar.time_periods.all()
            all_periods_in_slots = []
            for slot in slots:
                slot_start_time = convert_time_to_timedelta(slot.start_time)
                slot_end_time = convert_time_to_timedelta(slot.end_time)
                while (
                    slot_start_time + datetime.timedelta(minutes=duration_in_minutes)
                    > slot_start_time
                    and slot_start_time
                    + datetime.timedelta(minutes=duration_in_minutes)
                    <= slot_end_time
                ):
                    all_periods_in_slots.append(
                        {
                            "start_time": convert_timedelta_to_time(slot_start_time),
                            "end_time": convert_timedelta_to_time(
                                slot_start_time
                                + datetime.timedelta(minutes=duration_in_minutes)
                            ),
                        }
                    )
                    slot_start_time += datetime.timedelta(minutes=duration_in_minutes)
            if all_periods_in_slots:
                periods_by_weekday[calendar.day] = all_periods_in_slots
        return periods_by_weekday

    def __str__(self) -> str:
        return self.name


class BookableResourceDailyCalendar(models.Model):
    bookable_resource = models.ForeignKey(
        BookableResource, related_name="calendar", on_delete=models.CASCADE
    )
    day = models.CharField(
        max_length=20,
        choices=BookableResourceDay.CHOICES,
        default=BookableResourceDay.MONDAY,
    )

    class Meta:
        unique_together = ("bookable_resource", "day")


class Slot(models.Model):
    bookable_resource_calendar = models.ForeignKey(
        BookableResourceDailyCalendar,
        related_name="time_periods",
        on_delete=models.CASCADE,
    )
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        ordering = ("start_time",)


class Booking(models.Model):
    start_date = models.DateTimeField(editable=False, null=True)
    end_date = models.DateTimeField(editable=False, null=True)
    booking_reference = models.UUIDField(editable=False, unique=True, default=uuid4)
    user = user = models.ForeignKey(
        User, related_name="bookings", on_delete=models.SET_NULL, blank=True, null=True
    )
    bookable_resource = models.ForeignKey(
        BookableResource,
        related_name="bookings",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    variant = models.ForeignKey(
        ProductVariant,
        related_name="bookings",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    company = models.ForeignKey(
        Company,
        related_name="bookings",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    user_email = models.EmailField(blank=True, default="")
    resource_name = models.CharField(max_length=386, blank=True, null=True)
    variant_name = models.CharField(max_length=386, blank=True, null=True)
    variant_sku = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=BookingStatus.CHOICES,
        default=BookingStatus.PENDING,
    )
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def can_confirm(self) -> bool:
        """There is at least a minute of grace time left."""
        limit_date = timezone.now() - datetime.timedelta(
            minutes=float(settings.RESERVATION_GRACE_TIME) - 1
        )
        return self.status == BookingStatus.PENDING and self.created_at > limit_date

    def confirm(self):
        self.status = BookingStatus.CONFIRMED
        self.save()

    def cancel(self):
        self.status = BookingStatus.CANCELED
        self.save()

    class Meta:
        ordering = (
            "start_date",
            "resource_name",
        )

    def __str__(self) -> str:
        return f"{self.resource_name}: {self.start_date} - {self.end_date}"


class PurchaseEmail(models.Model):
    subject = models.CharField(max_length=65, blank=False, null=False)
    title = models.CharField(max_length=65, blank=False, null=False)
    content = TextField(blank=False)
    product = models.OneToOneField(
        "Product",
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        related_name="purchase_email",
    )
