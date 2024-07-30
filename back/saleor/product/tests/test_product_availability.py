import datetime
from decimal import Decimal
from unittest.case import skipIf
from unittest.mock import Mock

import pytest
from django_countries.fields import Country
from freezegun import freeze_time
from prices import Money, TaxedMoney, TaxedMoneyRange

from ...plugins.manager import PluginsManager, get_plugins_manager
from .. import models
from ..utils.availability import get_product_availability


def test_availability(stock, monkeypatch, settings, channel_EUR):
    product = stock.product_variant.product
    product_channel_listing = product.channel_listings.first()
    variants = product.variants.all()
    variants_channel_listing = models.ProductVariantChannelListing.objects.filter(
        variant__in=variants
    )
    taxed_price = TaxedMoney(Money("10.0", "EUR"), Money("12.30", "EUR"))
    monkeypatch.setattr(
        PluginsManager, "apply_taxes_to_product", Mock(return_value=taxed_price)
    )
    manager = get_plugins_manager()
    availability = get_product_availability(
        product=product,
        product_channel_listing=product_channel_listing,
        variants=product.variants.all(),
        variants_channel_listing=variants_channel_listing,
        channel=channel_EUR,
        manager=manager,
        collections=[],
        discounts=[],
        country=Country("PL"),
    )
    taxed_price_range = TaxedMoneyRange(start=taxed_price, stop=taxed_price)
    assert availability.price_range == taxed_price_range
    assert availability.price_range_local_currency is None

    monkeypatch.setattr(
        "django_prices_openexchangerates.models.get_rates",
        lambda c: {"EUR": Mock(rate=2)},
    )
    settings.DEFAULT_COUNTRY = "PL"
    settings.OPENEXCHANGERATES_API_KEY = "fake-key"
    availability = get_product_availability(
        product=product,
        product_channel_listing=product_channel_listing,
        variants=variants,
        variants_channel_listing=variants_channel_listing,
        collections=[],
        discounts=[],
        channel=channel_EUR,
        manager=manager,
        local_currency="EUR",
        country=Country("PL"),
    )
    assert availability.price_range.start.currency == "EUR"

    availability = get_product_availability(
        product=product,
        product_channel_listing=product_channel_listing,
        variants=variants,
        variants_channel_listing=variants_channel_listing,
        collections=[],
        discounts=[],
        channel=channel_EUR,
        manager=manager,
        country=Country("PL"),
    )
    assert availability.price_range.start.tax.amount
    assert availability.price_range.stop.tax.amount
    assert availability.price_range_undiscounted.start.tax.amount
    assert availability.price_range_undiscounted.stop.tax.amount


def test_availability_with_all_variant_channel_listings(stock, channel_EUR):
    # given
    product = stock.product_variant.product
    product_channel_listing = product.channel_listings.first()
    variants = product.variants.all()
    variants_channel_listing = models.ProductVariantChannelListing.objects.filter(
        variant__in=variants, channel=channel_EUR
    )
    [variant1_channel_listing, variant2_channel_listing] = variants_channel_listing
    variant2_channel_listing.price_amount = Decimal(15)
    variant2_channel_listing.save()
    manager = get_plugins_manager()

    # when
    availability = get_product_availability(
        product=product,
        product_channel_listing=product_channel_listing,
        variants=variants,
        variants_channel_listing=variants_channel_listing,
        channel=channel_EUR,
        manager=manager,
        collections=[],
        discounts=[],
        country=Country("PL"),
    )

    # then
    price_range = availability.price_range
    assert price_range.start.gross.amount == variant1_channel_listing.price_amount
    assert price_range.stop.gross.amount == variant2_channel_listing.price_amount


def test_availability_with_missing_variant_channel_listings(stock, channel_EUR):
    # given
    product = stock.product_variant.product
    product_channel_listing = product.channel_listings.first()
    variants = product.variants.all()
    variants_channel_listing = models.ProductVariantChannelListing.objects.filter(
        variant__in=variants, channel=channel_EUR
    )
    [variant1_channel_listing, variant2_channel_listing] = variants_channel_listing
    variant2_channel_listing.delete()
    manager = get_plugins_manager()

    # when
    availability = get_product_availability(
        product=product,
        product_channel_listing=product_channel_listing,
        variants=variants,
        variants_channel_listing=variants_channel_listing,
        channel=channel_EUR,
        manager=manager,
        collections=[],
        discounts=[],
        country=Country("PL"),
    )

    # then
    price_range = availability.price_range
    assert price_range.start.gross.amount == variant1_channel_listing.price_amount
    assert price_range.stop.gross.amount == variant1_channel_listing.price_amount


def test_availability_without_variant_channel_listings(stock, channel_EUR):
    # given
    product = stock.product_variant.product
    product_channel_listing = product.channel_listings.first()
    variants = product.variants.all()
    models.ProductVariantChannelListing.objects.filter(
        variant__in=variants, channel=channel_EUR
    ).delete()
    manager = get_plugins_manager()

    # when
    availability = get_product_availability(
        product=product,
        product_channel_listing=product_channel_listing,
        variants=variants,
        variants_channel_listing=[],
        channel=channel_EUR,
        manager=manager,
        collections=[],
        discounts=[],
        country=Country("PL"),
    )

    # then
    price_range = availability.price_range
    assert price_range is None


def test_available_products_only_published(product_list, channel_EUR):
    channel_listing = product_list[0].channel_listings.get()
    channel_listing.is_published = False
    channel_listing.save(update_fields=["is_published"])

    available_products = models.Product.objects.published(channel_EUR.slug)
    assert available_products.count() == 2
    assert all(
        [
            product.channel_listings.get(channel__slug=channel_EUR.slug).is_published
            for product in available_products
        ]
    )


