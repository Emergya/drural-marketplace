import datetime
import tempfile
import uuid
from collections import namedtuple
from contextlib import contextmanager
from decimal import Decimal
from functools import partial
from io import BytesIO
from nis import cat
from typing import List, Optional, Set
from unicodedata import name
from unittest.mock import MagicMock, Mock

import graphene
import pytest
import pytz
from django.conf import settings
from django.contrib.auth.models import Group, Permission
from django.contrib.gis.geos import Point
from django.contrib.sites.models import Site
from django.core.files import File
from django.core.files.images import ImageFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.db import connection
from django.forms import ModelForm
from django.template.defaultfilters import truncatechars
from django.test.utils import CaptureQueriesContext as BaseCaptureQueriesContext
from django.utils import timezone
from django_countries import countries
from PIL import Image
from prices import Money, TaxedMoney, fixed_discount

from ..account.models import Address, StaffNotificationRecipient, User
from ..app.models import App, AppInstallation
from ..app.types import AppType
from ..attribute import AttributeEntityType, AttributeInputType, AttributeType
from ..attribute.models import (
    Attribute,
    AttributeTranslation,
    AttributeValue,
    AttributeValueTranslation,
)
from ..attribute.utils import associate_attribute_values_to_instance
from ..checkout.fetch import fetch_checkout_info
from ..checkout.models import Checkout
from ..checkout.utils import add_variant_to_checkout
from ..company.models import Company, CompanyAddress, StripeCredentials
from ..core import JobStatus
from ..core.payments import PaymentInterface
from ..core.units import MeasurementUnits
from ..core.utils.editorjs import clean_editor_js
from ..csv.events import ExportEvents
from ..csv.models import ExportEvent, ExportFile
from ..discount import DiscountInfo, DiscountValueType, VoucherType
from ..discount.models import (
    Sale,
    SaleChannelListing,
    SaleTranslation,
    Voucher,
    VoucherChannelListing,
    VoucherCustomer,
    VoucherTranslation,
)
from ..giftcard.models import GiftCard
from ..menu.models import Menu, MenuItem, MenuItemTranslation
from ..order import OrderLineData, OrderOrigin, OrderStatus
from ..order.actions import cancel_fulfillment, fulfill_order_lines
from ..order.events import (
    OrderEvents,
    fulfillment_refunded_event,
    order_added_products_event,
)
from ..order.models import FulfillmentStatus, Order, OrderEvent, OrderLine
from ..order.utils import recalculate_order
from ..page.models import Page, PageTranslation, PageType
from ..payment import ChargeStatus, TransactionKind
from ..payment.interface import AddressData, GatewayConfig, PaymentData
from ..payment.models import Payment, PaymentMethod
from ..plugins.manager import get_plugins_manager
from ..plugins.models import PluginConfiguration
from ..plugins.vatlayer.plugin import VatlayerPlugin
from ..plugins.webhook.utils import to_payment_app_id
from ..product import ProductMediaTypes
from ..product.models import (
    Category,
    CategoryTranslation,
    Collection,
    CollectionChannelListing,
    CollectionTranslation,
    DigitalContent,
    DigitalContentUrl,
    Product,
    ProductAddress,
    ProductChannelListing,
    ProductMedia,
    ProductRating,
    ProductTranslation,
    ProductType,
    ProductVariant,
    ProductVariantChannelListing,
    ProductVariantTranslation,
    VariantMedia,
)
from ..product.tests.utils import create_image
from ..shipping.models import (
    ShippingMethod,
    ShippingMethodChannelListing,
    ShippingMethodTranslation,
    ShippingMethodType,
    ShippingZone,
)
from ..site.models import SiteSettings
from ..warehouse.models import Allocation, Stock, Warehouse
from ..webhook.event_types import WebhookEventType
from ..webhook.models import Webhook, WebhookEvent
from ..wishlist.models import Wishlist
from .utils import dummy_editorjs


class CaptureQueriesContext(BaseCaptureQueriesContext):
    IGNORED_QUERIES = settings.PATTERNS_IGNORED_IN_QUERY_CAPTURES  # type: ignore

    @property
    def captured_queries(self):
        # flake8: noqa
        base_queries = self.connection.queries[
            self.initial_queries : self.final_queries
        ]
        new_queries = []

        def is_query_ignored(sql):
            for pattern in self.IGNORED_QUERIES:
                # Ignore the query if matches
                if pattern.match(sql):
                    return True
            return False

        for query in base_queries:
            if not is_query_ignored(query["sql"]):
                new_queries.append(query)

        return new_queries


def _assert_num_queries(context, *, config, num, exact=True, info=None):
    """
    Extracted from pytest_django.fixtures._assert_num_queries
    """
    yield context

    verbose = config.getoption("verbose") > 0
    num_performed = len(context)

    if exact:
        failed = num != num_performed
    else:
        failed = num_performed > num

    if not failed:
        return

    msg = "Expected to perform {} queries {}{}".format(
        num,
        "" if exact else "or less ",
        "but {} done".format(
            num_performed == 1 and "1 was" or "%d were" % (num_performed,)
        ),
    )
    if info:
        msg += "\n{}".format(info)
    if verbose:
        sqls = (q["sql"] for q in context.captured_queries)
        msg += "\n\nQueries:\n========\n\n%s" % "\n\n".join(sqls)
    else:
        msg += " (add -v option to show queries)"
    pytest.fail(msg)


@pytest.fixture
def capture_queries(pytestconfig):
    cfg = pytestconfig

    @contextmanager
    def _capture_queries(
        num: Optional[int] = None, msg: Optional[str] = None, exact=False
    ):
        with CaptureQueriesContext(connection) as ctx:
            yield ctx
            if num is not None:
                _assert_num_queries(ctx, config=cfg, num=num, exact=exact, info=msg)

    return _capture_queries


@pytest.fixture
def assert_num_queries(capture_queries):
    return partial(capture_queries, exact=True)


@pytest.fixture
def assert_max_num_queries(capture_queries):
    return partial(capture_queries, exact=False)


@pytest.fixture
def setup_vatlayer(settings, channel_EUR):
    settings.PLUGINS = ["saleor.plugins.vatlayer.plugin.VatlayerPlugin"]
    data = {
        "active": True,
        "channel": channel_EUR,
        "configuration": [
            {"name": "Access key", "value": "vatlayer_access_key"},
        ],
    }
    PluginConfiguration.objects.create(identifier=VatlayerPlugin.PLUGIN_ID, **data)
    return settings


@pytest.fixture(autouse=True)
def setup_dummy_gateways(settings):
    settings.PLUGINS = [
        "saleor.payment.gateways.dummy.plugin.DummyGatewayPlugin",
        "saleor.payment.gateways.dummy_credit_card.plugin.DummyCreditCardGatewayPlugin",
    ]
    return settings


@pytest.fixture
def sample_gateway(settings):
    settings.PLUGINS += [
        "saleor.plugins.tests.sample_plugins.ActiveDummyPaymentGateway"
    ]


@pytest.fixture(autouse=True)
def site_settings(db, settings) -> SiteSettings:
    """Create a site and matching site settings.

    This fixture is autouse because django.contrib.sites.models.Site and
    saleor.site.models.SiteSettings have a one-to-one relationship and a site
    should never exist without a matching settings object.
    """
    site = Site.objects.get_or_create(name="mirumee.com", domain="mirumee.com")[0]
    obj = SiteSettings.objects.get_or_create(
        site=site,
        default_mail_sender_name="Mirumee Labs",
        default_mail_sender_address="mirumee@example.com",
        commission_rate=0.05,
    )[0]
    settings.SITE_ID = site.pk

    main_menu = Menu.objects.get_or_create(
        name=settings.DEFAULT_MENUS["top_menu_name"],
        slug=settings.DEFAULT_MENUS["top_menu_name"],
    )[0]
    secondary_menu = Menu.objects.get_or_create(
        name=settings.DEFAULT_MENUS["bottom_menu_name"],
        slug=settings.DEFAULT_MENUS["bottom_menu_name"],
    )[0]
    obj.top_menu = main_menu
    obj.bottom_menu = secondary_menu
    obj.save()
    return obj


@pytest.fixture
def checkout(db, channel_EUR):
    checkout = Checkout.objects.create(
        email="example@email.com",
        currency=channel_EUR.currency_code,
        channel=channel_EUR,
    )
    checkout.set_country("ES", commit=True)
    return checkout


@pytest.fixture
def checkout_with_item(checkout, product):
    # cambiar el product por el que tiene 123
    variant = product.variants.get()
    # variant = ProductVariant.objects.filter(slug="123").first()
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 3)
    checkout.save()
    return checkout


@pytest.fixture
def checkouts_list(channel_EUR):
    checkouts_eur_1 = Checkout.objects.bulk_create(
        [
            Checkout(currency=channel_EUR.currency_code, channel=channel_EUR),
            Checkout(currency=channel_EUR.currency_code, channel=channel_EUR),
            Checkout(currency=channel_EUR.currency_code, channel=channel_EUR),
        ]
    )
    checkouts_eur_2 = Checkout.objects.bulk_create(
        [
            Checkout(currency=channel_EUR.currency_code, channel=channel_EUR),
            Checkout(currency=channel_EUR.currency_code, channel=channel_EUR),
        ]
    )
    return [*checkouts_eur_1, *checkouts_eur_2]


@pytest.fixture
def checkouts_assigned_to_customer(channel_EUR, customer_user):
    return Checkout.objects.bulk_create(
        [
            Checkout(
                currency=channel_EUR.currency_code,
                channel=channel_EUR,
                user=customer_user,
            ),
        ]
    )


@pytest.fixture
def checkout_ready_to_complete(checkout_with_item, address, shipping_method, gift_card):
    checkout = checkout_with_item
    checkout.shipping_address = address
    checkout.shipping_method = shipping_method
    checkout.billing_address = address
    checkout.store_value_in_metadata(items={"accepted": "true"})
    checkout.store_value_in_private_metadata(items={"accepted": "false"})
    checkout_with_item.gift_cards.add(gift_card)
    checkout.save()
    return checkout


@pytest.fixture
def checkout_with_digital_item(checkout, digital_content):
    """Create a checkout with a digital line."""
    variant = digital_content.product_variant
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 1)
    checkout.email = "customer@example.com"
    checkout.save()
    return checkout


@pytest.fixture
def checkout_with_shipping_required(checkout_with_item, product):
    checkout = checkout_with_item
    variant = product.variants.get()
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 3)
    checkout.save()
    return checkout


@pytest.fixture
def other_shipping_method(shipping_zone, channel_EUR):
    method = ShippingMethod.objects.create(
        name="DPD",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone,
    )
    ShippingMethodChannelListing.objects.create(
        channel=channel_EUR,
        shipping_method=method,
        minimum_order_price=Money(0, "EUR"),
        price=Money(9, "EUR"),
    )
    return method


@pytest.fixture
def checkout_without_shipping_required(checkout, product_without_shipping):
    variant = product_without_shipping.variants.get()
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 1)
    checkout.save()
    return checkout


@pytest.fixture
def checkout_with_single_item(checkout, product):
    variant = product.variants.get()
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 1)
    checkout.save()
    return checkout


@pytest.fixture
def checkout_with_variant_without_inventory_tracking(
    checkout, variant_without_inventory_tracking, address, shipping_method
):
    variant = variant_without_inventory_tracking
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 1)
    checkout.shipping_address = address
    checkout.shipping_method = shipping_method
    checkout.billing_address = address
    checkout.store_value_in_metadata(items={"accepted": "true"})
    checkout.store_value_in_private_metadata(items={"accepted": "false"})
    checkout.save()
    return checkout


@pytest.fixture
def checkout_with_items(checkout, product_list, product):
    variant = product.variants.get()
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 1)
    for prod in product_list:
        variant = prod.variants.get()
        add_variant_to_checkout(checkout_info, variant, 1)
    checkout.refresh_from_db()
    return checkout


@pytest.fixture
def checkout_with_voucher(checkout, product, voucher):
    variant = product.variants.get()
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 3)
    checkout.voucher_code = voucher.code
    checkout.discount = Money("20.00", "EUR")
    checkout.save()
    return checkout


@pytest.fixture
def checkout_with_voucher_percentage(checkout, product, voucher_percentage):
    variant = product.variants.get()
    checkout_info = fetch_checkout_info(checkout, [], [], get_plugins_manager())
    add_variant_to_checkout(checkout_info, variant, 3)
    checkout.voucher_code = voucher_percentage.code
    checkout.discount = Money("3.00", "EUR")
    checkout.save()
    return checkout


@pytest.fixture
def checkout_with_gift_card(checkout_with_item, gift_card):
    checkout_with_item.gift_cards.add(gift_card)
    checkout_with_item.save()
    return checkout_with_item


@pytest.fixture
def checkout_with_voucher_percentage_and_shipping(
    checkout_with_voucher_percentage, shipping_method, address
):
    checkout = checkout_with_voucher_percentage
    checkout.shipping_method = shipping_method
    checkout.shipping_address = address
    checkout.save()
    return checkout


@pytest.fixture
def checkout_with_payments(checkout):
    Payment.objects.bulk_create(
        [
            Payment(
                gateway="mirumee.payments.dummy", is_active=True, checkout=checkout
            ),
            Payment(
                gateway="mirumee.payments.dummy", is_active=False, checkout=checkout
            ),
        ]
    )
    return checkout


@pytest.fixture
def address(db):  # pylint: disable=W0613
    return Address.objects.create(
        first_name="John",
        last_name="Doe",
        company_name="Mirumee Software",
        street_address_1="Tęczowa 7",
        city="WROCŁAW",
        postal_code="53-601",
        country="PL",
        phone="+48713988102",
    )


@pytest.fixture
def address_with_areas(db):
    return Address.objects.create(
        first_name="John",
        last_name="Doe",
        company_name="Mirumee Software",
        street_address_1="Tęczowa 7",
        city="WROCŁAW",
        postal_code="53-601",
        country="PL",
        phone="+48713988102",
        country_area="test_country_area",
        city_area="test_city_area",
    )


@pytest.fixture
def address_other_country():
    return Address.objects.create(
        first_name="John",
        last_name="Doe",
        street_address_1="4371 Lucas Knoll Apt. 791",
        city="BENNETTMOUTH",
        postal_code="13377",
        country="IS",
        phone="+40123123123",
    )


@pytest.fixture
def address_usa():
    return Address.objects.create(
        first_name="John",
        last_name="Doe",
        street_address_1="2000 Main Street",
        city="Irvine",
        postal_code="92614",
        country_area="CA",
        country="US",
        phone="",
    )


@pytest.fixture
def address_spain():
    return Address.objects.create(
        first_name="John",
        last_name="Doe",
        street_address_1="Calle Islas Columbretes",
        city="Huelva",
        postal_code="92614",
        country_area="H",
        country="ES",
        phone="",
    )


@pytest.fixture
def product_address_data():
    return {
        "street": "Calle Islas Columbretes",
        "postalCode": "92614",
        "country": "ES",
        "locality": "Huelva",
        "region": "Andalucía",
    }


@pytest.fixture
def graphql_address_data():
    return {
        "firstName": "John Saleor",
        "lastName": "Doe Mirumee",
        "companyName": "Mirumee Software",
        "streetAddress1": "Tęczowa 7",
        "streetAddress2": "",
        "postalCode": "53-601",
        "country": "PL",
        "city": "Wrocław",
        "countryArea": "",
        "phone": "+48321321888",
    }


@pytest.fixture
def customer_user(address):  # pylint: disable=W0613
    default_address = address.get_copy()
    user = User.objects.create_user(
        "test@example.com",
        "password",
        default_billing_address=default_address,
        default_shipping_address=default_address,
        first_name="Leslie",
        last_name="Wade",
    )
    user.addresses.add(default_address)
    user._password = "password"
    return user


@pytest.fixture
def customer_user2(address):
    address_copy = address.get_copy()
    user = User.objects.create_user(
        "test2@example.com",
        "password",
        default_billing_address=address_copy,
        default_shipping_address=address_copy,
        first_name="Jane",
        last_name="Doe",
    )
    user.addresses.add(address_copy)
    return user


@pytest.fixture
def user_checkout(customer_user, channel_EUR):
    checkout = Checkout.objects.create(
        user=customer_user,
        channel=channel_EUR,
        billing_address=customer_user.default_billing_address,
        shipping_address=customer_user.default_shipping_address,
        note="Test notes",
        currency="EUR",
    )
    return checkout


@pytest.fixture
def user_checkout_EUR(customer_user, channel_EUR):
    checkout = Checkout.objects.create(
        user=customer_user,
        channel=channel_EUR,
        billing_address=customer_user.default_billing_address,
        shipping_address=customer_user.default_shipping_address,
        note="Test notes",
        currency="EUR",
    )
    return checkout


@pytest.fixture
def user_checkout_with_items(user_checkout, product_list):
    checkout_info = fetch_checkout_info(user_checkout, [], [], get_plugins_manager())
    for product in product_list:
        variant = product.variants.get()
        add_variant_to_checkout(checkout_info, variant, 1)
    user_checkout.refresh_from_db()
    return user_checkout


