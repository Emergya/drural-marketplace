import graphene

from ...attribute.models import Attribute, AttributeValue
from ...core.exceptions import PermissionDenied
from ...core.permissions import SitePermissions
from ...discount.models import Sale, Voucher
from ...menu.models import MenuItem
from ...page.models import Page
from ...product.models import Category, Collection, Product, ProductVariant
from ...shipping.models import ShippingMethod
from ..attribute.resolvers import resolve_attributes
from ..core.connection import CountableConnection
from ..core.fields import BaseConnectionField
from ..core.utils import from_global_id_or_error
from ..decorators import permission_required
from ..menu.resolvers import resolve_menu_items
from ..page.resolvers import resolve_pages
from ..product.resolvers import resolve_categories
from ..translations import types as translation_types
from .resolvers import (
    resolve_attribute_values,
    resolve_collections,
    resolve_product_variants,
    resolve_product_variants_by_company,
    resolve_products,
    resolve_products_by_company,
    resolve_sales,
    resolve_sales_by_company,
    resolve_shipping_methods,
    resolve_vouchers,
    resolve_vouchers_by_company,
)


class TranslatableItem(graphene.Union):
    class Meta:
        types = (
            translation_types.ProductTranslatableContent,
            translation_types.CollectionTranslatableContent,
            translation_types.CategoryTranslatableContent,
            translation_types.AttributeTranslatableContent,
            translation_types.AttributeValueTranslatableContent,
            translation_types.ProductVariantTranslatableContent,
            translation_types.PageTranslatableContent,
            translation_types.ShippingMethodTranslatableContent,
            translation_types.SaleTranslatableContent,
            translation_types.VoucherTranslatableContent,
            translation_types.MenuItemTranslatableContent,
        )


class TranslatableItemConnection(CountableConnection):
    class Meta:
        node = TranslatableItem


class TranslatableKinds(graphene.Enum):
    ATTRIBUTE = "Attribute"
    ATTRIBUTE_VALUE = "AttributeValue"
    CATEGORY = "Category"
    COLLECTION = "Collection"
    MENU_ITEM = "MenuItem"
    PAGE = "Page"
    PRODUCT = "Product"
    SALE = "Sale"
    SHIPPING_METHOD = "ShippingMethod"
    VARIANT = "ProductVariant"
    VOUCHER = "Voucher"


class TranslationQueries(graphene.ObjectType):
    translations = BaseConnectionField(
        TranslatableItemConnection,
        description="Returns a list of all translatable items of a given kind.",
        kind=graphene.Argument(
            TranslatableKinds, required=True, description="Kind of objects to retrieve."
        ),
    )
    translation = graphene.Field(
        TranslatableItem,
        id=graphene.Argument(
            graphene.ID, description="ID of the object to retrieve.", required=True
        ),
        kind=graphene.Argument(
            TranslatableKinds,
            required=True,
            description="Kind of the object to retrieve.",
        ),
    )

    @permission_required(SitePermissions.MANAGE_TRANSLATIONS)
    def resolve_translations(self, info, kind, **_kwargs):
        user = info.context.user
        if kind == TranslatableKinds.PRODUCT and user.is_staff:
            return resolve_products(info, user)
        elif kind == TranslatableKinds.PRODUCT:
            return resolve_products_by_company(info, user)
        elif kind == TranslatableKinds.COLLECTION and user.is_staff:
            return resolve_collections(info)
        elif kind == TranslatableKinds.CATEGORY and user.is_staff:
            return resolve_categories(info)
        elif kind == TranslatableKinds.PAGE and user.is_staff:
            return resolve_pages(info)
        elif kind == TranslatableKinds.SHIPPING_METHOD and user.is_staff:
            return resolve_shipping_methods(info)
        elif kind == TranslatableKinds.VOUCHER and user.is_staff:
            return resolve_vouchers(info, user)
        elif kind == TranslatableKinds.VOUCHER:
            return resolve_vouchers_by_company(info, user)
        elif kind == TranslatableKinds.ATTRIBUTE and user.is_staff:
            return resolve_attributes(info)
        elif kind == TranslatableKinds.ATTRIBUTE_VALUE and user.is_staff:
            return resolve_attribute_values(info)
        elif kind == TranslatableKinds.VARIANT and user.is_staff:
            return resolve_product_variants(info, user)
        elif kind == TranslatableKinds.VARIANT:
            return resolve_product_variants_by_company(info, user)
        elif kind == TranslatableKinds.MENU_ITEM and user.is_staff:
            return resolve_menu_items(info)
        elif kind == TranslatableKinds.SALE and user.is_staff:
            return resolve_sales(info, user)
        elif kind == TranslatableKinds.SALE:
            return resolve_sales_by_company(info, user)
        else:
            raise PermissionDenied()

    @permission_required(SitePermissions.MANAGE_TRANSLATIONS)
    def resolve_translation(self, info, id, kind, **_kwargs):
        _type, kind_id = from_global_id_or_error(id)
        if not _type == kind:
            return None
        models = {
            TranslatableKinds.PRODUCT.value: Product,
            TranslatableKinds.COLLECTION.value: Collection,
            TranslatableKinds.CATEGORY.value: Category,
            TranslatableKinds.ATTRIBUTE.value: Attribute,
            TranslatableKinds.ATTRIBUTE_VALUE.value: AttributeValue,
            TranslatableKinds.VARIANT.value: ProductVariant,
            TranslatableKinds.PAGE.value: Page,
            TranslatableKinds.SHIPPING_METHOD.value: ShippingMethod,
            TranslatableKinds.SALE.value: Sale,
            TranslatableKinds.VOUCHER.value: Voucher,
            TranslatableKinds.MENU_ITEM.value: MenuItem,
        }
        user = info.context.user
        res = models[kind].objects.filter(pk=kind_id).first()
        if user.is_staff:
            return res
        else:
            if models[kind] == Product and res.company in user.companies.all():
                return res
            elif (
                models[kind] == ProductVariant
                and res.product.company in user.companies.all()
            ):
                return res
            elif models[kind] == Voucher:
                for p in res.products.all():
                    if p.company in user.companies.all():
                        return res
            elif models[kind] == Sale:
                for p in res.products.all():
                    if p.company in user.companies.all():
                        return res
            raise PermissionDenied
