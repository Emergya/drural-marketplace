from unittest.mock import patch

import graphene
import pytest

from ....app.models import App
from ....webhook.event_types import WebhookEventType
from ....webhook.models import Webhook
from ...tests.utils import (
    assert_no_permission,
    get_graphql_content,
    get_graphql_content_from_response,
)
from ..enums import WebhookEventTypeEnum, WebhookSampleEventTypeEnum

WEBHOOK_CREATE_BY_APP = """
    mutation webhookCreate($name: String, $target_url: String,
            $events: [WebhookEventTypeEnum]){
      webhookCreate(input:{name: $name, targetUrl:$target_url, events:$events}){
        errors{
          field
          message
        }
        webhook{
          id
        }
      }
    }
"""


def test_webhook_create_by_app(app_api_client, permission_manage_orders):
    query = WEBHOOK_CREATE_BY_APP
    variables = {
        "name": "New integration",
        "target_url": "https://www.example.com",
        "events": [
            WebhookEventTypeEnum.ORDER_CREATED.name,
            WebhookEventTypeEnum.ORDER_CREATED.name,
        ],
    }
    response = app_api_client.post_graphql(
        query,
        variables=variables,
        permissions=[permission_manage_orders],
        check_no_permissions=False,
    )
    get_graphql_content(response)
    new_webhook = Webhook.objects.get()
    assert new_webhook.name == "New integration"
    assert new_webhook.target_url == "https://www.example.com"
    events = new_webhook.events.all()
    assert len(events) == 1
    assert events[0].event_type == WebhookEventTypeEnum.ORDER_CREATED.value


def test_webhook_create_inactive_app(app_api_client, app, permission_manage_orders):
    app.is_active = False
    app.save()
    query = WEBHOOK_CREATE_BY_APP
    variables = {
        "target_url": "https://www.example.com",
        "events": [WebhookEventTypeEnum.ORDER_CREATED.name],
        "name": "",
    }

    response = app_api_client.post_graphql(
        query, variables=variables, permissions=[permission_manage_orders]
    )
    assert_no_permission(response)


def test_webhook_create_without_app(app_api_client, app):
    app_api_client.app = None
    app_api_client.app_token = None
    query = WEBHOOK_CREATE_BY_APP
    variables = {
        "target_url": "https://www.example.com",
        "events": [WebhookEventTypeEnum.ORDER_CREATED.name],
        "name": "",
    }
    response = app_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)


def test_webhook_create_app_doesnt_exist(app_api_client, app):
    app.delete()

    query = WEBHOOK_CREATE_BY_APP
    variables = {
        "target_url": "https://www.example.com",
        "events": [WebhookEventTypeEnum.ORDER_CREATED.name],
        "name": "",
    }
    response = app_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)


WEBHOOK_CREATE_BY_STAFF = """
    mutation webhookCreate(
        $target_url: String, $events: [WebhookEventTypeEnum], $app: ID){
      webhookCreate(input:{
            targetUrl:$target_url, events:$events, app: $app}){
        errors{
          field
          message
        }
        webhook{
          id
        }
      }
    }
"""


def test_webhook_create_by_staff(
    staff_api_client,
    app,
    permission_manage_apps,
    permission_manage_orders,
):
    query = WEBHOOK_CREATE_BY_STAFF
    app.permissions.add(permission_manage_orders)
    app_id = graphene.Node.to_global_id("App", app.pk)
    variables = {
        "target_url": "https://www.example.com",
        "events": [WebhookEventTypeEnum.ORDER_CREATED.name],
        "app": app_id,
    }
    staff_api_client.user.user_permissions.add(permission_manage_apps)
    response = staff_api_client.post_graphql(query, variables=variables)
    get_graphql_content(response)
    new_webhook = Webhook.objects.get()
    assert new_webhook.target_url == "https://www.example.com"
    assert new_webhook.app == app
    events = new_webhook.events.all()
    assert len(events) == 1
    assert events[0].event_type == WebhookEventTypeEnum.ORDER_CREATED.value


def test_webhook_create_by_staff_with_inactive_app(staff_api_client, app):
    app.is_active = False
    query = WEBHOOK_CREATE_BY_STAFF
    app_id = graphene.Node.to_global_id("App", app.pk)
    variables = {
        "target_url": "https://www.example.com",
        "events": [WebhookEventTypeEnum.ORDER_CREATED.name],
        "app": app_id,
    }
    response = staff_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)
    assert Webhook.objects.count() == 0