@pytest.fixture
def order(customer_user, channel_EUR):
    address = customer_user.default_billing_address.get_copy()
    order = Order.objects.create(
        billing_address=address,
        channel=channel_EUR,
        currency=channel_EUR.currency_code,
        shipping_address=address,
        user_email=customer_user.email,
        user=customer_user,
        origin=OrderOrigin.CHECKOUT,
    )
    customer_user.save()
    return order


@pytest.fixture
def other_order(customer_user, channel_EUR):
    address = customer_user.default_billing_address.get_copy()
    order = Order.objects.create(
        billing_address=address,
        channel=channel_EUR,
        currency=channel_EUR.currency_code,
        shipping_address=address,
        user_email=customer_user.email,
        user=customer_user,
        origin=OrderOrigin.CHECKOUT,
    )
    customer_user.save()
    return order


@pytest.fixture
def order_unconfirmed(order):
    order.status = OrderStatus.UNCONFIRMED
    order.save(update_fields=["status"])
    return order


@pytest.fixture
def admin_user(db):
    """Return a Django admin user."""
    return User.objects.create_superuser("admin@example.com", "password")


@pytest.fixture
def staff_user(db):
    """Return a staff member."""
    return User.objects.create_user(
        email="staff_test@example.com",
        password="password",
        is_staff=True,
        is_active=True,
    )


@pytest.fixture
def other_staff_user(db):
    """Return a staff member."""
    return User.objects.create_user(
        email="other_staff_test@example.com",
        password="password",
        is_staff=False,
        is_active=True,
    )


@pytest.fixture
def seller_user(db):
    """Return a staff member."""
    return User.objects.create_user(
        email="seller_test@example.com",
        password="password",
        is_staff=False,
        is_active=True,
    )


@pytest.fixture
def staff_users(staff_user):
    """Return a staff members."""
    staff_users = User.objects.bulk_create(
        [
            User(
                email="staff1_test@example.com",
                password="password",
                is_staff=True,
                is_active=True,
            ),
            User(
                email="staff2_test@example.com",
                password="password",
                is_staff=True,
                is_active=True,
            ),
        ]
    )
    return [staff_user] + staff_users


@pytest.fixture
def shipping_zone(db, channel_EUR):  # pylint: disable=W0613
    shipping_zone = ShippingZone.objects.create(
        name="Europe", countries=[code for code, name in countries]
    )
    shipping_zone.channels.add(channel_EUR)
    method = shipping_zone.shipping_methods.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone,
    )
    ShippingMethodChannelListing.objects.create(
        channel=channel_EUR,
        currency=channel_EUR.currency_code,
        shipping_method=method,
        minimum_order_price=Money(0, channel_EUR.currency_code),
        price=Money(10, channel_EUR.currency_code),
    )
    return shipping_zone


@pytest.fixture
def shipping_zones(db, channel_EUR):
    (
        shipping_zone_us,
        shipping_zone_pl,
        shipping_zone_es,
    ) = ShippingZone.objects.bulk_create(
        [
            ShippingZone(name="USA", countries=["US"]),
            ShippingZone(name="Poland", countries=["PL"]),
            ShippingZone(name="Spain", countries=["ES"]),
        ]
    )

    shipping_zone_us.channels.add(channel_EUR)
    shipping_zone_pl.channels.add(channel_EUR)
    shipping_zone_es.channels.add(channel_EUR)

    method = shipping_zone_us.shipping_methods.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone_us,
    )
    second_method = shipping_zone_pl.shipping_methods.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone_pl,
    )
    third_method = shipping_zone_es.shipping_methods.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone_es,
    )
    ShippingMethodChannelListing.objects.bulk_create(
        [
            ShippingMethodChannelListing(
                channel=channel_EUR,
                shipping_method=method,
                minimum_order_price=Money(0, "EUR"),
                price=Money(10, "EUR"),
                currency=channel_EUR.currency_code,
            ),
            ShippingMethodChannelListing(
                channel=channel_EUR,
                shipping_method=second_method,
                minimum_order_price=Money(0, "EUR"),
                currency=channel_EUR.currency_code,
            ),
            ShippingMethodChannelListing(
                channel=channel_EUR,
                shipping_method=third_method,
                minimum_order_price=Money(0, "EUR"),
                currency=channel_EUR.currency_code,
            ),
        ]
    )
    return [shipping_zone_us, shipping_zone_pl, shipping_zone_es]


@pytest.fixture
def shipping_zones_with_different_channels(db, channel_EUR):
    shipping_zone_spain, shipping_zone_france = ShippingZone.objects.bulk_create(
        [
            ShippingZone(name="Spain", countries=["ES"]),
            ShippingZone(name="France", countries=["FR"]),
        ]
    )

    shipping_zone_spain.channels.add(channel_EUR)
    shipping_zone_france.channels.add(channel_EUR)

    method = shipping_zone_spain.shipping_methods.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone,
    )
    second_method = shipping_zone_france.shipping_methods.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone,
    )
    ShippingMethodChannelListing.objects.bulk_create(
        [
            ShippingMethodChannelListing(
                channel=channel_EUR,
                shipping_method=method,
                minimum_order_price=Money(0, "EUR"),
                price=Money(10, "EUR"),
                currency=channel_EUR.currency_code,
            ),
            ShippingMethodChannelListing(
                channel=channel_EUR,
                shipping_method=second_method,
                minimum_order_price=Money(0, "EUR"),
                currency=channel_EUR.currency_code,
            ),
        ]
    )
    return [shipping_zone_spain, shipping_zone_france]


@pytest.fixture
def shipping_zone_without_countries(db, channel_EUR):  # pylint: disable=W0613
    shipping_zone = ShippingZone.objects.create(name="Europe", countries=[])
    method = shipping_zone.shipping_methods.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone,
    )
    ShippingMethodChannelListing.objects.create(
        channel=channel_EUR,
        shipping_method=method,
        minimum_order_price=Money(0, "EUR"),
        price=Money(10, "EUR"),
    )
    return shipping_zone


@pytest.fixture
def shipping_method(shipping_zone, channel_EUR):
    method = ShippingMethod.objects.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone,
        maximum_delivery_days=10,
        minimum_delivery_days=5,
    )
    ShippingMethodChannelListing.objects.create(
        shipping_method=method,
        channel=channel_EUR,
        minimum_order_price=Money(0, "EUR"),
        price=Money(10, "EUR"),
    )
    return method


@pytest.fixture
def shipping_method_weight_based(shipping_zone, channel_EUR):
    method = ShippingMethod.objects.create(
        name="weight based method",
        type=ShippingMethodType.WEIGHT_BASED,
        shipping_zone=shipping_zone,
        maximum_delivery_days=10,
        minimum_delivery_days=5,
    )
    ShippingMethodChannelListing.objects.create(
        shipping_method=method,
        channel=channel_EUR,
        minimum_order_price=Money(0, "EUR"),
        price=Money(10, "EUR"),
    )
    return method


@pytest.fixture
def shipping_method_excluded_by_postal_code(shipping_method):
    shipping_method.postal_code_rules.create(start="HB2", end="HB6")
    return shipping_method


@pytest.fixture
def shipping_method_channel_EUR(shipping_zone, channel_EUR):
    method = ShippingMethod.objects.create(
        name="DHL",
        type=ShippingMethodType.PRICE_BASED,
        shipping_zone=shipping_zone,
    )
    ShippingMethodChannelListing.objects.create(
        shipping_method=method,
        channel=channel_EUR,
        minimum_order_price=Money(0, channel_EUR.currency_code),
        price=Money(10, channel_EUR.currency_code),
        currency=channel_EUR.currency_code,
    )
    return method


