import itertools
import json
import os
import random
import unicodedata
import uuid
from collections import defaultdict
from decimal import Decimal
from typing import Type, Union
from unittest.mock import patch

from django.conf import settings
from django.contrib.auth.models import Group, Permission
from django.contrib.gis.geos import Point
from django.contrib.sites.models import Site
from django.core.files import File
from django.db.models import F, Q
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify
from faker import Factory
from faker.providers import BaseProvider
from measurement.measures import Weight
from prices import Money, TaxedMoney

from ...account.models import Address, User
from ...account.utils import SELLERS_GROUP_NAME, store_user_address
from ...app.models import App
from ...app.types import AppType
from ...attribute.models import (
    AssignedPageAttribute,
    AssignedProductAttribute,
    AssignedVariantAttribute,
    Attribute,
    AttributePage,
    AttributeProduct,
    AttributeValue,
    AttributeVariant,
)
from ...channel.models import Channel
from ...checkout import AddressType
from ...company.models import Company, CompanyAddress, StripeCredentials
from ...core.permissions import (
    AccountPermissions,
    CheckoutPermissions,
    GiftcardPermissions,
    OrderPermissions,
    get_permissions,
    get_seller_permissions_codename,
)
from ...core.utils import build_absolute_uri
from ...core.weight import zero_weight
from ...discount import DiscountValueType, VoucherType
from ...discount.models import Sale, SaleChannelListing, Voucher, VoucherChannelListing
from ...discount.utils import fetch_discounts
from ...giftcard.models import GiftCard
from ...menu.models import Menu
from ...order import OrderStatus
from ...order.models import Fulfillment, Order, OrderLine
from ...order.utils import update_order_status
from ...page.models import Page, PageType
from ...payment import gateway
from ...payment.models import PaymentMethod
from ...payment.utils import create_payment
from ...plugins.manager import get_plugins_manager
from ...product.models import (
    BookableResource,
    BookableResourceDailyCalendar,
    BookableResourceProduct,
    Booking,
    Category,
    CategoryProduct,
    Collection,
    CollectionChannelListing,
    CollectionProduct,
    Product,
    ProductAddress,
    ProductChannelListing,
    ProductMedia,
    ProductRating,
    ProductType,
    ProductVariant,
    ProductVariantChannelListing,
    Slot,
    VariantMedia,
)
from ...product.tasks import update_products_discounted_prices_of_discount_task
from ...product.thumbnails import (
    create_collection_background_image_thumbnails,
    create_product_thumbnails,
)
from ...settings import POPULATE_DEV
from ...shipping.models import (
    ShippingMethod,
    ShippingMethodChannelListing,
    ShippingMethodType,
    ShippingZone,
)
from ...site.models import SiteSettings
from ...warehouse.management import increase_stock
from ...warehouse.models import Stock, Warehouse
from ...webhook.event_types import WebhookEventType
from ...webhook.models import Webhook, WebhookEvent
from ...wishlist.models import Wishlist, WishlistItem

fake = Factory.create()
fake.seed(0)

PRODUCTS_LIST_DIR = "products-list/"

COMPANIES_LIST_DIR = "companies/"

WISHLISTS_LIST_DIR = "wishlists/"

DUMMY_STAFF_PASSWORD = "password"

DEFAULT_CURRENCY = os.environ.get("DEFAULT_CURRENCY", "EUR")

CUSTOMERS = (
    User.objects.filter(is_superuser=False, is_staff=False)
    .exclude(default_billing_address=None)
    .order_by("pk")
    .distinct()
)

IMAGES_MAPPING = {
    61: ["saleordemoservice_05.jpg"],
    62: ["saleordemoservice_04.jpg"],
    63: ["saleordemoservice_02.jpg"],
    64: ["saleordemoservice_10.jpg"],
    65: ["saleordemoservice_09.jpg"],
    71: ["saleordemoservice_12.jpg"],
    72: ["saleordemoservice_03.jpg"],
    73: ["saleordemoservice_06.png"],
    74: ["saleordemoservice_01.jpg"],
    75: ["saleordemoservice_11.jpg"],
    76: ["saleordemoservice_08.jpg"],
    77: ["saleordemoservice_07.jpg"],
}


COLLECTION_IMAGES = {61: "summer.jpg", 62: "clothing.jpg", 63: "clothing.jpg"}


def get_weight(weight):
    if not weight:
        return zero_weight()
    value, unit = weight.split(":")
    return Weight(**{unit: value})


def create_product_types(product_type_data):
    for product_type in product_type_data:
        defaults = product_type["fields"]
        defaults["weight"] = get_weight(defaults["weight"])
        ProductType.objects.update_or_create(defaults=defaults)


def create_categories(categories_data, placeholder_dir):
    placeholder_dir = get_product_list_images_dir(placeholder_dir)
    for category in categories_data:
        pk = category["pk"]
        defaults = category["fields"]
        parent = defaults["parent"]
        if parent:
            defaults["parent"] = Category.objects.get(pk=parent)
        Category.objects.update_or_create(pk=pk, defaults=defaults)


def create_collection_channel_listings(collection_channel_listings_data):
    channel_EUR = Channel.objects.get(currency_code=DEFAULT_CURRENCY)
    for collection_channel_listing in collection_channel_listings_data:
        defaults = collection_channel_listing["fields"]
        defaults["collection_id"] = defaults.pop("collection")
        defaults.pop("channel")
        defaults["channel_id"] = channel_EUR.pk
        CollectionChannelListing.objects.update_or_create(defaults=defaults)


def create_collections(data, placeholder_dir):
    placeholder_dir = get_product_list_images_dir(placeholder_dir)
    for collection in data:
        pk = collection["pk"]
        defaults = collection["fields"]
        if POPULATE_DEV:
            image_name = COLLECTION_IMAGES[pk]
            background_image = get_image(placeholder_dir, image_name)
            defaults["background_image"] = background_image
            Collection.objects.update_or_create(pk=pk, defaults=defaults)
        else:
            image_name = COLLECTION_IMAGES[63]
            background_image = get_image(placeholder_dir, image_name)
            defaults["background_image"] = background_image
            Collection.objects.update_or_create(defaults=defaults)
        create_collection_background_image_thumbnails.delay(pk)


def assign_products_to_collections(associations: list):
    for value in associations:
        pk = value["pk"]
        defaults = value["fields"]
        defaults["collection_id"] = defaults.pop("collection")
        defaults["product_id"] = defaults.pop("product")
        CollectionProduct.objects.update_or_create(pk=pk, defaults=defaults)