def test_webhook_create_by_staff_without_permission(staff_api_client, app):
    query = WEBHOOK_CREATE_BY_STAFF
    app_id = graphene.Node.to_global_id("App", app.pk)
    variables = {
        "target_url": "https://www.example.com",
        "events": [WebhookEventTypeEnum.ORDER_CREATED.name],
        "app": app_id,
    }
    response = staff_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)
    assert Webhook.objects.count() == 0


WEBHOOK_DELETE_BY_APP = """
    mutation webhookDelete($id: ID!){
      webhookDelete(id: $id){
        errors{
          field
          message
          code
        }
      }
    }
"""


def test_webhook_delete_by_app(app_api_client, webhook):
    query = WEBHOOK_DELETE_BY_APP
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {"id": webhook_id}
    response = app_api_client.post_graphql(query, variables=variables)
    get_graphql_content(response)
    assert Webhook.objects.count() == 0


def test_webhook_delete_by_app_and_webhook_assigned_to_other_app(
    app_api_client, webhook
):
    second_app = App.objects.create(name="second")
    webhook.app = second_app
    webhook.save()

    query = WEBHOOK_DELETE_BY_APP
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {"id": webhook_id}
    response = app_api_client.post_graphql(query, variables=variables)
    get_graphql_content(response)

    webhook.refresh_from_db()
    assert Webhook.objects.count() == 1


def test_webhook_delete_by_app_and_missing_webhook(app_api_client, webhook):
    query = WEBHOOK_DELETE_BY_APP
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {"id": webhook_id}
    webhook.delete()

    response = app_api_client.post_graphql(query, variables=variables)
    content = get_graphql_content(response)
    errors = content["data"]["webhookDelete"]["errors"]
    assert errors[0]["code"] == "NOT_FOUND"


def test_webhook_delete_by_inactive_app(app_api_client, webhook):
    app = webhook.app
    app.is_active = False
    app.save()
    query = WEBHOOK_DELETE_BY_APP
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {"id": webhook_id}
    response = app_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)


def test_webhook_delete_when_app_doesnt_exist(app_api_client, app):
    app.delete()

    query = WEBHOOK_DELETE_BY_APP
    webhook_id = graphene.Node.to_global_id("Webhook", 1)
    variables = {"id": webhook_id}
    response = app_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)


WEBHOOK_UPDATE = """
    mutation webhookUpdate(
        $id: ID!, $events: [WebhookEventTypeEnum], $is_active: Boolean){
      webhookUpdate(id: $id, input:{events: $events, isActive: $is_active}){
        errors{
          field
          message
        }
        webhook{
          events{
            eventType
          }
          isActive
        }
      }
    }
"""


def test_webhook_update_not_allowed_by_app(app_api_client, app, webhook):
    query = WEBHOOK_UPDATE
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {
        "id": webhook_id,
        "events": [WebhookEventTypeEnum.ORDER_CREATED.name],
        "is_active": False,
    }
    response = app_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)


@pytest.mark.skip(reason="customer webhooks are not implemented yet")
def test_webhook_update_by_staff(
    staff_api_client, app, webhook, permission_manage_apps
):
    query = WEBHOOK_UPDATE
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {
        "id": webhook_id,
        "events": [
            WebhookEventTypeEnum.CUSTOMER_CREATED.name,
            WebhookEventTypeEnum.CUSTOMER_CREATED.name,
        ],
        "is_active": False,
    }
    staff_api_client.user.user_permissions.add(permission_manage_apps)
    response = staff_api_client.post_graphql(query, variables=variables)
    get_graphql_content(response)
    webhook.refresh_from_db()
    assert webhook.is_active is False
    events = webhook.events.all()
    assert len(events) == 1
    assert events[0].event_type == WebhookEventTypeEnum.CUSTOMER_CREATED.value


@pytest.mark.skip(reason="customer webhooks are not implemented yet")
def test_webhook_update_by_staff_without_permission(staff_api_client, app, webhook):
    query = WEBHOOK_UPDATE
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {
        "id": webhook_id,
        "events": [
            WebhookEventTypeEnum.ORDER_CREATED.name,
            WebhookEventTypeEnum.CUSTOMER_CREATED.name,
        ],
        "is_active": False,
    }
    response = staff_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)


QUERY_WEBHOOK = """
    query webhook($id: ID!){
      webhook(id: $id){
        id
        isActive
        events{
          eventType
        }
      }
    }
"""