@pytest.fixture
def color_attribute(db):
    attribute = Attribute.objects.create(
        slug="color",
        name="Color",
        type=AttributeType.PRODUCT_TYPE,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.create(attribute=attribute, name="Red", slug="red")
    AttributeValue.objects.create(attribute=attribute, name="Blue", slug="blue")
    return attribute


@pytest.fixture
def date_attribute(db):
    attribute = Attribute.objects.create(
        slug="release-date",
        name="Release date",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.DATE,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.bulk_create(
        [
            AttributeValue(
                attribute=attribute,
                name=f"{attribute.name}: {value.date()}",
                slug=f"{value.date()}_{attribute.id}",
                date_time=value,
            )
            for value in [
                datetime.datetime(2020, 10, 5, tzinfo=pytz.utc),
                datetime.datetime(2020, 11, 5, tzinfo=pytz.utc),
            ]
        ]
    )

    return attribute


@pytest.fixture
def date_time_attribute(db):
    attribute = Attribute.objects.create(
        slug="release-date-time",
        name="Release date time",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.DATE_TIME,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )

    AttributeValue.objects.bulk_create(
        [
            AttributeValue(
                attribute=attribute,
                name=f"{attribute.name}: {value.date()}",
                slug=f"{value.date()}_{attribute.id}",
                date_time=value,
            )
            for value in [
                datetime.datetime(2020, 10, 5, tzinfo=pytz.utc),
                datetime.datetime(2020, 11, 5, tzinfo=pytz.utc),
            ]
        ]
    )

    return attribute


@pytest.fixture
def attribute_choices_for_sorting(db):
    attribute = Attribute.objects.create(
        slug="sorting",
        name="Sorting",
        type=AttributeType.PRODUCT_TYPE,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.create(attribute=attribute, name="Global", slug="summer")
    AttributeValue.objects.create(attribute=attribute, name="Apex", slug="zet")
    AttributeValue.objects.create(attribute=attribute, name="Police", slug="absorb")
    return attribute


@pytest.fixture
def boolean_attribute(db):
    attribute = Attribute.objects.create(
        slug="boolean",
        name="Boolean",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.BOOLEAN,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.create(
        attribute=attribute,
        name=f"{attribute.name}: Yes",
        slug=f"{attribute.id}_true",
        boolean=True,
    )
    AttributeValue.objects.create(
        attribute=attribute,
        name=f"{attribute.name}: No",
        slug=f"{attribute.id}_false",
        boolean=False,
    )
    return attribute


@pytest.fixture
def rich_text_attribute(db):
    attribute = Attribute.objects.create(
        slug="text",
        name="Text",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.RICH_TEXT,
        filterable_in_storefront=False,
        filterable_in_dashboard=False,
        available_in_grid=False,
    )
    text = "Rich text attribute content."
    AttributeValue.objects.create(
        attribute=attribute,
        name=truncatechars(clean_editor_js(dummy_editorjs(text), to_string=True), 50),
        slug=f"instance_{attribute.id}",
        rich_text=dummy_editorjs(text),
    )
    return attribute


@pytest.fixture
def rich_text_attribute_page_type(db):
    attribute = Attribute.objects.create(
        slug="text",
        name="Text",
        type=AttributeType.PAGE_TYPE,
        input_type=AttributeInputType.RICH_TEXT,
        filterable_in_storefront=False,
        filterable_in_dashboard=False,
        available_in_grid=False,
    )
    text = "Rich text attribute content."
    AttributeValue.objects.create(
        attribute=attribute,
        name=truncatechars(clean_editor_js(dummy_editorjs(text), to_string=True), 50),
        slug=f"instance_{attribute.id}",
        rich_text=dummy_editorjs(text),
    )
    return attribute


@pytest.fixture
def rich_text_attribute_with_many_values(rich_text_attribute):
    attribute = rich_text_attribute
    values = []
    for i in range(5):
        text = f"Rich text attribute content{i}."
        values.append(
            AttributeValue(
                attribute=attribute,
                name=truncatechars(
                    clean_editor_js(dummy_editorjs(text), to_string=True), 50
                ),
                slug=f"instance_{attribute.id}_{i}",
                rich_text=dummy_editorjs(text),
            )
        )
    AttributeValue.objects.bulk_create(values)
    return rich_text_attribute


@pytest.fixture
def color_attribute_without_values(db):  # pylint: disable=W0613
    return Attribute.objects.create(
        slug="color",
        name="Color",
        type=AttributeType.PRODUCT_TYPE,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )


@pytest.fixture
def pink_attribute_value(color_attribute):  # pylint: disable=W0613
    value = AttributeValue.objects.create(
        slug="pink", name="Pink", attribute=color_attribute, value="#FF69B4"
    )
    return value


@pytest.fixture
def size_attribute(db):  # pylint: disable=W0613
    attribute = Attribute.objects.create(
        slug="size",
        name="Size",
        type=AttributeType.PRODUCT_TYPE,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.create(attribute=attribute, name="Small", slug="small")
    AttributeValue.objects.create(attribute=attribute, name="Big", slug="big")
    return attribute


@pytest.fixture
def weight_attribute(db):
    attribute = Attribute.objects.create(
        slug="material",
        name="Material",
        type=AttributeType.PRODUCT_TYPE,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.create(attribute=attribute, name="Cotton", slug="cotton")
    AttributeValue.objects.create(
        attribute=attribute, name="Poliester", slug="poliester"
    )
    return attribute


@pytest.fixture
def numeric_attribute(db):
    attribute = Attribute.objects.create(
        slug="length",
        name="Length",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.NUMERIC,
        unit=MeasurementUnits.CM,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.create(attribute=attribute, name="10", slug="10")
    AttributeValue.objects.create(attribute=attribute, name="15", slug="15")
    return attribute


@pytest.fixture
def file_attribute(db):
    attribute = Attribute.objects.create(
        slug="image",
        name="Image",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.FILE,
    )
    AttributeValue.objects.create(
        attribute=attribute,
        name="test_file.txt",
        slug="test_filetxt",
        file_url="test_file.txt",
        content_type="text/plain",
    )
    AttributeValue.objects.create(
        attribute=attribute,
        name="test_file.jpeg",
        slug="test_filejpeg",
        file_url="test_file.jpeg",
        content_type="image/jpeg",
    )
    return attribute


@pytest.fixture
def file_attribute_with_file_input_type_without_values(db):
    return Attribute.objects.create(
        slug="image",
        name="Image",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.FILE,
    )


@pytest.fixture
def product_type_page_reference_attribute(db):
    return Attribute.objects.create(
        slug="page-reference",
        name="Page reference",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.REFERENCE,
        entity_type=AttributeEntityType.PAGE,
    )


@pytest.fixture
def page_type_page_reference_attribute(db):
    return Attribute.objects.create(
        slug="page-reference",
        name="Page reference",
        type=AttributeType.PAGE_TYPE,
        input_type=AttributeInputType.REFERENCE,
        entity_type=AttributeEntityType.PAGE,
    )


@pytest.fixture
def product_type_product_reference_attribute(db):
    return Attribute.objects.create(
        slug="product-reference",
        name="Product reference",
        type=AttributeType.PRODUCT_TYPE,
        input_type=AttributeInputType.REFERENCE,
        entity_type=AttributeEntityType.PRODUCT,
    )


@pytest.fixture
def page_type_product_reference_attribute(db):
    return Attribute.objects.create(
        slug="product-reference",
        name="Product reference",
        type=AttributeType.PAGE_TYPE,
        input_type=AttributeInputType.REFERENCE,
        entity_type=AttributeEntityType.PRODUCT,
    )


@pytest.fixture
def size_page_attribute(db):
    attribute = Attribute.objects.create(
        slug="page-size",
        name="Page size",
        type=AttributeType.PAGE_TYPE,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.create(attribute=attribute, name="10", slug="10")
    AttributeValue.objects.create(attribute=attribute, name="15", slug="15")
    return attribute


@pytest.fixture
def tag_page_attribute(db):
    attribute = Attribute.objects.create(
        slug="tag",
        name="tag",
        type=AttributeType.PAGE_TYPE,
        filterable_in_storefront=True,
        filterable_in_dashboard=True,
        available_in_grid=True,
    )
    AttributeValue.objects.create(attribute=attribute, name="About", slug="about")
    AttributeValue.objects.create(attribute=attribute, name="Help", slug="help")
    return attribute


@pytest.fixture
def author_page_attribute(db):
    attribute = Attribute.objects.create(
        slug="author", name="author", type=AttributeType.PAGE_TYPE
    )
    AttributeValue.objects.create(
        attribute=attribute, name="Test author 1", slug="test-author-1"
    )
    AttributeValue.objects.create(
        attribute=attribute, name="Test author 2", slug="test-author-2"
    )
    return attribute


@pytest.fixture
def page_file_attribute(db):
    attribute = Attribute.objects.create(
        slug="image",
        name="Image",
        type=AttributeType.PAGE_TYPE,
        input_type=AttributeInputType.FILE,
    )
    AttributeValue.objects.create(
        attribute=attribute,
        name="test_file.txt",
        slug="test_filetxt",
        file_url="test_file.txt",
        content_type="text/plain",
    )
    AttributeValue.objects.create(
        attribute=attribute,
        name="test_file.jpeg",
        slug="test_filejpeg",
        file_url="test_file.jpeg",
        content_type="image/jpeg",
    )
    return attribute


@pytest.fixture
def product_type_attribute_list() -> List[Attribute]:
    return list(
        Attribute.objects.bulk_create(
            [
                Attribute(slug="size", name="Size", type=AttributeType.PRODUCT_TYPE),
                Attribute(
                    slug="weight", name="Weight", type=AttributeType.PRODUCT_TYPE
                ),
                Attribute(
                    slug="thickness", name="Thickness", type=AttributeType.PRODUCT_TYPE
                ),
            ]
        )
    )


@pytest.fixture
def page_type_attribute_list() -> List[Attribute]:
    return list(
        Attribute.objects.bulk_create(
            [
                Attribute(slug="size", name="Size", type=AttributeType.PAGE_TYPE),
                Attribute(slug="font", name="Weight", type=AttributeType.PAGE_TYPE),
                Attribute(
                    slug="margin", name="Thickness", type=AttributeType.PAGE_TYPE
                ),
            ]
        )
    )


@pytest.fixture
def image():
    img_data = BytesIO()
    image = Image.new("RGB", size=(1, 1))
    image.save(img_data, format="JPEG")
    return SimpleUploadedFile("product.jpg", img_data.getvalue())


@pytest.fixture
def image_list():
    img_data_1 = BytesIO()
    image_1 = Image.new("RGB", size=(1, 1))
    image_1.save(img_data_1, format="JPEG")

    img_data_2 = BytesIO()
    image_2 = Image.new("RGB", size=(1, 1))
    image_2.save(img_data_2, format="JPEG")
    return [
        SimpleUploadedFile("image1.jpg", img_data_1.getvalue()),
        SimpleUploadedFile("image2.jpg", img_data_2.getvalue()),
    ]


@pytest.fixture
def category(db):  # pylint: disable=W0613
    return Category.objects.create(name="Default", slug="default")


@pytest.fixture
def categories(db, category):
    category_a = category
    category_b = Category.objects.create(name="Default B", slug="default_b")
    return [category_a, category_b]


@pytest.fixture
def categories_tree(db, product_type, company, channel_EUR):  # pylint: disable=W0613
    parent = Category.objects.create(name="Parent", slug="parent")
    parent.children.create(name="Child", slug="child")
    child = parent.children.first()

    product_attr = product_type.product_attributes.first()
    attr_value = product_attr.values.first()

    product = Product.objects.create(
        name="Test product",
        slug="test-product-10",
        product_type=product_type,
        category=child,
        company=company,
    )

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
    )

    associate_attribute_values_to_instance(product, product_attr, attr_value)
    return parent


@pytest.fixture
def categories_tree_with_published_products(categories_tree, product, channel_EUR):
    parent = categories_tree
    parent_product = product
    parent_product.categories.add(parent)
    product_list = [parent_product]

    ProductChannelListing.objects.filter(product__in=product_list).delete()
    product_channel_listings = []
    for product in product_list:
        product_channel_listings.append(
            ProductChannelListing(
                product=product,
                channel=channel_EUR,
                publication_date=datetime.date.today(),
                is_published=True,
            )
        )
    ProductChannelListing.objects.bulk_create(product_channel_listings)
    parent.products.set(product_list)
    parent.save()

    for product in parent.children.first().products.all():
        product.categories.add(parent.children.first())
    return parent


@pytest.fixture
def non_default_category(db):  # pylint: disable=W0613
    return Category.objects.create(name="Not default", slug="not-default")


@pytest.fixture
def permission_manage_discounts():
    return Permission.objects.get(codename="manage_discounts")


@pytest.fixture
def permission_manage_wishlists():
    return Permission.objects.get(codename="manage_wishlists")


@pytest.fixture
def permission_manage_gift_card():
    return Permission.objects.get(codename="manage_gift_card")


@pytest.fixture
def permission_manage_orders():
    return Permission.objects.get(codename="manage_orders")


@pytest.fixture
def permission_manage_checkouts():
    return Permission.objects.get(codename="manage_checkouts")


@pytest.fixture
def permission_manage_plugins():
    return Permission.objects.get(codename="manage_plugins")


@pytest.fixture
def permission_manage_apps():
    return Permission.objects.get(codename="manage_apps")


@pytest.fixture
def product_type(color_attribute, size_attribute):
    product_type = ProductType.objects.create(
        name="Default Type",
        slug="default-type",
        has_variants=True,
        is_shipping_required=True,
    )
    product_type.product_attributes.add(color_attribute)
    product_type.variant_attributes.add(size_attribute)
    return product_type


@pytest.fixture
def product_type_with_rich_text_attribute(
    rich_text_attribute, color_attribute, size_attribute
):
    product_type = ProductType.objects.create(
        name="Default Type",
        slug="default-type",
        has_variants=True,
        is_shipping_required=True,
    )
    product_type.product_attributes.add(rich_text_attribute)
    product_type.variant_attributes.add(rich_text_attribute)
    return product_type


@pytest.fixture
def product_type_without_variant():
    product_type = ProductType.objects.create(
        name="Type", slug="type", has_variants=False, is_shipping_required=True
    )
    return product_type


@pytest.fixture
def card_payment_method():
    payment_method = PaymentMethod.objects.create(
        name="Card", identifier="Mock", is_active=True
    )
    return payment_method


@pytest.fixture
def product(product_type, category, company, warehouse, channel_EUR):
    product_attr = product_type.product_attributes.first()
    product_attr_value = product_attr.values.first()

    product = Product.objects.create(
        name="Test product",
        slug="test-product-11",
        product_type=product_type,
        category=category,
        company=company,
        is_billable=True,
    )
    product.categories.add(category)
    product.save()
    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        discounted_price_amount="10.00",
        currency=channel_EUR.currency_code,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )

    associate_attribute_values_to_instance(product, product_attr, product_attr_value)

    variant_attr = product_type.variant_attributes.first()
    variant_attr_value = variant_attr.values.first()

    variant = ProductVariant.objects.create(product=product, sku="123")
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(warehouse=warehouse, product_variant=variant, quantity=10)

    associate_attribute_values_to_instance(variant, variant_attr, variant_attr_value)
    return product


@pytest.fixture
def product_other_company(
    product_type, category, other_company, warehouse, channel_EUR
):
    product_attr = product_type.product_attributes.first()
    product_attr_value = product_attr.values.first()

    product = Product.objects.create(
        name="Test product",
        slug="test-product-25",
        product_type=product_type,
        category=category,
        company=other_company,
        is_billable=True,
    )
    product.categories.add(category)
    product.save()
    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        discounted_price_amount="10.00",
        currency=channel_EUR.currency_code,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )

    associate_attribute_values_to_instance(product, product_attr, product_attr_value)

    variant_attr = product_type.variant_attributes.first()
    variant_attr_value = variant_attr.values.first()

    variant = ProductVariant.objects.create(product=product, sku="123")
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(warehouse=warehouse, product_variant=variant, quantity=10)

    associate_attribute_values_to_instance(variant, variant_attr, variant_attr_value)
    return product


@pytest.fixture
def product_with_rich_text_attribute(
    product_type_with_rich_text_attribute, category, company, warehouse, channel_EUR
):
    product_attr = product_type_with_rich_text_attribute.product_attributes.first()
    product_attr_value = product_attr.values.first()

    product = Product.objects.create(
        name="Test product",
        slug="test-product-11",
        product_type=product_type_with_rich_text_attribute,
        category=category,
        company=company,
    )
    product.categories.add(category)
    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        discounted_price_amount="10.00",
        currency=channel_EUR.currency_code,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )

    associate_attribute_values_to_instance(product, product_attr, product_attr_value)

    variant_attr = product_type_with_rich_text_attribute.variant_attributes.first()
    variant_attr_value = variant_attr.values.first()

    variant = ProductVariant.objects.create(product=product, sku="123")
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(warehouse=warehouse, product_variant=variant, quantity=10)

    associate_attribute_values_to_instance(variant, variant_attr, variant_attr_value)
    return [product, variant]


@pytest.fixture
def product_with_collections(
    product, published_collection, unpublished_collection, collection
):
    product.collections.add(*[published_collection, unpublished_collection, collection])
    return product


@pytest.fixture
def product_available_in_many_channels(product, channel_EUR):
    # ProductChannelListing.objects.create(
    #     product=product,
    #     channel=channel_EUR,
    #     is_published=True,
    # )
    # variant = product.variants.get()
    # ProductVariantChannelListing.objects.create(
    #     variant=variant,
    #     channel=channel_EUR,
    #     price_amount=Decimal(50),
    #     cost_price_amount=Decimal(1),
    #     currency=channel_EUR.currency_code,
    # )
    return product


@pytest.fixture
def product_with_single_variant(
    product_type, category, company, warehouse, channel_EUR
):
    product = Product.objects.create(
        name="Test product with single variant",
        slug="test-product-with-single-variant",
        product_type=product_type,
        category=category,
        company=company,
        is_billable=True,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_SINGLE_VARIANT")
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(1.99),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(product_variant=variant, warehouse=warehouse, quantity=101)
    return product


@pytest.fixture
def product_with_two_variants(product_type, category, company, warehouse, channel_EUR):
    product = Product.objects.create(
        name="Test product with two variants",
        slug="test-product-with-two-variant",
        product_type=product_type,
        category=category,
        company=company,
        is_billable=True,
    )

    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )

    variants = [
        ProductVariant(
            product=product,
            sku=f"Product variant #{i}",
        )
        for i in (1, 2)
    ]
    ProductVariant.objects.bulk_create(variants)
    variants_channel_listing = [
        ProductVariantChannelListing(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(10),
            cost_price_amount=Decimal(1),
            currency=channel_EUR.currency_code,
        )
        for variant in variants
    ]
    ProductVariantChannelListing.objects.bulk_create(variants_channel_listing)
    Stock.objects.bulk_create(
        [
            Stock(
                warehouse=warehouse,
                product_variant=variant,
                quantity=10,
            )
            for variant in variants
        ]
    )

    return product


@pytest.fixture
def product_with_variant_with_two_attributes(
    color_attribute, size_attribute, category, company, warehouse, channel_EUR
):
    product_type = ProductType.objects.create(
        name="Type with two variants",
        slug="two-variants",
        has_variants=True,
        is_shipping_required=True,
    )
    product_type.variant_attributes.add(color_attribute)
    product_type.variant_attributes.add(size_attribute)

    product = Product.objects.create(
        name="Test product with two variants",
        slug="test-product-with-two-variant",
        product_type=product_type,
        category=category,
        company=company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        currency=channel_EUR.currency_code,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )

    variant = ProductVariant.objects.create(product=product, sku="prodVar1")
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )

    associate_attribute_values_to_instance(
        variant, color_attribute, color_attribute.values.first()
    )
    associate_attribute_values_to_instance(
        variant, size_attribute, size_attribute.values.first()
    )

    return product


@pytest.fixture
def product_with_variant_with_external_media(
    color_attribute,
    size_attribute,
    category,
    company,
    warehouse,
    channel_EUR,
):
    product_type = ProductType.objects.create(
        name="Type with two variants",
        slug="two-variants",
        has_variants=True,
        is_shipping_required=True,
    )
    product_type.variant_attributes.add(color_attribute)
    product_type.variant_attributes.add(size_attribute)

    product = Product.objects.create(
        name="Test product with two variants",
        slug="test-product-with-two-variant",
        product_type=product_type,
        category=category,
        company=company,
    )

    media_obj = ProductMedia.objects.create(
        product=product,
        external_url="https://www.youtube.com/watch?v=di8_dJ3Clyo",
        alt="video_1",
        type=ProductMediaTypes.VIDEO,
        oembed_data="{}",
    )
    product.media.add(media_obj)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        currency=channel_EUR.currency_code,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )

    variant = ProductVariant.objects.create(product=product, sku="prodVar1")
    variant.media.add(media_obj)
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )

    associate_attribute_values_to_instance(
        variant, color_attribute, color_attribute.values.first()
    )
    associate_attribute_values_to_instance(
        variant, size_attribute, size_attribute.values.first()
    )

    return product


@pytest.fixture
def product_with_variant_with_file_attribute(
    color_attribute, file_attribute, category, company, warehouse, channel_EUR
):
    product_type = ProductType.objects.create(
        name="Type with variant and file attribute",
        slug="type-with-file-attribute",
        has_variants=True,
        is_shipping_required=True,
    )
    product_type.variant_attributes.add(file_attribute)

    product = Product.objects.create(
        name="Test product with variant and file attribute",
        slug="test-product-with-variant-and-file-attribute",
        product_type=product_type,
        category=category,
        company=company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        currency=channel_EUR.currency_code,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )

    variant = ProductVariant.objects.create(
        product=product,
        sku="prodVarTest",
    )
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )

    associate_attribute_values_to_instance(
        variant, file_attribute, file_attribute.values.first()
    )

    return product


@pytest.fixture
def product_with_multiple_values_attributes(
    product, product_type, category, company
) -> Product:

    attribute = Attribute.objects.create(
        slug="modes",
        name="Available Modes",
        input_type=AttributeInputType.MULTISELECT,
        type=AttributeType.PRODUCT_TYPE,
    )

    attr_val_1 = AttributeValue.objects.create(
        attribute=attribute, name="Eco Mode", slug="eco"
    )
    attr_val_2 = AttributeValue.objects.create(
        attribute=attribute, name="Performance Mode", slug="power"
    )

    product_type.product_attributes.clear()
    product_type.product_attributes.add(attribute)

    associate_attribute_values_to_instance(product, attribute, attr_val_1, attr_val_2)
    return product


@pytest.fixture
def product_with_default_variant(
    product_type_without_variant, category, company, warehouse, channel_EUR
):
    product = Product.objects.create(
        name="Test product",
        slug="test-product-3",
        product_type=product_type_without_variant,
        category=category,
        company=company,
        is_billable=True,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )
    variant = ProductVariant.objects.create(
        product=product, sku="1234", track_inventory=True
    )
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(warehouse=warehouse, product_variant=variant, quantity=100)
    return product


