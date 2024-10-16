import graphene
import pytest

from ....settings import FEATURE_SHIPPING
from ....shipping.models import ShippingMethod, ShippingZone
from ...tests.utils import get_graphql_content


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
@pytest.fixture
def shipping_method_list(shipping_zone):
    shipping_method_1 = ShippingMethod.objects.create(
        shipping_zone=shipping_zone, name="DHL"
    )
    shipping_method_2 = ShippingMethod.objects.create(
        shipping_zone=shipping_zone, name="DPD"
    )
    shipping_method_3 = ShippingMethod.objects.create(
        shipping_zone=shipping_zone, name="GLS"
    )
    return shipping_method_1, shipping_method_2, shipping_method_3


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
@pytest.fixture
def shipping_zone_list():
    shipping_zone_1 = ShippingZone.objects.create(name="Europe")
    shipping_zone_2 = ShippingZone.objects.create(name="Asia")
    shipping_zone_3 = ShippingZone.objects.create(name="Oceania")
    return shipping_zone_1, shipping_zone_2, shipping_zone_3


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_delete_shipping_methods(
    staff_api_client, shipping_method_list, permission_manage_shipping
):
    query = """
    mutation shippingPriceBulkDelete($ids: [ID]!) {
        shippingPriceBulkDelete(ids: $ids) {
            count
        }
    }
    """

    variables = {
        "ids": [
            graphene.Node.to_global_id("ShippingMethod", method.id)
            for method in shipping_method_list
        ]
    }
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_shipping]
    )
    content = get_graphql_content(response)

    assert content["data"]["shippingPriceBulkDelete"]["count"] == 3
    assert not ShippingMethod.objects.filter(
        id__in=[method.id for method in shipping_method_list]
    ).exists()


@pytest.mark.skipif(not FEATURE_SHIPPING, reason="Shipping are not being used.")
def test_delete_shipping_zones(
    staff_api_client, shipping_zone_list, permission_manage_shipping
):
    query = """
    mutation shippingZoneBulkDelete($ids: [ID]!) {
        shippingZoneBulkDelete(ids: $ids) {
            count
        }
    }
    """

    variables = {
        "ids": [
            graphene.Node.to_global_id("ShippingZone", zone.id)
            for zone in shipping_zone_list
        ]
    }
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_shipping]
    )
    content = get_graphql_content(response)

    assert content["data"]["shippingZoneBulkDelete"]["count"] == 3
    assert not ShippingZone.objects.filter(
        id__in=[zone.id for zone in shipping_zone_list]
    ).exists()
