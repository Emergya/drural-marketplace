import pytest

from .....discount.models import Sale, SaleChannelListing
from .....settings import FEATURE_SALES
from ....tests.utils import get_graphql_content


@pytest.fixture
def sales_list(channel_EUR):
    sales = Sale.objects.bulk_create(
        [Sale(name="Sale1"), Sale(name="Sale2"), Sale(name="Sale2")]
    )
    values = [15, 5, 25]
    sale_channel_listings = []
    for sale, value in zip(sales, values):
        sale_channel_listings.append(
            SaleChannelListing(
                sale=sale,
                channel=channel_EUR,
                discount_value=value,
                currency=channel_EUR.currency_code,
            )
        )
    SaleChannelListing.objects.bulk_create(sale_channel_listings)
    return sales


SALES_QUERY = """
query GetSales($channel: String){
  sales(last: 10, channel: $channel) {
    edges {
      node {
        id
        name
        type
        startDate
        endDate
        categories(first: 10) {
          edges {
            node {
              id
            }
          }
        }
        collections(first: 10) {
          edges {
            node {
              id
            }
          }
        }
        products(first: 10) {
          edges {
            node {
              id
            }
          }
        }
        channelListings {
          id
          discountValue
          currency
          channel {
            id
            name
            isActive
            slug
            currencyCode
          }
        }
        discountValue
        currency
      }
    }
  }
}
"""

@pytest.mark.skipif(not FEATURE_SALES, reason="sales are not being used.")
@pytest.mark.django_db
@pytest.mark.count_queries(autouse=False)
def test_sales_query_with_channel_slug(
    staff_api_client,
    sales_list,
    channel_EUR,
    permission_manage_discounts,
    count_queries,
):
    variables = {"channel": channel_EUR.slug}
    get_graphql_content(
        staff_api_client.post_graphql(
            SALES_QUERY,
            variables,
            permissions=[permission_manage_discounts],
            check_no_permissions=False,
        )
    )

@pytest.mark.skipif(not FEATURE_SALES, reason="sales are not being used.")
@pytest.mark.django_db
@pytest.mark.count_queries(autouse=False)
def test_sales_query_withot_channel_slug(
    staff_api_client,
    sales_list,
    permission_manage_discounts,
    count_queries,
):
    get_graphql_content(
        staff_api_client.post_graphql(
            SALES_QUERY,
            {},
            permissions=[permission_manage_discounts],
            check_no_permissions=False,
        )
    )
