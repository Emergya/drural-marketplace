from datetime import timedelta
from decimal import Decimal

import pytest
from django.utils import timezone
from prices import Money, TaxedMoney

from ...checkout.fetch import fetch_checkout_info, fetch_checkout_lines
from ...checkout.utils import get_voucher_discount_for_checkout
from ...plugins.manager import get_plugins_manager
from ...product.models import Product, ProductVariant, ProductVariantChannelListing
from ...settings import FEATURE_VOUCHERS, FEATURE_SALES
from .. import DiscountInfo, DiscountValueType, VoucherType
from ..models import (
    NotApplicable,
    Sale,
    SaleChannelListing,
    Voucher,
    VoucherChannelListing,
    VoucherCustomer,
)
from ..templatetags.voucher import discount_as_negative
from ..utils import (
    add_voucher_usage_by_customer,
    decrease_voucher_usage,
    get_product_discount_on_sale,
    increase_voucher_usage,
    remove_voucher_usage_by_customer,
    validate_voucher,
)


def test_valid_voucher_min_spent_amount_with_display_gross_prices(
    channel_EUR, site_settings
):
    site_settings.display_gross_prices = True
    site_settings.save()

    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.SHIPPING,
        discount_value_type=DiscountValueType.FIXED,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(10, "EUR"),
        min_spent=Money(7, "EUR"),
    )
    value = TaxedMoney(net=Money(5, "EUR"), gross=Money(7, "EUR"))

    voucher.validate_min_spent(value, channel_EUR)


def test_valid_voucher_min_spent_amount_without_display_gross_prices(
    channel_EUR, site_settings
):
    site_settings.display_gross_prices = False
    site_settings.save()

    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.SHIPPING,
        discount_value_type=DiscountValueType.FIXED,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(10, "EUR"),
        min_spent=Money(7, "EUR"),
    )
    value = TaxedMoney(net=Money(5, "EUR"), gross=Money(7, "EUR"))

    with pytest.raises(NotApplicable):
        voucher.validate_min_spent(value, channel_EUR)


def test_valid_voucher_min_spent_amount_voucher_not_assigned_to_channel(channel_EUR):
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.SHIPPING,
        discount_value_type=DiscountValueType.FIXED,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(10, channel_EUR.currency_code),
        min_spent=(Money(5, channel_EUR.currency_code)),
    )
    price = Money(10, channel_EUR.currency_code)
    total_price = TaxedMoney(net=price, gross=price)
    with pytest.raises(NotApplicable):
        voucher.validate_min_spent(total_price, 3)


def test_valid_voucher_min_checkout_items_quantity(voucher):
    voucher.min_checkout_items_quantity = 3
    voucher.save()

    with pytest.raises(NotApplicable) as e:
        voucher.validate_min_checkout_items_quantity(2)

    assert (
        str(e.value)
        == "This offer is only valid for orders with a minimum of 3 quantity."
    )

@pytest.mark.skipif(not FEATURE_SALES, reason="sales are not being used.")
@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_variant_discounts(product, channel_EUR):
    variant = product.variants.get()
    low_sale = Sale.objects.create(type=DiscountValueType.FIXED)
    low_sale_channel_listing = SaleChannelListing.objects.create(
        sale=low_sale,
        discount_value=5,
        currency=channel_EUR.currency_code,
        channel=channel_EUR,
    )
    low_discount = DiscountInfo(
        sale=low_sale,
        channel_listings={channel_EUR.slug: low_sale_channel_listing},
        product_ids={product.id},
        category_ids=set(),
        collection_ids=set(),
    )
    sale = Sale.objects.create(type=DiscountValueType.FIXED)
    sale_channel_listing = SaleChannelListing.objects.create(
        sale=sale,
        discount_value=8,
        currency=channel_EUR.currency_code,
        channel=channel_EUR,
    )
    discount = DiscountInfo(
        sale=sale,
        channel_listings={channel_EUR.slug: sale_channel_listing},
        product_ids={product.id},
        category_ids=set(),
        collection_ids=set(),
    )
    high_sale = Sale.objects.create(type=DiscountValueType.FIXED)
    high_sale_channel_listing = SaleChannelListing.objects.create(
        sale=high_sale,
        discount_value=50,
        currency=channel_EUR.currency_code,
        channel=channel_EUR,
    )
    high_discount = DiscountInfo(
        sale=high_sale,
        channel_listings={channel_EUR.slug: high_sale_channel_listing},
        product_ids={product.id},
        category_ids=set(),
        collection_ids=set(),
    )
    variant_channel_listing = variant.channel_listings.get(channel=channel_EUR)
    final_price = variant.get_price(
        product,
        [],
        channel_EUR,
        variant_channel_listing,
        product.categories.all(),
        discounts=[low_discount, discount, high_discount],
    )
    assert final_price == Money(0, "EUR")

