from unittest import skipIf
from unittest.mock import patch

import graphene
import pytest

from ....settings import FEATURE_SHIPPING
from ....shipping.error_codes import ShippingErrorCode
from ....shipping.models import ShippingMethodChannelListing
from ...tests.utils import assert_negative_positive_decimal_value, get_graphql_content

SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION = """
mutation UpdateShippingMethodChannelListing(
    $id: ID!
    $input: ShippingMethodChannelListingInput!
) {
    shippingMethodChannelListingUpdate(id: $id, input: $input) {
        errors {
            field
            message
            code
            channels
        }
        shippingMethod {
            name
            channelListings {
                price {
                    amount
                }
                maximumOrderPrice {
                    amount
                }
                minimumOrderPrice {
                    amount
                }
                channel {
                    slug
                }
            }
        }
    }
}
"""

@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_create_as_staff_user(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 1
    min_value = 2
    max_value = 3

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when

    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["shippingMethodChannelListingUpdate"]
    shipping_method_data = data["shippingMethod"]
    assert not data["errors"]
    assert shipping_method_data["name"] == shipping_method.name

    assert shipping_method_data["channelListings"][0]["price"]["amount"] == price
    assert (
        shipping_method_data["channelListings"][0]["maximumOrderPrice"]["amount"]
        == max_value
    )
    assert (
        shipping_method_data["channelListings"][0]["minimumOrderPrice"]["amount"]
        == min_value
    )
    assert (
        shipping_method_data["channelListings"][0]["channel"]["slug"]
        == channel_EUR.slug
    )


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_update_as_staff_user(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    min_value = 20
    max_value = 30

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }
    channel_listing = ShippingMethodChannelListing.objects.get(
        shipping_method_id=shipping_method.pk, channel_id=channel_EUR.id
    )

    assert channel_listing.price.amount == 10
    assert channel_listing.minimum_order_price.amount == 0
    assert channel_listing.maximum_order_price is None

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)

    data = content["data"]["shippingMethodChannelListingUpdate"]
    shipping_method_data = data["shippingMethod"]
    assert not data["errors"]
    assert shipping_method_data["name"] == shipping_method.name

    # then
    assert (
        shipping_method_data["channelListings"][0]["maximumOrderPrice"]["amount"]
        == max_value
    )
    assert (
        shipping_method_data["channelListings"][0]["minimumOrderPrice"]["amount"]
        == min_value
    )
    assert (
        shipping_method_data["channelListings"][0]["channel"]["slug"]
        == channel_EUR.slug
    )

    channel_listing.refresh_from_db()

    assert channel_listing.price.amount == 10
    assert channel_listing.minimum_order_price.amount == min_value
    assert channel_listing.maximum_order_price.amount == max_value


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_update_with_negative_price(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    staff_api_client.user.user_permissions.add(permission_manage_shipping)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = -10
    min_value = 2
    max_value = 3

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
    )

    # then
    assert_negative_positive_decimal_value(response)


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_update_with_negative_min_value(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    staff_api_client.user.user_permissions.add(permission_manage_shipping)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 10
    min_value = -2
    max_value = 3

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
    )

    # then
    assert_negative_positive_decimal_value(response)


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_update_with_negative_max_value(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    staff_api_client.user.user_permissions.add(permission_manage_shipping)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 10
    max_value = -3

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
    )

    # then
    assert_negative_positive_decimal_value(response)


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_update_with_max_less_than_min(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 1
    min_value = 20
    max_value = 15

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)
    data = content["data"]["shippingMethodChannelListingUpdate"]

    # then
    assert data["errors"][0]["field"] == "maximumOrderPrice"
    assert data["errors"][0]["code"] == ShippingErrorCode.MAX_LESS_THAN_MIN.name
    assert data["errors"][0]["channels"] == [channel_id]


