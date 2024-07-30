import django_filters
from django.db.models import Exists, OuterRef, Q
from graphene_django.filter import GlobalIDMultipleChoiceFilter

from ...account.models import User
from ...discount.models import OrderDiscount
from ...order.models import Order, OrderLine
from ...payment.models import Payment
from ..core.filters import ListObjectTypeFilter, MetadataFilterBase, ObjectTypeFilter
from ..core.types.common import DateRangeInput
from ..core.utils import from_global_id_or_error
from ..payment.enums import PaymentChargeStatusEnum
from ..utils import resolve_global_ids_to_primary_keys
from ..utils.filters import filter_by_query_param, filter_range_field
from .enums import OrderStatusFilter


def filter_payment_status(qs, _, value):
    if value:
        qs = qs.filter(payments__is_active=True, payments__charge_status__in=value)
    return qs


def get_payment_id_from_query(value):
    try:
        return from_global_id_or_error(value, only_type="Payment")[1]
    except Exception:
        return None


def get_order_id_from_query(value):
    if value.startswith("#"):
        value = value[1:]
    return value if value.isnumeric() else None


def filter_order_by_payment(qs, payment_id):
    if payment_id:
        qs = qs.filter(payments__pk=payment_id)
    return qs


def filter_status(qs, _, value):
    if OrderStatusFilter.READY_TO_FULFILL in value:
        return qs.ready_to_fulfill()
    if OrderStatusFilter.READY_TO_CAPTURE in value:
        return qs.ready_to_capture()
    return qs.filter(status__in=value)


def filter_customer(qs, _, value):
    qs = qs.filter(
        Q(user_email__trigram_similar=value)
        | Q(user__email__trigram_similar=value)
        | Q(user__first_name__trigram_similar=value)
        | Q(user__last_name__trigram_similar=value)
    )
    return qs


def filter_created_range(qs, _, value):
    return filter_range_field(qs, "created__date", value)


def filter_order_search(qs, _, value):
    if payment_id := get_payment_id_from_query(value):
        return filter_order_by_payment(qs, payment_id)

    users = User.objects.filter(
        Q(email__trigram_similar=value)
        | Q(first_name__trigram_similar=value)
        | Q(last_name__trigram_similar=value)
    ).values("pk")

    filter_option = Q(user_email__trigram_similar=value) | Q(
        Exists(users.filter(pk=OuterRef("user_id")))
    )

    if order_id := get_order_id_from_query(value):
        filter_option |= Q(pk=order_id)

    payments = Payment.objects.filter(psp_reference=value).values("id")
    filter_option |= Q(Exists(payments.filter(order_id=OuterRef("id"))))

    discounts = OrderDiscount.objects.filter(
        Q(name__trigram_similar=value) | Q(translated_name__trigram_similar=value)
    ).values("id")
    filter_option |= Q(Exists(discounts.filter(order_id=OuterRef("id"))))

    lines = OrderLine.objects.filter(product_sku=value).values("id")
    filter_option |= Q(Exists(lines.filter(order_id=OuterRef("id"))))
    return qs.filter(filter_option)


def filter_channels(qs, _, values):
    if values:
        _, channels_ids = resolve_global_ids_to_primary_keys(values, "Channel")
        qs = qs.filter(channel_id__in=channels_ids)
    return qs


def filter_order_ids(qs, _, values):
    if values:
        _, order_ids = resolve_global_ids_to_primary_keys(values, "Order")
        qs = qs.filter(id__in=order_ids)
    return qs


def filter_has_booking(qs, _, value):
    if value:
        qs = qs.exclude(booking=None)
    else:
        qs = qs.filter(booking=None)
    return qs


def filter_booking_date_range(qs, _, value):
    return filter_range_field(qs, "booking__start_date__date", value)


def filter_bookable_resource_name_search(qs, _, value):
    search_fields = ("booking__bookable_resource__name",)
    if value:
        qs = filter_by_query_param(qs, value.strip(), search_fields)
    return qs


class DraftOrderFilter(MetadataFilterBase):
    customer = django_filters.CharFilter(method=filter_customer)
    created = ObjectTypeFilter(input_class=DateRangeInput, method=filter_created_range)
    search = django_filters.CharFilter(method=filter_order_search)
    channels = GlobalIDMultipleChoiceFilter(method=filter_channels)

    class Meta:
        model = Order
        fields = ["customer", "created", "search"]


class OrderFilter(DraftOrderFilter):
    payment_status = ListObjectTypeFilter(
        input_class=PaymentChargeStatusEnum, method=filter_payment_status
    )
    status = ListObjectTypeFilter(input_class=OrderStatusFilter, method=filter_status)
    customer = django_filters.CharFilter(method=filter_customer)
    created = ObjectTypeFilter(input_class=DateRangeInput, method=filter_created_range)
    search = django_filters.CharFilter(method=filter_order_search)
    channels = GlobalIDMultipleChoiceFilter(method=filter_channels)
    ids = GlobalIDMultipleChoiceFilter(method=filter_order_ids)
    has_booking = django_filters.BooleanFilter(method=filter_has_booking)
    booking_date = ObjectTypeFilter(
        input_class=DateRangeInput, method=filter_booking_date_range
    )
    bookable_resource_name = django_filters.CharFilter(
        method=filter_bookable_resource_name_search
    )

    class Meta:
        model = Order
        fields = [
            "payment_status",
            "status",
            "customer",
            "created",
            "search",
            "channels",
            "ids",
            "has_booking",
            "booking_date",
            "bookable_resource_name",
        ]
