import graphene
import pytest

from ....discount import DiscountValueType
from ....discount.error_codes import DiscountErrorCode
from ....settings import FEATURE_VOUCHERS, FEATURE_SALES
from ...tests.utils import assert_no_permission, get_graphql_content

VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION = """
mutation UpdateVoucherChannelListing($id: ID!, $input: VoucherChannelListingInput!) {
    voucherChannelListingUpdate(id: $id, input: $input) {
        errors {
            field
            message
            code
            channels
        }
        voucher {
            code
            channelListings {
                channel{
                    slug
                }
                discountValue
                currency
                minSpent {
                    currency
                    amount
                }
            }
        }
    }
}
"""

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_create_as_staff(
    staff_api_client, voucher_without_channel, permission_manage_discounts, channel_EUR
):
    # given
    voucher = voucher_without_channel
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    discount_value = 5.5
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [{"channelId": channel_id, "discountValue": discount_value}]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["voucherChannelListingUpdate"]["voucher"]
    assert not content["data"]["voucherChannelListingUpdate"]["errors"]
    channel_listing = data["channelListings"]
    assert channel_listing[0]["channel"]["slug"] == channel_EUR.slug
    assert channel_listing[0]["discountValue"] == discount_value
    assert channel_listing[0]["currency"] == channel_EUR.currency_code

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_as_app(
    app_api_client, voucher_without_channel, permission_manage_discounts, channel_EUR
):
    # given
    voucher = voucher_without_channel
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    discount_value = 5.5
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [{"channelId": channel_id, "discountValue": discount_value}]
        },
    }

    # when
    response = app_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["voucherChannelListingUpdate"]["voucher"]
    assert not content["data"]["voucherChannelListingUpdate"]["errors"]
    channel_listing = data["channelListings"]
    assert channel_listing[0]["channel"]["slug"] == channel_EUR.slug
    assert channel_listing[0]["discountValue"] == discount_value
    assert channel_listing[0]["currency"] == channel_EUR.currency_code

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_as_customer(
    user_api_client, voucher_without_channel, channel_EUR
):
    # given
    voucher = voucher_without_channel
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {"addChannels": [{"channelId": channel_id, "discountValue": 5.5}]},
    }

    # when
    response = user_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
    )

    # then
    assert_no_permission(response)

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_as_anonymous(
    api_client, voucher_without_channel, channel_EUR
):
    # given
    voucher = voucher_without_channel
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {"addChannels": [{"channelId": channel_id, "discountValue": 5.5}]},
    }

    # when
    response = api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
    )

    # then
    assert_no_permission(response)


@pytest.mark.skip(reason="dRural will have only one channel")
def test_voucher_channel_listing_create_many_channel(
    staff_api_client,
    voucher_without_channel,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher = voucher_without_channel
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    channel_EUR_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    discount_value = 5.5
    discount_value_eur = 50.5
    min_amount_spent = 10.1
    min_amount_spent_eur = 100.2
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "discountValue": discount_value,
                    "minAmountSpent": min_amount_spent,
                },
                {
                    "channelId": channel_EUR_id,
                    "discountValue": discount_value_eur,
                    "minAmountSpent": min_amount_spent_eur,
                },
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["voucherChannelListingUpdate"]["voucher"]
    assert not content["data"]["voucherChannelListingUpdate"]["errors"]
    channel_listing = data["channelListings"]
    assert channel_listing[0]["channel"]["slug"] == channel_EUR.slug
    assert channel_listing[0]["discountValue"] == discount_value
    assert channel_listing[0]["minSpent"]["amount"] == min_amount_spent
    assert channel_listing[0]["currency"] == channel_EUR.currency_code
    assert channel_listing[1]["channel"]["slug"] == channel_EUR.slug
    assert channel_listing[1]["discountValue"] == discount_value_eur
    assert channel_listing[1]["minSpent"]["amount"] == min_amount_spent_eur
    assert channel_listing[1]["currency"] == channel_EUR.currency_code


