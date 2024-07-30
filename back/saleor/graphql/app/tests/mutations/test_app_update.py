import graphene
import pytest

from .....app.error_codes import AppErrorCode
from .....app.models import App, AppToken
from ....core.enums import PermissionEnum
from ....tests.utils import assert_no_permission, get_graphql_content

APP_UPDATE_MUTATION = """
mutation AppUpdate($id: ID!, $permissions: [PermissionEnum]){
    appUpdate(id: $id,
        input:{permissions:$permissions}){
        app{
            isActive
            id
            permissions{
                code
                name
            }
            tokens{
                authToken
            }
            name
        }
        errors{
            field
            message
            code
            permissions
        }
    }
}
"""


def test_app_update_mutation(
    app,
    permission_manage_apps,
    permission_manage_products,
    permission_manage_users,
    staff_api_client,
    staff_user,
):
    query = APP_UPDATE_MUTATION
    staff_user.user_permissions.add(permission_manage_products, permission_manage_users)
    id = graphene.Node.to_global_id("App", app.id)

    variables = {
        "id": id,
        "permissions": [
            PermissionEnum.MANAGE_PRODUCTS.name,
            PermissionEnum.MANAGE_USERS.name,
        ],
    }
    response = staff_api_client.post_graphql(
        query, variables=variables, permissions=(permission_manage_apps,)
    )
    content = get_graphql_content(response)

    app_data = content["data"]["appUpdate"]["app"]
    tokens_data = app_data["tokens"]
    app.refresh_from_db()
    tokens = app.tokens.all()

    assert app_data["isActive"] == app.is_active
    assert len(tokens_data) == 1
    assert tokens_data[0]["authToken"] == tokens.get().auth_token[-4:]
    assert set(app.permissions.all()) == {
        permission_manage_products,
        permission_manage_users,
    }


def test_app_update_mutation_for_app(
    permission_manage_apps,
    permission_manage_products,
    permission_manage_orders,
    permission_manage_users,
    app_api_client,
    superuser_api_client,
    superuser,
):
    query = APP_UPDATE_MUTATION

    app = App.objects.create(name="New_app", user=superuser)
    app.permissions.add(permission_manage_orders)
    AppToken.objects.create(app=app)

    requestor = app_api_client.app
    requestor.permissions.add(
        permission_manage_apps,
        permission_manage_products,
        permission_manage_users,
        permission_manage_orders,
    )
    requestor.save()
    id = graphene.Node.to_global_id("App", app.id)

    variables = {
        "id": id,
        "permissions": [
            PermissionEnum.MANAGE_PRODUCTS.name,
            PermissionEnum.MANAGE_USERS.name,
        ],
    }
    response = superuser_api_client.post_graphql(query, variables=variables)
    content = get_graphql_content(response)

    app_data = content["data"]["appUpdate"]["app"]
    tokens_data = app_data["tokens"]
    app.refresh_from_db()
    tokens = app.tokens.all()

    assert app_data["isActive"] == app.is_active
    assert len(tokens_data) == 1
    assert tokens_data[0]["authToken"] == tokens.get().auth_token[-4:]
    assert set(app.permissions.all()) == {
        permission_manage_products,
        permission_manage_users,
    }


def test_app_update_mutation_out_of_scope_permissions(
    app,
    permission_manage_apps,
    permission_manage_products,
    staff_api_client,
    staff_user,
    customer_user,
):
    """Ensure user cannot add permissions to app witch he doesn't have."""
    query = APP_UPDATE_MUTATION
    staff_user.user_permissions.add(permission_manage_apps, permission_manage_products)
    app.user = customer_user
    app.save()
    id = graphene.Node.to_global_id("App", app.id)
    variables = {
        "id": id,
        "permissions": [
            # PermissionEnum.MANAGE_PRODUCTS.name,
            PermissionEnum.MANAGE_USERS.name,
        ],
    }

    response = staff_api_client.post_graphql(query, variables=variables)
    content = get_graphql_content(response)

    data = content["data"]["appUpdate"]
    errors = data["errors"]
    assert not data["app"]
    assert len(errors) == 1
    error = errors[0]
    assert error["field"] == "permissions"
    assert error["code"] == AppErrorCode.OUT_OF_SCOPE_PERMISSION.name
    assert error["permissions"] == [PermissionEnum.MANAGE_USERS.name]


def test_app_update_mutation_superuser_can_add_any_permissions_to_his_app(
    app_admin,
    permission_manage_apps,
    permission_manage_products,
    permission_manage_users,
    superuser_api_client,
):
    """Ensure superuser can add any permissions to app."""
    query = APP_UPDATE_MUTATION
    id = graphene.Node.to_global_id("App", app_admin.id)

    variables = {
        "id": id,
        "permissions": [
            PermissionEnum.MANAGE_PRODUCTS.name,
            PermissionEnum.MANAGE_USERS.name,
        ],
    }

    response = superuser_api_client.post_graphql(query, variables=variables)
    content = get_graphql_content(response)

    data = content["data"]["appUpdate"]
    app_data = data["app"]
    tokens_data = app_data["tokens"]
    app_admin.refresh_from_db()
    tokens = app_admin.tokens.all()

    assert app_data["isActive"] == app_admin.is_active
    assert len(tokens_data) == 1
    assert tokens_data[0]["authToken"] == tokens.get().auth_token[-4:]
    assert set(app_admin.permissions.all()) == {
        permission_manage_products,
        permission_manage_users,
    }