def create_attributes(attributes_data):
    for attribute in attributes_data:
        pk = attribute["pk"]
        defaults = attribute["fields"]
        attr, _ = Attribute.objects.update_or_create(pk=pk, defaults=defaults)


def create_attributes_values(values_data):
    for value in values_data:
        pk = value["pk"]
        defaults = value["fields"]
        defaults["attribute_id"] = defaults.pop("attribute")
        AttributeValue.objects.update_or_create(pk=pk, defaults=defaults)


def assign_categories_to_products(associations: list):
    for value in associations:
        pk = value["pk"]
        defaults = value["fields"]
        defaults["category_id"] = defaults.pop("category")
        defaults["product_id"] = defaults.pop("product")
        CategoryProduct.objects.update_or_create(pk=pk, defaults=defaults)


def assign_bookable_resources_to_products(associations: list):
    for value in associations:
        pk = value["pk"]
        defaults = value["fields"]
        defaults["bookable_resource_id"] = defaults.pop("bookable_resource")
        defaults["product_id"] = defaults.pop("product")
        BookableResourceProduct.objects.update_or_create(pk=pk, defaults=defaults)


def create_products(products_data, placeholder_dir, create_images):
    for product in products_data:
        pk = product["pk"]
        # We are skipping products without images
        if pk not in IMAGES_MAPPING:
            continue

        defaults = product["fields"]
        defaults["weight"] = get_weight(defaults["weight"])
        defaults["company"] = Company.objects.get(pk=defaults["company"])
        defaults["category"] = Category.objects.get(pk=defaults["category"])
        defaults["product_type_id"] = defaults.pop("product_type")

        product, _ = Product.objects.update_or_create(pk=pk, defaults=defaults)

        if create_images:
            images = IMAGES_MAPPING.get(pk, [])
            for image_name in images:
                create_product_image(product, placeholder_dir, image_name)

        if product.is_billable:
            limit = random.randint(1, 3)
            if product.company.id == 66:
                payment_methods = list(
                    PaymentMethod.objects.filter(is_active=True).order_by("?")[:limit]
                )
            else:
                payment_methods = list(
                    PaymentMethod.objects.filter(is_active=True)
                    .exclude(name="Card")
                    .order_by("?")[:limit]
                )
            product.payment_methods.set(payment_methods)


def create_product_channel_listings(product_channel_listings_data):
    channel_EUR = Channel.objects.get(currency_code=DEFAULT_CURRENCY)
    for product_channel_listing in product_channel_listings_data:
        pk = product_channel_listing["pk"]
        defaults = product_channel_listing["fields"]
        defaults["product_id"] = defaults.pop("product")
        defaults.pop("channel")
        defaults["channel_id"] = channel_EUR.pk
        ProductChannelListing.objects.update_or_create(pk=pk, defaults=defaults)


def create_stocks(variant, warehouse_qs=None, **defaults):
    if warehouse_qs is None:
        warehouse_qs = Warehouse.objects.all()

    for warehouse in warehouse_qs:
        Stock.objects.update_or_create(
            warehouse=warehouse, product_variant=variant, defaults=defaults
        )


def create_product_variants(variants_data, create_images):
    for variant in variants_data:
        pk = variant["pk"]
        defaults = variant["fields"]
        defaults["weight"] = get_weight(defaults["weight"])
        product_id = defaults.pop("product")
        # We have not created products without images
        if product_id not in IMAGES_MAPPING:
            continue
        defaults["product_id"] = product_id
        set_field_as_money(defaults, "price_override")
        set_field_as_money(defaults, "cost_price")
        is_default_variant = defaults.pop("default", False)
        variant, _ = ProductVariant.objects.update_or_create(pk=pk, defaults=defaults)
        if is_default_variant:
            product = variant.product
            product.default_variant = variant
            product.save(update_fields=["default_variant", "updated_at"])
        if create_images:
            image = variant.product.get_first_image()
            VariantMedia.objects.get_or_create(variant=variant, media=image)
        quantity = random.randint(100, 500)
        create_stocks(variant, quantity=quantity)


def create_product_variant_channel_listings(product_variant_channel_listings_data):
    channel_EUR = Channel.objects.get(currency_code=DEFAULT_CURRENCY)
    for variant_channel_listing in product_variant_channel_listings_data:
        pk = variant_channel_listing["pk"]
        defaults = variant_channel_listing["fields"]
        defaults["variant_id"] = defaults.pop("variant")
        defaults.pop("channel")
        defaults["channel_id"] = channel_EUR.pk
        ProductVariantChannelListing.objects.update_or_create(pk=pk, defaults=defaults)


def assign_attributes_to_product_types(
    association_model: Union[Type[AttributeProduct], Type[AttributeVariant]],
    attributes: list,
):
    for value in attributes:
        pk = value["pk"]
        defaults = value["fields"]
        defaults["attribute_id"] = defaults.pop("attribute")
        defaults["product_type_id"] = defaults.pop("product_type")
        association_model.objects.update_or_create(pk=pk, defaults=defaults)


def assign_attributes_to_page_types(
    association_model: AttributePage,
    attributes: list,
):
    for value in attributes:
        pk = value["pk"]
        defaults = value["fields"]
        defaults["attribute_id"] = defaults.pop("attribute")
        defaults["page_type_id"] = defaults.pop("page_type")
        association_model.objects.update_or_create(pk=pk, defaults=defaults)


def assign_attributes_to_products(product_attributes):
    for value in product_attributes:
        pk = value["pk"]
        defaults = value["fields"]
        defaults["product_id"] = defaults.pop("product")
        defaults["assignment_id"] = defaults.pop("assignment")
        assigned_values = defaults.pop("values")
        assoc, created = AssignedProductAttribute.objects.update_or_create(
            pk=pk, defaults=defaults
        )
        if created:
            assoc.values.set(AttributeValue.objects.filter(pk__in=assigned_values))


def assign_attributes_to_variants(variant_attributes):
    for value in variant_attributes:
        pk = value["pk"]
        defaults = value["fields"]
        defaults["variant_id"] = defaults.pop("variant")
        defaults["assignment_id"] = defaults.pop("assignment")
        assigned_values = defaults.pop("values")
        assoc, created = AssignedVariantAttribute.objects.update_or_create(
            pk=pk, defaults=defaults
        )
        if created:
            assoc.values.set(AttributeValue.objects.filter(pk__in=assigned_values))


