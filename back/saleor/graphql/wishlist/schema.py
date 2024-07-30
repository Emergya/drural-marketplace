import graphene

from saleor.core.tracing import traced_resolver

from ..core.utils import from_global_id_or_error
from ..core.validators import validate_one_of_args_is_in_query
from .mutations import (
    WishlistAddVariantMutation,
    WishlistCreate,
    WishlistDelete,
    WishlistRemoveVariantMutation,
    WishlistUpdate,
)
from .resolvers import resolve_wishlist_from_user
from .types import Wishlist

# User's wishlist queries are located in the "saleor.graphql.account" module:
#
#     me {
#         wishlist
#     }


class WishlistQueries(graphene.ObjectType):
    wishlist = graphene.Field(
        Wishlist,
        id=graphene.ID(
            required=True,
            description="ID of the wishlist.",
        ),
        description="Look up a wishlist by ID",
    )

    @traced_resolver
    def resolve_wishlist(self, info, id=None, **kwargs):
        validate_one_of_args_is_in_query("id", id)
        if id:
            _, id = from_global_id_or_error(id, Wishlist)
            return resolve_wishlist_from_user(info.context.user, id)


class WishlistMutations(graphene.ObjectType):
    wishlist_create = WishlistCreate.Field()
    wishlist_update = WishlistUpdate.Field()
    wishlist_delete = WishlistDelete.Field()
    wishlist_add_variant = WishlistAddVariantMutation.Field()
    wishlist_remove_variant = WishlistRemoveVariantMutation.Field()