def test_query_webhook_by_staff(staff_api_client, webhook, permission_manage_apps):
    query = QUERY_WEBHOOK

    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {"id": webhook_id}
    staff_api_client.user.user_permissions.add(permission_manage_apps)
    response = staff_api_client.post_graphql(query, variables=variables)

    content = get_graphql_content(response)
    webhook_response = content["data"]["webhook"]
    assert webhook_response["id"] == webhook_id
    assert webhook_response["isActive"] == webhook.is_active
    events = webhook.events.all()
    assert len(events) == 1
    assert events[0].event_type == WebhookEventTypeEnum.ORDER_CREATED.value


def test_query_webhook_by_staff_without_permission(staff_api_client, webhook):
    query = QUERY_WEBHOOK
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {"id": webhook_id}
    response = staff_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)


def test_query_webhook_by_app(app_api_client, webhook, permission_manage_apps):
    query = QUERY_WEBHOOK

    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {"id": webhook_id}
    app_api_client.app.permissions.add(permission_manage_apps)
    response = app_api_client.post_graphql(query, variables=variables)

    content = get_graphql_content(response)
    webhook_response = content["data"]["webhook"]
    assert webhook_response["id"] == webhook_id
    assert webhook_response["isActive"] == webhook.is_active
    events = webhook.events.all()
    assert len(events) == 1
    assert events[0].event_type == WebhookEventTypeEnum.ORDER_CREATED.value


def test_query_webhook_by_app_without_permission(app_api_client):
    second_app = App.objects.create(name="Sample app account", is_active=True)
    webhook = Webhook.objects.create(
        app=second_app, target_url="http://www.example.com/test"
    )
    webhook.events.create(event_type="order_created")
    query = QUERY_WEBHOOK
    webhook_id = graphene.Node.to_global_id("Webhook", webhook.pk)
    variables = {"id": webhook_id}
    response = app_api_client.post_graphql(query, variables=variables)
    assert_no_permission(response)


def test_webhook_query_invalid_id(staff_api_client, webhook, permission_manage_apps):
    webhook_id = "'"
    staff_api_client.user.user_permissions.add(permission_manage_apps)
    variables = {
        "id": webhook_id,
    }
    response = staff_api_client.post_graphql(QUERY_WEBHOOK, variables)
    content = get_graphql_content_from_response(response)
    assert len(content["errors"]) == 1
    assert content["errors"][0]["message"] == f"Couldn't resolve id: {webhook_id}."
    assert content["data"]["webhook"] is None


def test_webhook_query_object_with_given_id_does_not_exist(
    staff_api_client, webhook, permission_manage_apps
):
    webhook_id = graphene.Node.to_global_id("Webhook", -1)
    staff_api_client.user.user_permissions.add(permission_manage_apps)
    variables = {"id": webhook_id}
    response = staff_api_client.post_graphql(QUERY_WEBHOOK, variables)
    content = get_graphql_content(response)
    assert content["data"]["webhook"] is None


def test_webhook_with_invalid_object_type(
    staff_api_client, webhook, permission_manage_apps
):
    webhook_id = graphene.Node.to_global_id("Product", webhook.pk)
    staff_api_client.user.user_permissions.add(permission_manage_apps)
    variables = {"id": webhook_id}
    response = staff_api_client.post_graphql(QUERY_WEBHOOK, variables)
    content = get_graphql_content(response)
    assert content["data"]["webhook"] is None


WEBHOOK_EVENTS_QUERY = """
{
  webhookEvents{
    eventType
    name
  }
}
"""


def test_query_webhook_events(staff_api_client, permission_manage_apps):
    query = WEBHOOK_EVENTS_QUERY
    staff_api_client.user.user_permissions.add(permission_manage_apps)
    response = staff_api_client.post_graphql(query)
    content = get_graphql_content(response)
    webhook_events = content["data"]["webhookEvents"]

    # assert len(webhook_events) == len(WebhookEventType.CHOICES)
    assert len(webhook_events) == len(WebhookEventType.LIMITED_CHOICES)


def test_query_webhook_events_without_permissions(staff_api_client):

    query = WEBHOOK_EVENTS_QUERY
    response = staff_api_client.post_graphql(query)
    assert_no_permission(response)


SAMPLE_PAYLOAD_QUERY = """
  query webhookSamplePayload($event_type: WebhookSampleEventTypeEnum!){
    webhookSamplePayload(eventType: $event_type)
  }
"""