@pytest.fixture
def variant_without_inventory_tracking(
    product_type_without_variant, category, company, warehouse, channel_EUR
):
    product = Product.objects.create(
        name="Test product without inventory tracking",
        slug="test-product-without-tracking",
        product_type=product_type_without_variant,
        category=category,
        company=company,
        is_billable=True,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(
        product=product,
        sku="tracking123",
        track_inventory=False,
    )
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(warehouse=warehouse, product_variant=variant, quantity=0)
    return variant


@pytest.fixture
def variant(product, channel_EUR) -> ProductVariant:
    product_variant = ProductVariant.objects.create(product=product, sku="SKU_A")
    ProductVariantChannelListing.objects.create(
        variant=product_variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    return product_variant


@pytest.fixture
def variant_other_company(product_other_company, channel_EUR) -> ProductVariant:
    product_variant = ProductVariant.objects.create(
        product=product_other_company, sku="SKU_BA"
    )
    ProductVariantChannelListing.objects.create(
        variant=product_variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    return product_variant


@pytest.fixture
def variant_with_image(variant, image_list, media_root):
    media = ProductMedia.objects.create(product=variant.product, image=image_list[0])
    VariantMedia.objects.create(variant=variant, media=media)
    return variant


@pytest.fixture
def variant_with_many_stocks(variant, warehouses_with_shipping_zone):
    warehouses = warehouses_with_shipping_zone
    Stock.objects.bulk_create(
        [
            Stock(warehouse=warehouses[0], product_variant=variant, quantity=4),
            Stock(warehouse=warehouses[1], product_variant=variant, quantity=3),
        ]
    )
    return variant


@pytest.fixture
def variant_with_many_stocks_different_shipping_zones(
    variant, warehouses_with_different_shipping_zone
):
    warehouses = warehouses_with_different_shipping_zone
    Stock.objects.bulk_create(
        [
            Stock(warehouse=warehouses[0], product_variant=variant, quantity=4),
            Stock(warehouse=warehouses[1], product_variant=variant, quantity=3),
            Stock(warehouse=warehouses[2], product_variant=variant, quantity=3),
        ]
    )
    return variant


@pytest.fixture
def product_variant_list(product, channel_EUR):
    variants = list(
        ProductVariant.objects.bulk_create(
            [
                ProductVariant(product=product, sku="1"),
                ProductVariant(product=product, sku="2"),
                ProductVariant(product=product, sku="3"),
            ]
        )
    )
    ProductVariantChannelListing.objects.bulk_create(
        [
            ProductVariantChannelListing(
                variant=variants[0],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(10),
                currency=channel_EUR.currency_code,
            ),
            ProductVariantChannelListing(
                variant=variants[1],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(10),
                currency=channel_EUR.currency_code,
            ),
            ProductVariantChannelListing(
                variant=variants[2],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(10),
                currency=channel_EUR.currency_code,
            ),
        ]
    )
    return variants


@pytest.fixture
def product_without_shipping(category, company, warehouse, channel_EUR):
    product_type = ProductType.objects.create(
        name="Type with no shipping",
        slug="no-shipping",
        has_variants=False,
        is_shipping_required=False,
    )
    product = Product.objects.create(
        name="Test product",
        slug="test-product-4",
        product_type=product_type,
        category=category,
        company=company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_B")
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(product_variant=variant, warehouse=warehouse, quantity=1)
    return product


@pytest.fixture
def product_without_category(product):
    product.categories.set([])
    product.save()
    product.channel_listings.all().update(is_published=False)
    return product


@pytest.fixture
def product_list(product_type, category, company, warehouse, channel_EUR):
    product_attr = product_type.product_attributes.first()
    attr_value = product_attr.values.first()

    products = list(
        Product.objects.bulk_create(
            [
                Product(
                    name="Test product 1",
                    slug="test-product-a",
                    description_plaintext="big blue product",
                    category=category,
                    company=company,
                    product_type=product_type,
                ),
                Product(
                    name="Test product 2",
                    slug="test-product-b",
                    description_plaintext="big orange product",
                    category=category,
                    company=company,
                    product_type=product_type,
                ),
                Product(
                    name="Test product 3",
                    slug="test-product-c",
                    description_plaintext="small red",
                    category=category,
                    company=company,
                    product_type=product_type,
                ),
            ]
        )
    )

    for product in products:
        product.categories.set([category])
        product.save()

    ProductChannelListing.objects.bulk_create(
        [
            ProductChannelListing(
                product=products[0],
                channel=channel_EUR,
                is_published=True,
                discounted_price_amount=10,
                currency=channel_EUR.currency_code,
                visible_in_listings=True,
            ),
            ProductChannelListing(
                product=products[1],
                channel=channel_EUR,
                is_published=True,
                discounted_price_amount=20,
                currency=channel_EUR.currency_code,
                visible_in_listings=True,
            ),
            ProductChannelListing(
                product=products[2],
                channel=channel_EUR,
                is_published=True,
                discounted_price_amount=30,
                currency=channel_EUR.currency_code,
                visible_in_listings=True,
            ),
        ]
    )
    variants = list(
        ProductVariant.objects.bulk_create(
            [
                ProductVariant(
                    product=products[0],
                    sku=str(uuid.uuid4()).replace("-", ""),
                    track_inventory=True,
                ),
                ProductVariant(
                    product=products[1],
                    sku=str(uuid.uuid4()).replace("-", ""),
                    track_inventory=True,
                ),
                ProductVariant(
                    product=products[2],
                    sku=str(uuid.uuid4()).replace("-", ""),
                    track_inventory=True,
                ),
            ]
        )
    )
    ProductVariantChannelListing.objects.bulk_create(
        [
            ProductVariantChannelListing(
                variant=variants[0],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(10),
                currency=channel_EUR.currency_code,
            ),
            ProductVariantChannelListing(
                variant=variants[1],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(20),
                currency=channel_EUR.currency_code,
            ),
            ProductVariantChannelListing(
                variant=variants[2],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(30),
                currency=channel_EUR.currency_code,
            ),
        ]
    )
    stocks = []
    for variant in variants:
        stocks.append(Stock(warehouse=warehouse, product_variant=variant, quantity=100))
    Stock.objects.bulk_create(stocks)

    for product in products:
        associate_attribute_values_to_instance(product, product_attr, attr_value)

    return products


@pytest.fixture
def product_list_with_variants_many_channel(
    product_type, category, company, channel_EUR
):
    products = list(
        Product.objects.bulk_create(
            [
                Product(
                    name="Test product 1",
                    slug="test-product-a",
                    category=category,
                    company=company,
                    product_type=product_type,
                ),
                Product(
                    name="Test product 2",
                    slug="test-product-b",
                    category=category,
                    company=company,
                    product_type=product_type,
                ),
                Product(
                    name="Test product 3",
                    slug="test-product-c",
                    category=category,
                    company=company,
                    product_type=product_type,
                ),
            ]
        )
    )
    ProductChannelListing.objects.bulk_create(
        [
            # Channel: EUR
            ProductChannelListing(
                product=products[0],
                channel=channel_EUR,
                is_published=True,
                currency=channel_EUR.currency_code,
                visible_in_listings=True,
            ),
            # Channel: EUR
            ProductChannelListing(
                product=products[1],
                channel=channel_EUR,
                is_published=True,
                currency=channel_EUR.currency_code,
                visible_in_listings=True,
            ),
            ProductChannelListing(
                product=products[2],
                channel=channel_EUR,
                is_published=True,
                currency=channel_EUR.currency_code,
                visible_in_listings=True,
            ),
        ]
    )
    variants = list(
        ProductVariant.objects.bulk_create(
            [
                ProductVariant(
                    product=products[0],
                    sku=str(uuid.uuid4()).replace("-", ""),
                    track_inventory=True,
                ),
                ProductVariant(
                    product=products[1],
                    sku=str(uuid.uuid4()).replace("-", ""),
                    track_inventory=True,
                ),
                ProductVariant(
                    product=products[2],
                    sku=str(uuid.uuid4()).replace("-", ""),
                    track_inventory=True,
                ),
            ]
        )
    )
    ProductVariantChannelListing.objects.bulk_create(
        [
            # Channel: EUR
            ProductVariantChannelListing(
                variant=variants[0],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(10),
                currency=channel_EUR.currency_code,
            ),
            # Channel: EUR
            ProductVariantChannelListing(
                variant=variants[1],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(20),
                currency=channel_EUR.currency_code,
            ),
            ProductVariantChannelListing(
                variant=variants[2],
                channel=channel_EUR,
                cost_price_amount=Decimal(1),
                price_amount=Decimal(30),
                currency=channel_EUR.currency_code,
            ),
        ]
    )


@pytest.fixture
def product_list_with_many_channels(product_list, channel_EUR):
    """
    Add another channel to the product_list given.
    Those products already have a channel and we are using only one
    (channel_EUR), so we don't need this fixture although we can keep using it.
    """
    # ProductChannelListing.objects.bulk_create(
    #     [
    #         ProductChannelListing(
    #             product=product_list[0],
    #             channel=channel_EUR,
    #             is_published=True,
    #         ),
    #         ProductChannelListing(
    #             product=product_list[1],
    #             channel=channel_EUR,
    #             is_published=True,
    #         ),
    #         ProductChannelListing(
    #             product=product_list[2],
    #             channel=channel_EUR,
    #             is_published=True,
    #         ),
    #     ]
    # )
    return product_list


@pytest.fixture
def product_list_unpublished(product_list, channel_EUR):
    products = Product.objects.filter(pk__in=[product.pk for product in product_list])
    ProductChannelListing.objects.filter(
        product__in=products, channel=channel_EUR
    ).update(is_published=False)
    return products


@pytest.fixture
def product_list_published(product_list, channel_EUR):
    products = Product.objects.filter(pk__in=[product.pk for product in product_list])
    ProductChannelListing.objects.filter(
        product__in=products, channel=channel_EUR
    ).update(is_published=True)
    return products


@pytest.fixture
def order_list(customer_user, channel_EUR):
    address = customer_user.default_billing_address.get_copy()
    data = {
        "billing_address": address,
        "user": customer_user,
        "user_email": customer_user.email,
        "channel": channel_EUR,
        "origin": OrderOrigin.CHECKOUT,
    }
    order = Order.objects.create(**data)
    order1 = Order.objects.create(**data)
    order2 = Order.objects.create(**data)

    return [order, order1, order2]


@pytest.fixture
def order_with_lines_list(
    product_type,
    category,
    company,
    shipping_zone,
    warehouse,
    channel_EUR,
    customer_user,
):
    orders = []

    for i in range(3):
        address = customer_user.default_billing_address.get_copy()
        order = Order.objects.create(
            billing_address=address,
            channel=channel_EUR,
            currency=channel_EUR.currency_code,
            shipping_address=address,
            user_email=customer_user.email,
            user=customer_user,
            origin=OrderOrigin.CHECKOUT,
        )
        customer_user.save()
        product = Product.objects.create(
            name="Test product o" + str(i),
            slug="test-product-8-o" + str(i),
            product_type=product_type,
            category=category,
            company=company,
        )
        product.categories.add(category)

        ProductChannelListing.objects.create(
            product=product,
            channel=channel_EUR,
            is_published=True,
            visible_in_listings=True,
            available_for_purchase=datetime.date.today(),
        )
        variant = ProductVariant.objects.create(product=product, sku="SKU_AAO" + str(i))
        channel_listing = ProductVariantChannelListing.objects.create(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(10),
            cost_price_amount=Decimal(1),
            currency=channel_EUR.currency_code,
        )
        stock = Stock.objects.create(
            warehouse=warehouse, product_variant=variant, quantity=5
        )
        net = variant.get_price(
            product, [], channel_EUR, channel_listing, product.categories.all()
        )
        currency = net.currency
        gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
        quantity = 3
        unit_price = TaxedMoney(net=net, gross=gross)
        line = order.lines.create(
            product_name=str(variant.product),
            variant_name=str(variant),
            product_sku=variant.sku,
            is_shipping_required=variant.is_shipping_required(),
            quantity=quantity,
            variant=variant,
            unit_price=unit_price,
            total_price=unit_price * quantity,
            undiscounted_unit_price=unit_price,
            undiscounted_total_price=unit_price * quantity,
            tax_rate=Decimal("0.23"),
        )
        Allocation.objects.create(
            order_line=line, stock=stock, quantity_allocated=line.quantity
        )

        product = Product.objects.create(
            name="Test product 20" + str(i),
            slug="test-product-90" + str(i),
            product_type=product_type,
            category=category,
            company=company,
        )

        ProductChannelListing.objects.create(
            product=product,
            channel=channel_EUR,
            is_published=True,
            visible_in_listings=True,
            available_for_purchase=datetime.date.today(),
        )
        variant = ProductVariant.objects.create(product=product, sku="SKU_BO" + str(i))
        channel_listing = ProductVariantChannelListing.objects.create(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(20),
            cost_price_amount=Decimal(2),
            currency=channel_EUR.currency_code,
        )
        stock = Stock.objects.create(
            product_variant=variant, warehouse=warehouse, quantity=2
        )

        net = variant.get_price(
            product, [], channel_EUR, channel_listing, product.categories.all()
        )
        currency = net.currency
        gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
        unit_price = TaxedMoney(net=net, gross=gross)
        quantity = 2
        line = order.lines.create(
            product_name=str(variant.product),
            variant_name=str(variant),
            product_sku=variant.sku,
            is_shipping_required=variant.is_shipping_required(),
            quantity=quantity,
            variant=variant,
            unit_price=unit_price,
            total_price=unit_price * quantity,
            undiscounted_unit_price=unit_price,
            undiscounted_total_price=unit_price * quantity,
            tax_rate=Decimal("0.23"),
        )
        Allocation.objects.create(
            order_line=line, stock=stock, quantity_allocated=line.quantity
        )

        order.shipping_address = order.billing_address.get_copy()
        order.channel = channel_EUR
        shipping_method = shipping_zone.shipping_methods.first()
        shipping_price = shipping_method.channel_listings.get(channel_id=channel_EUR.id)
        order.shipping_method_name = shipping_method.name
        order.shipping_method = shipping_method

        net = shipping_price.get_total()
        gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
        order.shipping_price = TaxedMoney(net=net, gross=gross)
        order.save()

        recalculate_order(order)

        order.refresh_from_db()
        orders.append(order)
    return orders


@pytest.fixture
def order_with_lines_list_and_payment(
    product_type,
    category,
    company,
    shipping_zone,
    warehouse,
    channel_EUR,
    customer_user,
):
    orders = []

    for i in range(3):
        address = customer_user.default_billing_address.get_copy()
        order = Order.objects.create(
            billing_address=address,
            channel=channel_EUR,
            currency=channel_EUR.currency_code,
            shipping_address=address,
            user_email=customer_user.email,
            user=customer_user,
            origin=OrderOrigin.CHECKOUT,
        )
        customer_user.save()
        product = Product.objects.create(
            name="Test product o" + str(i),
            slug="test-product-8-o" + str(i),
            product_type=product_type,
            category=category,
            company=company,
        )
        product.categories.add(category)

        ProductChannelListing.objects.create(
            product=product,
            channel=channel_EUR,
            is_published=True,
            visible_in_listings=True,
            available_for_purchase=datetime.date.today(),
        )
        variant = ProductVariant.objects.create(product=product, sku="SKU_AAO" + str(i))
        channel_listing = ProductVariantChannelListing.objects.create(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(10),
            cost_price_amount=Decimal(1),
            currency=channel_EUR.currency_code,
        )
        stock = Stock.objects.create(
            warehouse=warehouse, product_variant=variant, quantity=5
        )
        net = variant.get_price(
            product, [], channel_EUR, channel_listing, product.categories.all()
        )
        currency = net.currency
        gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
        quantity = 3
        unit_price = TaxedMoney(net=net, gross=gross)
        line = order.lines.create(
            product_name=str(variant.product),
            variant_name=str(variant),
            product_sku=variant.sku,
            is_shipping_required=variant.is_shipping_required(),
            quantity=quantity,
            variant=variant,
            unit_price=unit_price,
            total_price=unit_price * quantity,
            undiscounted_unit_price=unit_price,
            undiscounted_total_price=unit_price * quantity,
            tax_rate=Decimal("0.23"),
        )
        Allocation.objects.create(
            order_line=line, stock=stock, quantity_allocated=line.quantity
        )

        product = Product.objects.create(
            name="Test product 20" + str(i),
            slug="test-product-90" + str(i),
            product_type=product_type,
            category=category,
            company=company,
        )

        ProductChannelListing.objects.create(
            product=product,
            channel=channel_EUR,
            is_published=True,
            visible_in_listings=True,
            available_for_purchase=datetime.date.today(),
        )
        variant = ProductVariant.objects.create(product=product, sku="SKU_BO" + str(i))
        channel_listing = ProductVariantChannelListing.objects.create(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(20),
            cost_price_amount=Decimal(2),
            currency=channel_EUR.currency_code,
        )
        stock = Stock.objects.create(
            product_variant=variant, warehouse=warehouse, quantity=2
        )

        net = variant.get_price(
            product, [], channel_EUR, channel_listing, product.categories.all()
        )
        currency = net.currency
        gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
        unit_price = TaxedMoney(net=net, gross=gross)
        quantity = 2
        line = order.lines.create(
            product_name=str(variant.product),
            variant_name=str(variant),
            product_sku=variant.sku,
            is_shipping_required=variant.is_shipping_required(),
            quantity=quantity,
            variant=variant,
            unit_price=unit_price,
            total_price=unit_price * quantity,
            undiscounted_unit_price=unit_price,
            undiscounted_total_price=unit_price * quantity,
            tax_rate=Decimal("0.23"),
        )
        Allocation.objects.create(
            order_line=line, stock=stock, quantity_allocated=line.quantity
        )

        order.shipping_address = order.billing_address.get_copy()
        order.channel = channel_EUR
        shipping_method = shipping_zone.shipping_methods.first()
        shipping_price = shipping_method.channel_listings.get(channel_id=channel_EUR.id)
        order.shipping_method_name = shipping_method.name
        order.shipping_method = shipping_method

        net = shipping_price.get_total()
        gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
        order.shipping_price = TaxedMoney(net=net, gross=gross)
        order.save()

        payment = Payment.objects.create(
            gateway="mirumee.payments.dummy",
            order=order,
            is_active=True,
            cc_first_digits="4111",
            cc_last_digits="1111",
            cc_brand="visa",
            cc_exp_month=12,
            cc_exp_year=2027,
            total=order.total.gross.amount,
            currency=order.currency,
            billing_first_name=order.billing_address.first_name,
            billing_last_name=order.billing_address.last_name,
            billing_company_name=order.billing_address.company_name,
            billing_address_1=order.billing_address.street_address_1,
            billing_address_2=order.billing_address.street_address_2,
            billing_city=order.billing_address.city,
            billing_postal_code=order.billing_address.postal_code,
            billing_country_code=order.billing_address.country.code,
            billing_country_area=order.billing_address.country_area,
            billing_email=order.user_email,
            drural_fee=2.00,
            captured_amount=order.total.gross.amount,
        )
        payment.charge_status = ChargeStatus.FULLY_CHARGED
        payment.save()

        recalculate_order(order)

        # create payment

        order.refresh_from_db()
        orders.append(order)
    return orders


@pytest.fixture
def draft_order_list(
    draft_order, product_type, category, company, shipping_zone, warehouse, channel_EUR
):

    orders = []

    for i in range(3):
        product = Product.objects.create(
            name="Test product 42" + str(i),
            slug="test-product-42" + str(i),
            product_type=product_type,
            category=category,
            company=company,
        )
        product.categories.add(category)

        ProductChannelListing.objects.create(
            product=product,
            channel=channel_EUR,
            is_published=True,
            visible_in_listings=True,
            available_for_purchase=datetime.date.today(),
        )
        variant = ProductVariant.objects.create(product=product, sku="SKU_AB" + str(i))
        channel_listing = ProductVariantChannelListing.objects.create(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(10),
            cost_price_amount=Decimal(1),
            currency=channel_EUR.currency_code,
        )
        stock = Stock.objects.create(
            warehouse=warehouse, product_variant=variant, quantity=5
        )
        net = variant.get_price(
            product, [], channel_EUR, channel_listing, product.categories.all()
        )
        currency = net.currency
        gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
        quantity = 3
        unit_price = TaxedMoney(net=net, gross=gross)
        line = draft_order.lines.create(
            product_name=str(variant.product),
            variant_name=str(variant),
            product_sku=variant.sku,
            is_shipping_required=variant.is_shipping_required(),
            quantity=quantity,
            variant=variant,
            unit_price=unit_price,
            total_price=unit_price * quantity,
            undiscounted_unit_price=unit_price,
            undiscounted_total_price=unit_price * quantity,
            tax_rate=Decimal("0.38"),
        )
        Allocation.objects.create(
            order_line=line, stock=stock, quantity_allocated=line.quantity
        )

        product = Product.objects.create(
            name="Test product 3" + str(i),
            slug="test-product-10" + str(i),
            product_type=product_type,
            category=category,
            company=company,
        )

        ProductChannelListing.objects.create(
            product=product,
            channel=channel_EUR,
            is_published=True,
            visible_in_listings=True,
            available_for_purchase=datetime.date.today(),
        )
        variant = ProductVariant.objects.create(product=product, sku="SKU_C" + str(i))
        channel_listing = ProductVariantChannelListing.objects.create(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(20),
            cost_price_amount=Decimal(2),
            currency=channel_EUR.currency_code,
        )
        stock = Stock.objects.create(
            product_variant=variant, warehouse=warehouse, quantity=2
        )

        net = variant.get_price(
            product, [], channel_EUR, channel_listing, product.categories.all()
        )
        currency = net.currency
        gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
        unit_price = TaxedMoney(net=net, gross=gross)
        quantity = 2
        line = draft_order.lines.create(
            product_name=str(variant.product),
            variant_name=str(variant),
            product_sku=variant.sku,
            is_shipping_required=variant.is_shipping_required(),
            quantity=quantity,
            variant=variant,
            unit_price=unit_price,
            total_price=unit_price * quantity,
            undiscounted_unit_price=unit_price,
            undiscounted_total_price=unit_price * quantity,
            tax_rate=Decimal("0.23"),
        )
        Allocation.objects.create(
            order_line=line, stock=stock, quantity_allocated=line.quantity
        )

        draft_order.shipping_address = draft_order.billing_address.get_copy()
        draft_order.channel = channel_EUR
        shipping_method = shipping_zone.shipping_methods.first()
        shipping_price = shipping_method.channel_listings.get(channel_id=channel_EUR.id)
        draft_order.shipping_method_name = shipping_method.name
        draft_order.shipping_method = shipping_method

        net = shipping_price.get_total()
        gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
        draft_order.shipping_price = TaxedMoney(net=net, gross=gross)
        draft_order.save()

        recalculate_order(draft_order)

        draft_order.refresh_from_db()
        orders.append(draft_order)

    return orders


@pytest.fixture
def draft_order_list_other_company(
    draft_order,
    product_type,
    category,
    seller_company,
    shipping_zone,
    warehouse,
    channel_EUR,
):

    orders = []

    for i in range(3):
        product = Product.objects.create(
            name="Test product 42" + str(i),
            slug="test-product-42" + str(i),
            product_type=product_type,
            category=category,
            company=seller_company,
        )
        product.categories.add(category)

        ProductChannelListing.objects.create(
            product=product,
            channel=channel_EUR,
            is_published=True,
            visible_in_listings=True,
            available_for_purchase=datetime.date.today(),
        )
        variant = ProductVariant.objects.create(product=product, sku="SKU_AB" + str(i))
        channel_listing = ProductVariantChannelListing.objects.create(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(10),
            cost_price_amount=Decimal(1),
            currency=channel_EUR.currency_code,
        )
        stock = Stock.objects.create(
            warehouse=warehouse, product_variant=variant, quantity=5
        )
        net = variant.get_price(
            product, [], channel_EUR, channel_listing, product.categories.all()
        )
        currency = net.currency
        gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
        quantity = 3
        unit_price = TaxedMoney(net=net, gross=gross)
        line = draft_order.lines.create(
            product_name=str(variant.product),
            variant_name=str(variant),
            product_sku=variant.sku,
            is_shipping_required=variant.is_shipping_required(),
            quantity=quantity,
            variant=variant,
            unit_price=unit_price,
            total_price=unit_price * quantity,
            undiscounted_unit_price=unit_price,
            undiscounted_total_price=unit_price * quantity,
            tax_rate=Decimal("0.38"),
        )
        Allocation.objects.create(
            order_line=line, stock=stock, quantity_allocated=line.quantity
        )

        product = Product.objects.create(
            name="Test product 3" + str(i),
            slug="test-product-10" + str(i),
            product_type=product_type,
            category=category,
            company=seller_company,
        )

        ProductChannelListing.objects.create(
            product=product,
            channel=channel_EUR,
            is_published=True,
            visible_in_listings=True,
            available_for_purchase=datetime.date.today(),
        )
        variant = ProductVariant.objects.create(product=product, sku="SKU_C" + str(i))
        channel_listing = ProductVariantChannelListing.objects.create(
            variant=variant,
            channel=channel_EUR,
            price_amount=Decimal(20),
            cost_price_amount=Decimal(2),
            currency=channel_EUR.currency_code,
        )
        stock = Stock.objects.create(
            product_variant=variant, warehouse=warehouse, quantity=2
        )

        net = variant.get_price(
            product, [], channel_EUR, channel_listing, product.categories.all()
        )
        currency = net.currency
        gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
        unit_price = TaxedMoney(net=net, gross=gross)
        quantity = 2
        line = draft_order.lines.create(
            product_name=str(variant.product),
            variant_name=str(variant),
            product_sku=variant.sku,
            is_shipping_required=variant.is_shipping_required(),
            quantity=quantity,
            variant=variant,
            unit_price=unit_price,
            total_price=unit_price * quantity,
            undiscounted_unit_price=unit_price,
            undiscounted_total_price=unit_price * quantity,
            tax_rate=Decimal("0.23"),
        )
        Allocation.objects.create(
            order_line=line, stock=stock, quantity_allocated=line.quantity
        )

        draft_order.shipping_address = draft_order.billing_address.get_copy()
        draft_order.channel = channel_EUR
        shipping_method = shipping_zone.shipping_methods.first()
        shipping_price = shipping_method.channel_listings.get(channel_id=channel_EUR.id)
        draft_order.shipping_method_name = shipping_method.name
        draft_order.shipping_method = shipping_method

        net = shipping_price.get_total()
        gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
        draft_order.shipping_price = TaxedMoney(net=net, gross=gross)
        draft_order.save()

        recalculate_order(draft_order)

        draft_order.refresh_from_db()
        orders.append(draft_order)

    return orders


@pytest.fixture
def product_with_image(product, image, media_root):
    ProductMedia.objects.create(product=product, image=image)
    return product


@pytest.fixture
def unavailable_product(product_type, category, company, channel_EUR):
    product = Product.objects.create(
        name="Test product",
        slug="test-product-5",
        product_type=product_type,
        category=category,
        company=company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=False,
        visible_in_listings=False,
    )
    return product


@pytest.fixture
def unavailable_product_with_variant(
    product_type, category, company, warehouse, channel_EUR
):
    product = Product.objects.create(
        name="Test product",
        slug="test-product-6",
        product_type=product_type,
        category=category,
        company=company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=False,
        visible_in_listings=False,
    )

    variant_attr = product_type.variant_attributes.first()
    variant_attr_value = variant_attr.values.first()

    variant = ProductVariant.objects.create(
        product=product,
        sku="123",
    )
    ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(product_variant=variant, warehouse=warehouse, quantity=10)

    associate_attribute_values_to_instance(variant, variant_attr, variant_attr_value)
    return product


@pytest.fixture
def product_with_images(product_type, category, company, media_root, channel_EUR):
    product = Product.objects.create(
        name="Test product",
        slug="test-product-7",
        product_type=product_type,
        category=category,
        company=company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
    )
    file_mock_0 = MagicMock(spec=File, name="FileMock0")
    file_mock_0.name = "image0.jpg"
    file_mock_1 = MagicMock(spec=File, name="FileMock1")
    file_mock_1.name = "image1.jpg"
    product.media.create(image=file_mock_0)
    product.media.create(image=file_mock_1)
    return product


@pytest.fixture
def voucher_without_channel(db):
    return Voucher.objects.create(code="mirumee")


@pytest.fixture
def voucher(voucher_without_channel, channel_EUR):
    VoucherChannelListing.objects.create(
        voucher=voucher_without_channel,
        channel=channel_EUR,
        discount=Money(20, channel_EUR.currency_code),
    )
    return voucher_without_channel


@pytest.fixture
def voucher_with_many_channels(voucher, channel_EUR):
    # VoucherChannelListing.objects.create(
    #     voucher=voucher,
    #     channel=channel_EUR,
    #     discount=Money(80, channel_EUR.currency_code),
    # )
    return voucher


@pytest.fixture
def voucher_percentage(channel_EUR):
    voucher = Voucher.objects.create(
        code="saleor",
        discount_value_type=DiscountValueType.PERCENTAGE,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount_value=10,
        currency=channel_EUR.currency_code,
    )
    return voucher


@pytest.fixture
def voucher_specific_product_type(voucher_percentage):
    voucher_percentage.type = VoucherType.SPECIFIC_PRODUCT
    voucher_percentage.save()
    return voucher_percentage


@pytest.fixture
def voucher_with_high_min_spent_amount(channel_EUR):
    voucher = Voucher.objects.create(code="mirumee")
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(10, channel_EUR.currency_code),
        min_spent_amount=1_000_000,
    )
    return voucher


@pytest.fixture
def voucher_shipping_type(channel_EUR):
    voucher = Voucher.objects.create(
        code="mirumee", type=VoucherType.SHIPPING, countries="IS"
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(10, channel_EUR.currency_code),
    )
    return voucher


@pytest.fixture
def voucher_free_shipping(voucher_percentage, channel_EUR):
    voucher_percentage.type = VoucherType.SHIPPING
    voucher_percentage.name = "Free shipping"
    voucher_percentage.save()
    voucher_percentage.channel_listings.filter(channel=channel_EUR).update(
        discount_value=100
    )
    return voucher_percentage


@pytest.fixture
def voucher_customer(voucher, customer_user):
    email = customer_user.email
    return VoucherCustomer.objects.create(voucher=voucher, customer_email=email)


@pytest.fixture
def order_line(order, variant):
    product = variant.product
    channel = order.channel
    channel_listing = variant.channel_listings.get(channel=channel)
    net = variant.get_price(
        product, [], channel, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    quantity = 3
    unit_price = TaxedMoney(net=net, gross=gross)
    return order.lines.create(
        product_name=str(product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )


@pytest.fixture
def order_line_with_allocation_in_many_stocks(
    customer_user, variant_with_many_stocks, channel_EUR
):
    address = customer_user.default_billing_address.get_copy()
    variant = variant_with_many_stocks
    stocks = variant.stocks.all().order_by("pk")

    order = Order.objects.create(
        billing_address=address,
        user_email=customer_user.email,
        user=customer_user,
        channel=channel_EUR,
        origin=OrderOrigin.CHECKOUT,
    )

    product = variant.product
    channel_listing = variant.channel_listings.get(channel=channel_EUR)
    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    quantity = 3
    unit_price = TaxedMoney(net=net, gross=gross)
    order_line = order.lines.create(
        product_name=str(product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )

    Allocation.objects.bulk_create(
        [
            Allocation(order_line=order_line, stock=stocks[0], quantity_allocated=2),
            Allocation(order_line=order_line, stock=stocks[1], quantity_allocated=1),
        ]
    )

    return order_line


@pytest.fixture
def order_line_with_one_allocation(
    customer_user, variant_with_many_stocks, channel_EUR
):
    address = customer_user.default_billing_address.get_copy()
    variant = variant_with_many_stocks
    stocks = variant.stocks.all().order_by("pk")

    order = Order.objects.create(
        billing_address=address,
        user_email=customer_user.email,
        user=customer_user,
        channel=channel_EUR,
        origin=OrderOrigin.CHECKOUT,
    )

    product = variant.product
    channel_listing = variant.channel_listings.get(channel=channel_EUR)
    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    quantity = 2
    unit_price = TaxedMoney(net=net, gross=gross)
    order_line = order.lines.create(
        product_name=str(product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )

    Allocation.objects.create(
        order_line=order_line, stock=stocks[0], quantity_allocated=1
    )

    return order_line


@pytest.fixture
def gift_card(customer_user, staff_user):
    return GiftCard.objects.create(
        code="mirumee_giftcard",
        user=customer_user,
        initial_balance=Money(10, "EUR"),
        current_balance=Money(10, "EUR"),
    )


@pytest.fixture
def gift_card_used(staff_user):
    return GiftCard.objects.create(
        code="gift_card_used",
        initial_balance=Money(150, "EUR"),
        current_balance=Money(100, "EUR"),
    )


@pytest.fixture
def gift_card_created_by_staff(staff_user):
    return GiftCard.objects.create(
        code="mirumee_staff",
        initial_balance=Money(5, "EUR"),
        current_balance=Money(5, "EUR"),
    )


@pytest.fixture
def order_with_lines(
    order, product_type, category, company, shipping_zone, warehouse, channel_EUR
):
    product = Product.objects.create(
        name="Test product",
        slug="test-product-8",
        product_type=product_type,
        category=category,
        company=company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_AA")
    channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    stock = Stock.objects.create(
        warehouse=warehouse, product_variant=variant, quantity=5
    )
    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    quantity = 3
    unit_price = TaxedMoney(net=net, gross=gross)
    line = order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )
    Allocation.objects.create(
        order_line=line, stock=stock, quantity_allocated=line.quantity
    )

    product = Product.objects.create(
        name="Test product 2",
        slug="test-product-9",
        product_type=product_type,
        category=category,
        company=company,
    )

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_B")
    channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(20),
        cost_price_amount=Decimal(2),
        currency=channel_EUR.currency_code,
    )
    stock = Stock.objects.create(
        product_variant=variant, warehouse=warehouse, quantity=2
    )

    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    unit_price = TaxedMoney(net=net, gross=gross)
    quantity = 2
    line = order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )
    Allocation.objects.create(
        order_line=line, stock=stock, quantity_allocated=line.quantity
    )

    order.shipping_address = order.billing_address.get_copy()
    order.channel = channel_EUR
    shipping_method = shipping_zone.shipping_methods.first()
    shipping_price = shipping_method.channel_listings.get(channel_id=channel_EUR.id)
    order.shipping_method_name = shipping_method.name
    order.shipping_method = shipping_method

    net = shipping_price.get_total()
    gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
    order.shipping_price = TaxedMoney(net=net, gross=gross)
    order.save()

    recalculate_order(order)

    order.refresh_from_db()
    return order


@pytest.fixture
def order_with_lines_with_payment(
    order,
    product_type,
    category,
    company,
    shipping_zone,
    warehouse,
    channel_EUR,
    payment_dummy,
):
    product = Product.objects.create(
        name="Test product16",
        slug="test-product-16",
        product_type=product_type,
        category=category,
        company=company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_AE")
    channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    stock = Stock.objects.create(
        warehouse=warehouse, product_variant=variant, quantity=5
    )
    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    quantity = 3
    unit_price = TaxedMoney(net=net, gross=gross)
    line = order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )
    Allocation.objects.create(
        order_line=line, stock=stock, quantity_allocated=line.quantity
    )

    product = Product.objects.create(
        name="Test product 5",
        slug="test-product-160",
        product_type=product_type,
        category=category,
        company=company,
    )

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_F")
    channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(20),
        cost_price_amount=Decimal(2),
        currency=channel_EUR.currency_code,
    )
    stock = Stock.objects.create(
        product_variant=variant, warehouse=warehouse, quantity=2
    )

    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    unit_price = TaxedMoney(net=net, gross=gross)
    quantity = 2
    line = order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )
    Allocation.objects.create(
        order_line=line, stock=stock, quantity_allocated=line.quantity
    )

    order.shipping_address = order.billing_address.get_copy()
    order.channel = channel_EUR
    shipping_method = shipping_zone.shipping_methods.first()
    shipping_price = shipping_method.channel_listings.get(channel_id=channel_EUR.id)
    order.shipping_method_name = shipping_method.name
    order.shipping_method = shipping_method

    net = shipping_price.get_total()
    gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
    order.shipping_price = TaxedMoney(net=net, gross=gross)
    order.save()

    recalculate_order(order)

    payment = payment_dummy
    payment.order = order
    payment.charge_status = ChargeStatus.FULLY_CHARGED
    payment.captured_amount = payment.total
    payment.drural_fee = Decimal(2.0)
    payment.total_seller = gross.amount - Decimal(2.0)
    payment.save()

    payment.transactions.create(
        amount=payment.total,
        currency=payment.currency,
        kind=TransactionKind.CAPTURE,
        gateway_response={},
        is_success=True,
    )

    order.refresh_from_db()
    return order


@pytest.fixture
def order_with_lines_other_company(
    other_order,
    product_type,
    category,
    other_company,
    shipping_zone,
    warehouse,
    channel_EUR,
):
    product = Product.objects.create(
        name="Test product 42",
        slug="test-product-42",
        product_type=product_type,
        category=category,
        company=other_company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_AB")
    channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    stock = Stock.objects.create(
        warehouse=warehouse, product_variant=variant, quantity=5
    )
    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    quantity = 3
    unit_price = TaxedMoney(net=net, gross=gross)
    line = other_order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.38"),
    )
    Allocation.objects.create(
        order_line=line, stock=stock, quantity_allocated=line.quantity
    )

    product = Product.objects.create(
        name="Test product 3",
        slug="test-product-10",
        product_type=product_type,
        category=category,
        company=other_company,
    )

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_C")
    channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(20),
        cost_price_amount=Decimal(2),
        currency=channel_EUR.currency_code,
    )
    stock = Stock.objects.create(
        product_variant=variant, warehouse=warehouse, quantity=2
    )

    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    unit_price = TaxedMoney(net=net, gross=gross)
    quantity = 2
    line = other_order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )
    Allocation.objects.create(
        order_line=line, stock=stock, quantity_allocated=line.quantity
    )

    other_order.shipping_address = other_order.billing_address.get_copy()
    other_order.channel = channel_EUR
    shipping_method = shipping_zone.shipping_methods.first()
    shipping_price = shipping_method.channel_listings.get(channel_id=channel_EUR.id)
    other_order.shipping_method_name = shipping_method.name
    other_order.shipping_method = shipping_method

    net = shipping_price.get_total()
    gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
    other_order.shipping_price = TaxedMoney(net=net, gross=gross)
    other_order.save()

    recalculate_order(other_order)

    other_order.refresh_from_db()
    return other_order


@pytest.fixture
def order_with_lines_seller_company(
    other_order,
    product_type,
    category,
    seller_company,
    shipping_zone,
    warehouse,
    channel_EUR,
):
    product = Product.objects.create(
        name="Test product 43",
        slug="test-product-43",
        product_type=product_type,
        category=category,
        company=seller_company,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_AD")
    channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    stock = Stock.objects.create(
        warehouse=warehouse, product_variant=variant, quantity=5
    )
    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    quantity = 3
    unit_price = TaxedMoney(net=net, gross=gross)
    line = other_order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.38"),
    )
    Allocation.objects.create(
        order_line=line, stock=stock, quantity_allocated=line.quantity
    )

    product = Product.objects.create(
        name="Test product 4",
        slug="test-product-12",
        product_type=product_type,
        category=category,
        company=seller_company,
    )

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date.today(),
    )
    variant = ProductVariant.objects.create(product=product, sku="SKU_E")
    channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(20),
        cost_price_amount=Decimal(2),
        currency=channel_EUR.currency_code,
    )
    stock = Stock.objects.create(
        product_variant=variant, warehouse=warehouse, quantity=2
    )

    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    unit_price = TaxedMoney(net=net, gross=gross)
    quantity = 2
    line = other_order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )
    Allocation.objects.create(
        order_line=line, stock=stock, quantity_allocated=line.quantity
    )

    other_order.shipping_address = other_order.billing_address.get_copy()
    other_order.channel = channel_EUR
    shipping_method = shipping_zone.shipping_methods.first()
    shipping_price = shipping_method.channel_listings.get(channel_id=channel_EUR.id)
    other_order.shipping_method_name = shipping_method.name
    other_order.shipping_method = shipping_method

    net = shipping_price.get_total()
    gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
    other_order.shipping_price = TaxedMoney(net=net, gross=gross)
    other_order.save()

    recalculate_order(other_order)

    other_order.refresh_from_db()
    return other_order


