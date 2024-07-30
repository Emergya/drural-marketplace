import graphene

from ....company.models import Company
from ...tests.utils import get_graphql_content

QUERY_COMPANY = """
    query getCompany($id: ID!){
        company(id: $id){
            id
            name
            publicName
            rating
            status
            isEnabled
        }
    }
"""

QUERY_COMPANY_CIF = """
    query getCompany($id: ID!){
        company(id: $id){
            id
            name
            publicName
            rating
            status
            isEnabled
            cif
        }
    }
"""

QUERY_COMPANY_PHONE = """
    query getCompany($id: ID!){
        company(id: $id){
            id
            name
            publicName
            rating
            status
            isEnabled
            phone
        }
    }
"""

QUERY_COMPANY_EMAIL = """
    query getCompany($id: ID!){
        company(id: $id){
            id
            name
            publicName
            rating
            status
            isEnabled
            email
        }
    }
"""

QUERY_COMPANY_FULL = """
    query getCompany($id: ID!){
        company(id: $id){
            id
            name
            publicName
            rating
            status
            isEnabled
            cif
            phone
            email
        }
    }
"""


def test_query_company_as_anonymous_user(api_client, company):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}

    # when
    response = api_client.post_graphql(QUERY_COMPANY, variables)
    content = get_graphql_content(response)

    # then
    company_data = content["data"]["company"]
    assert company_data["name"] == "dRural"
    assert company_data["publicName"] == "dRural"
    assert company_data["rating"] == 5.0
    assert company_data["status"] == "ACC"
    assert company_data["isEnabled"]


def test_query_disabled_company_as_anonymous_user(api_client, company):
    # given
    company.is_enabled = False
    company.save()
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}

    # when
    response = api_client.post_graphql(QUERY_COMPANY, variables)
    content = get_graphql_content(response)

    # then
    company_data = content["data"]["company"]
    assert company_data is None


def test_query_pending_company_as_anonymous_user(api_client, company):
    # given
    company.status = Company.Status.PENDING
    company.save()
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}

    # when
    response = api_client.post_graphql(QUERY_COMPANY, variables)
    content = get_graphql_content(response)

    # then
    company_data = content["data"]["company"]
    assert company_data is None


def test_query_company_cif_as_anonymous_user(api_client, company, graphql_log_handler):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}

    # when
    response = api_client.post_graphql(QUERY_COMPANY_CIF, variables)

    # then
    assert response.status_code == 200
    assert graphql_log_handler.messages == [
        "saleor.graphql.errors.handled[INFO].PermissionDenied"
    ]


def test_query_company_phone_as_anonymous_user(
    api_client, company, graphql_log_handler
):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}

    # when
    response = api_client.post_graphql(QUERY_COMPANY_PHONE, variables)

    # then
    assert response.status_code == 200
    assert graphql_log_handler.messages == [
        "saleor.graphql.errors.handled[INFO].PermissionDenied"
    ]


def test_query_company_email_as_anonymous_user(
    api_client, company, graphql_log_handler
):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}

    # when
    response = api_client.post_graphql(QUERY_COMPANY_EMAIL, variables)

    # then
    assert response.status_code == 200
    assert graphql_log_handler.messages == [
        "saleor.graphql.errors.handled[INFO].PermissionDenied"
    ]


def test_query_company_as_manager_user(staff_api_client, company):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {"id": company_id}

    # when
    response = staff_api_client.post_graphql(QUERY_COMPANY_FULL, variables)
    content = get_graphql_content(response)

    # then
    company_data = content["data"]["company"]
    assert company_data["name"] == "dRural"
    assert company_data["publicName"] == "dRural"
    assert company_data["rating"] == 5.0
    assert company_data["status"] == "ACC"
    assert company_data["isEnabled"]
    assert company_data["cif"] == "123456789A"
    assert company_data["phone"] == "999999999"
    assert company_data["email"] == "info@drural.com"
