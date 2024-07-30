from ...checkout.models import Checkout
from ...order import OrderStatus
from ...order.models import Order
from ..tasks import drop_invalid_shipping_methods_relations_for_given_channels


def test_drop_invalid_shipping_method_relations(
    checkouts_list,
    order_list,
    shipping_method,
    other_shipping_method,
    shipping_method_weight_based,
    channel_EUR,
):
    # given
    checkout_EUR = checkouts_list[0]
    checkout_EUR.shipping_method = shipping_method
    checkout_EUR.channel = channel_EUR

    checkout_weight_shipping_method = checkouts_list[2]
    checkout_weight_shipping_method.shipping_method = shipping_method_weight_based
    checkout_weight_shipping_method.channel = channel_EUR

    checkout_another_shipping_method = checkouts_list[3]
    checkout_another_shipping_method.shipping_method = other_shipping_method
    checkout_another_shipping_method.channel = channel_EUR

    Checkout.objects.bulk_update(
        [
            checkout_EUR,
            checkout_weight_shipping_method,
            checkout_another_shipping_method,
        ],
        ["shipping_method", "channel"],
    )

    order_confirmed = order_list[0]
    order_confirmed.status = OrderStatus.UNFULFILLED
    order_confirmed.shipping_method = shipping_method
    order_confirmed.channel = channel_EUR

    order_draft = order_list[1]
    order_draft.status = OrderStatus.DRAFT
    order_draft.shipping_method = shipping_method
    order_draft.channel = channel_EUR

    Order.objects.bulk_update(
        [order_confirmed, order_draft],
        ["status", "shipping_method", "channel"],
    )

    # when
    drop_invalid_shipping_methods_relations_for_given_channels(
        [
            shipping_method.id,
            other_shipping_method.id,
        ],
        [channel_EUR.id],
    )

    # then
    checkout_EUR.refresh_from_db()
    checkout_weight_shipping_method.refresh_from_db()
    checkout_another_shipping_method.refresh_from_db()

    assert checkout_EUR.shipping_method is None
    assert (
        checkout_weight_shipping_method.shipping_method == shipping_method_weight_based
    )
    assert checkout_another_shipping_method.shipping_method is None

    order_confirmed.refresh_from_db()
    order_draft.refresh_from_db()

    assert order_confirmed.shipping_method == shipping_method
    assert order_draft.shipping_method is None
