from prices import Money

from ...order import OrderStatus
from ...order.models import Order, OrderLine
from ...payment import ChargeStatus, models
from ...payment.utils import search_customer, sum_totoal_refunded
from ...settings import DEFAULT_CURRENCY
from ..order.filters import filter_order_search, filter_status


def resolve_payment_by_id(id):
    return models.Payment.objects.filter(id=id).first()


def resolve_payments(info):
    return models.Payment.objects.all()


def resolve_payment_methods(full_access=False):
    if full_access:
        return models.PaymentMethod.objects.all()
    return models.PaymentMethod.objects.filter(is_active=True)


def resolve_payments_total_captured(
    _info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    qs = Order.objects.non_draft().exclude(status=OrderStatus.CANCELED)
    if status:
        qs = filter_status(qs, None, value=status)
    if search:
        qs = filter_order_search(qs, None, value=search)
    if company_id:
        qs = qs.get_by_company(company_id=company_id)
    qs = models.Payment.objects.filter(order__in=qs)
    if period:
        qs = qs.filter(modified__date__range=[period.gte, period.lte])
    if customer_search:
        qs = search_customer(qs, customer_search)
    return Money(
        amount=sum([payment.captured_amount for payment in qs]),
        currency=DEFAULT_CURRENCY,
    )


def resolve_payments_total_net(
    _info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    total_captured = resolve_payments_total_captured(
        _info, period, company_id, status, customer_search, search
    )
    total_fee = resolve_payment_total_fee(
        _info, period, company_id, status, customer_search, search
    )
    return total_captured - total_fee


def resolve_payment_total_fee(
    _info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    drural_fee = resolve_payment_total_drural_fee(
        _info, period, company_id, status, customer_search, search
    )
    stripe_fee = resolve_payment_total_stripe_fee(
        _info, period, company_id, status, customer_search, search
    )
    return drural_fee + stripe_fee


def resolve_payment_total_drural_fee(
    _info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    qs = Order.objects.non_draft().exclude(status=OrderStatus.CANCELED)
    if status:
        qs = filter_status(qs, None, value=status)
    if search:
        qs = filter_order_search(qs, None, value=search)
    if company_id:
        qs = qs.get_by_company(company_id=company_id)

    # get all payments for the orders from Payment model
    qs = models.Payment.objects.filter(order__in=qs)
    if period:
        qs = qs.filter(created__date__range=[period.gte, period.lte])
    if customer_search:
        qs = search_customer(qs, customer_search)
    return Money(
        amount=sum([payment.drural_fee for payment in qs]),
        currency=DEFAULT_CURRENCY,
    )


def resolve_payment_total_stripe_fee(
    _info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    qs = Order.objects.non_draft().exclude(status=OrderStatus.CANCELED)
    if status:
        qs = filter_status(qs, None, value=status)
    if search:
        qs = filter_order_search(qs, None, value=search)
    if company_id:
        qs = qs.get_by_company(company_id=company_id)

    # get all payments for the orders from Payment model
    qs = models.Payment.objects.filter(order__in=qs)
    if period:
        qs = qs.filter(created__date__range=[period.gte, period.lte])
    if customer_search:
        qs = search_customer(qs, customer_search)
    return Money(
        amount=sum([payment.stripe_fee for payment in qs]),
        currency=DEFAULT_CURRENCY,
    )


def resolve_payment_total_quantity(
    info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    qs = Order.objects.non_draft().exclude(status=OrderStatus.CANCELED)
    if status:
        qs = filter_status(qs, None, value=status)
    if search:
        qs = filter_order_search(qs, None, value=search)
    if company_id:
        qs = qs.get_by_company(company_id=company_id)
    if period:
        qs = qs.filter(created__date__range=[period.gte, period.lte])
    if customer_search:
        qs = models.Payment.objects.filter(order__in=qs)
        qs = search_customer(qs, customer_search)
    return len(qs)


def resolve_payment_total_refunds(
    info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    qs = Order.objects.non_draft().exclude(status=OrderStatus.CANCELED)
    if status:
        qs = filter_status(qs, None, value=status)
    if search:
        qs = filter_order_search(qs, None, value=search)
    qs = models.Payment.objects.filter(order__in=qs)

    qs = qs.filter(
        charge_status__in=[
            ChargeStatus.FULLY_REFUNDED,
            ChargeStatus.PARTIALLY_REFUNDED,
        ]
    ).exclude(order__status=OrderStatus.CANCELED)
    if customer_search:
        qs = search_customer(qs, customer_search)
    if period:
        qs = qs.filter(modified__date__range=[period.gte, period.lte])
    if company_id:
        order_lines = order_lines = OrderLine.objects.filter(
            variant__product__company_id=company_id
        )
        qs = qs.filter(order__lines__in=order_lines)
    if customer_search:
        qs = search_customer(qs, customer_search)
    return sum_totoal_refunded(qs)


def resolve_payment_total_quantity_refund(
    info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    qs = Order.objects.non_draft().exclude(status=OrderStatus.CANCELED)
    if status:
        qs = filter_status(qs, None, value=status)
    if search:
        qs = filter_order_search(qs, None, value=search)
    qs = models.Payment.objects.filter(order__in=qs)

    qs = qs.filter(
        charge_status__in=[
            ChargeStatus.FULLY_REFUNDED,
            ChargeStatus.PARTIALLY_REFUNDED,
        ],
    )
    if period:
        qs = qs.filter(modified__date__range=[period.gte, period.lte])
    if company_id:
        order_lines = order_lines = OrderLine.objects.filter(
            variant__product__company_id=company_id
        )
        qs = qs.filter(order__lines__in=order_lines)
    if customer_search:
        qs = search_customer(qs, customer_search)
    return len(qs)


def resolve_payment_total_average(
    info, period=None, company_id=None, status=None, customer_search=None, search=None
):
    qs = Order.objects.non_draft().exclude(status=OrderStatus.CANCELED)
    if status:
        qs = filter_status(qs, None, value=status)
    if search:
        qs = filter_order_search(qs, None, value=search)
    if company_id:
        qs = qs.get_by_company(company_id=company_id)
    qs = models.Payment.objects.filter(order__in=qs)
    if period:
        qs = qs.filter(created__date__range=[period.gte, period.lte])
    if customer_search:
        qs = search_customer(qs, customer_search)
    return sum([payment.total for payment in qs]) / len(qs) if len(qs) else 0