def assign_attributes_to_pages(page_attributes):
    for value in page_attributes:
        defaults = value["fields"]
        defaults["page_id"] = defaults.pop("page")
        defaults["assignment_id"] = defaults.pop("assignment")
        assigned_values = defaults.pop("values")
        assoc, created = AssignedPageAttribute.objects.update_or_create(
            defaults=defaults
        )
        if created:
            assoc.values.set(AttributeValue.objects.filter(pk__in=assigned_values))


def set_field_as_money(defaults, field):
    amount_field = f"{field}_amount"
    if amount_field in defaults and defaults[amount_field] is not None:
        defaults[field] = Money(defaults[amount_field], DEFAULT_CURRENCY)


def create_products_by_schema(placeholder_dir, create_images):
    if POPULATE_DEV:
        populate = "populatedb_dev_data.json"
    else:
        populate = "populatedb_data.json"

    path = os.path.join(settings.PROJECT_ROOT, "saleor", "static", populate)
    with open(path) as f:
        db_items = json.load(f)
    types = defaultdict(list)
    # Sort db objects by its model
    for item in db_items:
        model = item.pop("model")
        types[model].append(item)

    create_product_types(product_type_data=types["product.producttype"])
    create_categories(
        categories_data=types["product.category"], placeholder_dir=placeholder_dir
    )
    create_companies(
        company_data=types["company.company"], placeholder_dir=placeholder_dir
    )
    create_company_address(company_address_data=types["company.companyaddress"])
    create_attributes(attributes_data=types["attribute.attribute"])
    create_attributes_values(values_data=types["attribute.attributevalue"])
    create_products(
        products_data=types["product.product"],
        placeholder_dir=placeholder_dir,
        create_images=create_images,
    )
    create_product_address(product_address_data=types["product.productaddress"])
    create_product_channel_listings(
        product_channel_listings_data=types["product.productchannellisting"],
    )
    create_product_variants(
        variants_data=types["product.productvariant"], create_images=create_images
    )
    create_product_variant_channel_listings(
        product_variant_channel_listings_data=types[
            "product.productvariantchannellisting"
        ],
    )
    create_wishlist(wishlist_data=types["wishlist.wishlist"])

    create_wishlist_item(wishlist_item_data=types["wishlist.wishlistitem"])

    assign_attributes_to_product_types(
        AttributeProduct, attributes=types["attribute.attributeproduct"]
    )
    assign_attributes_to_product_types(
        AttributeVariant, attributes=types["attribute.attributevariant"]
    )
    assign_attributes_to_page_types(
        AttributePage, attributes=types["attribute.attributepage"]
    )
    assign_attributes_to_products(
        product_attributes=types["attribute.assignedproductattribute"]
    )
    assign_attributes_to_variants(
        variant_attributes=types["attribute.assignedvariantattribute"]
    )
    assign_attributes_to_pages(page_attributes=types["attribute.assignedpageattribute"])
    create_collections(
        data=types["product.collection"], placeholder_dir=placeholder_dir
    )
    create_collection_channel_listings(
        collection_channel_listings_data=types["product.collectionchannellisting"],
    )
    assign_products_to_collections(associations=types["product.collectionproduct"])

    assign_categories_to_products(associations=types["product.productcategory"])

    create_resources_for_companies(
        bookable_resource_data=types["product.bookableresource"]
    )
    create_bookable_resource_daily_calendar(
        bookable_resource_daily_calendar_data=types[
            "product.bookableresourcedailycalendar"
        ]
    )
    assign_bookable_resources_to_products(
        associations=types["product.bookableresourceproduct"]
    )
    create_slots(slot_data=types["product.slot"])
    create_bookings(booking_data=types["product.booking"])
    create_review(review_data=types["product.productrating"])


class SaleorProvider(BaseProvider):
    def money(self):
        return Money(fake.pydecimal(2, 2, positive=True), DEFAULT_CURRENCY)

    def weight(self):
        return Weight(kg=fake.pydecimal(1, 2, positive=True))


fake.add_provider(SaleorProvider)


def get_email(first_name, last_name):
    _first = unicodedata.normalize("NFD", first_name).encode("ascii", "ignore")
    _last = unicodedata.normalize("NFD", last_name).encode("ascii", "ignore")
    return "%s.%s@example.com" % (
        _first.lower().decode("utf-8"),
        _last.lower().decode("utf-8"),
    )


def create_product_image(product, placeholder_dir, image_name):
    image = get_image(placeholder_dir, image_name)
    # We don't want to create duplicated product images
    if product.media.count() >= len(IMAGES_MAPPING.get(product.pk, [])):
        return None
    product_image = ProductMedia(product=product, image=image)
    product_image.save()
    create_product_thumbnails.delay(product_image.pk)
    return product_image


def create_address(save=True, **kwargs):
    address = Address(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        street_address_1=fake.street_address(),
        city=fake.city(),
        country=settings.DEFAULT_COUNTRY,
        **kwargs,
    )

    if address.country == "US":
        state = fake.state_abbr()
        address.country_area = state
        address.postal_code = fake.postalcode_in_state(state)
    else:
        address.postal_code = fake.postalcode()

    if save:
        address.save()
    return address


def create_fake_user(user_password, placeholder_dir, save=True):
    address = create_address(save=save)
    email = get_email(address.first_name, address.last_name)

    # Skip the email if it already exists
    try:
        return User.objects.get(email=email)
    except User.DoesNotExist:
        pass

    user = User(
        id=fake.numerify(),
        first_name=address.first_name,
        last_name=address.last_name,
        email=email,
        default_billing_address=address,
        default_shipping_address=address,
        is_active=True,
        note=fake.paragraph(),
        date_joined=fake.date_time(tzinfo=timezone.get_current_timezone()),
    )

    if save:
        user.set_password(user_password)
        user.save()
        user.addresses.add(address)
        wishlist = Wishlist(user=user, default=True)
        wishlist.save()
    return user


# We don't want to spam the console with payment confirmations sent to
# fake customers.
@patch("saleor.plugins.manager.PluginsManager.notify")
def create_fake_payment(mock_notify, order):
    payment = create_payment(
        gateway="mirumee.payments.dummy",
        customer_ip_address=fake.ipv4(),
        email=order.user_email,
        order=order,
        payment_token=str(uuid.uuid4()),
        total=order.total.gross.amount,
        currency=order.total.gross.currency,
    )
    manager = get_plugins_manager()

    # Create authorization transaction
    gateway.authorize(payment, payment.token, manager, order.channel.slug)
    # 20% chance to void the transaction at this stage
    if random.choice([0, 0, 0, 0, 1]):
        gateway.void(payment, manager, order.channel.slug)
        return payment
    # 25% to end the payment at the authorization stage
    if not random.choice([1, 1, 1, 0]):
        return payment
    # Create capture transaction
    gateway.capture(payment, manager, order.channel.slug)
    # 25% to refund the payment
    if random.choice([0, 0, 0, 1]):
        gateway.refund(payment, manager, order.channel.slug)
    return payment