@patch("saleor.graphql.webhook.resolvers.payloads.generate_sample_payload")
@pytest.mark.parametrize(
    "event_type, has_access",
    [
        (WebhookSampleEventTypeEnum.ORDER_CREATED, True),
        (WebhookSampleEventTypeEnum.ORDER_CREATED, True),
        (WebhookSampleEventTypeEnum.ORDER_FULLY_PAID, True),
        (WebhookSampleEventTypeEnum.ORDER_UPDATED, True),
        (WebhookSampleEventTypeEnum.ORDER_CANCELLED, True),
        (WebhookSampleEventTypeEnum.ORDER_FULFILLED, True),
        (WebhookSampleEventTypeEnum.CUSTOMER_CREATED, False),
        (WebhookSampleEventTypeEnum.PRODUCT_CREATED, False),
        (WebhookSampleEventTypeEnum.PRODUCT_UPDATED, False),
        (WebhookSampleEventTypeEnum.CHECKOUT_CREATED, False),
        (WebhookSampleEventTypeEnum.CHECKOUT_UPDATED, False),
        (WebhookSampleEventTypeEnum.FULFILLMENT_CREATED, True),
        (WebhookSampleEventTypeEnum.PAGE_CREATED, False),
        (WebhookSampleEventTypeEnum.PAGE_UPDATED, False),
        (WebhookSampleEventTypeEnum.PAGE_DELETED, False),
    ],
)
def test_sample_payload_query_by_app(
    mock_generate_sample_payload,
    event_type,
    has_access,
    app_api_client,
    permission_manage_orders,
):

    mock_generate_sample_payload.return_value = {"mocked_response": ""}
    query = SAMPLE_PAYLOAD_QUERY
    variables = {"event_type": event_type.name}
    response = app_api_client.post_graphql(
        query, variables=variables, permissions=[permission_manage_orders]
    )
    if not has_access:
        assert_no_permission(response)
        mock_generate_sample_payload.assert_not_called()
    else:
        get_graphql_content(response)
        mock_generate_sample_payload.assert_called_with(event_type.value)


@patch("saleor.graphql.webhook.resolvers.payloads.generate_sample_payload")
@pytest.mark.parametrize(
    "event_type, has_access",
    [
        (WebhookSampleEventTypeEnum.ORDER_CREATED, False),
        (WebhookSampleEventTypeEnum.ORDER_CREATED, False),
        (WebhookSampleEventTypeEnum.ORDER_FULLY_PAID, False),
        (WebhookSampleEventTypeEnum.ORDER_UPDATED, False),
        (WebhookSampleEventTypeEnum.ORDER_CANCELLED, False),
        (WebhookSampleEventTypeEnum.ORDER_FULFILLED, False),
        (WebhookSampleEventTypeEnum.CUSTOMER_CREATED, True),
        (WebhookSampleEventTypeEnum.PRODUCT_CREATED, True),
        (WebhookSampleEventTypeEnum.PRODUCT_UPDATED, True),
        (WebhookSampleEventTypeEnum.CHECKOUT_CREATED, True),
        (WebhookSampleEventTypeEnum.CHECKOUT_UPDATED, True),
        (WebhookSampleEventTypeEnum.FULFILLMENT_CREATED, False),
        (WebhookSampleEventTypeEnum.PAGE_CREATED, True),
        (WebhookSampleEventTypeEnum.PAGE_UPDATED, True),
        (WebhookSampleEventTypeEnum.PAGE_DELETED, True),
    ],
)
def test_sample_payload_query_by_staff(
    mock_generate_sample_payload,
    event_type,
    has_access,
    staff_api_client,
    permission_manage_users,
    permission_manage_products,
    permission_manage_checkouts,
    permission_manage_pages,
    permission_manage_staff,
):
    mock_generate_sample_payload.return_value = {"mocked_response": ""}
    query = SAMPLE_PAYLOAD_QUERY
    staff_api_client.user.user_permissions.add(permission_manage_users)
    staff_api_client.user.user_permissions.add(permission_manage_products)
    staff_api_client.user.user_permissions.add(permission_manage_checkouts)
    staff_api_client.user.user_permissions.add(permission_manage_pages)
    staff_api_client.user.user_permissions.add(permission_manage_staff)
    variables = {"event_type": event_type.name}
    response = staff_api_client.post_graphql(query, variables=variables)
    if not has_access:
        assert_no_permission(response)
        mock_generate_sample_payload.assert_not_called()
    else:
        get_graphql_content(response)
        mock_generate_sample_payload.assert_called_with(event_type.value)
