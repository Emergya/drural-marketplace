from collections import defaultdict

import graphene
import pytest
from django.core.exceptions import ValidationError

from ....shipping.error_codes import ShippingErrorCode
from ..mutations import BaseChannelListingMutation


def test_validate_duplicated_channel_ids(channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    errors = defaultdict(list)

    # when
    result = BaseChannelListingMutation.validate_duplicated_channel_ids(
        [channel_id],
        [],
        errors,
        ShippingErrorCode.DUPLICATED_INPUT_ITEM.value,
    )

    # then
    assert result is None
    assert errors["input"] == []


def test_validate_duplicated_channel_ids_with_duplicates(channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    second_channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    error_code = ShippingErrorCode.DUPLICATED_INPUT_ITEM.value
    errors = defaultdict(list)

    # when
    result = BaseChannelListingMutation.validate_duplicated_channel_ids(
        [channel_id], [second_channel_id], errors, error_code
    )

    # then
    assert result is None
    assert errors["input"][0].code == error_code


def test_validate_duplicated_channel_values(channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    error_code = ShippingErrorCode.DUPLICATED_INPUT_ITEM.value
    errors = defaultdict(list)
    field = "add_channels"

    # when
    result = BaseChannelListingMutation.validate_duplicated_channel_values(
        [
            channel_id,
        ],
        field,
        errors,
        error_code,
    )

    # then
    assert result is None
    assert errors[field] == []


def test_validate_duplicated_channel_values_with_duplicates(channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    second_channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    error_code = ShippingErrorCode.DUPLICATED_INPUT_ITEM.value
    errors = defaultdict(list)
    field = "add_channels"

    # when
    result = BaseChannelListingMutation.validate_duplicated_channel_values(
        [channel_id, second_channel_id], field, errors, error_code
    )

    # then
    assert result is None
    assert errors[field][0].code == error_code


def test_clean_channels_add_channels(channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    error_code = ShippingErrorCode.DUPLICATED_INPUT_ITEM.value
    errors = defaultdict(list)

    # when
    result = BaseChannelListingMutation.clean_channels(
        None, {"add_channels": [{"channel_id": channel_id}]}, errors, error_code
    )

    # then
    assert result == {
        "add_channels": [{"channel_id": channel_id, "channel": channel_EUR}],
        "remove_channels": [],
    }
    assert errors["input"] == []


def test_clean_channels_remove_channels(channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    error_code = ShippingErrorCode.DUPLICATED_INPUT_ITEM.value
    errors = defaultdict(list)

    # when
    result = BaseChannelListingMutation.clean_channels(
        None, {"remove_channels": [channel_id]}, errors, error_code
    )

    # then
    assert result == {"add_channels": [], "remove_channels": [str(channel_EUR.id)]}
    assert errors["input"] == []


def test_test_clean_channels_with_errors(channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Channel", channel_EUR.id)
    error_code = ShippingErrorCode.DUPLICATED_INPUT_ITEM.value
    errors = defaultdict(list)

    # when
    result = BaseChannelListingMutation.clean_channels(
        None, {"remove_channels": [channel_id, channel_id]}, errors, error_code
    )

    # then
    assert result == {}
    assert errors["remove_channels"][0].code == error_code


def test_test_clean_channels_invalid_object_type(channel_EUR):
    # given
    channel_id = graphene.Node.to_global_id("Product", channel_EUR.id)
    error_code = ShippingErrorCode.GRAPHQL_ERROR.value
    errors = defaultdict(list)

    # when
    with pytest.raises(ValidationError) as error:
        BaseChannelListingMutation.clean_channels(
            None, {"remove_channels": [channel_id]}, errors, error_code
        )

    # then
    assert (
        error.value.error_dict["remove_channels"][0].message
        == f"Must receive Channel id: {channel_id}."
    )
