from datetime import date

import graphene
from django.core.exceptions import ValidationError

from ...core.permissions import StatPermissions
from ...graphql.core.types.common import DateTimeRangeInput
from ..core.fields import FilterInputConnectionField
from ..core.utils import from_global_id_or_error
from ..decorators import login_or_app_required, permission_required
from .bulk_mutations import BulkRemoveCompanyAgent
from .filters import CompanyFilterInput
from .mutations import (
    AddCompanyAgent,
    CompanyAddressUpdate,
    CompanyCreate,
    CompanyDisable,
    CompanyEnable,
    CompanyEnbaleStripe,
    CompanyLinkStripeAccount,
    CompanyStripeAccountCreate,
    CompanyUpdate,
    CompanyValidation,
    CompnayChatwootCreate,
    CompnayChatwootUpdate,
    RemoveCompanyAgent,
)
from .resolvers import (
    resolve_companies,
    resolve_company,
    resolve_company_addition_stat,
    resolve_user_companies,
)
from .sorters import CompanySortingInput
from .types import CompanyStat, CompanyType
from .utils import can_manage_companies, has_company_permissions


class CompanyQueries(graphene.ObjectType):
    company = graphene.Field(
        CompanyType,
        id=graphene.ID(
            required=True,
            description="ID of the company.",
        ),
        description="Look up a company by ID",
    )
    companies = FilterInputConnectionField(
        CompanyType,
        filter=CompanyFilterInput(description="Filtering options for companies."),
        sort_by=CompanySortingInput(description="Sort companies."),
        description="List of companies",
    )
    company_addition_stat = graphene.List(
        CompanyStat, period=graphene.Argument(DateTimeRangeInput, required=True)
    )

    def resolve_company(_, info, id):
        _, company_id = from_global_id_or_error(id, only_type=CompanyType)
        company = resolve_company(company_id)
        # A company will be shown to manager or admins OR...
        # If the company is enables and acceptes
        if (
            has_company_permissions(info.context.user, company_id)
            or company.is_enabled
            and company.status == "ACC"
        ):
            return company
        else:
            return None

    @login_or_app_required
    def resolve_companies(_, info, **kwargs):
        if not can_manage_companies(info.context.user):
            return resolve_user_companies(info.context.user)
        return resolve_companies()

    @permission_required(StatPermissions.MANAGE_COMPANY_STATS)
    def resolve_company_addition_stat(self, info, period, **_kwargs):

        if period.lte.date() > date.today():
            raise ValidationError(
                "You can't request stats for future dates.", code="future_stats"
            )

        total_days = period.lte.date() - period.gte.date()
        if total_days.days > 2000:
            raise ValidationError(
                "You can't request more than 2000 days.", code="too_much_entries"
            )
        return resolve_company_addition_stat(period.gte, period.lte)


class CompanyMutations(graphene.ObjectType):
    company_create = CompanyCreate.Field()
    company_update = CompanyUpdate.Field()
    company_address_update = CompanyAddressUpdate.Field()
    company_validation = CompanyValidation.Field()
    company_enable = CompanyEnable.Field()
    company_disable = CompanyDisable.Field()
    add_company_agent = AddCompanyAgent.Field()
    remove_company_agent = RemoveCompanyAgent.Field()
    bulk_remove_company_agent = BulkRemoveCompanyAgent.Field()
    company_chatwoot_create = CompnayChatwootCreate.Field()
    company_chatwoot_update = CompnayChatwootUpdate.Field()
    company_stripe_account_create = CompanyStripeAccountCreate.Field()
    company_link_stripe_account = CompanyLinkStripeAccount.Field()
    company_enable_stripe = CompanyEnbaleStripe.Field()
