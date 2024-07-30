
import graphene
import pytest

from ....order import OrderStatus
from ....order import models as order_models
from ...tests.utils import (
    assert_no_permission,
    get_graphql_content,
)

from ....order import OrderStatus


from ...tests.utils import (
    assert_no_permission,
    get_graphql_content,

)




MUTATION_DELETE_ORDER_LINES = """
mutation draftOrderLinesBulkDelete($ids: [ID]!) {
    draftOrderLinesBulkDelete(ids: $ids) {
        count
        errors {
            field
            message
        }
    }
}
"""

MUTATION_ORDER_BULK_DELETE = """
mutation DeleteManyOrders($ids: [ID]!) {
    draftOrderBulkDelete(ids: $ids) {
        count
        errors{
            field
            code
        }
    }
}
"""

def test_order_bulk_delete(
    staff_api_client,
    draft_order_list_other_company,
    permission_manage_orders,
):

    orders = draft_order_list_other_company
    variables = {
        "ids": [graphene.Node.to_global_id("Order", order.id) for order in orders],
    }
    response = staff_api_client.post_graphql(
        MUTATION_ORDER_BULK_DELETE, variables, permissions=[permission_manage_orders]
    )
    content = get_graphql_content(response)

    for order in orders:
        with pytest.raises(order._meta.model.DoesNotExist):
            order.refresh_from_db()

def test_order_bulk_delete_by_staff(
    staff_api_client,
    draft_order_list,
    permission_manage_orders,
):
    orders = draft_order_list
    variables = {
        "ids": [graphene.Node.to_global_id("Order", order.id) for order in orders],
    }
    response = staff_api_client.post_graphql(
        MUTATION_ORDER_BULK_DELETE, variables, permissions=[permission_manage_orders]
    )
    content = get_graphql_content(response)

    for order in orders:
        with pytest.raises(order._meta.model.DoesNotExist):
            order.refresh_from_db()

def test_order_bulk_delete_other_company(
    user_api_client,
    draft_order_list_other_company,
    permission_manage_orders,
):
    
    orders = draft_order_list_other_company

    variables = {
        "ids": [graphene.Node.to_global_id("Order", order.id) for order in orders],
    }
    response = user_api_client.post_graphql(
        MUTATION_ORDER_BULK_DELETE, variables, permissions=[permission_manage_orders]
    )
    assert_no_permission(response)

def test_order_bulk_delete_other_company_by_staff(
    staff_api_client,
    draft_order_list_other_company,
    permission_manage_orders,
):
    orders = draft_order_list_other_company

    variables = {
        "ids": [graphene.Node.to_global_id("Order", order.id) for order in orders],
    }
    response = staff_api_client.post_graphql(
        MUTATION_ORDER_BULK_DELETE, variables, permissions=[permission_manage_orders]
    )
    content = get_graphql_content(response)


    for order in orders:
        with pytest.raises(order._meta.model.DoesNotExist):
            order.refresh_from_db()


def test_delete_draft_orders(staff_api_client, order_list, permission_manage_orders):
    order_1, order_2, *orders = order_list
    order_1.status = OrderStatus.DRAFT
    order_2.status = OrderStatus.DRAFT
    order_1.save()
    order_2.save()

    query = """
    mutation draftOrderBulkDelete($ids: [ID]!) {
        draftOrderBulkDelete(ids: $ids) {
            count
        }
    }
    """

    variables = {
        "ids": [graphene.Node.to_global_id("Order", order.id) for order in order_list]
    }
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_orders]
    )
    content = get_graphql_content(response)

    assert content["data"]["draftOrderBulkDelete"]["count"] == 2
    assert not order_models.Order.objects.filter(
        id__in=[order_1.id, order_2.id]
    ).exists()
    assert order_models.Order.objects.filter(
        id__in=[order.id for order in orders]
    ).count() == len(orders)


def test_fail_to_delete_non_draft_order_lines(
    staff_api_client, order_with_lines, permission_manage_orders
):
    order = order_with_lines
    order_lines = [line for line in order.lines.all()]
    # Ensure we cannot delete a non-draft order
    order.status = OrderStatus.CANCELED
    order.save()

    variables = {
        "ids": [
            graphene.Node.to_global_id("OrderLine", order_line.id)
            for order_line in order_lines
        ]
    }
    response = staff_api_client.post_graphql(
        MUTATION_DELETE_ORDER_LINES, variables, permissions=[permission_manage_orders]
    )

    content = get_graphql_content(response)
    assert "errors" in content["data"]["draftOrderLinesBulkDelete"]
    assert content["data"]["draftOrderLinesBulkDelete"]["count"] == 0


def test_delete_draft_order_lines(
    staff_api_client, order_with_lines, permission_manage_orders
):
    order = order_with_lines
    order_lines = [line for line in order.lines.all()]
    # Only lines in draft order can be deleted
    order.status = OrderStatus.DRAFT
    order.save()

    variables = {
        "ids": [
            graphene.Node.to_global_id("OrderLine", order_line.id)
            for order_line in order_lines
        ]
    }

    response = staff_api_client.post_graphql(
        MUTATION_DELETE_ORDER_LINES, variables, permissions=[permission_manage_orders]
    )
    content = get_graphql_content(response)

    assert content["data"]["draftOrderLinesBulkDelete"]["count"] == 2
    assert not order_models.OrderLine.objects.filter(
        id__in=[order_line.pk for order_line in order_lines]
    ).exists()


def test_delete_draft_order_lines_other_company(
    user_api_client, order_with_lines_other_company, permission_manage_orders
):
    order = order_with_lines_other_company
    order_lines = [line for line in order.lines.all()]
    # Only lines in draft order can be deleted
    order.status = OrderStatus.DRAFT
    order.save()

    variables = {
        "ids": [
            graphene.Node.to_global_id("OrderLine", order_line.id)
            for order_line in order_lines
        ]
    }

    response = user_api_client.post_graphql(
        MUTATION_DELETE_ORDER_LINES, variables, permissions=[permission_manage_orders]
    )
    assert_no_permission(response)

def test_delete_draft_order_lines_other_company_by_staff(
    staff_api_client, order_with_lines_other_company, permission_manage_orders
):
    order = order_with_lines_other_company
    order_lines = [line for line in order.lines.all()]
    # Only lines in draft order can be deleted
    order.status = OrderStatus.DRAFT
    order.save()

    variables = {
        "ids": [
            graphene.Node.to_global_id("OrderLine", order_line.id)
            for order_line in order_lines
        ]
    }

    response = staff_api_client.post_graphql(
        MUTATION_DELETE_ORDER_LINES, variables, permissions=[permission_manage_orders]
    )
    content = get_graphql_content(response)

    assert content["data"]["draftOrderLinesBulkDelete"]["count"] == 2
    assert not order_models.OrderLine.objects.filter(
        id__in=[order_line.pk for order_line in order_lines]
    ).exists()