@pytest.mark.skipif(not FEATURE_SALES, reason="sales are not being used.")
@pytest.mark.integration
@pytest.mark.django_db(transaction=True)
def test_percentage_discounts(product, channel_EUR):
    variant = product.variants.get()
    sale = Sale.objects.create(type=DiscountValueType.PERCENTAGE)
    sale_channel_listing = SaleChannelListing.objects.create(
        sale=sale,
        discount_value=50,
        currency=channel_EUR.currency_code,
        channel=channel_EUR,
    )
    discount = DiscountInfo(
        sale=sale,
        channel_listings={channel_EUR.slug: sale_channel_listing},
        product_ids={product.id},
        category_ids=set(),
        collection_ids=set(),
    )
    variant_channel_listing = variant.channel_listings.get(channel=channel_EUR)
    final_price = variant.get_price(
        product,
        [],
        channel_EUR,
        variant_channel_listing,
        product.categories.all(),
        discounts=[discount],
    )
    assert final_price == Money(5, "EUR")


def test_voucher_queryset_active(voucher, channel_EUR):
    vouchers = Voucher.objects.all()
    assert vouchers.count() == 1
    active_vouchers = Voucher.objects.active_in_channel(
        date=timezone.now() - timedelta(days=1), channel_slug=channel_EUR.slug
    )
    assert active_vouchers.count() == 0


def test_voucher_queryset_active_in_channel(voucher, channel_EUR):
    vouchers = Voucher.objects.all()
    assert vouchers.count() == 1
    active_vouchers = Voucher.objects.active_in_channel(
        date=timezone.now(), channel_slug=channel_EUR.slug
    )
    assert active_vouchers.count() == 1


def test_voucher_queryset_active_in_other_channel(voucher, channel_EUR):
    vouchers = Voucher.objects.all()
    assert vouchers.count() == 1
    active_vouchers = Voucher.objects.active_in_channel(
        date=timezone.now(), channel_slug=channel_EUR.slug
    )
    assert active_vouchers.count() == 1


@pytest.mark.parametrize(
    "prices, discount_value, discount_type, apply_once_per_order, expected_value",
    [
        ([10], 10, DiscountValueType.FIXED, True, 10),
        ([5], 10, DiscountValueType.FIXED, True, 5),
        ([5, 5], 10, DiscountValueType.FIXED, True, 5),
        ([2, 3], 10, DiscountValueType.FIXED, True, 2),
        ([10, 10], 5, DiscountValueType.FIXED, False, 10),
        ([5, 2], 5, DiscountValueType.FIXED, False, 7),
        ([10, 10, 10], 5, DiscountValueType.FIXED, False, 15),
    ],
)
def test_specific_products_voucher_checkout_discount(
    monkeypatch,
    prices,
    discount_value,
    discount_type,
    expected_value,
    apply_once_per_order,
    checkout_with_item,
    channel_EUR,
):
    discounts = []
    monkeypatch.setattr(
        "saleor.checkout.utils.get_prices_of_discounted_specific_product",
        lambda manager, checkout_info, lines, voucher, channel: (
            Money(price, "EUR") for price in prices
        ),
    )
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.SPECIFIC_PRODUCT,
        discount_value_type=discount_type,
        apply_once_per_order=apply_once_per_order,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(discount_value, channel_EUR.currency_code),
    )
    checkout = checkout_with_item
    manager = get_plugins_manager()
    lines = fetch_checkout_lines(checkout)
    checkout_info = fetch_checkout_info(checkout, lines, discounts, manager)
    manager = get_plugins_manager()
    discount = get_voucher_discount_for_checkout(
        manager, voucher, checkout_info, lines, checkout.shipping_address, discounts
    )
    assert discount == Money(expected_value, "EUR")


def test_sale_applies_to_correct_products(product_type, category, company, channel_EUR):
    product = Product.objects.create(
        name="Test Product",
        slug="test-product",
        description={},
        product_type=product_type,
        category=category,
        company=company,
    )
    variant = ProductVariant.objects.create(product=product, sku="firstvar")
    variant_channel_listing = ProductVariantChannelListing.objects.create(
        variant=variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        currency=channel_EUR.currency_code,
    )
    product2 = Product.objects.create(
        name="Second product",
        slug="second-product",
        description={},
        product_type=product_type,
        category=category,
        company=company,
    )
    sec_variant = ProductVariant.objects.create(product=product2, sku="secvar")
    ProductVariantChannelListing.objects.create(
        variant=sec_variant,
        channel=channel_EUR,
        price_amount=Decimal(10),
        currency=channel_EUR.currency_code,
    )
    sale = Sale.objects.create(name="Test sale", type=DiscountValueType.FIXED)
    sale_channel_listing = SaleChannelListing.objects.create(
        sale=sale,
        currency=channel_EUR.currency_code,
        channel=channel_EUR,
        discount_value=3,
    )
    discount = DiscountInfo(
        sale=sale,
        channel_listings={channel_EUR.slug: sale_channel_listing},
        product_ids={product.id},
        category_ids=set(),
        collection_ids=set(),
    )
    product_discount = get_product_discount_on_sale(
        variant.product, set(), set(), discount, channel_EUR
    )

    discounted_price = product_discount(variant_channel_listing.price)
    assert discounted_price == Money(7, "EUR")
    with pytest.raises(NotApplicable):
        get_product_discount_on_sale(
            sec_variant.product, set(), set(), discount, channel_EUR
        )


