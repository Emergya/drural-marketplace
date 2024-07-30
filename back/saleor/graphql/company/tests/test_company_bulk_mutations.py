import graphene

from django.contrib.auth.models import Group
from ....product.tests.utils import create_banner
from ...tests.utils import get_graphql_content, get_multipart_request_body, get_graphql_content_from_response
from ....account.utils import add_user_in_sellers_group
from ....core.permissions import AccountPermissions
from ....account.utils import requestor_is_seller
from ....account.models import User

MUTATION_BULK_REMOVE_COMPANY_AGENT = """
    mutation bulkRemoveCompanyAgent($ids: [ID]!, $company: ID!){
        bulkRemoveCompanyAgent(
            ids: $ids
            company: $company
            )
        {
            count
            errors{
                field
                code
                message
            }
        }
    }
"""

def test_bulk_remove_company_agent(staff_api_client, 

    company, 
    seller_user, 
    permission_manage_users,
):

    # create user
    user_temp = User.objects.create(email="tempuser@gmail.com", password="test", is_active=True)
    user_temp.save()

    seller_user.companies.add(company)
    user_temp.companies.add(company)

    # add users in sellers group
    add_user_in_sellers_group(seller_user)
    add_user_in_sellers_group(user_temp)
    group = Group.objects.get(name="Sellers")

    user_temp.save()
    seller_user.save()
    company.refresh_from_db()

    staff_api_client.user.user_permissions.add(permission_manage_users)
    
    variables = {
        "ids": [graphene.Node.to_global_id("User", user.id) for user in [seller_user, user_temp]],
        "company": graphene.Node.to_global_id("CompanyType", company.id)
    }

    response = staff_api_client.post_graphql(
        MUTATION_BULK_REMOVE_COMPANY_AGENT, variables
    )

    content = get_graphql_content(response)
    data = content["data"]["bulkRemoveCompanyAgent"]

    assert data["count"] == 2

    assert requestor_is_seller(seller_user) == False
    assert seller_user.groups.filter(id=group.id).exists() == False

    assert requestor_is_seller(user_temp) == False
    assert user_temp.groups.filter(id=group.id).exists() == False


def test_bulk_remove_company_agent_no_exists(
    staff_api_client, 
    company, 
    seller_user, 
    permission_manage_users,
):

    # create user
    user_temp = User.objects.create(email="tempuser@gmail.com", password="test", is_active=True)
    user_temp.save()


    company.refresh_from_db()

    staff_api_client.user.user_permissions.add(permission_manage_users)
    
    variables = {
        "ids": [graphene.Node.to_global_id("User", user.id) for user in [seller_user, user_temp]],
        "company": graphene.Node.to_global_id("CompanyType", company.id)
    }
    
    response = staff_api_client.post_graphql(
        MUTATION_BULK_REMOVE_COMPANY_AGENT, variables
    )

    content = get_graphql_content_from_response(response)
    
    assert content['errors'][0]['message'] == 'This user is not a company manager.'