def test_app_update_mutation_for_app_out_of_scope_permissions(
    permission_manage_apps,
    permission_manage_products,
    permission_manage_orders,
    permission_manage_users,
    admin_app_api_client,
    customer_user,
):
    app = App.objects.create(name="New_app", user=customer_user)
    query = APP_UPDATE_MUTATION
    requestor = admin_app_api_client.app
    requestor.permissions.add(
        permission_manage_apps,
        permission_manage_products,
        permission_manage_orders,
    )
    app.permissions.add(permission_manage_orders)
    id = graphene.Node.to_global_id("App", app.id)

    variables = {
        "id": id,
        "permissions": [
            PermissionEnum.MANAGE_APPS.name,
            PermissionEnum.MANAGE_USERS.name,
        ],
    }
    response = admin_app_api_client.post_graphql(query, variables=variables)
    content = get_graphql_content(response)

    data = content["data"]["appUpdate"]
    errors = data["errors"]
    assert not data["app"]
    assert len(errors) == 1
    error = errors[0]
    assert error["field"] == "permissions"
    assert error["code"] == AppErrorCode.OUT_OF_SCOPE_PERMISSION.name
    assert error["permissions"] == [
        PermissionEnum.MANAGE_APPS.name,
        PermissionEnum.MANAGE_USERS.name,
    ]


def test_app_update_mutation_out_of_scope_app(
    app,
    permission_manage_apps,
    permission_manage_products,
    permission_manage_orders,
    permission_manage_users,
    user_api_client,
    customer_user,
):
    """Ensure user cannot manage app with wider permission scope."""
    query = APP_UPDATE_MUTATION
    customer_user.user_permissions.add(
        permission_manage_apps,
        permission_manage_products,
        permission_manage_users,
    )
    app.permissions.add(permission_manage_orders)
    id = graphene.Node.to_global_id("App", app.id)

    variables = {
        "id": id,
        "permissions": [
            PermissionEnum.MANAGE_PRODUCTS.name,
            PermissionEnum.MANAGE_USERS.name,
        ],
    }

    response = user_api_client.post_graphql(query, variables=variables)
    content = get_graphql_content(response)

    data = content["data"]["appUpdate"]
    errors = data["errors"]
    assert not data["app"]
    assert len(errors) == 1
    error = errors[0]
    assert error["field"] == "id"
    assert error["code"] == AppErrorCode.OUT_OF_SCOPE_APP.name


@pytest.mark.skip(reason="Every user can delete his own image now")
def test_app_update_mutation_superuser_can_update_any_app(
    app,
    permission_manage_apps,
    permission_manage_products,
    permission_manage_orders,
    permission_manage_users,
    superuser_api_client,
):
    """Ensure superuser can manage any app."""
    query = APP_UPDATE_MUTATION
    app.permissions.add(permission_manage_orders)
    id = graphene.Node.to_global_id("App", app.id)

    variables = {
        "id": id,
        "permissions": [
            PermissionEnum.MANAGE_PRODUCTS.name,
            PermissionEnum.MANAGE_USERS.name,
        ],
    }

    response = superuser_api_client.post_graphql(query, variables=variables)
    content = get_graphql_content(response)

    data = content["data"]["appUpdate"]
    app_data = data["app"]
    tokens_data = app_data["tokens"]
    app.refresh_from_db()
    tokens = app.tokens.all()

    assert app_data["isActive"] == app.is_active
    assert len(tokens_data) == 1
    assert tokens_data[0]["authToken"] == tokens.get().auth_token[-4:]
    assert set(app.permissions.all()) == {
        permission_manage_products,
        permission_manage_users,
    }


def test_app_update_mutation_for_app_out_of_scope_app(
    permission_manage_apps,
    permission_manage_products,
    permission_manage_orders,
    permission_manage_users,
    seller_app_api_client,
    staff_user,
):
    app = App.objects.create(name="New_app", user=staff_user)
    query = APP_UPDATE_MUTATION
    requestor = seller_app_api_client.app
    requestor.permissions.add(
        permission_manage_apps,
        permission_manage_products,
        permission_manage_users,
    )
    app.permissions.add(permission_manage_orders)
    id = graphene.Node.to_global_id("App", app.id)

    variables = {
        "id": id,
        "permissions": [
            PermissionEnum.MANAGE_PRODUCTS.name,
            PermissionEnum.MANAGE_USERS.name,
        ],
    }
    response = seller_app_api_client.post_graphql(query, variables=variables)
    content = get_graphql_content(response)

    data = content["data"]["appUpdate"]
    errors = data["errors"]
    assert not data["app"]
    assert len(errors) == 1
    error = errors[0]
    assert error["field"] == "id"
    assert error["code"] == AppErrorCode.OUT_OF_SCOPE_APP.name


def test_app_update_no_permission(app, staff_api_client, staff_user):
    query = APP_UPDATE_MUTATION
    id = graphene.Node.to_global_id("App", app.id)
    variables = {
        "id": id,
        "permissions": [PermissionEnum.MANAGE_PRODUCTS.name],
    }
    response = staff_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)
