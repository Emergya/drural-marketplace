import graphene
from promise import Promise

from ...account.utils import requestor_is_staff_member_or_app
from ...channel.models import Channel
from ...core.tracing import traced_resolver
from ...graphql.utils import get_user_or_app_from_context
from ...wishlist import models
from ..channel import ChannelContext
from ..core.connection import CountableDjangoObjectType
from ..product.dataloaders import (
    ProductChannelListingByProductIdAndChannelSlugLoader,
    ProductVariantByIdLoader,
)


class Wishlist(CountableDjangoObjectType):
    image_url = graphene.String(source="image_url")

    class Meta:
        fields = ["id", "name", "image", "created_at", "items", "image_url"]
        description = "Wishlist."
        interfaces = [graphene.relay.Node]
        model = models.Wishlist
        filter_fields = ["id"]


class WishlistItem(CountableDjangoObjectType):
    variant = graphene.Field(
        "saleor.graphql.product.types.products.ProductVariant",
        required=False,
        description=(
            "A purchased product variant. Note: this field may be null if the variant "
            "has been removed from stock at all."
        ),
    )

    class Meta:
        only_fields = ["id", "wishlist", "variant"]
        description = "Wishlist item."
        interfaces = [graphene.relay.Node]
        model = models.WishlistItem
        filter_fields = ["id"]

    @staticmethod
    @traced_resolver
    def resolve_variant(root: models.WishlistItem, info):
        context = info.context
        if not root.variant_id:
            return None

        def requestor_has_access_to_variant(data):
            variant, channel = data

            requester = get_user_or_app_from_context(context)
            is_staff = requestor_is_staff_member_or_app(requester)
            if is_staff:
                return ChannelContext(node=variant, channel_slug=channel.slug)

            def product_is_available(product_channel_listing):
                if product_channel_listing and product_channel_listing.is_visible:
                    return ChannelContext(node=variant, channel_slug=channel.slug)
                return None

            return (
                ProductChannelListingByProductIdAndChannelSlugLoader(context)
                .load((variant.product_id, channel.slug))
                .then(product_is_available)
            )

        variant = ProductVariantByIdLoader(context).load(root.variant_id)
        channel = Channel.objects.get(slug="default-channel")

        return Promise.all([variant, channel]).then(requestor_has_access_to_variant)
