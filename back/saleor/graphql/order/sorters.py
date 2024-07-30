from decimal import Decimal

import graphene
from django.db.models import (
    Case,
    CharField,
    DecimalField,
    ExpressionWrapper,
    OuterRef,
    QuerySet,
    Subquery,
    When,
)

from ...payment import ChargeStatus
from ...payment.models import Payment
from ..core.types import SortInputObjectType


class OrderSortField(graphene.Enum):
    NUMBER = ["pk"]
    CREATION_DATE = ["created", "status", "pk"]
    CUSTOMER = ["billing_address__last_name", "billing_address__first_name", "pk"]
    PAYMENT = ["last_charge_status", "status", "pk"]
    DRURAL_FEE = ["drural_fee", "pk"]
    STRIPE_FEE = ["stripe_fee", "pk"]
    TOTAL_SELLER = ["total_seller", "pk"]
    TOTAL = ["total_payment", "pk"]
    TOTAL_FEE = ["total_fee", "pk"]
    REFUNDED_AMOUNT = ["refunded_amount", "pk"]
    CAPTURED_AMOUNT = ["captured_amount", "pk"]
    FULFILLMENT_STATUS = ["status", "user_email", "pk"]
    BOOKING_DATE = ["booking__sart_date", "pk"]
    BOOKABLE_RESOURCE_NAME = ["booking__bookable_resource__name", "pk"]

    @property
    def description(self):
        if self.name in OrderSortField.__enum__._member_names_:
            sort_name = self.name.lower().replace("_", " ")
            return f"Sort orders by {sort_name}."
        raise ValueError("Unsupported enum value: %s" % self.value)

    @staticmethod
    def qs_with_payment(queryset: QuerySet, **_kwargs) -> QuerySet:
        subquery = Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("charge_status")[:1]
        )
        return queryset.annotate(
            last_charge_status=ExpressionWrapper(subquery, output_field=CharField())
        )

    @staticmethod
    def qs_with_drural_fee(queryset: QuerySet, **_kwargs) -> QuerySet:
        subquery = Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("drural_fee")[:1]
        )
        return queryset.annotate(
            drural_fee=ExpressionWrapper(subquery, output_field=DecimalField())
        )

    @staticmethod
    def qs_with_stripe_fee(queryset: QuerySet, **_kwargs) -> QuerySet:
        subquery = Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("stripe_fee")[:1]
        )
        return queryset.annotate(
            stripe_fee=ExpressionWrapper(subquery, output_field=DecimalField())
        )

    @staticmethod
    def qs_with_total_fee(queryset: QuerySet, **_kwargs) -> QuerySet:

        subquery = Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("stripe_fee")[:1]
        )
        # subtract the fields 'captured_amount' and 'drural_fee' from the subquery
        subquery = subquery + Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("drural_fee")[:1]
        )
        return queryset.annotate(
            total_fee=ExpressionWrapper(subquery, output_field=DecimalField())
        )

    @staticmethod
    def qs_with_total_seller(queryset: QuerySet, **_kwargs) -> QuerySet:

        subquery = Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("captured_amount")[:1]
        )
        # subtract the fields 'captured_amount' and 'drural_fee' from the subquery
        subquery = subquery - Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("drural_fee")[:1]
        )
        return queryset.annotate(
            total_seller=ExpressionWrapper(subquery, output_field=DecimalField())
        )

    @staticmethod
    def qs_with_total(queryset: QuerySet, **_kwargs) -> QuerySet:
        subquery = Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("total")[:1]
        )
        return queryset.annotate(
            total_payment=ExpressionWrapper(subquery, output_field=DecimalField())
        )

    @staticmethod
    def qs_with_refunded_amount(queryset: QuerySet, **_kwargs) -> QuerySet:
        subquery = Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("total")[:1]
        )
        # subtract the fields 'total' and 'captured_amount' from the subquery
        subquery = subquery - Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("captured_amount")[:1]
        )
        return queryset.annotate(
            refunded_amount=Case(
                When(
                    payments__charge_status__in=[
                        ChargeStatus.FULLY_REFUNDED,
                        ChargeStatus.PARTIALLY_REFUNDED,
                    ],
                    then=ExpressionWrapper(subquery, output_field=DecimalField()),
                ),
                default=Decimal(0),
            )
        )

    @staticmethod
    def qs_with_captured_amount(queryset: QuerySet, **_kwargs) -> QuerySet:
        subquery = Subquery(
            Payment.objects.filter(order_id=OuterRef("pk"))
            .order_by("-pk")
            .values_list("captured_amount")[:1]
        )
        return queryset.annotate(
            captured_amount=ExpressionWrapper(subquery, output_field=DecimalField())
        )


class OrderSortingInput(SortInputObjectType):
    class Meta:
        sort_enum = OrderSortField
        type_name = "orders"
