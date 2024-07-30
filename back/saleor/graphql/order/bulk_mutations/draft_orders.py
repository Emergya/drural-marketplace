import graphene
from django.core.exceptions import ValidationError

from ....core.permissions import OrderPermissions
from ....order import OrderStatus, models
from ....order.error_codes import OrderErrorCode
from ...core.mutations import ModelBulkDeleteMutation
from ...core.types.common import OrderError
from ....product import models as product_models
from ....company.models import Company
from ....core.exceptions import PermissionDenied
from ...utils import get_user_or_app_from_context

class DraftOrderBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="List of draft order IDs to delete."
        )

    class Meta:
        description = "Deletes draft orders."
        model = models.Order
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_instance(cls, info, instance):
        requestor = get_user_or_app_from_context(info.context)

        if instance.status != OrderStatus.DRAFT:
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Cannot delete non-draft orders.",
                        code=OrderErrorCode.CANNOT_DELETE,
                    )
                }
            )
        
        companies_ids = set([line.variant.product.company.id for line in instance.lines.all()])        
        is_your_company = map(requestor.is_company_manager, companies_ids)
        
        if not all(is_your_company) and not requestor.is_staff:
            raise PermissionDenied()


class DraftOrderLinesBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="List of order lines IDs to delete."
        )

    class Meta:
        description = "Deletes order lines."
        model = models.OrderLine
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderError
        error_type_field = "order_errors"

    @classmethod
    def clean_instance(cls, _info, instance):
        requestor = get_user_or_app_from_context(_info.context)

        if instance.order.status != OrderStatus.DRAFT:
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Cannot delete line for non-draft orders.",
                        code=OrderErrorCode.CANNOT_DELETE,
                    )
                }
            )
        
        companies_ids = set([line.variant.product.company.id for line in instance.order.lines.all()])        
        is_your_company = map(requestor.is_company_manager, companies_ids)
        
        if not all(is_your_company) and not requestor.is_staff:
            raise PermissionDenied()