@pytest.fixture
def order_fulfill_data(order_with_lines, warehouse):
    FulfillmentData = namedtuple("FulfillmentData", "order variables warehouse")
    order = order_with_lines
    order_id = graphene.Node.to_global_id("Order", order.id)
    order_line, order_line2 = order.lines.all()
    order_line_id = graphene.Node.to_global_id("OrderLine", order_line.id)
    order_line2_id = graphene.Node.to_global_id("OrderLine", order_line2.id)
    warehouse_id = graphene.Node.to_global_id("Warehouse", warehouse.pk)

    variables = {
        "order": order_id,
        "input": {
            "notifyCustomer": False,
            "allowStockToBeExceeded": True,
            "lines": [
                {
                    "orderLineId": order_line_id,
                    "stocks": [{"quantity": 3, "warehouse": warehouse_id}],
                },
                {
                    "orderLineId": order_line2_id,
                    "stocks": [{"quantity": 2, "warehouse": warehouse_id}],
                },
            ],
        },
    }

    return FulfillmentData(order, variables, warehouse)


@pytest.fixture
def lines_info(order_with_lines):
    return [
        OrderLineData(
            line=line,
            quantity=line.quantity,
            variant=line.variant,
            warehouse_pk=line.allocations.first().stock.warehouse.pk,
        )
        for line in order_with_lines.lines.all()
    ]


