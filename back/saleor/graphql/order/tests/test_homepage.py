from datetime import date, timedelta

from prices import Money

from ...core.enums import ReportingPeriod
from ...tests.utils import assert_no_permission, get_graphql_content
from ....order import OrderStatus, models
from ....order.events import OrderEvents
from ....order.models import OrderEvent

def test_homepage_events(order_events, staff_api_client, permission_manage_orders):
    query = """
    {
        homepageEvents(first: 20) {
            edges {
                node {
                    date
                    type
                }
            }
        }
    }
    """
    response = staff_api_client.post_graphql(
        query, permissions=[permission_manage_orders]
    )
    content = get_graphql_content(response)
    edges = content["data"]["homepageEvents"]["edges"]
    only_types = {"PLACED", "PLACED_FROM_DRAFT", "ORDER_FULLY_PAID"}
    assert {edge["node"]["type"] for edge in edges} == only_types

def test_homepage_events_whithout_orders_as_seller(order_events, user_api_client, permission_manage_orders):
    query = """
    {
        homepageEvents(first: 20) {
            edges {
                node {
                    date
                    type
                }
            }
        }
    }
    """
    response = user_api_client.post_graphql(
        query, permissions=[permission_manage_orders]
    )
    content = get_graphql_content(response)
    edges = content["data"]["homepageEvents"]["edges"]
    
    assert len(edges) == 0
    assert edges == []


QUERY_ORDER_TOTAL = """
query Orders($period: ReportingPeriod, $channel: String) {
    ordersTotal(period: $period, channel: $channel) {
        gross {
            amount
            currency
        }
        net {
            currency
            amount
        }
    }
}
"""


