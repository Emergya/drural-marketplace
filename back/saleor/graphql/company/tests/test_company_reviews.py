import graphene

from ...tests.utils import get_graphql_content

QUERY_COMPANY = """
    query getCompany($id: ID!){
        company(id: $id){
            id
            name
            reviews(first:2){
                edges{
                    node{
                        user
                        product{
                            id
                        }
                    }
                }
            }
        }
    }
"""

QUERY_COMPANY_REVIEW_STATS = """
    query getCompany($id: ID!){
        company(id: $id){
            id
            name
            reviewPercentages{
                stars
                total
            }
        }
    }
"""


def test_query_company_reviews_as_anonymous_user(
    api_client, company, product, review, customer_user2
):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}
    product_id = graphene.Node.to_global_id("Product", product.id)

    # when
    response = api_client.post_graphql(QUERY_COMPANY, variables)
    content = get_graphql_content(response)

    # then
    company_data = content["data"]["company"]
    assert company_data["id"] == company_id
    assert company_data["name"] == "dRural"
    assert (
        company_data["reviews"]["edges"][0]["node"]["user"]
        == customer_user2.first_name + " " + customer_user2.last_name
    )
    assert company_data["reviews"]["edges"][0]["node"]["product"]["id"] == product_id


def test_query_company_review_stats_as_anonymous_user(api_client, company, review):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}

    # when
    response = api_client.post_graphql(QUERY_COMPANY_REVIEW_STATS, variables)
    content = get_graphql_content(response)

    # then
    company_data = content["data"]["company"]
    assert company_data["id"] == company_id
    assert company_data["name"] == "dRural"
    assert len(company_data["reviewPercentages"]) == 5
    assert company_data["reviewPercentages"][0]["total"] == 100