@pytest.fixture
def order_with_lines_and_events(order_with_lines, staff_user):
    events = []
    for event_type, _ in OrderEvents.CHOICES:
        events.append(
            OrderEvent(
                type=event_type,
                order=order_with_lines,
                user=staff_user,
            )
        )
    OrderEvent.objects.bulk_create(events)
    fulfillment_refunded_event(
        order=order_with_lines,
        user=staff_user,
        app=None,
        refunded_lines=[(1, order_with_lines.lines.first())],
        amount=Decimal("10.0"),
        shipping_costs_included=False,
    )
    order_added_products_event(
        order=order_with_lines,
        user=staff_user,
        app=None,
        order_lines=[(1, order_with_lines.lines.first())],
    )
    return order_with_lines


@pytest.fixture
def order_with_line_without_inventory_tracking(
    order, variant_without_inventory_tracking
):
    variant = variant_without_inventory_tracking
    product = variant.product
    channel = order.channel
    channel_listing = variant.channel_listings.get(channel=channel)
    net = variant.get_price(
        product, [], channel, channel_listing, product.categories.all()
    )
    currency = net.currency
    gross = Money(amount=net.amount * Decimal(1.23), currency=currency)
    quantity = 3
    unit_price = TaxedMoney(net=net, gross=gross)
    line = order.lines.create(
        product_name=str(variant.product),
        variant_name=str(variant),
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,
        total_price=unit_price * quantity,
        undiscounted_unit_price=unit_price,
        undiscounted_total_price=unit_price * quantity,
        tax_rate=Decimal("0.23"),
    )

    recalculate_order(order)

    order.refresh_from_db()
    return order


@pytest.fixture
def order_events(order):
    for event_type, _ in OrderEvents.CHOICES:
        OrderEvent.objects.create(type=event_type, order=order)


@pytest.fixture
def fulfilled_order(order_with_lines):
    order = order_with_lines
    invoice = order.invoices.create(
        url="http://www.example.com/invoice.pdf",
        number="01/12/2020/TEST",
        created=datetime.datetime.now(tz=pytz.utc),
        status=JobStatus.SUCCESS,
    )
    fulfillment = order.fulfillments.create(tracking_number="123")
    line_1 = order.lines.first()
    stock_1 = line_1.allocations.get().stock
    warehouse_1_pk = stock_1.warehouse.pk
    line_2 = order.lines.last()
    stock_2 = line_2.allocations.get().stock
    warehouse_2_pk = stock_2.warehouse.pk
    fulfillment.lines.create(order_line=line_1, quantity=line_1.quantity, stock=stock_1)
    fulfillment.lines.create(order_line=line_2, quantity=line_2.quantity, stock=stock_2)
    fulfill_order_lines(
        [
            OrderLineData(
                line=line_1, quantity=line_1.quantity, warehouse_pk=warehouse_1_pk
            ),
            OrderLineData(
                line=line_2, quantity=line_2.quantity, warehouse_pk=warehouse_2_pk
            ),
        ],
    )
    order.status = OrderStatus.FULFILLED
    order.save(update_fields=["status"])
    return order


@pytest.fixture
def fulfilled_order_with_payment(order_with_lines_with_payment):
    order = order_with_lines_with_payment
    invoice = order.invoices.create(
        url="http://www.example.com/invoice.pdf",
        number="01/12/2020/TEST",
        created=datetime.datetime.now(tz=pytz.utc),
        status=JobStatus.SUCCESS,
    )
    fulfillment = order.fulfillments.create(tracking_number="123")
    line_1 = order.lines.first()
    stock_1 = line_1.allocations.get().stock
    warehouse_1_pk = stock_1.warehouse.pk
    line_2 = order.lines.last()
    stock_2 = line_2.allocations.get().stock
    warehouse_2_pk = stock_2.warehouse.pk
    fulfillment.lines.create(order_line=line_1, quantity=line_1.quantity, stock=stock_1)
    fulfillment.lines.create(order_line=line_2, quantity=line_2.quantity, stock=stock_2)
    fulfill_order_lines(
        [
            OrderLineData(
                line=line_1, quantity=line_1.quantity, warehouse_pk=warehouse_1_pk
            ),
            OrderLineData(
                line=line_2, quantity=line_2.quantity, warehouse_pk=warehouse_2_pk
            ),
        ],
    )
    order.status = OrderStatus.FULFILLED
    order.save(update_fields=["status"])
    return order


@pytest.fixture
def fulfilled_order_without_inventory_tracking(
    order_with_line_without_inventory_tracking,
):
    order = order_with_line_without_inventory_tracking
    fulfillment = order.fulfillments.create(tracking_number="123")
    line = order.lines.first()
    stock = line.variant.stocks.get()
    warehouse_pk = stock.warehouse.pk
    fulfillment.lines.create(order_line=line, quantity=line.quantity, stock=stock)
    fulfill_order_lines(
        [OrderLineData(line=line, quantity=line.quantity, warehouse_pk=warehouse_pk)]
    )
    order.status = OrderStatus.FULFILLED
    order.save(update_fields=["status"])
    return order


@pytest.fixture
def fulfilled_order_with_cancelled_fulfillment(fulfilled_order):
    fulfillment = fulfilled_order.fulfillments.create()
    line_1 = fulfilled_order.lines.first()
    line_2 = fulfilled_order.lines.last()
    fulfillment.lines.create(order_line=line_1, quantity=line_1.quantity)
    fulfillment.lines.create(order_line=line_2, quantity=line_2.quantity)
    fulfillment.status = FulfillmentStatus.CANCELED
    fulfillment.save()
    return fulfilled_order


@pytest.fixture
def fulfilled_order_with_all_cancelled_fulfillments(
    fulfilled_order, staff_user, warehouse
):
    fulfillment = fulfilled_order.fulfillments.get()
    cancel_fulfillment(fulfillment, staff_user, None, warehouse, get_plugins_manager())
    return fulfilled_order


@pytest.fixture
def fulfillment(fulfilled_order):
    return fulfilled_order.fulfillments.first()


@pytest.fixture
def draft_order(order_with_lines):
    Allocation.objects.filter(order_line__order=order_with_lines).delete()
    order_with_lines.status = OrderStatus.DRAFT
    order_with_lines.origin = OrderOrigin.DRAFT
    order_with_lines.save(update_fields=["status", "origin"])
    return order_with_lines


@pytest.fixture
def draft_order_other_company(order_with_lines_other_company):
    Allocation.objects.filter(order_line__order=order_with_lines_other_company).delete()
    order_with_lines_other_company.status = OrderStatus.DRAFT
    order_with_lines_other_company.origin = OrderOrigin.DRAFT
    order_with_lines_other_company.save(update_fields=["status", "origin"])
    return order_with_lines_other_company


@pytest.fixture
def draft_order_with_fixed_discount_order(draft_order):
    value = Decimal("20")
    discount = partial(fixed_discount, discount=Money(value, draft_order.currency))
    draft_order.undiscounted_total = draft_order.total
    draft_order.total = discount(draft_order.total)
    draft_order.discounts.create(
        value_type=DiscountValueType.FIXED,
        value=value,
        reason="Discount reason",
        amount=(draft_order.undiscounted_total - draft_order.total).gross,  # type: ignore
    )
    draft_order.save()
    return draft_order


@pytest.fixture
def draft_order_without_inventory_tracking(order_with_line_without_inventory_tracking):
    order_with_line_without_inventory_tracking.status = OrderStatus.DRAFT
    order_with_line_without_inventory_tracking.origin = OrderStatus.DRAFT
    order_with_line_without_inventory_tracking.save(update_fields=["status", "origin"])
    return order_with_line_without_inventory_tracking


@pytest.fixture
def payment_txn_preauth(order_with_lines, payment_dummy):
    order = order_with_lines
    payment = payment_dummy
    payment.order = order
    payment.save()

    payment.transactions.create(
        amount=payment.total,
        currency=payment.currency,
        kind=TransactionKind.AUTH,
        gateway_response={},
        is_success=True,
    )
    return payment


@pytest.fixture
def payment_txn_captured(order_with_lines, payment_dummy):
    order = order_with_lines
    payment = payment_dummy
    payment.order = order
    payment.charge_status = ChargeStatus.FULLY_CHARGED
    payment.captured_amount = payment.total
    payment.save()

    payment.transactions.create(
        amount=payment.total,
        currency=payment.currency,
        kind=TransactionKind.CAPTURE,
        gateway_response={},
        is_success=True,
    )
    return payment


@pytest.fixture
def payment_txn_captured_other_company(order_with_lines_other_company, payment_dummy):
    order = order_with_lines_other_company
    payment = payment_dummy
    payment.order = order
    payment.charge_status = ChargeStatus.FULLY_CHARGED
    payment.captured_amount = payment.total
    payment.save()

    payment.transactions.create(
        amount=payment.total,
        currency=payment.currency,
        kind=TransactionKind.CAPTURE,
        gateway_response={},
        is_success=True,
    )
    return payment


@pytest.fixture
def payment_txn_capture_failed(order_with_lines, payment_dummy):
    order = order_with_lines
    payment = payment_dummy
    payment.order = order
    payment.charge_status = ChargeStatus.REFUSED
    payment.save()

    payment.transactions.create(
        amount=payment.total,
        currency=payment.currency,
        kind=TransactionKind.CAPTURE_FAILED,
        gateway_response={
            "status": 403,
            "errorCode": "901",
            "message": "Invalid Merchant Account",
            "errorType": "security",
        },
        error="invalid",
        is_success=False,
    )
    return payment


@pytest.fixture
def payment_txn_to_confirm(order_with_lines, payment_dummy):
    order = order_with_lines
    payment = payment_dummy
    payment.order = order
    payment.to_confirm = True
    payment.save()

    payment.transactions.create(
        amount=payment.total,
        currency=payment.currency,
        kind=TransactionKind.ACTION_TO_CONFIRM,
        gateway_response={},
        is_success=True,
        action_required=True,
    )
    return payment


@pytest.fixture
def payment_txn_refunded(order_with_lines, payment_dummy):
    order = order_with_lines
    payment = payment_dummy
    payment.order = order
    payment.charge_status = ChargeStatus.FULLY_REFUNDED
    payment.is_active = False
    payment.save()

    payment.transactions.create(
        amount=payment.total,
        currency=payment.currency,
        kind=TransactionKind.REFUND,
        gateway_response={},
        is_success=True,
    )
    return payment


@pytest.fixture
def payment_not_authorized(payment_dummy):
    payment_dummy.is_active = False
    payment_dummy.save()
    return payment_dummy


@pytest.fixture
def dummy_gateway_config():
    return GatewayConfig(
        gateway_name="Dummy",
        auto_capture=True,
        supported_currencies="EUR",
        connection_params={"secret-key": "nobodylikesspanishinqusition"},
    )


@pytest.fixture
def dummy_payment_data(payment_dummy):
    return PaymentData(
        gateway=payment_dummy.gateway,
        amount=Decimal(10),
        currency="EUR",
        graphql_payment_id=graphene.Node.to_global_id("Payment", payment_dummy.pk),
        payment_id=payment_dummy.pk,
        billing=None,
        shipping=None,
        order_id=None,
        customer_ip_address=None,
        customer_email="example@test.com",
    )


@pytest.fixture
def dummy_address_data(address):
    return AddressData(
        first_name=address.first_name,
        last_name=address.last_name,
        company_name=address.company_name,
        street_address_1=address.street_address_1,
        street_address_2=address.street_address_2,
        city=address.city,
        city_area=address.city_area,
        postal_code=address.postal_code,
        country=address.country,
        country_area=address.country_area,
        phone=address.phone,
    )


@pytest.fixture
def dummy_webhook_app_payment_data(dummy_payment_data, payment_app):
    dummy_payment_data.gateway = to_payment_app_id(payment_app, "credit-card")
    return dummy_payment_data