def test_orders_total(
    staff_api_client,
    permission_manage_orders,
    order_with_lines,
    channel_EUR,
):
    # given
    order = order_with_lines
    variables = {"period": ReportingPeriod.TODAY.name, "channel": channel_EUR.slug}

    # when
    response = staff_api_client.post_graphql(
        QUERY_ORDER_TOTAL, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    amount = str(content["data"]["ordersTotal"]["gross"]["amount"])
    assert Money(amount, "EUR") == order.total.gross


def test_orders_total_channel_EUR(
    staff_api_client,
    permission_manage_orders,
    order_with_lines,
    channel_EUR,
):
    # given
    order = order_with_lines
    variables = {"period": ReportingPeriod.TODAY.name, "channel": channel_EUR.slug}

    # when
    response = staff_api_client.post_graphql(
        QUERY_ORDER_TOTAL, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    amount = str(content["data"]["ordersTotal"]["gross"]["amount"])
    assert Money(amount, channel_EUR.currency_code) == order.total.gross


def test_orders_total_not_existing_channel(
    staff_api_client,
    permission_manage_orders,
    order_with_lines,
):
    # given
    variables = {"period": ReportingPeriod.TODAY.name, "channel": "not-existing"}

    # when
    response = staff_api_client.post_graphql(
        QUERY_ORDER_TOTAL, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    assert not content["data"]["ordersTotal"]


def test_orders_total_as_staff(
    staff_api_client,
    permission_manage_orders,
    order_with_lines,
    channel_EUR,
):
    # given
    order = order_with_lines
    variables = {"period": ReportingPeriod.TODAY.name, "channel": channel_EUR.slug}

    # when
    response = staff_api_client.post_graphql(
        QUERY_ORDER_TOTAL, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    amount = str(content["data"]["ordersTotal"]["gross"]["amount"])
    assert Money(amount, "EUR") == order.total.gross


def test_orders_total_as_app(
    app_api_client,
    permission_manage_orders,
    order_with_lines,
    channel_EUR,
):
    # given
    order = order_with_lines
    variables = {"period": ReportingPeriod.TODAY.name, "channel": channel_EUR.slug}

    # when
    response = app_api_client.post_graphql(
        QUERY_ORDER_TOTAL, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    amount = str(content["data"]["ordersTotal"]["gross"]["amount"])
    assert Money(amount, "EUR") == order.total.gross


def test_orders_total_as_customer(
    user_api_client,
    order_with_lines,
    channel_EUR,
):
    # given
    variables = {"period": ReportingPeriod.TODAY.name, "channel": channel_EUR.slug}

    # when
    response = user_api_client.post_graphql(QUERY_ORDER_TOTAL, variables)

    # then
    assert_no_permission(response)


def test_orders_total_as_anonymous(
    api_client,
    order_with_lines,
    channel_EUR,
):
    # given
    variables = {"period": ReportingPeriod.TODAY.name, "channel": channel_EUR.slug}

    # when
    response = api_client.post_graphql(QUERY_ORDER_TOTAL, variables)

    # then
    assert_no_permission(response)


QUERY_ORDER_TODAY_COUNT = """
    query OrdersToday($created: DateRangeInput, $channel: String) {
        orders(first: 100, filter: {created: $created}, channel: $channel ) {
            totalCount
        }
    }
"""


def test_orders_total_count_without_channel(
    staff_api_client,
    permission_manage_orders,
    order_with_lines,
    channel_EUR,
):
    # given
    variables = {
        "created": {
            "gte": str(date.today() - timedelta(days=3)),
            "lte": str(date.today()),
        }
    }

    # when
    response = staff_api_client.post_graphql(
        QUERY_ORDER_TODAY_COUNT, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    assert content["data"]["orders"]["totalCount"] == 1


def test_orders_total_count_channel_EUR(
    staff_api_client,
    permission_manage_orders,
    order_with_lines,
    channel_EUR,
):
    # given
    variables = {
        "created": {
            "gte": str(date.today() - timedelta(days=3)),
            "lte": str(date.today()),
        },
        "channel": channel_EUR.slug,
    }

    # when
    response = staff_api_client.post_graphql(
        QUERY_ORDER_TODAY_COUNT, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    assert content["data"]["orders"]["totalCount"] == 1


def test_orders_total_count_as_staff(
    staff_api_client,
    permission_manage_orders,
    order_with_lines,
    channel_EUR,
):
    # given
    variables = {
        "created": {
            "gte": str(date.today() - timedelta(days=3)),
            "lte": str(date.today()),
        },
        "channel": channel_EUR.slug,
    }

    # when
    response = staff_api_client.post_graphql(
        QUERY_ORDER_TODAY_COUNT, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    assert content["data"]["orders"]["totalCount"] == 1


def test_orders_total_count_as_app(
    app_api_client,
    permission_manage_orders,
    order_with_lines,
    channel_EUR,
):
    # given
    variables = {
        "created": {
            "gte": str(date.today() - timedelta(days=3)),
            "lte": str(date.today()),
        },
        "channel": channel_EUR.slug,
    }

    # when
    response = app_api_client.post_graphql(
        QUERY_ORDER_TODAY_COUNT, variables, permissions=[permission_manage_orders]
    )

    # then
    content = get_graphql_content(response)
    assert content["data"]["orders"]["totalCount"] == 1


def test_orders_total_count_as_customer(
    user_api_client,
    order_with_lines,
    channel_EUR,
):
    # given
    variables = {
        "created": {
            "gte": str(date.today() - timedelta(days=3)),
            "lte": str(date.today()),
        },
        "channel": channel_EUR.slug,
    }

    # when
    response = user_api_client.post_graphql(QUERY_ORDER_TODAY_COUNT, variables)

    # then
    assert_no_permission(response)


def test_orders_total_count_as_anonymous(
    api_client,
    order_with_lines,
    channel_EUR,
):
    # given
    variables = {
        "created": {
            "gte": str(date.today() - timedelta(days=3)),
            "lte": str(date.today()),
        },
        "channel": channel_EUR.slug,
    }

    # when
    response = api_client.post_graphql(QUERY_ORDER_TODAY_COUNT, variables)

    # then
    assert_no_permission(response)