def create_order_lines(index, order, discounts, how_many=10):
    channel = order.channel
    available_variant_ids = channel.variant_listings.values_list(
        "variant_id", flat=True
    )
    variants = ProductVariant.objects.filter(pk__in=available_variant_ids)
    if index <= 3:
        variants = variants.filter(product__pk=61)
    if index == 4:
        variants = variants.filter(product__pk=62)
    variants = variants.order_by("?").prefetch_related("product__product_type")[
        :how_many
    ]

    variants_iter = itertools.cycle(variants)
    lines = []
    for _ in range(how_many):
        variant = next(variants_iter)
        variant_channel_listing = variant.channel_listings.get(channel=channel)
        product = variant.product
        quantity = random.randrange(1, 5)
        unit_price = variant.get_price(
            product,
            product.collections.all(),
            channel,
            variant_channel_listing,
            product.categories.all(),
            discounts,
        )
        unit_price = TaxedMoney(net=unit_price, gross=unit_price)
        total_price = unit_price * quantity
        lines.append(
            OrderLine(
                order=order,
                product_name=str(product),
                variant_name=str(variant),
                product_sku=variant.sku,
                is_shipping_required=variant.is_shipping_required(),
                quantity=quantity,
                variant=variant,
                unit_price=unit_price,
                total_price=total_price,
                undiscounted_unit_price=unit_price,
                undiscounted_total_price=total_price,
                tax_rate=0,
            )
        )
    lines = OrderLine.objects.bulk_create(lines)
    manager = get_plugins_manager()
    country = order.shipping_method.shipping_zone.countries[0]
    warehouses = Warehouse.objects.filter(
        shipping_zones__countries__contains=country
    ).order_by("?")
    warehouse_iter = itertools.cycle(warehouses)
    for line in lines:
        variant = line.variant
        unit_price = manager.calculate_order_line_unit(
            order, line, variant, variant.product
        )
        total_price = manager.calculate_order_line_total(
            order, line, variant, variant.product
        )
        line.unit_price = unit_price
        line.total_price = total_price
        line.undiscounted_unit_price = unit_price
        line.undiscounted_total_price = total_price
        line.tax_rate = unit_price.tax / unit_price.net
        warehouse = next(warehouse_iter)
        increase_stock(line, warehouse, line.quantity, allocate=True)
    OrderLine.objects.bulk_update(
        lines,
        [
            "unit_price_net_amount",
            "unit_price_gross_amount",
            "undiscounted_unit_price_gross_amount",
            "undiscounted_unit_price_net_amount",
            "undiscounted_total_price_gross_amount",
            "undiscounted_total_price_net_amount",
            "currency",
            "tax_rate",
        ],
    )
    return lines


def create_fulfillments(order):
    for line in order.lines.all():
        if random.choice([False, True]):
            fulfillment, _ = Fulfillment.objects.get_or_create(order=order)
            quantity = random.randrange(0, line.quantity) + 1
            allocation = line.allocations.get()
            fulfillment.lines.create(
                order_line=line, quantity=quantity, stock=allocation.stock
            )
            line.quantity_fulfilled = quantity
            line.save(update_fields=["quantity_fulfilled"])

            allocation.quantity_allocated = F("quantity_allocated") - quantity
            allocation.save(update_fields=["quantity_allocated"])

    update_order_status(order)


def create_fake_order(discounts, index, max_order_lines=2):
    channel = Channel.objects.first()
    if index > 4:
        customer = random.choice([None, CUSTOMERS.first()])
    else:
        customer = CUSTOMERS[index]

    # 20% chance to be unconfirmed order.
    will_be_unconfirmed = random.choice([0, 0, 0, 0, 1])

    if customer:
        address = customer.default_shipping_address
        order_data = {
            "user": customer,
            "billing_address": customer.default_billing_address,
            "shipping_address": address,
        }
    else:
        address = create_address()
        order_data = {
            "billing_address": address,
            "shipping_address": address,
            "user_email": get_email(address.first_name, address.last_name),
        }

    manager = get_plugins_manager()
    shipping_method_chanel_listing = (
        ShippingMethodChannelListing.objects.filter(channel=channel)
        .order_by("?")
        .first()
    )
    shipping_method = shipping_method_chanel_listing.shipping_method
    shipping_price = shipping_method_chanel_listing.price
    shipping_price = manager.apply_taxes_to_shipping(
        shipping_price, address, channel_slug=channel.slug
    )
    booking = None
    if index == 0:
        booking = Booking.objects.first()
        booking.user = customer
        booking.save()
    order_data.update(
        {
            "channel": channel,
            "shipping_method": shipping_method,
            "shipping_method_name": shipping_method.name,
            "shipping_price": shipping_price,
            "booking": booking,
        }
    )
    if will_be_unconfirmed:
        order_data["status"] = OrderStatus.UNCONFIRMED

    order = Order.objects.create(**order_data)
    lines = create_order_lines(
        index, order, discounts, random.randrange(1, max_order_lines)
    )
    order.total = sum([line.total_price for line in lines], shipping_price)
    weight = Weight(kg=0)
    for line in order.lines.all():
        weight += line.variant.get_weight()
    order.weight = weight
    order.save()

    create_fake_payment(order=order)

    if not will_be_unconfirmed:
        create_fulfillments(order)

    return order


def create_fake_sale():
    sale = Sale.objects.create(
        name="Happy %s day!" % fake.word(),
        type=DiscountValueType.PERCENTAGE,
    )
    for channel in Channel.objects.all():
        SaleChannelListing.objects.create(
            channel=channel,
            currency=channel.currency_code,
            sale=sale,
            discount_value=random.choice([10, 20, 30, 40, 50]),
        )
    for product in Product.objects.all().order_by("?")[:4]:
        sale.products.add(product)
    return sale


def create_users(user_password, placeholder_dir, how_many=10):
    if POPULATE_DEV:
        for dummy in range(how_many):
            user = create_fake_user(user_password, placeholder_dir)
            yield "User: %s" % (user.email,)