@pytest.fixture
def new_sale(channel_EUR):
    sale = Sale.objects.create(name="Sale")
    SaleChannelListing.objects.create(
        sale=sale,
        channel=channel_EUR,
        discount_value=5,
        currency=channel_EUR.currency_code,
    )
    return sale


@pytest.fixture
def sale(product, category, collection, channel_EUR):
    sale = Sale.objects.create(name="Sale")
    SaleChannelListing.objects.create(
        sale=sale,
        channel=channel_EUR,
        discount_value=5,
        currency=channel_EUR.currency_code,
    )
    sale.products.add(product)
    sale.categories.add(category)
    sale.collections.add(collection)
    return sale


@pytest.fixture
def sale_with_many_channels(product, category, collection, channel_EUR):
    sale = Sale.objects.create(name="Sale")
    SaleChannelListing.objects.create(
        sale=sale,
        channel=channel_EUR,
        discount_value=5,
        currency=channel_EUR.currency_code,
    )
    sale.products.add(product)
    sale.categories.add(category)
    sale.collections.add(collection)
    return sale


@pytest.fixture
def discount_info(category, collection, sale, channel_EUR):
    sale_channel_listing = sale.channel_listings.get(channel=channel_EUR)

    return DiscountInfo(
        sale=sale,
        channel_listings={channel_EUR.slug: sale_channel_listing},
        product_ids=set(),
        category_ids={category.id},  # assumes this category does not have children
        collection_ids={collection.id},
    )


@pytest.fixture
def permission_manage_staff():
    return Permission.objects.get(codename="manage_staff")


@pytest.fixture
def permission_manage_category():
    return Permission.objects.get(codename="manage_categories")


@pytest.fixture
def permission_manage_collection():
    return Permission.objects.get(codename="manage_collections")


@pytest.fixture
def permission_manage_products():
    return Permission.objects.get(codename="manage_products")


@pytest.fixture
def permission_manage_product_types_and_attributes():
    return Permission.objects.get(codename="manage_product_types_and_attributes")


@pytest.fixture
def permission_manage_shipping():
    return Permission.objects.get(codename="manage_shipping")


@pytest.fixture
def permission_manage_users():
    return Permission.objects.get(codename="manage_users")


@pytest.fixture
def permission_impersonate_user():
    return Permission.objects.get(codename="impersonate_user")


@pytest.fixture
def permission_manage_settings():
    return Permission.objects.get(codename="manage_settings")


@pytest.fixture
def permission_manage_menus():
    return Permission.objects.get(codename="manage_menus")


@pytest.fixture
def permission_manage_pages():
    return Permission.objects.get(codename="manage_pages")


@pytest.fixture
def permission_manage_page_types_and_attributes():
    return Permission.objects.get(codename="manage_page_types_and_attributes")


@pytest.fixture
def permission_manage_translations():
    return Permission.objects.get(codename="manage_translations")


@pytest.fixture
def permission_manage_webhooks():
    return Permission.objects.get(codename="manage_webhooks")


@pytest.fixture
def permission_manage_channels():
    return Permission.objects.get(codename="manage_channels")


@pytest.fixture
def permission_manage_payments():
    return Permission.objects.get(codename="handle_payments")


@pytest.fixture
def permission_group_manage_users(permission_manage_users, staff_users):
    group = Group.objects.create(name="Manage user groups.")
    group.permissions.add(permission_manage_users)

    group.user_set.add(staff_users[1])
    return group


@pytest.fixture
def collection(db):
    collection = Collection.objects.create(
        name="Collection",
        slug="collection",
        description=dummy_editorjs("Test description."),
    )
    return collection


@pytest.fixture
def published_collection(db, channel_EUR):
    collection = Collection.objects.create(
        name="Collection EUR",
        slug="collection-eur",
        description=dummy_editorjs("Test description."),
    )
    CollectionChannelListing.objects.create(
        channel=channel_EUR,
        collection=collection,
        is_published=True,
        publication_date=datetime.date.today(),
    )
    return collection


@pytest.fixture
def published_collection_EUR(db, channel_EUR):
    collection = Collection.objects.create(
        name="Collection EUR",
        slug="collection-eur",
        description=dummy_editorjs("Test description."),
    )
    CollectionChannelListing.objects.create(
        channel=channel_EUR,
        collection=collection,
        is_published=True,
        publication_date=datetime.date.today(),
    )
    return collection


@pytest.fixture
def unpublished_collection(db, channel_EUR):
    collection = Collection.objects.create(
        name="Unpublished Collection",
        slug="unpublished-collection",
        description=dummy_editorjs("Test description."),
    )
    CollectionChannelListing.objects.create(
        channel=channel_EUR, collection=collection, is_published=False
    )
    return collection


@pytest.fixture
def unpublished_collection_EUR(db, channel_EUR):
    collection = Collection.objects.create(
        name="Collection",
        slug="collection",
        description=dummy_editorjs("Test description."),
    )
    CollectionChannelListing.objects.create(
        channel=channel_EUR, collection=collection, is_published=False
    )
    return collection


@pytest.fixture
def collection_with_products(db, published_collection, product_list_published):
    published_collection.products.set(list(product_list_published))
    return product_list_published


@pytest.fixture
def collection_with_image(db, image, media_root, channel_EUR):
    collection = Collection.objects.create(
        name="Collection",
        slug="collection",
        description=dummy_editorjs("Test description."),
        background_image=image,
    )
    CollectionChannelListing.objects.create(
        channel=channel_EUR, collection=collection, is_published=False
    )
    return collection


@pytest.fixture
def collection_list(db, channel_EUR):
    collections = Collection.objects.bulk_create(
        [
            Collection(name="Collection 1", slug="collection-1"),
            Collection(name="Collection 2", slug="collection-2"),
            Collection(name="Collection 3", slug="collection-3"),
        ]
    )
    CollectionChannelListing.objects.bulk_create(
        [
            CollectionChannelListing(
                channel=channel_EUR, collection=collection, is_published=True
            )
            for collection in collections
        ]
    )
    return collections


@pytest.fixture
def page(db, page_type):
    data = {
        "slug": "test-url",
        "title": "Test page",
        "content": dummy_editorjs("Test content."),
        "is_published": True,
        "page_type": page_type,
    }
    page = Page.objects.create(**data)

    # associate attribute value
    page_attr = page_type.page_attributes.first()
    page_attr_value = page_attr.values.first()

    associate_attribute_values_to_instance(page, page_attr, page_attr_value)

    return page


@pytest.fixture
def page_with_rich_text_attribute(db, page_type_with_rich_text_attribute):
    data = {
        "slug": "test-url",
        "title": "Test page",
        "content": dummy_editorjs("Test content."),
        "is_published": True,
        "page_type": page_type_with_rich_text_attribute,
    }
    page = Page.objects.create(**data)

    # associate attribute value
    page_attr = page_type_with_rich_text_attribute.page_attributes.first()
    page_attr_value = page_attr.values.first()

    associate_attribute_values_to_instance(page, page_attr, page_attr_value)

    return page


@pytest.fixture
def page_list(db, page_type):
    data_1 = {
        "slug": "test-url",
        "title": "Test page",
        "content": dummy_editorjs("Test content."),
        "is_published": True,
        "page_type": page_type,
    }
    data_2 = {
        "slug": "test-url-2",
        "title": "Test page",
        "content": dummy_editorjs("Test content."),
        "is_published": True,
        "page_type": page_type,
    }
    pages = Page.objects.bulk_create([Page(**data_1), Page(**data_2)])
    return pages


@pytest.fixture
def page_list_unpublished(db, page_type):
    pages = Page.objects.bulk_create(
        [
            Page(
                slug="page-1", title="Page 1", is_published=False, page_type=page_type
            ),
            Page(
                slug="page-2", title="Page 2", is_published=False, page_type=page_type
            ),
            Page(
                slug="page-3", title="Page 3", is_published=False, page_type=page_type
            ),
        ]
    )
    return pages


@pytest.fixture
def page_type(db, size_page_attribute, tag_page_attribute):
    page_type = PageType.objects.create(name="Test page type", slug="test-page-type")
    page_type.page_attributes.add(size_page_attribute)
    page_type.page_attributes.add(tag_page_attribute)

    return page_type


@pytest.fixture
def page_type_with_rich_text_attribute(db, rich_text_attribute_page_type):
    page_type = PageType.objects.create(name="Test page type", slug="test-page-type")
    page_type.page_attributes.add(rich_text_attribute_page_type)
    return page_type


@pytest.fixture
def page_type_list(db, tag_page_attribute):
    page_types = list(
        PageType.objects.bulk_create(
            [
                PageType(name="Test page type 1", slug="test-page-type-1"),
                PageType(name="Example page type 2", slug="page-type-2"),
                PageType(name="Example page type 3", slug="page-type-3"),
            ]
        )
    )

    for i, page_type in enumerate(page_types):
        page_type.page_attributes.add(tag_page_attribute)
        Page.objects.create(
            title=f"Test page {i}",
            slug=f"test-url-{i}",
            is_published=True,
            page_type=page_type,
        )

    return page_types


@pytest.fixture
def model_form_class():
    mocked_form_class = MagicMock(name="test", spec=ModelForm)
    mocked_form_class._meta = Mock(name="_meta")
    mocked_form_class._meta.model = "test_model"
    mocked_form_class._meta.fields = "test_field"
    return mocked_form_class


@pytest.fixture
def menu(db):
    return Menu.objects.get_or_create(name="test-navbar", slug="test-navbar")[0]


@pytest.fixture
def menu_item(menu):
    return MenuItem.objects.create(menu=menu, name="Link 1", url="http://example.com/")


@pytest.fixture
def menu_item_list(menu):
    menu_item_1 = MenuItem.objects.create(menu=menu, name="Link 1")
    menu_item_2 = MenuItem.objects.create(menu=menu, name="Link 2")
    menu_item_3 = MenuItem.objects.create(menu=menu, name="Link 3")
    return menu_item_1, menu_item_2, menu_item_3


@pytest.fixture
def menu_with_items(menu, category, published_collection):
    menu.items.create(name="Link 1", url="http://example.com/")
    menu_item = menu.items.create(name="Link 2", url="http://example.com/")
    menu.items.create(name=category.name, category=category, parent=menu_item)
    menu.items.create(
        name=published_collection.name,
        collection=published_collection,
        parent=menu_item,
    )
    return menu


@pytest.fixture
def translated_variant_fr(product):
    attribute = product.product_type.variant_attributes.first()
    return AttributeTranslation.objects.create(
        language_code="fr", attribute=attribute, name="Name tranlsated to french"
    )


@pytest.fixture
def translated_attribute(product):
    attribute = product.product_type.product_attributes.first()
    return AttributeTranslation.objects.create(
        language_code="fr", attribute=attribute, name="French attribute name"
    )


@pytest.fixture
def translated_attribute_value(pink_attribute_value):
    return AttributeValueTranslation.objects.create(
        language_code="fr",
        attribute_value=pink_attribute_value,
        name="French attribute value name",
    )


@pytest.fixture
def translated_page_unique_attribute_value(page, rich_text_attribute_page_type):
    page_type = page.page_type
    page_type.page_attributes.add(rich_text_attribute_page_type)
    attribute_value = rich_text_attribute_page_type.values.first()
    associate_attribute_values_to_instance(
        page, rich_text_attribute_page_type, attribute_value
    )
    return AttributeValueTranslation.objects.create(
        language_code="fr",
        attribute_value=attribute_value,
        rich_text=dummy_editorjs("French description."),
    )


@pytest.fixture
def translated_product_unique_attribute_value(product, rich_text_attribute):
    product_type = product.product_type
    product_type.product_attributes.add(rich_text_attribute)
    attribute_value = rich_text_attribute.values.first()
    associate_attribute_values_to_instance(
        product, rich_text_attribute, attribute_value
    )
    return AttributeValueTranslation.objects.create(
        language_code="fr",
        attribute_value=attribute_value,
        rich_text=dummy_editorjs("French description."),
    )


@pytest.fixture
def translated_variant_unique_attribute_value(variant, rich_text_attribute):
    product_type = variant.product.product_type
    product_type.variant_attributes.add(rich_text_attribute)
    attribute_value = rich_text_attribute.values.first()
    associate_attribute_values_to_instance(
        variant, rich_text_attribute, attribute_value
    )
    return AttributeValueTranslation.objects.create(
        language_code="fr",
        attribute_value=attribute_value,
        rich_text=dummy_editorjs("French description."),
    )


@pytest.fixture
def voucher_translation_fr(voucher):
    return VoucherTranslation.objects.create(
        language_code="fr", voucher=voucher, name="French name"
    )


@pytest.fixture
def product_translation_fr(product):
    return ProductTranslation.objects.create(
        language_code="fr",
        product=product,
        name="French name",
        description=dummy_editorjs("French description."),
    )


@pytest.fixture
def variant_translation_fr(variant):
    return ProductVariantTranslation.objects.create(
        language_code="fr", product_variant=variant, name="French product variant name"
    )


@pytest.fixture
def collection_translation_fr(published_collection):
    return CollectionTranslation.objects.create(
        language_code="fr",
        collection=published_collection,
        name="French collection name",
        description=dummy_editorjs("French description."),
    )


@pytest.fixture
def category_translation_fr(category):
    return CategoryTranslation.objects.create(
        language_code="fr",
        category=category,
        name="French category name",
        description=dummy_editorjs("French category description."),
    )


@pytest.fixture
def page_translation_fr(page):
    return PageTranslation.objects.create(
        language_code="fr",
        page=page,
        title="French page title",
        content=dummy_editorjs("French page content."),
    )


@pytest.fixture
def shipping_method_translation_fr(shipping_method):
    return ShippingMethodTranslation.objects.create(
        language_code="fr",
        shipping_method=shipping_method,
        name="French shipping method name",
    )


@pytest.fixture
def sale_translation_fr(sale):
    return SaleTranslation.objects.create(
        language_code="fr", sale=sale, name="French sale name"
    )


@pytest.fixture
def menu_item_translation_fr(menu_item):
    return MenuItemTranslation.objects.create(
        language_code="fr", menu_item=menu_item, name="French manu item name"
    )


@pytest.fixture
def payment_dummy(db, order_with_lines):
    return Payment.objects.create(
        gateway="mirumee.payments.dummy",
        order=order_with_lines,
        is_active=True,
        cc_first_digits="4111",
        cc_last_digits="1111",
        cc_brand="visa",
        cc_exp_month=12,
        cc_exp_year=2027,
        total=order_with_lines.total.gross.amount,
        currency=order_with_lines.currency,
        billing_first_name=order_with_lines.billing_address.first_name,
        billing_last_name=order_with_lines.billing_address.last_name,
        billing_company_name=order_with_lines.billing_address.company_name,
        billing_address_1=order_with_lines.billing_address.street_address_1,
        billing_address_2=order_with_lines.billing_address.street_address_2,
        billing_city=order_with_lines.billing_address.city,
        billing_postal_code=order_with_lines.billing_address.postal_code,
        billing_country_code=order_with_lines.billing_address.country.code,
        billing_country_area=order_with_lines.billing_address.country_area,
        billing_email=order_with_lines.user_email,
    )


@pytest.fixture
def payment_cancelled(payment_dummy):
    payment_dummy.charge_status = ChargeStatus.CANCELLED
    payment_dummy.save()
    return payment_dummy


@pytest.fixture
def payment_dummy_fully_charged(payment_dummy):
    payment_dummy.captured_amount = payment_dummy.total
    payment_dummy.charge_status = ChargeStatus.FULLY_CHARGED
    payment_dummy.save()
    return payment_dummy


@pytest.fixture
def payment_dummy_credit_card(db, order_with_lines):
    return Payment.objects.create(
        gateway="mirumee.payments.dummy_credit_card",
        order=order_with_lines,
        is_active=True,
        cc_first_digits="4111",
        cc_last_digits="1111",
        cc_brand="visa",
        cc_exp_month=12,
        cc_exp_year=2027,
        total=order_with_lines.total.gross.amount,
        currency=order_with_lines.total.gross.currency,
        billing_first_name=order_with_lines.billing_address.first_name,
        billing_last_name=order_with_lines.billing_address.last_name,
        billing_company_name=order_with_lines.billing_address.company_name,
        billing_address_1=order_with_lines.billing_address.street_address_1,
        billing_address_2=order_with_lines.billing_address.street_address_2,
        billing_city=order_with_lines.billing_address.city,
        billing_postal_code=order_with_lines.billing_address.postal_code,
        billing_country_code=order_with_lines.billing_address.country.code,
        billing_country_area=order_with_lines.billing_address.country_area,
        billing_email=order_with_lines.user_email,
    )