def test_increase_voucher_usage(channel_EUR):
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.ENTIRE_ORDER,
        discount_value_type=DiscountValueType.FIXED,
        usage_limit=100,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(10, channel_EUR.currency_code),
    )
    increase_voucher_usage(voucher)
    voucher.refresh_from_db()
    assert voucher.used == 1


def test_decrease_voucher_usage(channel_EUR):
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.ENTIRE_ORDER,
        discount_value_type=DiscountValueType.FIXED,
        usage_limit=100,
        used=10,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(10, channel_EUR.currency_code),
    )
    decrease_voucher_usage(voucher)
    voucher.refresh_from_db()
    assert voucher.used == 9


def test_add_voucher_usage_by_customer(voucher, customer_user):
    voucher_customer_count = VoucherCustomer.objects.all().count()
    add_voucher_usage_by_customer(voucher, customer_user.email)
    assert VoucherCustomer.objects.all().count() == voucher_customer_count + 1
    voucherCustomer = VoucherCustomer.objects.first()
    assert voucherCustomer.voucher == voucher
    assert voucherCustomer.customer_email == customer_user.email


def test_add_voucher_usage_by_customer_raise_not_applicable(voucher_customer):
    voucher = voucher_customer.voucher
    customer_email = voucher_customer.customer_email
    with pytest.raises(NotApplicable):
        add_voucher_usage_by_customer(voucher, customer_email)


def test_remove_voucher_usage_by_customer(voucher_customer):
    voucher_customer_count = VoucherCustomer.objects.all().count()
    voucher = voucher_customer.voucher
    customer_email = voucher_customer.customer_email
    remove_voucher_usage_by_customer(voucher, customer_email)
    assert VoucherCustomer.objects.all().count() == voucher_customer_count - 1


def test_remove_voucher_usage_by_customer_not_exists(voucher):
    remove_voucher_usage_by_customer(voucher, "fake@exmaimpel.com")


@pytest.mark.parametrize(
    "total, min_spent_amount, total_quantity, min_checkout_items_quantity,"
    "discount_value_type",
    [
        (20, 20, 2, 2, DiscountValueType.PERCENTAGE),
        (20, None, 2, None, DiscountValueType.PERCENTAGE),
        (20, 20, 2, 2, DiscountValueType.FIXED),
        (20, None, 2, None, DiscountValueType.FIXED),
    ],
)
def test_validate_voucher(
    total,
    min_spent_amount,
    total_quantity,
    min_checkout_items_quantity,
    discount_value_type,
    channel_EUR,
):
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.ENTIRE_ORDER,
        discount_value_type=discount_value_type,
        min_checkout_items_quantity=min_checkout_items_quantity,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(50, channel_EUR.currency_code),
        min_spent_amount=min_spent_amount,
    )
    total_price = Money(total, "EUR")
    price = TaxedMoney(gross=total_price, net=total_price)
    validate_voucher(
        voucher, price, total_quantity, "test@example.com", channel_EUR, None
    )


def test_validate_staff_voucher_for_anonymous(
    channel_EUR,
):
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.ENTIRE_ORDER,
        discount_value_type=DiscountValueType.PERCENTAGE,
        only_for_staff=True,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(50, channel_EUR.currency_code),
    )
    total_price = Money(100, "EUR")
    price = TaxedMoney(gross=total_price, net=total_price)
    with pytest.raises(NotApplicable):
        validate_voucher(voucher, price, 2, "test@example.com", channel_EUR, None)


def test_validate_staff_voucher_for_normal_customer(channel_EUR, customer_user):
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.ENTIRE_ORDER,
        discount_value_type=DiscountValueType.PERCENTAGE,
        only_for_staff=True,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(50, channel_EUR.currency_code),
    )
    total_price = Money(100, "EUR")
    price = TaxedMoney(gross=total_price, net=total_price)
    with pytest.raises(NotApplicable):
        validate_voucher(
            voucher, price, 2, customer_user.email, channel_EUR, customer_user
        )