def create_permission_groups(staff_password):
    super_users = User.objects.filter(is_superuser=True)
    if not super_users:
        super_users = create_staff_users(staff_password, 1, True)
    group = create_group("Full Access", get_permissions(), super_users)
    yield f"Group: {group}"

    staff_users = create_staff_users(staff_password)
    customer_support_codenames = [
        perm.codename
        for enum in [CheckoutPermissions, OrderPermissions, GiftcardPermissions]
        for perm in enum
    ]
    customer_support_codenames.append(AccountPermissions.MANAGE_USERS.codename)
    customer_support_permissions = Permission.objects.filter(
        codename__in=customer_support_codenames
    )
    group = create_group("Customer Support", customer_support_permissions, staff_users)
    yield f"Group: {group}"

    seller_permissions = Permission.objects.filter(
        codename__in=get_seller_permissions_codename()
    )
    group = create_group(SELLERS_GROUP_NAME, seller_permissions, [])
    yield f"Group: {SELLERS_GROUP_NAME}"


def create_payment_methods():
    card = PaymentMethod.objects.get_or_create(
        identifier="payment_methods.card", name="Card", is_active=True
    )
    yield f"Payment method: {card}"
    pay_at_store = PaymentMethod.objects.get_or_create(
        identifier="payment_methods.pay_at_store", name="Pay at store", is_active=True
    )
    yield f"Payment method: {pay_at_store}"
    transfer = PaymentMethod.objects.get_or_create(
        identifier="payment_methods.bank_transfer", name="Bank transfer", is_active=True
    )
    yield f"Payment method: {transfer}"


def create_staffs(staff_password):
    if POPULATE_DEV:
        for permission in get_permissions():
            base_name = permission.codename.split("_")[1:]

            group_name = " ".join(base_name)
            group_name += " management"
            group_name = group_name.capitalize()

            email_base_name = [
                name[:-1] if name[-1] == "s" else name for name in base_name
            ]
            user_email = ".".join(email_base_name)
            user_email += ".manager@example.com"

            user = _create_staff_user(staff_password, email=user_email)
            group = create_group(group_name, [permission], [user])

            yield f"Group: {group}"
            yield f"User: {user}"
        address = create_address()
        drural_seller = User.objects.create_user(
            first_name="John",
            last_name="James",
            email="drural.seller@example.com",
            password="dRural.!1234",
            default_billing_address=address,
            default_shipping_address=address,
            is_staff=False,
            is_active=True,
            is_superuser=False,
        )
        create_staff_app(
            "Pony Pisador App",
            "http://172.17.0.1:8080",
            get_permissions(),
            drural_seller,
        )
        yield f"User: {drural_seller}"


def create_staff_app(name, app_url, permissions, user):
    app = App.objects.create(
        name=name,
        is_active=True,
        type=AppType.LOCAL,
        app_url=app_url,
        version="1.0",
        user=user,
    )
    app.permissions.add(*permissions)
    webhook = Webhook.objects.create(
        name="Draft Orders Webhooks",
        app=app,
        target_url=app_url,
        is_active=True,
        secret_key="secretKeyToken",
    )
    WebhookEvent.objects.create(
        webhook=webhook, event_type=WebhookEventType.NOTIFY_USER
    )


def create_group(name, permissions, users):
    group, _ = Group.objects.get_or_create(name=name)
    group.permissions.add(*permissions)
    if POPULATE_DEV:
        group.user_set.add(*users)
    return group


def _create_staff_user(staff_password, email=None, superuser=False):
    if POPULATE_DEV:
        user = User.objects.filter(email=email).first()
        if user:
            return user
        address = create_address()
        first_name = address.first_name
        last_name = address.last_name
        if not email:
            email = get_email(first_name, last_name)

        staff_user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=staff_password,
            default_billing_address=address,
            default_shipping_address=address,
            is_staff=True,
            is_active=True,
            is_superuser=superuser,
        )
        return staff_user


def create_staff_users(staff_password, how_many=2, superuser=False):
    users = []
    for _ in range(how_many):
        staff_user = _create_staff_user(staff_password, superuser=superuser)
        users.append(staff_user)
    return users


def create_orders(how_many=20):
    if POPULATE_DEV:
        discounts = fetch_discounts(timezone.now())
        for _ in range(how_many):
            order = create_fake_order(discounts, _)
            yield "Order: %s" % (order,)


def create_product_sales(how_many=5):
    if POPULATE_DEV:
        for dummy in range(how_many):
            sale = create_fake_sale()
            update_products_discounted_prices_of_discount_task.delay(sale.pk)
            yield "Sale: %s" % (sale,)


def create_channel(channel_name, currency_code, slug=None):
    if not slug:
        slug = slugify(channel_name)
    channel, _ = Channel.objects.get_or_create(
        slug=slug,
        defaults={
            "name": channel_name,
            "currency_code": currency_code,
            "is_active": True,
            "default_country": "ES",
        },
    )
    return f"Channel: {channel}"


def create_channels():
    yield create_channel(
        channel_name="Default-channel",
        currency_code=DEFAULT_CURRENCY,
        slug=settings.DEFAULT_CHANNEL_SLUG,
    )


def create_shipping_zone(shipping_methods_names, countries, shipping_zone_name):
    shipping_zone = ShippingZone.objects.get_or_create(
        name=shipping_zone_name, defaults={"countries": countries}
    )[0]
    shipping_methods = ShippingMethod.objects.bulk_create(
        [
            ShippingMethod(
                name=name,
                shipping_zone=shipping_zone,
                type=(
                    ShippingMethodType.PRICE_BASED
                    if random.randint(0, 1)
                    else ShippingMethodType.WEIGHT_BASED
                ),
                minimum_order_weight=0,
                maximum_order_weight=None,
            )
            for name in shipping_methods_names
        ]
    )
    channels = Channel.objects.all()
    for channel in channels:
        ShippingMethodChannelListing.objects.bulk_create(
            [
                ShippingMethodChannelListing(
                    shipping_method=shipping_method,
                    price_amount=fake.money().amount,
                    minimum_order_price_amount=Decimal(0),
                    maximum_order_price_amount=None,
                    channel=channel,
                    currency=channel.currency_code,
                )
                for shipping_method in shipping_methods
            ]
        )
    shipping_zone.channels.add(*channels)
    return "Shipping Zone: %s" % shipping_zone


