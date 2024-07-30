import graphene
from django.core.exceptions import ValidationError

from ...account.utils import requestor_is_seller, requestor_is_staff_member_or_app
from ...core.exceptions import PermissionDenied
from ...core.permissions import OrderPermissions, PaymentPermissions, ProductPermissions
from ...graphql.core.types.common import DateRangeInput
from ...graphql.core.types.money import Money
from ...graphql.order.enums import OrderStatusFilter
from ...payment.error_codes import PaymentErrorCode
from ..core.enums import ProductErrorCode
from ..core.fields import FilterInputConnectionField
from ..core.utils import from_global_id_or_error
from ..decorators import one_of_permissions_required, permission_required
from ..utils import get_user_or_app_from_context
from .filters import PaymentFilterInput
from .mutations import (
    PaymentCapture,
    PaymentCheckBalance,
    PaymentInitialize,
    PaymentMethodCreate,
    PaymentMethodDelete,
    PaymentMethodUpdate,
    PaymentRefund,
    PaymentVoid,
)
from .resolvers import (
    resolve_payment_by_id,
    resolve_payment_methods,
    resolve_payment_total_average,
    resolve_payment_total_drural_fee,
    resolve_payment_total_fee,
    resolve_payment_total_quantity,
    resolve_payment_total_quantity_refund,
    resolve_payment_total_refunds,
    resolve_payment_total_stripe_fee,
    resolve_payments,
    resolve_payments_total_captured,
    resolve_payments_total_net,
)
from .types import Payment, PaymentMethod


class PaymentQueries(graphene.ObjectType):
    payment = graphene.Field(
        Payment,
        description="Look up a payment by ID.",
        id=graphene.Argument(
            graphene.ID, description="ID of the payment.", required=True
        ),
    )
    payments = FilterInputConnectionField(
        Payment,
        filter=PaymentFilterInput(description="Filtering options for payments."),
        description="List of payments.",
    )
    payment_methods = FilterInputConnectionField(
        PaymentMethod,
        description="List of payment methods.",
    )
    payment_total_refunds = graphene.Field(
        Money,
        description="Return the total refunded amount from a specific period",
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        period=graphene.Argument(DateRangeInput, required=False),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )
    payment_total_captured = graphene.Field(
        Money,
        description="Return the total captured amount from a specific period.",
        period=graphene.Argument(DateRangeInput, required=False),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )
    payment_total_net = graphene.Field(
        Money,
        description="Return the total net amount from a specific period.",
        period=graphene.Argument(DateRangeInput, required=False),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )
    payment_total_fee = graphene.Field(
        Money,
        description="Return the total fee amount from a specific period.",
        period=graphene.Argument(DateRangeInput, required=False),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )
    payment_total_drural_fee = graphene.Field(
        Money,
        description="Return the total dRural fee amount from a specific period.",
        period=graphene.Argument(DateRangeInput, required=False),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )
    payment_total_stripe_fee = graphene.Field(
        Money,
        description="Return the total Stripe fee amount from a specific period.",
        period=graphene.Argument(DateRangeInput, required=False),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )
    payment_total_quantity = graphene.Int(
        description="Return the total sales amount from a specific period.",
        period=graphene.Argument(DateRangeInput, required=False),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )

    payment_total_quantity_refund = graphene.Int(
        description="Return the total refunded amount from a specific period.",
        period=graphene.Argument(DateRangeInput, required=False),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )

    payment_total_average = graphene.Float(
        description="Return the average amount from a specific period.",
        period=graphene.Argument(DateRangeInput, required=False),
        company=graphene.Argument(graphene.ID, description="ID of the company."),
        status=graphene.List(
            OrderStatusFilter,
            required=False,
        ),
        customer_search=graphene.String(
            description="Search by name, last name or email"
        ),
        search=graphene.Argument(graphene.String, description="Filter by order search"),
    )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment(self, info, **data):
        _, id = from_global_id_or_error(data["id"], Payment)
        return resolve_payment_by_id(id)

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payments(self, info, **_kwargs):
        return resolve_payments(info)

    @one_of_permissions_required(
        [ProductPermissions.MANAGE_PRODUCTS, PaymentPermissions.HANDLE_PAYMENTS]
    )
    def resolve_payment_methods(self, info, **_kwargs):
        requestor = get_user_or_app_from_context(info.context)
        is_staff = requestor_is_staff_member_or_app(requestor)
        return resolve_payment_methods(full_access=is_staff)

    def resolve_payment_total_refunds(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)

        if requestor.is_anonymous:
            raise PermissionDenied()
        # Seller cannot get the marketplace stat
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=PaymentErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")

            # Seller cannot get other companies stats
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()
        return resolve_payment_total_refunds(
            info, period, company_id, status, customer_search, search
        )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_total_captured(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()

        if company == "":
            if not requestor.is_staff:
                raise PermissionDenied()

        return resolve_payments_total_captured(
            info,
            period,
            company_id=company_id,
            status=status,
            customer_search=customer_search,
            search=search,
        )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_total_net(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()

        if company == "":
            if not requestor.is_staff:
                raise PermissionDenied()

        return resolve_payments_total_net(
            info,
            period,
            company_id=company_id,
            status=status,
            customer_search=customer_search,
            search=search,
        )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_total_fee(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()

        if company == "":
            if not requestor.is_staff:
                raise PermissionDenied()
        return resolve_payment_total_fee(
            info,
            period,
            company_id=company_id,
            status=status,
            customer_search=customer_search,
            search=search,
        )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_total_drural_fee(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()

        if company == "":
            if not requestor.is_staff:
                raise PermissionDenied()
        return resolve_payment_total_drural_fee(
            info,
            period,
            company_id=company_id,
            status=status,
            customer_search=customer_search,
            search=search,
        )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_total_stripe_fee(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()

        if company == "":
            if not requestor.is_staff:
                raise PermissionDenied()
        return resolve_payment_total_stripe_fee(
            info,
            period,
            company_id=company_id,
            status=status,
            customer_search=customer_search,
            search=search,
        )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_total_quantity(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()
        return resolve_payment_total_quantity(
            info,
            period,
            company_id=company_id,
            status=status,
            customer_search=customer_search,
            search=search,
        )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_total_quantity_refund(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()
        return resolve_payment_total_quantity_refund(
            info,
            period,
            company_id=company_id,
            status=status,
            customer_search=customer_search,
            search=search,
        )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_total_average(
        self,
        info,
        period=None,
        company=None,
        status=None,
        customer_search=None,
        search=None,
    ):
        company_id = None
        requestor = get_user_or_app_from_context(info.context)
        if requestor_is_seller(requestor) and (company is None or company == ""):
            raise ValidationError(
                {
                    "company": ValidationError(
                        "This field is required.", code=ProductErrorCode.REQUIRED
                    )
                }
            )
        if company:
            _, company_id = from_global_id_or_error(company, only_type="CompanyType")
            if not (requestor.is_company_manager(company_id) or requestor.is_staff):
                raise PermissionDenied()
        return resolve_payment_total_average(
            info,
            period,
            company_id=company_id,
            status=status,
            customer_search=customer_search,
            search=search,
        )


class PaymentMutations(graphene.ObjectType):
    payment_capture = PaymentCapture.Field()
    payment_refund = PaymentRefund.Field()
    payment_void = PaymentVoid.Field()
    payment_initialize = PaymentInitialize.Field()
    payment_method_create = PaymentMethodCreate.Field()
    payment_method_update = PaymentMethodUpdate.Field()
    payment_method_delete = PaymentMethodDelete.Field()
    payment_check_balance = PaymentCheckBalance.Field()
