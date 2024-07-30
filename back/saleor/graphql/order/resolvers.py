from django.db.models.aggregates import Sum
from django.db.models.expressions import Exists, OuterRef

from ...account.utils import requestor_check_seller
from ...channel.models import Channel
from ...core.tracing import traced_resolver
from ...order import OrderStatus, models
from ...order.events import OrderEvents
from ...order.models import OrderEvent
from ...order.utils import sum_order_totals
from ..channel.utils import get_default_channel_slug_or_graphql_error
from ..utils import get_user_or_app_from_context
from ..utils.filters import filter_by_period

ORDER_SEARCH_FIELDS = ("id", "discount_name", "token", "user_email", "user__email")


def resolve_orders(_info, requestor, channel_slug, company_id=None, **_kwargs):
    qs = models.Order.objects.non_draft()
    if channel_slug is None:
        channel_slug = get_default_channel_slug_or_graphql_error()
    if company_id:
        qs = qs.get_by_company(company_id=company_id)
    if channel_slug:
        qs = qs.filter(channel__slug=str(channel_slug))
    if (
        not requestor_check_seller(requestor)
        and not requestor.is_staff
        and not requestor.is_anonymous
    ):
        qs = qs.filter(user=requestor)
    return qs


def resolve_draft_orders(_info, company_id=None, **_kwargs):
    qs = models.Order.objects.drafts()
    if company_id:
        qs = qs.get_by_company(company_id=company_id)
    return qs


@traced_resolver
def resolve_orders_total(_info, period, channel_slug, company_id=None):
    if channel_slug is None:
        channel_slug = get_default_channel_slug_or_graphql_error()
    channel = Channel.objects.filter(slug=str(channel_slug)).first()
    if not channel:
        return None
    qs = (
        models.Order.objects.non_draft()
        .exclude(status=OrderStatus.CANCELED)
        .filter(channel__slug=str(channel_slug))
    )
    if company_id:
        qs = qs.get_by_company(company_id=company_id)
    qs = filter_by_period(qs, period, "created")
    return sum_order_totals(qs, channel.currency_code)


@traced_resolver
def resolve_orders_total_quantity(_info, channel_slug, start_date, end_date):
    if channel_slug is None:
        channel_slug = get_default_channel_slug_or_graphql_error()
    channel = Channel.objects.filter(slug=str(channel_slug)).first()
    if not channel:
        return None

    orders = (
        models.Order.objects.confirmed()
        .exclude(status=OrderStatus.CANCELED)
        .filter(channel__slug=str(channel_slug), created__range=[start_date, end_date])
    ).values("pk")

    qs = models.OrderLine.objects.filter(
        Exists(orders.filter(pk=OuterRef("order_id")))
    ).aggregate(Sum("quantity"))

    return qs.get("quantity__sum")


def resolve_order(id):
    return models.Order.objects.filter(pk=id).first()


def resolve_homepage_events(info):
    # Filter only selected events to be displayed on homepage.
    requestor = get_user_or_app_from_context(info.context)
    types = [
        OrderEvents.PLACED,
        OrderEvents.PLACED_FROM_DRAFT,
        OrderEvents.ORDER_FULLY_PAID,
    ]
    # if order is
    if requestor.is_staff:
        return OrderEvent.objects.filter(type__in=types)
    return OrderEvent.objects.filter(
        type__in=types,
        order__lines__variant__product__company__in=requestor.companies.all(),
    )


def resolve_order_by_token(token):
    return (
        models.Order.objects.exclude(status=OrderStatus.DRAFT)
        .filter(token=token)
        .first()
    )
