from django.db.models.query import QuerySet
from graphene.types import ResolveInfo

from ...account.models import User
from ...core.exceptions import PermissionDenied
from ...core.tracing import traced_resolver
from ...wishlist.models import Wishlist, WishlistItem


def resolve_wishlist_from_user(user: User, wishlist_pk) -> Wishlist:
    """Return wishlist of the logged in user."""
    wishlist = Wishlist.objects.get(pk=wishlist_pk)
    if wishlist.user != user:
        raise PermissionDenied
    return wishlist


def resolve_wishlists_from_user(user: User) -> QuerySet[Wishlist]:
    """Return wishlists of the logged in user."""
    wishlists = Wishlist.objects.filter(user=user)
    return wishlists


@traced_resolver
def resolve_wishlist_from_info(info: ResolveInfo, wishlist_pk) -> Wishlist:
    """Return wishlist of the logged in user."""
    user = info.context.user
    return resolve_wishlist_from_user(user, wishlist_pk)


def resolve_wishlist_items_from_user(user: User, wishlist_pk) -> QuerySet[WishlistItem]:
    """Return wishlist items of the logged in user."""
    wishlist = resolve_wishlist_from_user(user, wishlist_pk)
    return wishlist.items.all()