def test_available_products_only_available(product_list, channel_EUR):
    channel_listing = product_list[0].channel_listings.get()
    date_tomorrow = datetime.date.today() + datetime.timedelta(days=1)
    channel_listing.publication_date = date_tomorrow
    channel_listing.save(update_fields=["publication_date"])

    available_products = models.Product.objects.published(channel_EUR.slug)
    assert available_products.count() == 2
    assert all(
        [
            product.channel_listings.get(channel__slug=channel_EUR.slug).is_published
            for product in available_products
        ]
    )


def test_available_products_available_from_yesterday(product_list, channel_EUR):
    channel_listing = product_list[0].channel_listings.get()
    date_yesterday = datetime.date.today() - datetime.timedelta(days=1)
    channel_listing.publication_date = date_yesterday
    channel_listing.save(update_fields=["publication_date"])

    available_products = models.Product.objects.published(channel_EUR.slug)
    assert available_products.count() == 3
    assert all(
        [
            product.channel_listings.get(channel__slug=channel_EUR.slug).is_published
            for product in available_products
        ]
    )


def test_available_products_available_without_channel_listings(
    product_list, channel_EUR
):
    product_list[0].channel_listings.all().delete()
    product_list[1].channel_listings.all().delete()
    product_list[2].channel_listings.all().delete()
    available_products = models.Product.objects.published(channel_EUR.slug)
    assert available_products.count() == 0


@pytest.mark.skip(reason="dRural only use one channel")
def test_available_products_available_with_many_channels(
    product_list_with_many_channels, channel_EUR
):
    models.ProductChannelListing.objects.filter(
        product__in=product_list_with_many_channels, channel=channel_EUR
    ).update(is_published=False)

    available_products = models.Product.objects.published(channel_EUR.slug)
    assert available_products.count() == 0
    available_products = models.Product.objects.published(channel_EUR.slug)
    assert available_products.count() == 3


@freeze_time("2020-03-18 12:00:00")
def test_product_is_visible_from_today(product):
    product_channel_listing = product.channel_listings.get()
    product_channel_listing.publication_date = datetime.date.today()
    product_channel_listing.save()
    assert product_channel_listing.is_visible


def test_available_products_with_variants(product_list, channel_EUR):
    product = product_list[0]
    product.variants.all().delete()

    available_products = models.Product.objects.published_with_variants(
        channel_EUR.slug
    )
    assert available_products.count() == 2


@skipIf(True, "This test has no sense because there is only one channel")
def test_available_products_with_variants_in_many_channels_eur(
    product_list_with_variants_many_channel, channel_EUR
):
    available_products = models.Product.objects.published_with_variants(
        channel_EUR.slug
    )
    assert available_products.count() == 1


def test_visible_to_customer_user(customer_user, product_list, channel_EUR):
    product = product_list[0]
    product.variants.all().delete()

    available_products = models.Product.objects.visible_to_user(
        customer_user, channel_EUR.slug
    )
    assert available_products.count() == 2


def test_visible_to_staff_user(
    staff_user, product_list, channel_EUR, permission_manage_products
):
    product = product_list[0]
    product.variants.all().delete()

    staff_user.user_permissions.add(permission_manage_products)

    available_products = models.Product.objects.visible_to_user(
        staff_user, channel_EUR.slug
    )
    assert available_products.count() == 3


def test_filter_not_published_product_is_unpublished(product, channel_EUR):
    channel_listing = product.channel_listings.get()
    channel_listing.is_published = False
    channel_listing.save(update_fields=["is_published"])

    available_products = models.Product.objects.not_published(channel_EUR.slug)
    assert available_products.count() == 1


def test_filter_not_published_product_published_tomorrow(product, channel_EUR):
    date_tomorrow = datetime.date.today() + datetime.timedelta(days=1)
    channel_listing = product.channel_listings.get()
    channel_listing.is_published = True
    channel_listing.publication_date = date_tomorrow
    channel_listing.save(update_fields=["is_published", "publication_date"])

    available_products = models.Product.objects.not_published(channel_EUR.slug)
    assert available_products.count() == 1


def test_filter_not_published_product_not_published_tomorrow(product, channel_EUR):
    date_tomorrow = datetime.date.today() + datetime.timedelta(days=1)
    channel_listing = product.channel_listings.get()
    channel_listing.is_published = False
    channel_listing.publication_date = date_tomorrow
    channel_listing.save(update_fields=["is_published", "publication_date"])

    available_products = models.Product.objects.not_published(channel_EUR.slug)
    assert available_products.count() == 1


def test_filter_not_published_product_is_published(product, channel_EUR):
    available_products = models.Product.objects.not_published(channel_EUR.slug)
    assert available_products.count() == 0


def test_filter_not_published_product(product, channel_EUR):
    channel_listing = product.channel_listings.all()[0]
    channel_listing.is_published = False
    channel_listing.save()
    models.ProductChannelListing.objects.filter(
        product=product, channel=channel_EUR, is_published=False
    )

    available_products_eur = models.Product.objects.not_published(channel_EUR.slug)
    assert available_products_eur.count() == 1


def test_filter_not_published_product_without_assigned_channel(product, channel_EUR):
    models.ProductChannelListing.objects.get(
        pk=product.channel_listings.all()[0].id
    ).delete()
    not_available_products_eur = models.Product.objects.not_published(channel_EUR.slug)
    assert not_available_products_eur.count() == 1
