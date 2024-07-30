import django_filters
from django.db.models import Q

from ...company import models
from ..core.filters import ListObjectTypeFilter, MetadataFilterBase, ObjectTypeFilter
from ..core.types import FilterInputObjectType
from ..core.types.common import DateTimeRangeInput
from ..utils.filters import filter_by_query_param, filter_range_field
from .inputs import CompanyStatusEnum, FilterAddressInput


def filter_company_search(qs, _, value):
    search_fields = ("name", "public_name", "description")
    if value:
        qs = filter_by_query_param(qs, value.strip(), search_fields)
    return qs


def filter_company_status(qs, _, values):
    if values:
        qs = qs.filter(status__in=values)
    return qs


def filter_company_created_date(qs, _, value):
    return filter_range_field(qs, "created", value)


def filter_company_address(qs, _, values):
    if values:
        query_by = [
            Q(**{f"address__{data['field']}__icontains": data["value"].strip()})
            for data in values
        ]
        qs = qs.filter(*query_by)
    return qs


def filter_company_consumption(qs, _, value):
    return filter_range_field(
        qs, "products__variants__order_lines__order__created", value
    )


class CompanyFilter(MetadataFilterBase):
    search = django_filters.CharFilter(method=filter_company_search)
    status = ListObjectTypeFilter(
        input_class=CompanyStatusEnum, method=filter_company_status
    )
    created_date = ObjectTypeFilter(
        input_class=DateTimeRangeInput, method=filter_company_created_date
    )
    address = ListObjectTypeFilter(
        input_class=FilterAddressInput, method=filter_company_address
    )
    consumption = ObjectTypeFilter(
        input_class=DateTimeRangeInput, method=filter_company_consumption
    )

    class Meta:
        model = models.Company
        fields = (
            "search",
            "status",
            "is_enabled",
            "created_date",
            "address",
        )


class CompanyFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = CompanyFilter
