import graphene
from django.core.exceptions import ValidationError

from ...core.permissions import WishlistPermissions
from ...discount.models import NotApplicable
from ...graphql.core.utils import from_global_id_or_error
from ...graphql.product.resolvers import resolve_variant_by_id
from ...graphql.utils import get_user_or_app_from_context
from ...wishlist import models
from ..core.enums import WishlistErrorCode
from ..core.mutations import BaseMutation, ModelDeleteMutation, ModelMutation
from ..core.types.common import WishlistError
from ..product.types import ProductVariant
from .resolvers import resolve_wishlist_from_info
from .types import Wishlist, WishlistItem


class WishlistInput(graphene.InputObjectType):
    name = graphene.String(required=False, description="Wishlist name.")


class WishlistCreate(ModelMutation):
    class Arguments:
        input = WishlistInput(
            required=True, description="Fields required to create a wishlist."
        )

    class Meta:
        description = "Creates a new wishlist"
        model = models.Wishlist
        error_type_class = WishlistError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        if not data.get("name"):
            raise ValidationError(
                {
                    "name": ValidationError(
                        "This field is required.", code=WishlistErrorCode.REQUIRED
                    )
                }
            )
        return super(WishlistCreate, cls).clean_input(info, instance, data, input_cls)

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.user = info.context.user
        instance.save()


class WishlistUpdate(WishlistCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a wishlist to update.")
        input = WishlistInput(
            required=True, description="Fields required to update a wishlist."
        )

    class Meta:
        description = "Updates an existing wishlist."
        model = models.Wishlist
        permissions = (WishlistPermissions.MANAGE_WISHLISTS,)
        error_type_class = WishlistError
        error_type_field = "wishlist_errors"

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.save()


class WishlistDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a wishlist to delete.")

    class Meta:
        description = "Deletes a wishlist."
        model = models.Wishlist
        permissions = (WishlistPermissions.MANAGE_WISHLISTS,)
        error_type_class = WishlistError
        error_type_field = "collection_errors"

    @classmethod
    def check_permissions(cls, context):
        return context.user.is_authenticated

    @classmethod
    def perform_mutation(cls, _root, info, **kwargs):
        return super().perform_mutation(_root, info, **kwargs)


class _BaseWishlistMutation(BaseMutation):
    wishlist = graphene.List(
        WishlistItem, description="The wishlist of the current user."
    )

    class Meta:
        abstract = True

    @classmethod
    def check_permissions(cls, context):
        return context.user.is_authenticated


class _BaseWishlistVariantMutation(_BaseWishlistMutation):
    class Meta:
        abstract = True

    class Arguments:
        wishlist_id = graphene.ID(description="The ID of the wishlist.", required=True)
        variant_id = graphene.ID(description="The ID of the variant.", required=True)


class WishlistAddVariantMutation(_BaseWishlistVariantMutation):
    class Meta:
        description = "Add variant to the current user's wishlist."
        error_type_class = WishlistError
        error_type_field = "wishlist_errors"

    @classmethod
    def perform_mutation(
        cls, _root, info, variant_id, wishlist_id
    ):  # pylint: disable=W0221
        wishlist_pk = cls.get_global_id_or_error(
            wishlist_id, only_type=Wishlist, field="pk"
        )
        wishlist = resolve_wishlist_from_info(info, wishlist_pk)
        variant = cls.get_node_or_error(
            info, variant_id, only_type=ProductVariant, field="variant_id"
        )

        requestor = get_user_or_app_from_context(info.context)
        _, variant_pk = from_global_id_or_error(variant_id, ProductVariant)
        variant = resolve_variant_by_id(
            info,
            variant_pk,
            channel_slug="default-channel",
            requestor_has_access_to_all=False,
            requestor=requestor,
        )
        if variant in wishlist.get_all_variants():
            msg = "This variant is already in the wishlist."
            raise NotApplicable(msg)

        if not wishlist.items.all():
            wishlist.set_image(variant.media.first().image)
        wishlist.add_variant(variant)
        wishlist_items = wishlist.items.all()
        return WishlistAddVariantMutation(wishlist=wishlist_items)


class WishlistRemoveVariantMutation(_BaseWishlistVariantMutation):
    class Meta:
        description = "Remove product from the current user's wishlist."
        error_type_class = WishlistError
        error_type_field = "wishlist_errors"

    @classmethod
    def perform_mutation(
        cls, _root, info, variant_id, wishlist_id
    ):  # pylint: disable=W0221
        wishlist_pk = cls.get_global_id_or_error(
            wishlist_id, only_type=Wishlist, field="pk"
        )
        wishlist = resolve_wishlist_from_info(info, wishlist_pk)

        requestor = get_user_or_app_from_context(info.context)
        _, variant_pk = from_global_id_or_error(variant_id, ProductVariant)
        variant = resolve_variant_by_id(
            info,
            variant_pk,
            channel_slug="default-channel",
            requestor_has_access_to_all=False,
            requestor=requestor,
        )
        wishlist.remove_variant(variant)
        wishlist_items = wishlist.items.all()
        if not wishlist_items:
            wishlist.set_image(wishlist.get_default_image())
        else:
            wishlist.set_image(wishlist.get_first_variant_image())
        return WishlistRemoveVariantMutation(wishlist=wishlist_items)
