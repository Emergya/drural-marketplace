from unittest.mock import patch

import graphene

from ....product.error_codes import ProductErrorCode
from ....product.models import ProductChannelListing
from ....tests.utils import flush_post_commit_hooks
from ...tests.utils import (
    assert_negative_positive_decimal_value,
    assert_no_permission,
    get_graphql_content,
)

PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION = """
mutation UpdateProductVariantChannelListing(
    $id: ID!,
    $input: [ProductVariantChannelListingAddInput!]!
) {
    productVariantChannelListingUpdate(id: $id, input: $input) {
        errors {
            field
            message
            code
            channels
        }
        variant {
            id
            channelListings {
                channel {
                    id
                    slug
                    currencyCode
                }
                price {
                    amount
                    currency
                }
                costPrice {
                    amount
                    currency
                }
                margin
            }
        }
    }
}
"""


def test_variant_channel_listing_update_duplicated_channel(
    staff_api_client, product, permission_manage_products, channel_EUR
):
    # given
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [
            {"channelId": channel_id, "price": 1},
            {"channelId": channel_id, "price": 2},
        ],
    }

    # when
    response = staff_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_products,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["productVariantChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "channelId"
    assert errors[0]["code"] == ProductErrorCode.DUPLICATED_INPUT_ITEM.name
    assert errors[0]["channels"] == [channel_id]


def test_variant_channel_listing_update_with_empty_input(
    staff_api_client, product, permission_manage_products
):
    # given
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    variables = {
        "id": variant_id,
        "input": [],
    }

    # when
    response = staff_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_products,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["productVariantChannelListingUpdate"]["errors"]
    assert not errors


def test_variant_channel_listing_update_not_assigned_channel(
    staff_api_client, product, permission_manage_products, channel_EUR
):
    # given
    variant = product.variants.get()
    ProductChannelListing.objects.get(pk=product.channel_listings.all()[0].id).delete()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [{"channelId": channel_id, "price": 1}],
    }

    # when
    response = staff_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_products,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["productVariantChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "input"
    assert errors[0]["code"] == ProductErrorCode.PRODUCT_NOT_ASSIGNED_TO_CHANNEL.name
    assert errors[0]["channels"] == [channel_id]


def test_variant_channel_listing_update_negative_price(
    staff_api_client, product, permission_manage_products, channel_EUR
):
    # given
    staff_api_client.user.user_permissions.add(permission_manage_products)
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [{"channelId": channel_id, "price": -1}],
    }

    # when
    response = staff_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION, variables=variables
    )

    # then
    assert_negative_positive_decimal_value(response)


def test_variant_channel_listing_update_with_too_many_decimal_places_in_price(
    staff_api_client, product, permission_manage_products, channel_EUR
):
    # given
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [{"channelId": channel_id, "price": 1.1234}],
    }

    # when
    response = staff_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_products,),
    )
    content = get_graphql_content(response)

    # then
    error = content["data"]["productVariantChannelListingUpdate"]["errors"][0]
    assert error["field"] == "price"
    assert error["code"] == ProductErrorCode.INVALID.name


def test_variant_channel_listing_update_as_staff_user(
    staff_api_client, product, permission_manage_products, channel_EUR
):
    # given
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_EUR_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 1
    variables = {
        "id": variant_id,
        "input": [
            {"channelId": channel_EUR_id, "price": price, "costPrice": price},
        ],
    }

    # when
    response = staff_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_products,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["productVariantChannelListingUpdate"]
    variant_data = data["variant"]
    assert not data["errors"]
    assert variant_data["id"] == variant_id
    assert variant_data["channelListings"][0]["price"]["currency"] == "EUR"
    assert variant_data["channelListings"][0]["price"]["amount"] == price
    assert variant_data["channelListings"][0]["costPrice"]["amount"] == price
    assert variant_data["channelListings"][0]["channel"]["slug"] == channel_EUR.slug


