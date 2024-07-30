from collections import defaultdict, namedtuple
from datetime import datetime, timedelta
from typing import TYPE_CHECKING, Dict, Iterable, List

import graphene
import pytz
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db.models import Q
from django.db.utils import IntegrityError
from django.utils import timezone

from ...account.models import User
from ...core.permissions import ProductPermissions
from ...core.tracing import traced_atomic_transaction
from ...order import OrderStatus
from ...order import models as order_models
from ...product import BookingStatus
from ...product.error_codes import BookableResourceErrorCode
from ...product.models import Booking, Product
from ...settings import TZ_REGION
from ...warehouse.models import Stock

if TYPE_CHECKING:
    from django.db.models import QuerySet

    from ...product.models import ProductVariant


def get_used_attribute_values_for_variant(variant):
    """Create a dict of attributes values for variant.

    Sample result is:
    {
        "attribute_1_global_id": ["ValueAttr1_1"],
        "attribute_2_global_id": ["ValueAttr2_1"]
    }
    """
    attribute_values = defaultdict(list)
    for assigned_variant_attribute in variant.attributes.all():
        attribute = assigned_variant_attribute.attribute
        attribute_id = graphene.Node.to_global_id("Attribute", attribute.id)
        for attr_value in assigned_variant_attribute.values.all():
            attribute_values[attribute_id].append(attr_value.slug)
    return attribute_values


def get_used_variants_attribute_values(product):
    """Create list of attributes values for all existing `ProductVariants` for product.

    Sample result is:
    [
        {
            "attribute_1_global_id": ["ValueAttr1_1"],
            "attribute_2_global_id": ["ValueAttr2_1"]
        },
        ...
        {
            "attribute_1_global_id": ["ValueAttr1_2"],
            "attribute_2_global_id": ["ValueAttr2_2"]
        }
    ]
    """
    variants = (
        product.variants.prefetch_related("attributes__values")
        .prefetch_related("attributes__assignment")
        .all()
    )
    used_attribute_values = []
    for variant in variants:
        attribute_values = get_used_attribute_values_for_variant(variant)
        used_attribute_values.append(attribute_values)
    return used_attribute_values


@traced_atomic_transaction()
def create_stocks(
    variant: "ProductVariant", stocks_data: List[Dict[str, str]], warehouses: "QuerySet"
):
    try:
        Stock.objects.bulk_create(
            [
                Stock(
                    product_variant=variant,
                    warehouse=warehouse,
                    quantity=stock_data["quantity"],
                )
                for stock_data, warehouse in zip(stocks_data, warehouses)
            ]
        )
    except IntegrityError:
        msg = "Stock for one of warehouses already exists for this product variant."
        raise ValidationError(msg)


DraftOrderLinesData = namedtuple(
    "DraftOrderLinesData", ["order_to_lines_mapping", "line_pks", "order_pks"]
)


def get_draft_order_lines_data_for_variants(
    variant_ids: Iterable[int],
):
    lines = order_models.OrderLine.objects.filter(
        variant__id__in=variant_ids, order__status=OrderStatus.DRAFT
    ).select_related("order")
    order_to_lines_mapping: Dict[
        order_models.Order, List[order_models.OrderLine]
    ] = defaultdict(list)
    line_pks = set()
    order_pks = set()
    for line in lines:
        order_to_lines_mapping[line.order].append(line)
        line_pks.add(line.pk)
        order_pks.add(line.order_id)

    return DraftOrderLinesData(order_to_lines_mapping, line_pks, order_pks)


def is_product_owner(requestor, product):
    if not isinstance(requestor, User):
        return False
    return product.company.managers.filter(pk=requestor.pk).exists()


def is_product_owner_or_can_manage_products(user, product_id):
    product = Product.objects.get(pk=product_id)
    return user.companies.filter(pk=product.company.pk).exists() or (
        user.is_staff and user.has_perms([ProductPermissions.MANAGE_PRODUCTS])
    )


