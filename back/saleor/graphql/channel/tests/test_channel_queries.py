import graphene

from ...tests.utils import (
    assert_no_permission,
    get_graphql_content,
    get_graphql_content_from_response,
)

QUERY_CHANNELS = """
query {
    channels {
        name
        slug
        currencyCode
        defaultCountry {
            code
            country
        }
    }
}
"""


def test_query_channels_as_staff_user(staff_api_client, channel_EUR):
    # given

    # when
    response = staff_api_client.post_graphql(QUERY_CHANNELS, {})
    content = get_graphql_content(response)

    # then
    channels = content["data"]["channels"]
    assert len(channels) == 1
    assert {
        "slug": channel_EUR.slug,
        "name": channel_EUR.name,
        "currencyCode": channel_EUR.currency_code,
        "defaultCountry": {
            "code": channel_EUR.default_country.code,
            "country": channel_EUR.default_country.name,
        },
    } in channels
    assert {
        "slug": channel_EUR.slug,
        "name": channel_EUR.name,
        "currencyCode": channel_EUR.currency_code,
        "defaultCountry": {
            "code": channel_EUR.default_country.code,
            "country": channel_EUR.default_country.name,
        },
    } in channels


def test_query_channels_as_app(app_api_client, channel_EUR):
    # given

    # when
    response = app_api_client.post_graphql(QUERY_CHANNELS, {})
    content = get_graphql_content(response)

    # then
    channels = content["data"]["channels"]
    assert len(channels) == 1
    assert {
        "slug": channel_EUR.slug,
        "name": channel_EUR.name,
        "currencyCode": channel_EUR.currency_code,
        "defaultCountry": {
            "code": channel_EUR.default_country.code,
            "country": channel_EUR.default_country.name,
        },
    } in channels
    assert {
        "slug": channel_EUR.slug,
        "name": channel_EUR.name,
        "currencyCode": channel_EUR.currency_code,
        "defaultCountry": {
            "code": channel_EUR.default_country.code,
            "country": channel_EUR.default_country.name,
        },
    } in channels


def test_query_channels_as_customer(user_api_client, channel_EUR):
    # given

    # when
    response = user_api_client.post_graphql(QUERY_CHANNELS, {})
    content = get_graphql_content(response)

    # then
    channels = content["data"]["channels"]
    assert len(channels) == 1
    assert {
        "slug": channel_EUR.slug,
        "name": channel_EUR.name,
        "currencyCode": channel_EUR.currency_code,
        "defaultCountry": {
            "code": channel_EUR.default_country.code,
            "country": channel_EUR.default_country.name,
        },
    } in channels
    assert {
        "slug": channel_EUR.slug,
        "name": channel_EUR.name,
        "currencyCode": channel_EUR.currency_code,
        "defaultCountry": {
            "code": channel_EUR.default_country.code,
            "country": channel_EUR.default_country.name,
        },
    } in channels


def test_query_channels_as_anonymous(api_client, channel_EUR):
    # given

    # when
    response = api_client.post_graphql(QUERY_CHANNELS, {})

    # then
    assert_no_permission(response)


QUERY_CHANNELS_WITH_HAS_ORDERS = """
query {
    channels {
        name
        slug
        currencyCode
        hasOrders
    }
}
"""


def test_query_channels_with_has_orders_order(
    staff_api_client, permission_manage_channels, channel_EUR, order_list
):
    # given

    # when
    response = staff_api_client.post_graphql(
        QUERY_CHANNELS_WITH_HAS_ORDERS,
        {},
        permissions=(permission_manage_channels,),
    )
    content = get_graphql_content(response)

    # then
    channels = content["data"]["channels"]
    assert len(channels) == 1
    assert {
        "slug": channel_EUR.slug,
        "name": channel_EUR.name,
        "currencyCode": channel_EUR.currency_code,
        "hasOrders": True,
    } in channels


def test_query_channels_with_has_orders_without_permission(
    staff_api_client, channel_EUR
):
    # given

    # when
    response = staff_api_client.post_graphql(QUERY_CHANNELS_WITH_HAS_ORDERS, {})

    # then
    assert_no_permission(response)


QUERY_CHANNEL = """
    query getChannel($id: ID!){
        channel(id: $id){
            id
            name
            slug
            currencyCode
        }
    }
"""


def test_query_channel_as_staff_user(staff_api_client, channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {"id": channel_id}

    # when
    response = staff_api_client.post_graphql(QUERY_CHANNEL, variables)
    content = get_graphql_content(response)

    # then
    channel_data = content["data"]["channel"]
    assert channel_data["id"] == channel_id
    assert channel_data["name"] == channel_EUR.name
    assert channel_data["slug"] == channel_EUR.slug
    assert channel_data["currencyCode"] == channel_EUR.currency_code


def test_query_channel_as_app(app_api_client, channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {"id": channel_id}

    # when
    response = app_api_client.post_graphql(QUERY_CHANNEL, variables)
    content = get_graphql_content(response)

    # then
    channel_data = content["data"]["channel"]
    assert channel_data["id"] == channel_id
    assert channel_data["name"] == channel_EUR.name
    assert channel_data["slug"] == channel_EUR.slug
    assert channel_data["currencyCode"] == channel_EUR.currency_code


def test_query_channel_as_customer(user_api_client, channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {"id": channel_id}

    # when
    response = user_api_client.post_graphql(QUERY_CHANNEL, variables)
    content = get_graphql_content(response)

    # then
    channel_data = content["data"]["channel"]
    assert channel_data["id"] == channel_id
    assert channel_data["name"] == channel_EUR.name
    assert channel_data["slug"] == channel_EUR.slug
    assert channel_data["currencyCode"] == channel_EUR.currency_code


def test_query_channel_as_anonymous(api_client, channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {"id": channel_id}

    # when
    response = api_client.post_graphql(QUERY_CHANNEL, variables)

    # then
    assert_no_permission(response)


def test_query_channel_by_invalid_id(staff_api_client, channel_EUR):
    id = "bh/"
    variables = {"id": id}
    response = staff_api_client.post_graphql(QUERY_CHANNEL, variables)
    content = get_graphql_content_from_response(response)
    assert len(content["errors"]) == 1
    assert content["errors"][0]["message"] == f"Couldn't resolve id: {id}."
    assert content["data"]["channel"] is None


def test_query_channel_with_invalid_object_type(staff_api_client, channel_EUR):
    variables = {"id": graphene.Node.to_global_id("Order", channel_EUR.pk)}
    response = staff_api_client.post_graphql(QUERY_CHANNEL, variables)
    content = get_graphql_content(response)
    assert content["data"]["channel"] is None
