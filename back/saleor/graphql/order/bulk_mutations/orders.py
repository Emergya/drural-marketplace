import graphene

from ....core.permissions import OrderPermissions
from ....order import models
from ....order.actions import cancel_order
from ...core.mutations import BaseBulkMutation
from ...core.types.common import OrderError
from ..mutations.orders import clean_order_cancel
from ...utils import get_user_or_app_from_context
from ....core.exceptions import PermissionDenied
from ..utils import validate_order_expired_reservation


class OrderBulkCancel(BaseBulkMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="List of orders IDs to cancel."
        )

    class Meta:
        description = "Cancels orders."
        model = models.Order
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_instance(cls, info, instance):
        clean_order_cancel(instance)
        requestor = get_user_or_app_from_context(info.context)
        companies_ids = set([line.variant.product.company.id for line in instance.lines.all()])

        is_your_company = map(requestor.is_company_manager, companies_ids)
        # app have permission manage orders
        if not all(is_your_company) and not requestor.is_staff and not requestor == instance.user:
            raise PermissionDenied()

        
    @classmethod
    def bulk_action(cls, info, queryset):
        requestor = get_user_or_app_from_context(info.context)
        for order in queryset:
            validate_order_expired_reservation(requestor, order)
            cancel_order(
                order=order,
                user=info.context.user,
                app=info.context.app,
                manager=info.context.plugins,
            )