@pytest.mark.skip(reason="dRural will have only one channel")
def test_voucher_channel_listing_create_and_remove(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    channel_EUR_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    discount_value_eur = 50.5
    min_amount_spent_eur = 100.2
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_EUR_id,
                    "discountValue": discount_value_eur,
                    "minAmountSpent": min_amount_spent_eur,
                }
            ],
            "removeChannels": [channel_id],
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["voucherChannelListingUpdate"]["voucher"]
    assert not content["data"]["voucherChannelListingUpdate"]["errors"]
    channel_listing = data["channelListings"]
    assert len(channel_listing) == 1
    assert channel_listing[0]["channel"]["slug"] == channel_EUR.slug
    assert channel_listing[0]["discountValue"] == discount_value_eur
    assert channel_listing[0]["minSpent"]["amount"] == min_amount_spent_eur
    assert channel_listing[0]["currency"] == channel_EUR.currency_code

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    discount_value = 5.5
    min_amount_spent = 100.2
    assert not voucher.channel_listings.get().discount_value == discount_value
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "discountValue": discount_value,
                    "minAmountSpent": min_amount_spent,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["voucherChannelListingUpdate"]["voucher"]
    assert not content["data"]["voucherChannelListingUpdate"]["errors"]
    channel_listing = data["channelListings"]
    assert len(channel_listing) == 1
    assert channel_listing[0]["channel"]["slug"] == channel_EUR.slug
    assert channel_listing[0]["discountValue"] == discount_value
    assert channel_listing[0]["minSpent"]["amount"] == min_amount_spent
    assert channel_listing[0]["currency"] == channel_EUR.currency_code

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_without_discount_value(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    min_amount_spent = 100.2
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {"channelId": channel_id, "minAmountSpent": min_amount_spent}
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["voucherChannelListingUpdate"]["voucher"]
    assert not content["data"]["voucherChannelListingUpdate"]["errors"]
    channel_listing = data["channelListings"]
    assert len(channel_listing) == 1
    assert channel_listing[0]["channel"]["slug"] == channel_EUR.slug
    assert channel_listing[0]["discountValue"] == 20
    assert channel_listing[0]["minSpent"]["amount"] == min_amount_spent
    assert channel_listing[0]["currency"] == channel_EUR.currency_code

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_remove_channel(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {"removeChannels": [channel_id]},
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    data = content["data"]["voucherChannelListingUpdate"]["voucher"]
    assert not content["data"]["voucherChannelListingUpdate"]["errors"]
    channel_listing = data["channelListings"]
    assert len(channel_listing) == 0

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_with_null_as_discount_value(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "discountValue": None,
                    "minAmountSpent": 100.2,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "discountValue"
    assert errors[0]["code"] == DiscountErrorCode.REQUIRED.name
    assert errors[0]["channels"] == [channel_id]

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_create_with_null_as_discount_value(
    staff_api_client,
    voucher_without_channel,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher = voucher_without_channel
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "discountValue": None,
                    "minAmountSpent": 100.2,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "discountValue"
    assert errors[0]["code"] == DiscountErrorCode.REQUIRED.name
    assert errors[0]["channels"] == [channel_id]

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_create_with_invalid_percentage_value(
    staff_api_client,
    voucher_without_channel,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher = voucher_without_channel
    voucher.discount_value_type = DiscountValueType.PERCENTAGE
    voucher.save()
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "discountValue": 101,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "discountValue"
    assert errors[0]["code"] == DiscountErrorCode.INVALID.name
    assert errors[0]["channels"] == [channel_id]

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_create_without_discount_value(
    staff_api_client,
    voucher_without_channel,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher = voucher_without_channel
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {"addChannels": [{"channelId": channel_id, "minAmountSpent": 100.2}]},
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "discountValue"
    assert errors[0]["code"] == DiscountErrorCode.REQUIRED.name
    assert errors[0]["channels"] == [channel_id]

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_duplicates_in_add(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {"channelId": channel_id, "discountValue": 50.5},
                {"channelId": channel_id, "discountValue": 50.5},
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "addChannels"
    assert errors[0]["code"] == DiscountErrorCode.DUPLICATED_INPUT_ITEM.name
    assert errors[0]["channels"] == [channel_id]

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_duplicates_in_remove(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {"removeChannels": [channel_id, channel_id]},
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "removeChannels"
    assert errors[0]["code"] == DiscountErrorCode.DUPLICATED_INPUT_ITEM.name
    assert errors[0]["channels"] == [channel_id]

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_duplicates_in_add_and_remove(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [{"channelId": channel_id, "discountValue": 50.5}],
            "removeChannels": [channel_id],
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "input"
    assert errors[0]["code"] == DiscountErrorCode.DUPLICATED_INPUT_ITEM.name
    assert errors[0]["channels"] == [channel_id]

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_invalid_precision_discount_value(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "discountValue": 5.55555,
                    "minAmountSpent": 100.2,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "discountValue"
    assert errors[0]["code"] == DiscountErrorCode.INVALID.name
    assert errors[0]["channels"] == [channel_id]

@pytest.mark.skipif(not FEATURE_VOUCHERS, reason="vouchers are not being used.")
def test_voucher_channel_listing_update_invalid_precision_min_amount_spent(
    staff_api_client,
    voucher,
    permission_manage_discounts,
    channel_EUR,
):
    # given
    voucher_id = graphene.Node.to_global_id("Voucher", voucher.pk)
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    variables = {
        "id": voucher_id,
        "input": {
            "addChannels": [
                {
                    "channelId": channel_id,
                    "discountValue": 5.55,
                    "minAmountSpent": 100.2222,
                }
            ]
        },
    }

    # when
    response = staff_api_client.post_graphql(
        VOUCHER_CHANNEL_LISTING_UPDATE_MUTATION,
        variables=variables,
        permissions=(permission_manage_discounts,),
    )
    content = get_graphql_content(response)

    # then
    errors = content["data"]["voucherChannelListingUpdate"]["errors"]
    assert len(errors) == 1
    assert errors[0]["field"] == "minAmountSpent"
    assert errors[0]["code"] == DiscountErrorCode.INVALID.name
    assert errors[0]["channels"] == [channel_id]