def test_validate_staff_voucher_for_staff_customer(channel_EUR, staff_user):
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.ENTIRE_ORDER,
        discount_value_type=DiscountValueType.PERCENTAGE,
        only_for_staff=True,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(50, channel_EUR.currency_code),
    )
    total_price = Money(100, "EUR")
    price = TaxedMoney(gross=total_price, net=total_price)

    validate_voucher(voucher, price, 2, staff_user.email, channel_EUR, staff_user)


@pytest.mark.parametrize(
    "total, min_spent_amount, total_quantity, min_checkout_items_quantity, "
    "discount_value, discount_value_type",
    [
        (20, 50, 2, 10, 50, DiscountValueType.PERCENTAGE),
        (20, 50, 2, None, 50, DiscountValueType.PERCENTAGE),
        (20, None, 2, 10, 50, DiscountValueType.FIXED),
    ],
)
def test_validate_voucher_not_applicable(
    total,
    min_spent_amount,
    total_quantity,
    min_checkout_items_quantity,
    discount_value,
    discount_value_type,
    channel_EUR,
):
    voucher = Voucher.objects.create(
        code="unique",
        type=VoucherType.ENTIRE_ORDER,
        discount_value_type=discount_value_type,
        min_checkout_items_quantity=min_checkout_items_quantity,
    )
    VoucherChannelListing.objects.create(
        voucher=voucher,
        channel=channel_EUR,
        discount=Money(50, channel_EUR.currency_code),
        min_spent_amount=min_spent_amount,
    )
    total_price = Money(total, "EUR")
    price = TaxedMoney(net=total_price, gross=total_price)

    with pytest.raises(NotApplicable):
        validate_voucher(
            voucher, price, total_quantity, "test@example.com", channel_EUR, None
        )


def test_validate_voucher_not_applicable_once_per_customer(
    voucher, customer_user, channel_EUR
):
    voucher.apply_once_per_customer = True
    voucher.save()
    VoucherCustomer.objects.create(voucher=voucher, customer_email=customer_user.email)
    price = Money(0, "EUR")
    total_price = TaxedMoney(net=price, gross=price)
    with pytest.raises(NotApplicable):
        validate_voucher(
            voucher, total_price, 0, customer_user.email, channel_EUR, customer_user
        )


date_time_now = timezone.now()


@pytest.mark.parametrize(
    "current_date, start_date, end_date, is_active",
    (
        (date_time_now, date_time_now, date_time_now + timedelta(days=1), True),
        (
            date_time_now + timedelta(days=1),
            date_time_now,
            date_time_now + timedelta(days=1),
            True,
        ),
        (
            date_time_now + timedelta(days=2),
            date_time_now,
            date_time_now + timedelta(days=1),
            False,
        ),
        (
            date_time_now - timedelta(days=2),
            date_time_now,
            date_time_now + timedelta(days=1),
            False,
        ),
        (date_time_now, date_time_now, None, True),
        (date_time_now + timedelta(weeks=10), date_time_now, None, True),
    ),
)
def test_sale_active(current_date, start_date, end_date, is_active, channel_EUR):
    sale = Sale.objects.create(
        type=DiscountValueType.FIXED, start_date=start_date, end_date=end_date
    )
    SaleChannelListing.objects.create(
        sale=sale,
        currency=channel_EUR.currency_code,
        channel=channel_EUR,
        discount_value=5,
    )
    sale_is_active = Sale.objects.active(date=current_date).exists()
    assert is_active == sale_is_active


def test_discount_as_negative():
    discount = Money(10, "EUR")
    result = discount_as_negative(discount)
    assert result == "-€10.00"


def test_discount_as_negative_for_zero_value():
    discount = Money(0, "EUR")
    result = discount_as_negative(discount)
    assert result == "€0.00"


def test_discount_as_negative_for_html():
    discount = Money(10, "EUR")
    result = discount_as_negative(discount, True)
    assert result == '-<span class="currency">€</span>10.00'


def test_get_fixed_sale_discount(sale):
    # given
    sale.type = DiscountValueType.FIXED
    channel_listing = sale.channel_listings.get()

    # when
    result = sale.get_discount(channel_listing).keywords

    # then
    assert result["discount"] == Money(
        channel_listing.discount_value, channel_listing.currency
    )


def test_get_percentage_sale_discount(sale):
    # given
    sale.type = DiscountValueType.PERCENTAGE
    channel_listing = sale.channel_listings.get()

    # when
    result = sale.get_discount(channel_listing).keywords

    # then
    assert result["percentage"] == channel_listing.discount_value


def test_get_unknown_sale_discount(sale):
    sale.type = "unknown"
    channel_listing = sale.channel_listings.get()

    with pytest.raises(NotImplementedError):
        sale.get_discount(channel_listing)


def test_get_not_applicable_sale_discount(sale, channel_EUR):
    sale.type = DiscountValueType.PERCENTAGE

    with pytest.raises(NotApplicable):
        sale.get_discount(None)