def create_shipping_zone_default():
    shipping_zone = ShippingZone.objects.get_or_create(
        name="Default", defaults={"countries": "Default"}
    )[0]
    shipping_method = ShippingMethod.objects.get_or_create(
        name="Default",
        shipping_zone=shipping_zone,
        type=(
            ShippingMethodType.PRICE_BASED
            if random.randint(0, 1)
            else ShippingMethodType.WEIGHT_BASED
        ),
        minimum_order_weight=0,
        maximum_order_weight=None,
    )

    channel = Channel.objects.first()

    ShippingMethodChannelListing.objects.get_or_create(
        shipping_method=shipping_method,
        price_amount=fake.money().amount,
        minimum_order_price_amount=Decimal(0),
        maximum_order_price_amount=None,
        channel=channel,
        currency=channel.currency_code,
    )

    shipping_zone.channels.add(channel)
    return "Shipping Zone: %s" % shipping_zone


def create_shipping_zones():
    european_countries = [
        "AX",
        "AL",
        "AD",
        "AT",
        "BY",
        "BE",
        "BA",
        "BG",
        "HR",
        "CZ",
        "DK",
        "EE",
        "FO",
        "FI",
        "FR",
        "DE",
        "GI",
        "GR",
        "GG",
        "VA",
        "HU",
        "IS",
        "IE",
        "IM",
        "IT",
        "JE",
        "LV",
        "LI",
        "LT",
        "LU",
        "MK",
        "MT",
        "MD",
        "MC",
        "ME",
        "NL",
        "NO",
        "PL",
        "PT",
        "RO",
        "RU",
        "SM",
        "RS",
        "SK",
        "SI",
        "ES",
        "SJ",
        "SE",
        "CH",
        "UA",
        "GB",
    ]
    yield create_shipping_zone(
        shipping_zone_name="Europe",
        countries=european_countries,
        shipping_methods_names=["DHL", "UPS", "Registered priority", "DB Schenker"],
    )
    oceanian_countries = [
        "AS",
        "AU",
        "CX",
        "CC",
        "CK",
        "FJ",
        "PF",
        "GU",
        "HM",
        "KI",
        "MH",
        "FM",
        "NR",
        "NC",
        "NZ",
        "NU",
        "NF",
        "MP",
        "PW",
        "PG",
        "PN",
        "WS",
        "SB",
        "TK",
        "TO",
        "TV",
        "UM",
        "VU",
        "WF",
    ]
    yield create_shipping_zone(
        shipping_zone_name="Oceania",
        countries=oceanian_countries,
        shipping_methods_names=["FBA", "FedEx Express", "Oceania Air Mail"],
    )
    asian_countries = [
        "AF",
        "AM",
        "AZ",
        "BH",
        "BD",
        "BT",
        "BN",
        "KH",
        "CN",
        "CY",
        "GE",
        "HK",
        "IN",
        "ID",
        "IR",
        "IQ",
        "IL",
        "JP",
        "JO",
        "KZ",
        "KP",
        "KR",
        "KW",
        "KG",
        "LA",
        "LB",
        "MO",
        "MY",
        "MV",
        "MN",
        "MM",
        "NP",
        "OM",
        "PK",
        "PS",
        "PH",
        "QA",
        "SA",
        "SG",
        "LK",
        "SY",
        "TW",
        "TJ",
        "TH",
        "TL",
        "TR",
        "TM",
        "AE",
        "UZ",
        "VN",
        "YE",
    ]
    yield create_shipping_zone(
        shipping_zone_name="Asia",
        countries=asian_countries,
        shipping_methods_names=["China Post", "TNT", "Aramex", "EMS"],
    )
    american_countries = [
        "AI",
        "AG",
        "AR",
        "AW",
        "BS",
        "BB",
        "BZ",
        "BM",
        "BO",
        "BQ",
        "BV",
        "BR",
        "CA",
        "KY",
        "CL",
        "CO",
        "CR",
        "CU",
        "CW",
        "DM",
        "DO",
        "EC",
        "SV",
        "FK",
        "GF",
        "GL",
        "GD",
        "GP",
        "GT",
        "GY",
        "HT",
        "HN",
        "JM",
        "MQ",
        "MX",
        "MS",
        "NI",
        "PA",
        "PY",
        "PE",
        "PR",
        "BL",
        "KN",
        "LC",
        "MF",
        "PM",
        "VC",
        "SX",
        "GS",
        "SR",
        "TT",
        "TC",
        "US",
        "UY",
        "VE",
        "VG",
        "VI",
    ]
    yield create_shipping_zone(
        shipping_zone_name="Americas",
        countries=american_countries,
        shipping_methods_names=["DHL", "UPS", "FedEx", "EMS"],
    )
    african_countries = [
        "DZ",
        "AO",
        "BJ",
        "BW",
        "IO",
        "BF",
        "BI",
        "CV",
        "CM",
        "CF",
        "TD",
        "KM",
        "CG",
        "CD",
        "CI",
        "DJ",
        "EG",
        "GQ",
        "ER",
        "SZ",
        "ET",
        "TF",
        "GA",
        "GM",
        "GH",
        "GN",
        "GW",
        "KE",
        "LS",
        "LR",
        "LY",
        "MG",
        "MW",
        "ML",
        "MR",
        "MU",
        "YT",
        "MA",
        "MZ",
        "NA",
        "NE",
        "NG",
        "RE",
        "RW",
        "SH",
        "ST",
        "SN",
        "SC",
        "SL",
        "SO",
        "ZA",
        "SS",
        "SD",
        "TZ",
        "TG",
        "TN",
        "UG",
        "EH",
        "ZM",
        "ZW",
    ]
    yield create_shipping_zone(
        shipping_zone_name="Africa",
        countries=african_countries,
        shipping_methods_names=[
            "Royale International",
            "ACE",
            "fastway couriers",
            "Post Office",
        ],
    )


def create_warehouses():
    for shipping_zone in ShippingZone.objects.all():
        shipping_zone_name = shipping_zone.name
        warehouse, _ = Warehouse.objects.update_or_create(
            name=shipping_zone_name,
            slug=slugify(shipping_zone_name),
            defaults={"address": create_address(company_name=fake.company())},
        )
        warehouse.shipping_zones.add(shipping_zone)


def create_warehouse_default():
    warehouse, _ = Warehouse.objects.update_or_create(
        name="Default",
        slug=slugify("Default"),
        defaults={"address": create_address(company_name=fake.company())},
    )
    ids = [zones.id for zones in ShippingZone.objects.all()]
    warehouse.shipping_zones.set(ids)