@pytest.fixture
def digital_content(
    category, company, media_root, warehouse, channel_EUR
) -> DigitalContent:
    product_type = ProductType.objects.create(
        name="Digital Type",
        slug="digital-type",
        has_variants=True,
        is_shipping_required=False,
        is_digital=True,
    )
    product = Product.objects.create(
        name="Test digital product",
        slug="test-digital-product",
        product_type=product_type,
        category=category,
        company=company,
        is_billable=True,
    )
    product.categories.add(category)

    ProductChannelListing.objects.create(
        product=product,
        channel=channel_EUR,
        is_published=True,
        visible_in_listings=True,
        available_for_purchase=datetime.date(1999, 1, 1),
    )
    product_variant = ProductVariant.objects.create(product=product, sku="SKU_554")
    ProductVariantChannelListing.objects.create(
        variant=product_variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        cost_price_amount=Decimal(1),
        currency=channel_EUR.currency_code,
    )
    Stock.objects.create(
        product_variant=product_variant,
        warehouse=warehouse,
        quantity=5,
    )

    assert product_variant.is_digital()

    image_file, image_name = create_image()
    d_content = DigitalContent.objects.create(
        content_file=image_file,
        product_variant=product_variant,
        use_default_settings=True,
    )
    return d_content


@pytest.fixture
def digital_content_url(digital_content, order_line):
    return DigitalContentUrl.objects.create(content=digital_content, line=order_line)


@pytest.fixture
def media_root(tmpdir, settings):
    settings.MEDIA_ROOT = str(tmpdir.mkdir("media"))


@pytest.fixture
def description_json():
    return {
        "blocks": [
            {
                "key": "",
                "data": {
                    "text": "E-commerce for the PWA era",
                },
                "text": "E-commerce for the PWA era",
                "type": "header-two",
                "depth": 0,
                "entityRanges": [],
                "inlineStyleRanges": [],
            },
            {
                "key": "",
                "data": {
                    "text": (
                        "A modular, high performance e-commerce storefront "
                        "built with GraphQL, Django, and ReactJS."
                    )
                },
                "text": (
                    "A modular, high performance e-commerce storefront "
                    "built with GraphQL, Django, and ReactJS."
                ),
                "type": "unstyled",
                "depth": 0,
                "entityRanges": [],
                "inlineStyleRanges": [],
            },
            {
                "key": "",
                "data": {},
                "text": "",
                "type": "unstyled",
                "depth": 0,
                "entityRanges": [],
                "inlineStyleRanges": [],
            },
            {
                "key": "",
                "data": {
                    "text": (
                        "Saleor is a rapidly-growing open source e-commerce platform "
                        "that has served high-volume companies from branches "
                        "like publishing and apparel since 2012. Based on Python "
                        "and Django, the latest major update introduces a modular "
                        "front end with a GraphQL API and storefront and dashboard "
                        "written in React to make Saleor a full-functionality "
                        "open source e-commerce."
                    ),
                },
                "text": (
                    "Saleor is a rapidly-growing open source e-commerce platform "
                    "that has served high-volume companies from branches "
                    "like publishing and apparel since 2012. Based on Python "
                    "and Django, the latest major update introduces a modular "
                    "front end with a GraphQL API and storefront and dashboard "
                    "written in React to make Saleor a full-functionality "
                    "open source e-commerce."
                ),
                "type": "unstyled",
                "depth": 0,
                "entityRanges": [],
                "inlineStyleRanges": [],
            },
            {
                "key": "",
                "data": {"text": ""},
                "text": "",
                "type": "unstyled",
                "depth": 0,
                "entityRanges": [],
                "inlineStyleRanges": [],
            },
            {
                "key": "",
                "data": {
                    "text": "Get Saleor today!",
                },
                "text": "Get Saleor today!",
                "type": "unstyled",
                "depth": 0,
                "entityRanges": [{"key": 0, "length": 17, "offset": 0}],
                "inlineStyleRanges": [],
            },
        ],
        "entityMap": {
            "0": {
                "data": {"href": "https://github.com/mirumee/saleor"},
                "type": "LINK",
                "mutability": "MUTABLE",
            }
        },
    }


@pytest.fixture
def other_description_json():
    return {
        "blocks": [
            {
                "key": "",
                "data": {
                    "text": "A GRAPHQL-FIRST <b>ECOMMERCE</b> PLATFORM FOR PERFECTIONISTS",
                },
                "text": "A GRAPHQL-FIRST ECOMMERCE PLATFORM FOR PERFECTIONISTS",
                "type": "header-two",
                "depth": 0,
                "entityRanges": [],
                "inlineStyleRanges": [],
            },
            {
                "key": "",
                "data": {
                    "text": (
                        "Saleor is powered by a GraphQL server running on "
                        "top of Python 3 and a Django 2 framework."
                    ),
                },
                "text": (
                    "Saleor is powered by a GraphQL server running on "
                    "top of Python 3 and a Django 2 framework."
                ),
                "type": "unstyled",
                "depth": 0,
                "entityRanges": [],
                "inlineStyleRanges": [],
            },
        ],
        "entityMap": {},
    }


@pytest.fixture
def app(db, staff_user):
    app = App.objects.create(name="Sample app objects", is_active=True, user=staff_user)
    app.tokens.create(name="Default")
    return app


@pytest.fixture
def app_admin(db, admin_user):
    app = App.objects.create(name="Sample app objects", is_active=True, user=admin_user)
    app.tokens.create(name="Default")
    return app


@pytest.fixture
def app_customer(db, customer_user):
    app = App.objects.create(
        name="Sample app objects", is_active=True, user=customer_user
    )
    app.tokens.create(name="Default")
    return app


@pytest.fixture
def app_seller(db, seller_user):
    app = App.objects.create(
        name="Sample app objects", is_active=True, user=seller_user
    )
    app.tokens.create(name="Default")
    return app


@pytest.fixture
def payment_app(db, permission_manage_payments, admin_user):
    app = App.objects.create(name="Payment App", is_active=True, user=admin_user)
    app.tokens.create(name="Default")
    app.permissions.add(permission_manage_payments)

    webhook = Webhook.objects.create(
        name="payment-webhook-1",
        app=app,
        target_url="https://payment-gateway.com/api/",
    )
    webhook.events.bulk_create(
        [
            WebhookEvent(event_type=event_type, webhook=webhook)
            for event_type in WebhookEventType.PAYMENT_EVENTS
        ]
    )
    return app


@pytest.fixture
def external_app(db, admin_user):
    app = App.objects.create(
        name="External App",
        is_active=True,
        type=AppType.THIRDPARTY,
        identifier="mirumee.app.sample",
        about_app="About app text.",
        data_privacy="Data privacy text.",
        data_privacy_url="http://www.example.com/privacy/",
        homepage_url="http://www.example.com/homepage/",
        support_url="http://www.example.com/support/contact/",
        configuration_url="http://www.example.com/app-configuration/",
        app_url="http://www.example.com/app/",
        user=admin_user,
    )
    app.tokens.create(name="Default")
    return app


@pytest.fixture
def webhook(app):
    webhook = Webhook.objects.create(
        name="Simple webhook", app=app, target_url="http://www.example.com/test"
    )
    webhook.events.create(event_type=WebhookEventType.ORDER_CREATED)
    return webhook


@pytest.fixture
def fake_payment_interface(mocker):
    return mocker.Mock(spec=PaymentInterface)


@pytest.fixture
def staff_notification_recipient(db, staff_user):
    return StaffNotificationRecipient.objects.create(active=True, user=staff_user)


@pytest.fixture
def customer_wishlist(customer_user):
    return Wishlist.objects.create(user=customer_user)


@pytest.fixture
def customer_wishlist_item(customer_wishlist, product_with_single_variant):
    product = product_with_single_variant
    assert product.variants.count() == 1
    variant = product.variants.first()
    item = customer_wishlist.add_variant(variant)
    return item


@pytest.fixture
def customer_wishlist_with_two_items(customer_wishlist, product_with_two_variants):
    product = product_with_two_variants
    assert product.variants.count() == 2
    [variant_1, variant_2] = product.variants.all()
    customer_wishlist.add_variant(variant_1)
    customer_wishlist.add_variant(variant_2)
    return customer_wishlist


@pytest.fixture
def warehouse(address, shipping_zone):
    warehouse = Warehouse.objects.create(
        address=address,
        name="Example Warehouse",
        slug="example-warehouse",
        email="test@example.com",
    )
    warehouse.shipping_zones.add(shipping_zone)
    warehouse.save()
    return warehouse


@pytest.fixture
def warehouses(address, address_usa, address_spain):
    return Warehouse.objects.bulk_create(
        [
            Warehouse(
                address=address.get_copy(),
                name="Warehouse PL",
                slug="warehouse1",
                email="warehouse1@example.com",
            ),
            Warehouse(
                address=address_usa.get_copy(),
                name="Warehouse USA",
                slug="warehouse2",
                email="warehouse2@example.com",
            ),
            Warehouse(
                address=address_spain.get_copy(),
                name="Warehouse Spain",
                slug="warehouse3",
                email="warehouse3@example.com",
            ),
        ]
    )


@pytest.fixture
def warehouses_with_shipping_zone(warehouses, shipping_zone):
    warehouses[0].shipping_zones.add(shipping_zone)
    warehouses[1].shipping_zones.add(shipping_zone)
    warehouses[2].shipping_zones.add(shipping_zone)
    return warehouses


@pytest.fixture
def warehouses_with_different_shipping_zone(warehouses, shipping_zones):
    warehouses[0].shipping_zones.add(shipping_zones[0])
    warehouses[1].shipping_zones.add(shipping_zones[1])
    warehouses[2].shipping_zones.add(shipping_zones[2])
    return warehouses


@pytest.fixture
def warehouse_no_shipping_zone(address):
    warehouse = Warehouse.objects.create(
        address=address,
        name="Warehouse without shipping zone",
        slug="warehouse-no-shipping-zone",
        email="test2@example.com",
    )
    return warehouse


@pytest.fixture
def stock(variant, warehouse):
    return Stock.objects.create(
        product_variant=variant, warehouse=warehouse, quantity=15
    )


@pytest.fixture
def allocation(order_line, stock):
    return Allocation.objects.create(
        order_line=order_line, stock=stock, quantity_allocated=order_line.quantity
    )


@pytest.fixture
def allocations(order_list, stock, channel_EUR):
    variant = stock.product_variant
    product = variant.product
    channel_listing = variant.channel_listings.get(channel=channel_EUR)
    net = variant.get_price(
        product, [], channel_EUR, channel_listing, product.categories.all()
    )
    gross = Money(amount=net.amount * Decimal(1.23), currency=net.currency)
    price = TaxedMoney(net=net, gross=gross)
    lines = OrderLine.objects.bulk_create(
        [
            OrderLine(
                order=order_list[0],
                variant=variant,
                quantity=1,
                product_name=str(variant.product),
                variant_name=str(variant),
                product_sku=variant.sku,
                is_shipping_required=variant.is_shipping_required(),
                unit_price=price,
                total_price=price,
                tax_rate=Decimal("0.23"),
            ),
            OrderLine(
                order=order_list[1],
                variant=variant,
                quantity=2,
                product_name=str(variant.product),
                variant_name=str(variant),
                product_sku=variant.sku,
                is_shipping_required=variant.is_shipping_required(),
                unit_price=price,
                total_price=price,
                tax_rate=Decimal("0.23"),
            ),
            OrderLine(
                order=order_list[2],
                variant=variant,
                quantity=4,
                product_name=str(variant.product),
                variant_name=str(variant),
                product_sku=variant.sku,
                is_shipping_required=variant.is_shipping_required(),
                unit_price=price,
                total_price=price,
                tax_rate=Decimal("0.23"),
            ),
        ]
    )
    return Allocation.objects.bulk_create(
        [
            Allocation(
                order_line=lines[0], stock=stock, quantity_allocated=lines[0].quantity
            ),
            Allocation(
                order_line=lines[1], stock=stock, quantity_allocated=lines[1].quantity
            ),
            Allocation(
                order_line=lines[2], stock=stock, quantity_allocated=lines[2].quantity
            ),
        ]
    )


@pytest.fixture
def app_installation():
    app_installation = AppInstallation.objects.create(
        app_name="External App",
        manifest_url="http://localhost:3000/manifest",
    )
    return app_installation


@pytest.fixture
def user_export_file(staff_user):
    job = ExportFile.objects.create(user=staff_user)
    return job


@pytest.fixture
def app_export_file(app):
    job = ExportFile.objects.create(app=app)
    return job


@pytest.fixture
def export_file_list(staff_user):
    export_file_list = list(
        ExportFile.objects.bulk_create(
            [
                ExportFile(user=staff_user),
                ExportFile(
                    user=staff_user,
                ),
                ExportFile(
                    user=staff_user,
                    status=JobStatus.SUCCESS,
                ),
                ExportFile(user=staff_user, status=JobStatus.SUCCESS),
                ExportFile(
                    user=staff_user,
                    status=JobStatus.FAILED,
                ),
            ]
        )
    )

    updated_date = datetime.datetime(
        2019, 4, 18, tzinfo=timezone.get_current_timezone()
    )
    created_date = datetime.datetime(
        2019, 4, 10, tzinfo=timezone.get_current_timezone()
    )
    new_created_and_updated_dates = [
        (created_date, updated_date),
        (created_date, updated_date + datetime.timedelta(hours=2)),
        (
            created_date + datetime.timedelta(hours=2),
            updated_date - datetime.timedelta(days=2),
        ),
        (created_date - datetime.timedelta(days=2), updated_date),
        (
            created_date - datetime.timedelta(days=5),
            updated_date - datetime.timedelta(days=5),
        ),
    ]
    for counter, export_file in enumerate(export_file_list):
        created, updated = new_created_and_updated_dates[counter]
        export_file.created_at = created
        export_file.updated_at = updated

    ExportFile.objects.bulk_update(export_file_list, ["created_at", "updated_at"])

    return export_file_list


@pytest.fixture
def user_export_event(user_export_file):
    return ExportEvent.objects.create(
        type=ExportEvents.EXPORT_FAILED,
        export_file=user_export_file,
        user=user_export_file.user,
        parameters={"message": "Example error message"},
    )


@pytest.fixture
def app_export_event(app_export_file):
    return ExportEvent.objects.create(
        type=ExportEvents.EXPORT_FAILED,
        export_file=app_export_file,
        app=app_export_file.app,
        parameters={"message": "Example error message"},
    )


@pytest.fixture
def check_payment_balance_input():
    return {
        "gatewayId": "mirumee.payments.gateway",
        "channel": "channel_default",
        "method": "givex",
        "card": {
            "cvc": "9891",
            "code": "12345678910",
            "money": {"currency": "GBP", "amount": 100.0},
        },
    }


@pytest.fixture
def company(db, staff_users, image, media_root):
    company = Company.objects.create(
        name="dRural",
        public_name="dRural",
        cif="123456789A",
        phone="999999999",
        email="info@drural.com",
        rating=5,
        image=image,
        description="Lorem ipsum",
        status=Company.Status.ACCEPTED,
        is_enabled=True,
    )
    StripeCredentials.objects.create(
        company=company, account_id="acct_1234", is_enabled=True
    )
    company.managers.set(staff_users)

    latitude = 37.383348
    longitude = -5.973439
    location_point = Point(latitude, longitude, srid=4326)
    CompanyAddress.objects.create(
        street="C. Luis de Morales",
        postal_code="41005",
        locality="Sevilla",
        region="Andalucía",
        country="ES",
        company=company,
        location_point=location_point,
    )
    return company


@pytest.fixture
def other_company(db, other_staff_user, image, media_root):
    company = Company.objects.create(
        name="other_company",
        public_name="other_company",
        cif="987654321A",
        phone="666666666",
        email="info@other_company.com",
        rating=5,
        image=image,
        description="Lorem ipsum",
        status=Company.Status.ACCEPTED,
        is_enabled=True,
    )
    company.managers.set((other_staff_user,))

    latitude = 37.383349
    longitude = -5.973439
    location_point = Point(latitude, longitude, srid=4326)
    CompanyAddress.objects.create(
        street="C. San Juan",
        postal_code="41005",
        locality="Sevilla",
        region="Andalucía",
        country="ES",
        company=company,
        location_point=location_point,
    )
    return company


@pytest.fixture
def seller_company(db, seller_user, image, media_root):
    company = Company.objects.create(
        name="seller_company",
        public_name="seller_company",
        cif="989654321A",
        phone="666666666",
        email="info@seller_company.com",
        rating=5,
        image=image,
        description="Lorem ipsum",
        status=Company.Status.ACCEPTED,
        is_enabled=True,
    )
    company.managers.set((seller_user,))

    latitude = 37.383349
    longitude = -5.973439
    location_point = Point(latitude, longitude, srid=4326)
    CompanyAddress.objects.create(
        street="C. Falsa ",
        postal_code="41005",
        locality="Sevilla",
        region="Andalucía",
        country="ES",
        company=company,
        location_point=location_point,
    )
    return company


@pytest.fixture
def review(customer_user2, product):
    created_date = datetime.datetime(
        2022, 3, 25, tzinfo=timezone.get_current_timezone()
    )
    review = ProductRating.objects.create(
        created_at=created_date,
        product=product,
        user=customer_user2,
        rating=5,
        comment="Lorem ipsum",
    )
    return review


@pytest.fixture
def stripe_account_id():
    return "acct_1234"
