from enum import Enum
from typing import Iterable, List

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission


class BasePermissionEnum(Enum):
    @property
    def codename(self):
        return self.value.split(".")[1]


class AccountPermissions(BasePermissionEnum):
    MANAGE_USERS = "account.manage_users"
    MANAGE_STAFF = "account.manage_staff"
    IMPERSONATE_USER = "account.impersonate_user"


class AppPermission(BasePermissionEnum):
    MANAGE_APPS = "app.manage_apps"


class ChannelPermissions(BasePermissionEnum):
    MANAGE_CHANNELS = "channel.manage_channels"


class DiscountPermissions(BasePermissionEnum):
    MANAGE_DISCOUNTS = "discount.manage_discounts"


class PluginsPermissions(BasePermissionEnum):
    MANAGE_PLUGINS = "plugins.manage_plugins"


class GiftcardPermissions(BasePermissionEnum):
    MANAGE_GIFT_CARD = "giftcard.manage_gift_card"


class MenuPermissions(BasePermissionEnum):
    MANAGE_MENUS = "menu.manage_menus"


class CheckoutPermissions(BasePermissionEnum):
    MANAGE_CHECKOUTS = "checkout.manage_checkouts"


class OrderPermissions(BasePermissionEnum):
    MANAGE_ORDERS = "order.manage_orders"


class PaymentPermissions(BasePermissionEnum):
    HANDLE_PAYMENTS = "payment.handle_payments"


class PagePermissions(BasePermissionEnum):
    MANAGE_PAGES = "page.manage_pages"


class PageTypePermissions(BasePermissionEnum):
    MANAGE_PAGE_TYPES_AND_ATTRIBUTES = "page.manage_page_types_and_attributes"


class CompanyPermissions(BasePermissionEnum):
    MANAGE_COMPANIES = "company.manage_companies"


class ProductPermissions(BasePermissionEnum):
    MANAGE_PRODUCTS = "product.manage_products"


class CategoryPermissions(BasePermissionEnum):
    MANAGE_CATEGORIES = "product.manage_categories"


class CollectionPermissions(BasePermissionEnum):
    MANAGE_COLLECTIONS = "product.manage_collections"


class ProductTypePermissions(BasePermissionEnum):
    MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES = "product.manage_product_types_and_attributes"


class ShippingPermissions(BasePermissionEnum):
    MANAGE_SHIPPING = "shipping.manage_shipping"


class SitePermissions(BasePermissionEnum):
    MANAGE_SETTINGS = "site.manage_settings"
    MANAGE_TRANSLATIONS = "site.manage_translations"


class WishlistPermissions(BasePermissionEnum):
    MANAGE_WISHLISTS = "wishlist.manage_wishlists"


class StatPermissions(BasePermissionEnum):
    MANAGE_PRODUCT_STATS = "product.manage_product_stats"
    MANAGE_USER_STATS = "account.manage_user_stats"
    MANAGE_COMPANY_STATS = "company.manage_company_stats"


SELLER_PERMISSIONS = [
    AccountPermissions.MANAGE_USERS,
    CheckoutPermissions.MANAGE_CHECKOUTS,
    OrderPermissions.MANAGE_ORDERS,
    ProductPermissions.MANAGE_PRODUCTS,
    SitePermissions.MANAGE_TRANSLATIONS,
    AppPermission.MANAGE_APPS,
]

PERMISSIONS_ENUMS = [
    AccountPermissions,
    AppPermission,
    ChannelPermissions,
    DiscountPermissions,
    PluginsPermissions,
    GiftcardPermissions,
    MenuPermissions,
    OrderPermissions,
    PagePermissions,
    PageTypePermissions,
    PaymentPermissions,
    ProductPermissions,
    ProductTypePermissions,
    ShippingPermissions,
    SitePermissions,
    CheckoutPermissions,
    CompanyPermissions,
    WishlistPermissions,
    StatPermissions,
    CategoryPermissions,
    CollectionPermissions,
]


def split_permission_codename(permissions):
    return [permission.split(".")[1] for permission in permissions]


def get_permissions_codename():
    permissions_values = [
        enum.codename
        for permission_enum in PERMISSIONS_ENUMS
        for enum in permission_enum
    ]
    return permissions_values


def get_seller_permissions_codename():
    permissions_values = [enum.codename for enum in SELLER_PERMISSIONS]
    return permissions_values


def get_permissions_enum_dict():
    return {
        enum.name: enum
        for permission_enum in PERMISSIONS_ENUMS
        for enum in permission_enum
    }


def get_permissions_from_names(names: List[str]):
    """Convert list of permission names - ['MANAGE_ORDERS'] to Permission db objects."""
    permissions = get_permissions_enum_dict()
    return get_permissions([permissions[name].value for name in names])


def get_permission_names(permissions: Iterable["Permission"]):
    """Convert Permissions db objects to list of Permission enums."""
    permission_dict = get_permissions_enum_dict()
    names = set()
    for perm in permissions:
        for _, perm_enum in permission_dict.items():
            if perm.codename == perm_enum.codename:
                names.add(perm_enum.name)
    return names


def get_permissions_enum_list():
    permissions_list = [
        (enum.name, enum.value)
        for permission_enum in PERMISSIONS_ENUMS
        for enum in permission_enum
    ]
    return permissions_list


def get_permissions(permissions=None):
    if permissions is None:
        codenames = get_permissions_codename()
    else:
        codenames = split_permission_codename(permissions)
    return get_permissions_from_codenames(codenames)


def get_permissions_from_codenames(permission_codenames: List[str]):
    return (
        Permission.objects.filter(codename__in=permission_codenames)
        .prefetch_related("content_type")
        .order_by("codename")
    )


def permissions_required(perms, context):
    User = get_user_model()
    if isinstance(context, User):
        if context.has_perms(perms):
            return True
    else:
        # for now MANAGE_STAFF permission for app is not supported
        if AccountPermissions.MANAGE_STAFF in perms:
            return False
        return context.has_perms(perms)
    return False


def has_one_of_permissions(requestor, permissions=None):
    if not permissions:
        return True
    for perm in permissions:
        if permissions_required((perm,), requestor):
            return True
    return False


def has_one_of_permissions_as_staff(requestor, permissions=None):
    User = get_user_model()
    has_permission = has_one_of_permissions(requestor, permissions)
    if not isinstance(requestor, User):
        return False
    if has_permission:
        return requestor.is_staff
    return False