def create_vouchers():
    if POPULATE_DEV:
        channels = list(Channel.objects.all())
        voucher, created = Voucher.objects.get_or_create(
            code="FREESHIPPING",
            defaults={
                "type": VoucherType.SHIPPING,
                "name": "Free shipping",
                "discount_value_type": DiscountValueType.PERCENTAGE,
            },
        )
        for channel in channels:
            VoucherChannelListing.objects.get_or_create(
                voucher=voucher,
                channel=channel,
                defaults={"discount_value": 100, "currency": channel.currency_code},
            )
        if created:
            yield "Voucher #%d" % voucher.id
        else:
            yield "Shipping voucher already exists"

        voucher, created = Voucher.objects.get_or_create(
            code="DISCOUNT",
            defaults={
                "type": VoucherType.ENTIRE_ORDER,
                "name": "Big order discount",
                "discount_value_type": DiscountValueType.FIXED,
            },
        )
        for channel in channels:
            discount_value = 25
            min_spent_amount = 200
            if channel.currency_code == "PLN":
                min_spent_amount *= 4
                discount_value *= 4
            VoucherChannelListing.objects.get_or_create(
                voucher=voucher,
                channel=channel,
                defaults={
                    "discount_value": discount_value,
                    "currency": channel.currency_code,
                    "min_spent_amount": 200,
                },
            )
        if created:
            yield "Voucher #%d" % voucher.id
        else:
            yield "Value voucher already exists"

        voucher, created = Voucher.objects.get_or_create(
            code="VCO9KV98LC",
            defaults={
                "type": VoucherType.ENTIRE_ORDER,
                "discount_value_type": DiscountValueType.PERCENTAGE,
            },
        )
        for channel in channels:
            VoucherChannelListing.objects.get_or_create(
                voucher=voucher,
                channel=channel,
                defaults={"discount_value": 5, "currency": channel.currency_code},
            )
        if created:
            yield "Voucher #%d" % voucher.id
        else:
            yield "Value voucher already exists"


def create_gift_card():
    if POPULATE_DEV:
        user = random.choice(
            [User.objects.filter(is_superuser=False).order_by("?").first()]
        )
        gift_card, created = GiftCard.objects.get_or_create(
            code="Gift_card_10",
            defaults={
                "user": user,
                "initial_balance": Money(10, DEFAULT_CURRENCY),
                "current_balance": Money(10, DEFAULT_CURRENCY),
            },
        )
        if created:
            yield "Gift card #%d" % gift_card.id
        else:
            yield "Gift card already exists"


def add_address_to_admin(email):
    address = create_address()
    user = User.objects.get(email=email)
    manager = get_plugins_manager()
    store_user_address(user, address, AddressType.BILLING, manager)
    store_user_address(user, address, AddressType.SHIPPING, manager)


def create_page_type():
    data = [
        {
            "fields": {
                "private_metadata": {},
                "metadata": {},
                "name": "Legal",
                "slug": "legal",
            },
        },
    ]
    for page_type_data in data:
        page_type, _ = PageType.objects.update_or_create(**page_type_data["fields"])
        yield "Page type %s created" % page_type.slug


def create_pages():
    data_pages = [
        {
            "title": "Conditions of Use",
            "slug": "conditions-of-use",
            "page_type_id": 1,
            "content": {
                "blocks": [
                    {
                        "data": {"text": "Edit this page with yout legal conditions"},
                        "type": "paragraph",
                    },
                ],
            },
        },
        {
            "title": "Privacy Notice",
            "slug": "privacy-notice",
            "page_type_id": 1,
            "content": {
                "blocks": [
                    {
                        "data": {"text": "Edit this page with yout legal conditions"},
                        "type": "paragraph",
                    },
                ],
            },
        },
    ]

    for data in data_pages:
        page_data = {
            "content": data["content"],
            "title": data["title"],
            "is_published": True,
            "page_type_id": data["page_type_id"],
        }
        page, _ = Page.objects.get_or_create(slug=data["slug"], defaults=page_data)
        yield "Page %s created" % page.slug


def generate_menu_items(menu: Menu, category: Category, parent_menu_item):
    menu_item, created = menu.items.get_or_create(
        name=category.name, category=category, parent=parent_menu_item
    )

    if created:
        yield "Created menu item for category %s" % category

    for child in category.get_children():
        for msg in generate_menu_items(menu, child, menu_item):
            yield "\t%s" % msg


def generate_menu_tree(menu):
    categories = (
        Category.tree.get_queryset()
        .filter(
            Q(parent__isnull=True) & Q(products__isnull=False)
            | Q(children__products__isnull=False)
        )
        .distinct()
    )

    for category in categories:
        for msg in generate_menu_items(menu, category, None):
            yield msg


def create_menus():
    # Create navbar menu with category links
    top_menu, _ = Menu.objects.get_or_create(
        name=settings.DEFAULT_MENUS["top_menu_name"],
        slug=settings.DEFAULT_MENUS["top_menu_name"],
    )
    top_menu.items.all().delete()
    yield "Created navbar menu"
    for msg in generate_menu_tree(top_menu):
        yield msg

    # Create footer menu with collections and pages
    bottom_menu, _ = Menu.objects.get_or_create(
        name=settings.DEFAULT_MENUS["bottom_menu_name"],
        slug=settings.DEFAULT_MENUS["bottom_menu_name"],
    )
    bottom_menu.items.all().delete()
    if POPULATE_DEV:
        collection = Collection.objects.filter(products__isnull=False).order_by("?")[0]
    else:
        collection = Collection.objects.first()
    item, _ = bottom_menu.items.get_or_create(name="Collections", collection=collection)

    for collection in Collection.objects.filter(
        products__isnull=False, background_image__isnull=False
    ):
        bottom_menu.items.get_or_create(
            name=collection.name, collection=collection, parent=item
        )

    item_saleor = bottom_menu.items.get_or_create(name="dRural", url="/")[0]

    page = Page.objects.order_by("?")[0]
    item_saleor.children.get_or_create(name=page.title, page=page, menu=bottom_menu)

    api_url = build_absolute_uri(reverse("api"))
    item_saleor.children.get_or_create(
        name="GraphQL API", url=api_url, menu=bottom_menu
    )

    yield "Created footer menu"
    site = Site.objects.get_current()
    site.name = "dRural"
    site.save()
    site_settings, _ = SiteSettings.objects.get_or_create(
        site=site, top_menu=top_menu, bottom_menu=bottom_menu
    )
    if POPULATE_DEV:
        save_commission_rate(site_settings, 0.05)


