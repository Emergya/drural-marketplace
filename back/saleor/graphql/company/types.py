import graphene
from graphene import relay
from graphene_django import DjangoObjectType

from ...company import models
from ...core.exceptions import PermissionDenied
from ...graphql.company.resolvers import (
    resolve_review_percentages_company,
    resolve_reviews_from_company,
)
from ...graphql.company.utils import has_company_permissions
from ...graphql.core.types.common import Image, ReviewPercentages
from ...product.models import Product
from ..channel import ChannelQsContext
from ..core.connection import CountableDjangoObjectType
from ..core.enums import LanguageCodeEnum
from ..core.fields import (
    ChannelContextFilterConnectionField,
    FilterInputConnectionField,
)
from ..core.utils import str_to_enum
from ..product.filters import ProductFilterInput, ProductRatingFilterInput
from ..product.sorters import ProductOrder, ProductRatingSortingInput


class CompanyType(CountableDjangoObjectType):
    image_url = graphene.String(source="image_url")
    language_code = graphene.Field(
        LanguageCodeEnum, description="Company language code.", required=True
    )
    products = ChannelContextFilterConnectionField(
        "saleor.graphql.product.types.products.Product",
        filter=ProductFilterInput(description="Filtering options for products."),
        sort_by=ProductOrder(description="Sort products."),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned.",
        ),
        description="List of the shop's products.",
    )
    reviews = FilterInputConnectionField(
        "saleor.graphql.product.types.products.ProductRating",
        filter=ProductRatingFilterInput(description="Filtering options for reviews."),
        description="Reviews of the company's products by users.",
        sort_by=ProductRatingSortingInput(description="Sort reviews."),
    )
    review_percentages = graphene.List(
        ReviewPercentages, description="Pergentages for all possible number of stars"
    )
    banner = graphene.Field(Image, size=graphene.Int(description="Size of the image."))

    class Meta:
        description = "Defines Company's data."
        interfaces = (relay.Node,)
        model = models.Company
        fields = (
            "name",
            "public_name",
            "cif",
            "status",
            "is_enabled",
            "email",
            "phone",
            "language_code",
            "address",
            "image",
            "image_url",
            "description",
            "created",
            "modified",
            "rating",
            "chatwoot_credentials",
            "stripe_credentials",
        )

    @staticmethod
    def resolve_cif(root, info, **_kwargs):
        if not has_company_permissions(info.context.user, root.id):
            raise PermissionDenied()
        return root.cif

    @staticmethod
    def resolve_banner(root: models.Company, info, size=None, **_kwargs):
        if root.banner:
            return Image.get_adjusted(
                image=root.banner,
                alt=root.banner_alt,
                size=size,
                rendition_key_set="banner",
                info=info,
            )

    @staticmethod
    def resolve_phone(root, info, **_kwargs):
        if not has_company_permissions(info.context.user, root.id):
            raise PermissionDenied()
        return root.phone

    @staticmethod
    def resolve_email(root, info, **_kwargs):
        if not has_company_permissions(info.context.user, root.id):
            raise PermissionDenied()
        return root.email

    @staticmethod
    def resolve_language_code(root, _info, **_kwargs):
        return LanguageCodeEnum[str_to_enum(root.language_code)]

    @staticmethod
    def resolve_products(root: models.Company, info, channel, **_kwargs):
        if not hasattr(root, "products"):
            return Product.objects.none()
        return ChannelQsContext(
            qs=root.products.published_with_variants(channel),  # type: ignore
            channel_slug=channel,
        )

    @staticmethod
    def resolve_review_percentages(root: models.Company, info, **_kwargs):
        return resolve_review_percentages_company(root)

    @staticmethod
    def resolve_reviews(root: models.Company, info, **_kwargs):
        return resolve_reviews_from_company(root)


class ChatwootCredentialsType(DjangoObjectType):
    website_token = graphene.String(
        description="Website token of inbox.", required=False
    )
    hmac = graphene.String(description="HMAC of inbox.", required=False)

    class Meta:
        description = "Necesary fields to start a conversation in Chatwoot."
        interfaces = (relay.Node,)
        model = models.ChatwootCredentials
        fields = ("is_active",)

    def resolve_website_token(root: models.ChatwootCredentials, info, **_kwargs):
        if root.is_active:
            return root.website_token
        else:
            return None

    def resolve_hmac(root: models.ChatwootCredentials, info, **_kwargs):
        if root.is_active:
            return root.hmac
        else:
            return None


class StripeCredentialsType(DjangoObjectType):
    class Meta:
        description = "Necesary fields to start a conversation in Chatwoot."
        interfaces = (relay.Node,)
        model = models.StripeCredentials
        fields = ("is_enabled", "account_id")


class CompanyAddressType(DjangoObjectType):
    latitude = graphene.Float()
    longitude = graphene.Float()

    class Meta:
        description = "Defines Company Address."
        interfaces = (relay.Node,)
        model = models.CompanyAddress
        fields = (
            "street",
            "street_second_line",
            "postal_code",
            "locality",
            "region",
            "country",
        )

    def resolve_latitude(root: models.CompanyAddress, info, **_kwargs):
        if root.location_point:
            return root.location_point[0]
        return None

    def resolve_longitude(root: models.CompanyAddress, info, **_kwargs):
        if root.location_point:
            return root.location_point[1]
        return None


class CompanyValidationType(DjangoObjectType):
    class Meta:
        description = "Defines Company Validation data."
        interfaces = (relay.Node,)
        model = models.CompanyValidationEvent
        fields = (
            "status",
            "reason",
            "validated_by",
            "created",
        )


class CompanyStat(graphene.ObjectType):
    total = graphene.Int(description="Total companies registered at that date")
    date = graphene.Date(description="Date when we mesure the concurrent companies.")