@skipIf(True, "This test has no sense because price is not required anymore")
def test_shipping_method_channel_listing_create_without_price(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    min_value = 10
    max_value = 15

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)
    data = content["data"]["shippingMethodChannelListingUpdate"]

    # then
    assert data["errors"][0]["field"] == "price"
    assert data["errors"][0]["code"] == ShippingErrorCode.REQUIRED.name
    assert data["errors"][0]["channels"] == [channel_id]


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_update_with_to_many_decimal_places_in_price(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 10.1234
    min_value = 2
    max_value = 3

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)
    data = content["data"]["shippingMethodChannelListingUpdate"]

    # then
    assert data["errors"][0]["field"] == "price"
    assert data["errors"][0]["code"] == ShippingErrorCode.INVALID.name
    assert data["errors"][0]["channels"] == [channel_id]


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_update_with_to_many_decimal_places_in_min_val(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 10
    min_value = 2.1234
    max_value = 3

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)
    data = content["data"]["shippingMethodChannelListingUpdate"]

    # then
    assert data["errors"][0]["field"] == "minimumOrderPrice"
    assert data["errors"][0]["code"] == ShippingErrorCode.INVALID.name
    assert data["errors"][0]["channels"] == [channel_id]


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_update_with_to_many_decimal_places_in_max_val(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method.shipping_zone.channels.add(channel_EUR)
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 10
    min_value = 2
    max_value = 3.1234

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)
    data = content["data"]["shippingMethodChannelListingUpdate"]

    # then
    assert data["errors"][0]["field"] == "maximumOrderPrice"
    assert data["errors"][0]["code"] == ShippingErrorCode.INVALID.name
    assert data["errors"][0]["channels"] == [channel_id]


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_shipping_method_channel_listing_create_channel_not_valid(
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 1
    min_value = 5
    max_value = 3

    variables = {
        "id": shipping_method_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "price": price,
                    "minimumOrderPrice": min_value,
                    "maximumOrderPrice": max_value,
                }
            ]
        },
    }

    # when

    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["shippingMethodChannelListingUpdate"]

    # then
    assert data["errors"][0]["field"] == "maximumOrderPrice"
    assert data["errors"][0]["code"] == ShippingErrorCode.MAX_LESS_THAN_MIN.name
    assert data["errors"][0]["channels"] == [channel_id]


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
@patch(
    "saleor.graphql.shipping.mutations.channels."
    "drop_invalid_shipping_methods_relations_for_given_channels.delay"
)
def test_shipping_method_channel_listing_update_remove_channels(
    mocked_drop_invalid_shipping_methods_relations,
    staff_api_client,
    shipping_method,
    permission_manage_shipping,
    channel_EUR,
):
    # given
    shipping_method_id = graphene.Node.to_global_id(
        "ShippingMethod", shipping_method.pk
    )
    assert shipping_method.channel_listings.count() == 1
    channel_listing = shipping_method.channel_listings.first()
    channel = channel_listing.channel
    channel_id = graphene.Node.to_global_id("Channel", channel.id)

    variables = {
        "id": shipping_method_id,
        "input": {"removeChannels": [channel_id]},
    }

    assert channel_listing.price.amount == 10
    assert channel_listing.minimum_order_price.amount == 0
    assert channel_listing.maximum_order_price is None

    # when
    response = staff_api_client.post_graphql(
        SHIPPING_METHOD_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_shipping,),
    )
    content = get_graphql_content(response)

    data = content["data"]["shippingMethodChannelListingUpdate"]
    shipping_method_data = data["shippingMethod"]
    assert not data["errors"]
    assert shipping_method_data["name"] == shipping_method.name

    # then
    assert not shipping_method_data["channelListings"]
    with pytest.raises(channel_listing._meta.model.DoesNotExist):
        channel_listing.refresh_from_db()

    mocked_drop_invalid_shipping_methods_relations.assert_called_once_with(
        [shipping_method.pk], [str(channel.pk)]
    )