def validate_calendar(calendar):
    for weekday in calendar:
        validate_time_periods(
            weekday.get("time_periods", []),
            day=weekday.get("day"),
        )


def validate_time_periods(periods, day):
    """Validate if start_time is before end_time, and are multiple of 15 minutes."""

    def validate_minutes_intervals(period):
        return (
            period["start_time"].minute % 15 == 0
            and period["end_time"].minute % 15 == 0
        )

    if not periods:
        return

    for index, period in enumerate(periods):
        if period["start_time"] >= period["end_time"]:
            raise ValidationError(
                {
                    "time_periods": ValidationError(
                        f"Invalid interval time in {day}, start_time "
                        f"can't be after end_time.",
                        code=BookableResourceErrorCode.INVALID.value,
                    )
                }
            )
        if not validate_minutes_intervals(period):
            raise ValidationError(
                {
                    "time_periods": ValidationError(
                        "All start_time and end_time params must be multiple "
                        "of 15 minutes.",
                        code=BookableResourceErrorCode.INVALID.value,
                    )
                }
            )
        if index > 0:
            if period["start_time"] < periods[index - 1]["end_time"]:
                raise ValidationError(
                    {
                        "time_periods": ValidationError(
                            f"Invalid period in {day}, a previous period "
                            "can't be biggest than his next period.",
                            code=BookableResourceErrorCode.INVALID.value,
                        )
                    }
                )


def periods_availables_by_day(resource, date, periods, queryset) -> List[dict]:
    """Get periods availables for given date."""
    periods_availables: List[dict] = []

    if date < timezone.now().date():
        return periods_availables

    weekday = date.strftime("%A").upper()  # Get weekday from date.
    periods_in_weekday = periods.get(weekday, [])

    if resource.quantity_infinite:
        return periods_in_weekday

    tz = pytz.timezone(TZ_REGION)
    for _period in periods_in_weekday:
        start_booking = tz.localize(datetime.combine(date, _period["start_time"]))
        end_booking = tz.localize(datetime.combine(date, _period["end_time"]))
        if period_available(resource, start_booking, end_booking, periods, queryset):
            periods_availables.append(_period)

    return periods_availables


def period_available(resource, start_booking, end_booking, periods, queryset):
    """Check if period requested is available in resource."""
    weekday = start_booking.date().strftime("%A").upper()  # Get weekday from date.
    periods_in_weekday = periods.get(weekday, [])

    period_requested = {
        "start_time": start_booking.time(),
        "end_time": end_booking.time(),
    }

    if period_requested not in periods_in_weekday:
        return False

    if resource.quantity_infinite:
        return True

    def booked_in_period(object):
        return (
            (object.start_date >= start_booking and object.end_date <= end_booking)
            or (object.start_date <= start_booking and object.end_date > start_booking)
            or (object.start_date < end_booking and object.end_date >= end_booking)
            or (object.start_date < start_booking and object.end_date > end_booking)
        )

    period_booked_count = [booking for booking in queryset if booked_in_period(booking)]
    return resource.quantity > len(period_booked_count)


def validate_resource_in_product(product, resource):
    # Check if product is bookable
    if not product.is_bookable:
        raise ValidationError(
            {
                "variant": ValidationError(
                    "Only bookable products can be booked.",
                    code="product_not_bookable",
                )
            }
        )

    if not product.bookable_resources.filter(id=resource.pk).exists():
        raise ValidationError(
            {
                "resource": ValidationError(
                    "This resource is not asigned to this product.",
                    code="resource_not_asigned_to_product",
                )
            }
        )


def retrieve_bookings(resource):
    limit_date = timezone.now() - timedelta(
        minutes=float(settings.RESERVATION_GRACE_TIME)
    )

    return (
        Booking.objects.filter(
            bookable_resource=resource, created_at__date__gte=timezone.now().date()
        )
        .exclude(
            Q(status=BookingStatus.PENDING, created_at__lt=limit_date)
            | Q(status=BookingStatus.CANCELED)
        )
        .distinct()
    )
