import pytest

from ...core.exceptions import InsufficientStock
from ..availability import (
    _get_available_quantity,
    check_stock_quantity,
    check_stock_quantity_bulk,
)

COUNTRY_CODE = "ES"


def test_check_stock_quantity(variant_with_many_stocks, channel_EUR):
    assert (
        check_stock_quantity(
            variant_with_many_stocks, COUNTRY_CODE, channel_EUR.slug, 7
        )
        is None
    )


def test_check_stock_quantity_out_of_stock(variant_with_many_stocks, channel_EUR):
    with pytest.raises(InsufficientStock):
        check_stock_quantity(
            variant_with_many_stocks, COUNTRY_CODE, channel_EUR.slug, 8
        )


def test_check_stock_quantity_with_allocations(
    variant_with_many_stocks,
    order_line_with_allocation_in_many_stocks,
    order_line_with_one_allocation,
    channel_EUR,
):
    assert (
        check_stock_quantity(
            variant_with_many_stocks, COUNTRY_CODE, channel_EUR.slug, 3
        )
        is None
    )


def test_check_stock_quantity_with_allocations_out_of_stock(
    variant_with_many_stocks, order_line_with_allocation_in_many_stocks, channel_EUR
):
    with pytest.raises(InsufficientStock):
        check_stock_quantity(
            variant_with_many_stocks, COUNTRY_CODE, channel_EUR.slug, 5
        )


def test_check_stock_quantity_without_stocks(variant_with_many_stocks, channel_EUR):
    variant_with_many_stocks.stocks.all().delete()
    with pytest.raises(InsufficientStock):
        check_stock_quantity(
            variant_with_many_stocks, COUNTRY_CODE, channel_EUR.slug, 1
        )


def test_check_stock_quantity_without_one_stock(variant_with_many_stocks, channel_EUR):
    variant_with_many_stocks.stocks.get(quantity=3).delete()
    assert (
        check_stock_quantity(
            variant_with_many_stocks, COUNTRY_CODE, channel_EUR.slug, 4
        )
        is None
    )


def test_check_stock_quantity_bulk(variant_with_many_stocks, channel_EUR):
    variant = variant_with_many_stocks
    country_code = "ES"
    available_quantity = _get_available_quantity(variant.stocks.all())

    # test that it doesn't raise error for available quantity
    assert (
        check_stock_quantity_bulk(
            [variant_with_many_stocks], country_code, [available_quantity], channel_EUR
        )
        is None
    )

    # test that it raises an error for exceeded quantity
    with pytest.raises(InsufficientStock):
        check_stock_quantity_bulk(
            [variant_with_many_stocks],
            country_code,
            [available_quantity + 1],
            channel_EUR,
        )

    # test that it raises an error if no stocks are found
    variant.stocks.all().delete()
    with pytest.raises(InsufficientStock):
        check_stock_quantity_bulk(
            [variant_with_many_stocks], country_code, [available_quantity], channel_EUR
        )


def test_check_stock_quantity_bulk_no_channel_shipping_zones(
    variant_with_many_stocks, channel_EUR
):
    variant = variant_with_many_stocks
    country_code = "ES"
    available_quantity = _get_available_quantity(variant.stocks.all())
    channel_EUR.shipping_zones.clear()

    with pytest.raises(InsufficientStock):
        check_stock_quantity_bulk(
            [variant_with_many_stocks], country_code, [available_quantity], channel_EUR
        )