@patch("saleor.plugins.manager.PluginsManager.product_variant_updated")
def test_variant_channel_listing_update_trigger_webhook_product_variant_updated(
    mock_product_variant_updated,
    staff_api_client,
    product,
    permission_manage_products,
    channel_EUR,
):
    # given

    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_EUR_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    price = 1
    variables = {
        "id": variant_id,
        "input": [
            {"channelId": channel_EUR_id, "price": price, "costPrice": price},
        ],
    }

    # when
    response = staff_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_products,),
    )
    get_graphql_content(response)
    flush_post_commit_hooks()

    # then
    mock_product_variant_updated.assert_called_once_with(product.variants.last())


def test_variant_channel_listing_update_as_app(
    app_api_client, product, permission_manage_products, channel_EUR
):
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_EUR_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [
            {"channelId": channel_EUR_id, "price": 20},
        ],
    }

    # when
    response = app_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_products,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["productVariantChannelListingUpdate"]
    variant_data = data["variant"]
    assert not data["errors"]
    assert variant_data["id"] == variant_id
    assert variant_data["channelListings"][0]["price"]["currency"] == "EUR"
    assert variant_data["channelListings"][0]["price"]["amount"] == 20
    assert variant_data["channelListings"][0]["channel"]["slug"] == channel_EUR.slug


def test_variant_channel_listing_update_as_customer(
    user_api_client, product, channel_EUR
):
    # given
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_EUR_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [
            {"channelId": channel_EUR_id, "price": 1},
            {"channelId": channel_EUR_id, "price": 20},
        ],
    }

    # when
    response = user_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
    )

    # then
    assert_no_permission(response)


def test_variant_channel_listing_update_as_anonymous(api_client, product, channel_EUR):
    # given
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_EUR_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [
            {"channelId": channel_EUR_id, "price": 1},
            {"channelId": channel_EUR_id, "price": 20},
        ],
    }

    # when
    response = api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
    )

    # then
    assert_no_permission(response)


@patch("saleor.graphql.product.mutations.channels.update_product_discounted_price_task")
def test_product_variant_channel_listing_update_updates_discounted_price(
    mock_update_product_discounted_price_task,
    staff_api_client,
    product,
    permission_manage_products,
    channel_EUR,
):
    query = PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)

    variables = {
        "id": variant_id,
        "input": [{"channelId": channel_id, "price": "1.99"}],
    }
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_products]
    )
    assert response.status_code == 200

    content = get_graphql_content(response)
    data = content["data"]["productVariantChannelListingUpdate"]
    assert data["errors"] == []

    mock_update_product_discounted_price_task.delay.assert_called_once_with(product.pk)


def test_product_variant_channel_listing_update_remove_cost_price(
    staff_api_client,
    product,
    permission_manage_products,
    channel_EUR,
):
    # given
    query = PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [{"channelId": channel_id, "price": 1, "costPrice": None}],
    }

    # when
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_products]
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["productVariantChannelListingUpdate"]
    variant_data = data["variant"]
    assert not data["errors"]
    assert variant_data["id"] == variant_id
    assert variant_data["channelListings"][0]["price"]["currency"] == "EUR"
    assert variant_data["channelListings"][0]["price"]["amount"] == 1
    assert not variant_data["channelListings"][0]["costPrice"]
    assert variant_data["channelListings"][0]["channel"]["slug"] == channel_EUR.slug


def test_product_channel_listing_update_too_many_decimal_places_in_cost_price(
    app_api_client, product, permission_manage_products, channel_EUR
):
    # given
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_EUR_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [{"channelId": channel_EUR_id, "costPrice": 1.03321, "price": 1}],
    }

    # when
    response = app_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_products,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["productVariantChannelListingUpdate"]
    assert data["errors"][0]["field"] == "costPrice"
    assert data["errors"][0]["code"] == ProductErrorCode.INVALID.name


def test_product_channel_listing_update_invalid_cost_price(
    staff_api_client, product, permission_manage_products, channel_EUR
):
    # given
    staff_api_client.user.user_permissions.add(permission_manage_products)
    variant = product.variants.get()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.id)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": variant_id,
        "input": [{"channelId": channel_id, "costPrice": -1, "price": 1}],
    }

    # when
    response = staff_api_client.post_graphql(
        PRODUCT_VARIANT_CHANNEL_LISTING_UPDATE_MUTATION, variables=variables
    )

    # then
    assert_negative_positive_decimal_value(response)
