import graphene

from django.contrib.auth.models import Group
from ....product.tests.utils import create_banner
from ...tests.utils import get_graphql_content, get_multipart_request_body
from ....account.utils import add_user_in_sellers_group
from ....core.permissions import AccountPermissions
from ....account.utils import requestor_is_seller
from ....account.models import User
from ...tests.utils import get_graphql_content, get_multipart_request_body, assert_no_permission


MUTATION_UPDATE_COMPANY = """
    mutation companyUpadte($input: CompanyInput!, $id: ID!){
        companyUpdate(
            id: $id
            input: $input
        ){
            company{
                id
                name
                banner{
                    url
                    alt
                }
            }
            errors{
                field
                code
                message
            }
        }
    }
"""


def test_company_update(staff_api_client, company):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    name = "Test name"
    variables = {"id": company_id, "input": {"name": name}}
    response = staff_api_client.post_graphql(MUTATION_UPDATE_COMPANY, variables)
    content = get_graphql_content(response)
    company_data = content["data"]["companyUpdate"]["company"]
    assert company_data["name"] == name


def test_add_banner_in_company(staff_api_client, company):
    # given
    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    image_file, image_name = create_banner("banner")
    variables = {
        "id": company_id,
        "input": {
            "banner": image_name,
        },
    }

    # when
    body = get_multipart_request_body(
        MUTATION_UPDATE_COMPANY, variables, image_file, image_name
    )
    response = staff_api_client.post_multipart(body)
    content = get_graphql_content(response)

    # then
    company.refresh_from_db()
    company_data = content["data"]["companyUpdate"]["company"]
    assert company_data["id"]

MUTATION_ADD_COMPANY_AGENT = """
    mutation addCompanyAgent($company: ID!$input:  AgentCreateInput!, ){
        addCompanyAgent(
            company: $company
            input: $input
        ){
            user{
                id
                firstName
                email
                isStaff
                isActive
                isSeller
            }
            errors{
                field
                code
                message
            }
        }
    }
"""

MUTATION_CREATE_COMPANY = """
    mutation companyCreate($input: CompanyInput!){
        companyCreate(
            input: $input
        ){
            company{
                id
                name
            }
            errors{
                field
                code
                message
            }
        }
    }
"""
def test_company_create_by_staff(staff_api_client, company):

    image_file, image_name = create_banner("banner")
    variables = {
        "input": {
            "name": "test01",
            "publicName":"Test01",
            "cif":"123456d789",
            "phone":"123456789",
		    "email":"emailEmpresa@example.com",
		    "description":"Un test para ver si admin puede crear company",
            "image": image_name,
            "address":{
                "street":"calle falsa 123",
			    "latitude":33.5055,
			    "longitude":6852.5545
            }
        },
    }

    body = get_multipart_request_body(
        MUTATION_CREATE_COMPANY, variables, image_file, image_name
    )

    response = staff_api_client.post_multipart(body)
    assert_no_permission(response)

    
def test_add_company_agent_user_exists_and_is_an_agent (
    staff_api_client, 
    company, 
    seller_user, 
    permission_manage_users,
    ):

    seller_user.companies.add(company)
    add_user_in_sellers_group(seller_user)

    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {
        "company": company_id,
        "input": {
            "firstName": seller_user.first_name,
            "email": seller_user.email,
            "redirectUrl":"http://localhost:9000/new-password/"
        },
    }

    staff_api_client.user.user_permissions.add(permission_manage_users)
    response = staff_api_client.post_graphql(MUTATION_ADD_COMPANY_AGENT, variables)
    content = get_graphql_content(response)

    assert content['data']['addCompanyAgent']['errors'][0]['code'] == 'UNIQUE'

def test_add_company_agent_user_exists(
    staff_api_client, 
    company, 
    seller_user, 
    permission_manage_users,
    settings
    ):

    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    variables = {
        "company": company_id,
        "input": {
            "firstName": seller_user.first_name,
            "email": seller_user.email,
            "redirectUrl":"http://localhost:9000/new-password/"
        },
    }
    settings.ALLOWED_CLIENT_HOSTS = ["*"]

    staff_api_client.user.user_permissions.add(permission_manage_users)
    response = staff_api_client.post_graphql(MUTATION_ADD_COMPANY_AGENT, variables)
    content = get_graphql_content(response)

    user = content['data']['addCompanyAgent']['user']
    assert user['email'] == seller_user.email
    assert user['isActive'] == True
    assert user['isSeller'] == True
    assert requestor_is_seller(seller_user) == True


def test_add_company_agent_create_user(
    staff_api_client, 
    company, 
    permission_manage_users,
    settings
    ):

    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    name = "Agent"
    email = "new_agent@example.com"

    variables = {
        "company": company_id,
        "input": {
            "firstName": name,
            "email": email,
            "redirectUrl":"http://localhost:9000/new-password/"
        },
    }
    settings.ALLOWED_CLIENT_HOSTS = ["*"]

    staff_api_client.user.user_permissions.add(permission_manage_users)
    response = staff_api_client.post_graphql(MUTATION_ADD_COMPANY_AGENT, variables)
    content = get_graphql_content(response)

    new_user = User.objects.get(email=email)

    user = content['data']['addCompanyAgent']['user']

    assert user['email'] == new_user.email
    assert user['isActive'] == True
    assert user['isSeller'] == True
    assert requestor_is_seller(new_user) == True


MUTATION_REMOVE_COMPANY_AGENT = """
    mutation removeCompanyAgent($id: ID!, $company: ID! ){
        removeCompanyAgent(
            id: $id
            company: $company
        ){
            user{
                id
                firstName
                email
                isStaff
                isActive
                isSeller
            }
            errors{
                field
                code
                message
            }
        }
    }
"""

def test_remove_company_agent(
    staff_api_client,
    company,
    seller_user,
    permission_manage_users
    ):

    seller_user.companies.add(company)
    add_user_in_sellers_group(seller_user)

    group = Group.objects.get(name="Sellers")


    seller_user.save()
    company.refresh_from_db()

    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    seller_user_id = graphene.Node.to_global_id("User", seller_user.id)
    variables = {
        "id": seller_user_id,
        "company": company_id,
    }

    staff_api_client.user.user_permissions.add(permission_manage_users)
    response = staff_api_client.post_graphql(MUTATION_REMOVE_COMPANY_AGENT, variables)
    content = get_graphql_content(response)

    assert content['data']['removeCompanyAgent']['user']['email'] == seller_user.email
    assert content['data']['removeCompanyAgent']['user']['isActive'] == True
    assert content['data']['removeCompanyAgent']['user']['isSeller'] == False

    assert requestor_is_seller(seller_user) == False
    assert seller_user.groups.filter(id=group.id).exists() == False



def test_remove_company_agent_no_exists(
    staff_api_client,
    company,
    seller_user,
    permission_manage_users
    ):


    company_id = graphene.Node.to_global_id("CompanyType", company.id)
    seller_user_id = graphene.Node.to_global_id("User", seller_user.id)
    variables = {
        "id": seller_user_id,
        "company": company_id,
    }

    staff_api_client.user.user_permissions.add(permission_manage_users)
    response = staff_api_client.post_graphql(MUTATION_REMOVE_COMPANY_AGENT, variables)
    content = get_graphql_content(response)

    errors = content['data']['removeCompanyAgent']['errors']
    
    assert errors[0]['code'] == 'INVALID'
    assert errors[0]['message'] == 'This user is not a company manager.'