def save_commission_rate(site_settings, commission_rate):
    site_settings.commission_rate = commission_rate
    site_settings.save()


def get_product_list_images_dir(placeholder_dir):
    product_list_images_dir = os.path.join(placeholder_dir, PRODUCTS_LIST_DIR)
    return product_list_images_dir


def get_image(image_dir, image_name):
    img_path = os.path.join(image_dir, image_name)
    return File(open(img_path, "rb"), name=image_name)


def create_company_address(company_address_data):
    for company_address in company_address_data:
        pk = company_address["pk"]
        defaults = company_address["fields"]
        latitude = defaults.get("latitude")
        longitude = defaults.get("longitude")
        if latitude and longitude:
            location_point = Point(latitude, longitude, srid=4326)
            defaults["location_point"] = location_point
            defaults.pop("latitude")
            defaults.pop("longitude")
        defaults["company"] = Company.objects.get(pk=defaults["company"])
        CompanyAddress.objects.update_or_create(pk=pk, defaults=defaults)


def create_product_address(product_address_data):
    for product_address in product_address_data:
        pk = product_address["pk"]
        defaults = product_address["fields"]
        latitude = defaults.get("latitude")
        longitude = defaults.get("longitude")
        if latitude and longitude:
            location_point = Point(latitude, longitude, srid=4326)
            defaults["location_point"] = location_point
            defaults.pop("latitude")
            defaults.pop("longitude")
        defaults["product"] = Product.objects.get(pk=defaults["product"])
        ProductAddress.objects.update_or_create(pk=pk, defaults=defaults)


def get_random_managers():
    return [User.objects.filter(is_superuser=False).order_by("?").first()]


def create_companies(company_data, placeholder_dir):
    for company in company_data:
        pk = company["pk"]
        defaults = company["fields"]
        defaults["image"] = get_image(
            os.path.join(placeholder_dir, COMPANIES_LIST_DIR), defaults["image"]
        )
        defaults["created"] = fake.date_time(tzinfo=timezone.get_current_timezone())
        defaults["modified"] = fake.date_time(tzinfo=timezone.get_current_timezone())
        Company.objects.update_or_create(pk=pk, defaults=defaults)
        created_company = Company.objects.get(pk=pk)
        managers = get_random_managers()
        if pk == 66:
            # Assign the testing company with a testing Stripe accoun
            StripeCredentials.objects.create(
                company=created_company,
                account_id="acct_1LRyECQOiTojlsc1",
                is_enabled=True,
            )
            """
            Creation of a manager in company with pk 66 for testing
            email: drural.seller@example.com
            password: dRural.!1234
            Added in permission group SELLERS_GROUP
            """
            drural_seller = User.objects.filter(
                email="drural.seller@example.com"
            ).first()
            if drural_seller:
                managers.append(drural_seller)
                group, _ = Group.objects.get_or_create(name=SELLERS_GROUP_NAME)
                group.user_set.add(drural_seller)
        created_company.managers.set(managers)


def create_wishlist(wishlist_data):
    index = 0
    users = User.objects.filter(is_staff=False)
    for wishlist in wishlist_data:
        if index < 2:
            user = users.first()
            index = index + 1
        else:
            user = random.choice(users)
        pk = wishlist["pk"]
        defaults = wishlist["fields"]
        Wishlist.objects.update_or_create(pk=pk, defaults=defaults)
        created_wishlist = Wishlist.objects.get(pk=pk)
        created_wishlist.set_user(user)


def create_wishlist_item(wishlist_item_data):
    for wishlist_item in wishlist_item_data:
        pk = wishlist_item["pk"]
        defaults = wishlist_item["fields"]
        wishlist = Wishlist.objects.get(pk=defaults["wishlist"])
        defaults["wishlist"] = wishlist
        defaults["variant"] = ProductVariant.objects.get(pk=defaults["variant"])
        WishlistItem.objects.update_or_create(pk=pk, defaults=defaults)


def create_resources_for_companies(bookable_resource_data):
    for bookable_resource in bookable_resource_data:
        pk = bookable_resource["pk"]
        defaults = bookable_resource["fields"]
        defaults["company"] = Company.objects.get(pk=defaults["company"])
        BookableResource.objects.update_or_create(pk=pk, defaults=defaults)


def create_bookable_resource_daily_calendar(bookable_resource_daily_calendar_data):
    for bookable_resource_daily_calendar in bookable_resource_daily_calendar_data:
        pk = bookable_resource_daily_calendar["pk"]
        defaults = bookable_resource_daily_calendar["fields"]
        bookable_resource = BookableResource.objects.get(
            pk=defaults["bookable_resource"]
        )
        defaults["bookable_resource"] = bookable_resource
        BookableResourceDailyCalendar.objects.update_or_create(pk=pk, defaults=defaults)


def create_slots(slot_data):
    for slot in slot_data:
        pk = slot["pk"]
        defaults = slot["fields"]
        bookable_resource_calendar = BookableResourceDailyCalendar.objects.get(
            pk=defaults["bookable_resource_calendar"]
        )
        defaults["bookable_resource_calendar"] = bookable_resource_calendar
        Slot.objects.update_or_create(pk=pk, defaults=defaults)


def create_bookings(booking_data):
    i = 0
    for booking in booking_data:
        pk = booking["pk"]
        defaults = booking["fields"]
        defaults["user"] = CUSTOMERS[i]
        defaults["user_email"] = CUSTOMERS[i].email
        bookable_resource = BookableResource.objects.get(
            pk=defaults["bookable_resource"]
        )
        defaults["bookable_resource"] = bookable_resource
        defaults["resource_name"] = bookable_resource.name
        variant = ProductVariant.objects.get(pk=defaults["variant"])
        defaults["variant"] = variant
        defaults["variant_name"] = variant.name
        defaults["variant_sku"] = variant.sku
        company = Company.objects.get(pk=defaults["company"])
        defaults["company"] = company
        defaults["company_name"] = company.name
        Booking.objects.update_or_create(pk=pk, defaults=defaults)
        i = i + 1


def create_review(review_data):
    index = 0
    total = CUSTOMERS.count()
    for review in review_data:
        pk = review["pk"]
        defaults = review["fields"]
        defaults["user"] = CUSTOMERS[index if index < total else 0]
        defaults["product"] = Product.objects.get(pk=defaults["product"])
        ProductRating.objects.update_or_create(pk=pk, defaults=defaults)
        index += 1
