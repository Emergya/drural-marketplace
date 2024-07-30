import graphene
from django.db.models.aggregates import Sum
from django.db.models.functions import Coalesce
from django.db.models.query import QuerySet

from ..core.types import SortInputObjectType


class CompanySortField(graphene.Enum):
    NAME = ["public_name", "name", "pk"]
    CREATED_DATE = ["created", "modified", "public_name"]
    STATUS = ["status", "public_name"]
    EMAIL = ["email", "public_name"]
    PHONE = ["phone", "public_name"]
    COUNTRY = ["address__country", "public_name"]
    POSTAL_COCE = ["address__postal_code", "public_name"]
    LOCALITY = ["address__locality", "public_name"]
    ACTIVE_SHOP = ["is_enabled", "public_name"]
    SALES = ["sales", "public_name"]
    RATING = ["rating", "public_name", "name", "pk"]

    @property
    def description(self):
        if self.name in CompanySortField.__enum__._member_names_:
            sort_name = self.name.lower().replace("_", " ")
            return f"Sort companies by {sort_name}."
        raise ValueError("Unsupported enum value: %s" % self.value)

    @staticmethod
    def qs_with_sales(queryset: QuerySet, channel_slug: str) -> QuerySet:
        return queryset.annotate(
            sales=Coalesce(Sum("products__variants__order_lines__quantity"), 0)
        )


class CompanySortingInput(SortInputObjectType):
    class Meta:
        sort_enum = CompanySortField
        type_name = "companies"
