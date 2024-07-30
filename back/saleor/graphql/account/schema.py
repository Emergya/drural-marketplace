from datetime import date

import graphene
from django.core.exceptions import ValidationError

from ...account.utils import requestor_is_staff_member_or_app
from ...core.exceptions import PermissionDenied
from ...core.permissions import AccountPermissions, StatPermissions
from ...core.tracing import traced_resolver
from ..core.fields import FilterInputConnectionField
from ..core.types import FilterInputObjectType
from ..core.types.common import DateTimeRangeInput
from ..core.utils import from_global_id_or_error
from ..core.validators import validate_one_of_args_is_in_query
from ..decorators import one_of_permissions_required, permission_required
from .bulk_mutations import CustomerBulkDelete, StaffBulkDelete, UserBulkSetActive
from .enums import CountryCodeEnum
from .filters import (
    AgentUserFilter,
    CustomerFilter,
    PermissionGroupFilter,
    StaffUserFilter,
)
from .mutations.account import (
    AccountAddressCreate,
    AccountAddressDelete,
    AccountAddressUpdate,
    AccountDelete,
    AccountRegister,
    AccountRequestDeletion,
    AccountSetDefaultAddress,
    AccountUpdate,
    ConfirmEmailChange,
    RequestEmailChange,
    SetAccountCategoriesPreferences,
    SetAccountLocationPreferences,
)
from .mutations.authentication import (
    CreateToken,
    DeactivateAllUserTokens,
    ExternalAuthenticationUrl,
    ExternalLogout,
    ExternalObtainAccessTokens,
    ExternalRefresh,
    ExternalVerify,
    RefreshToken,
    VerifyToken,
)
from .mutations.base import (
    ConfirmAccount,
    PasswordChange,
    RequestPasswordReset,
    SetPassword,
)
from .mutations.permission_group import (
    PermissionGroupCreate,
    PermissionGroupDelete,
    PermissionGroupUpdate,
)
from .mutations.staff import (
    AddressCreate,
    AddressDelete,
    AddressSetDefault,
    AddressUpdate,
    CustomerCreate,
    CustomerDelete,
    CustomerUpdate,
    StaffCreate,
    StaffDelete,
    StaffUpdate,
    UserAvatarDelete,
    UserAvatarUpdate,
)
from .resolvers import (
    resolve_active_user_quantity_stat,
    resolve_address,
    resolve_address_validation_rules,
    resolve_agent_user_details,
    resolve_agent_users,
    resolve_customers,
    resolve_permission_group,
    resolve_permission_groups,
    resolve_registered_user_quantity_stat,
    resolve_staff_users,
    resolve_user,
    resolve_user_quantity_stat,
)
from .sorters import PermissionGroupSortingInput, UserSortingInput
from .types import Address, AddressValidationData, Group, User, UserStat


class CustomerFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = CustomerFilter


class PermissionGroupFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = PermissionGroupFilter


class StaffUserInput(FilterInputObjectType):
    class Meta:
        filterset_class = StaffUserFilter


class AgentUserInput(StaffUserInput):
    class Meta:
        filterset_class = AgentUserFilter
        exclude = ["is_staff", "is_superuser"]


class AccountQueries(graphene.ObjectType):
    address_validation_rules = graphene.Field(
        AddressValidationData,
        description="Returns address validation rules.",
        country_code=graphene.Argument(
            CountryCodeEnum,
            description="Two-letter ISO 3166-1 country code.",
            required=True,
        ),
        country_area=graphene.Argument(
            graphene.String, description="Designation of a region, province or state."
        ),
        city=graphene.Argument(graphene.String, description="City or a town name."),
        city_area=graphene.Argument(
            graphene.String, description="Sublocality like a district."
        ),
    )
    address = graphene.Field(
        Address,
        id=graphene.Argument(
            graphene.ID, description="ID of an address.", required=True
        ),
        description="Look up an address by ID.",
    )
    customers = FilterInputConnectionField(
        User,
        filter=CustomerFilterInput(description="Filtering options for customers."),
        sort_by=UserSortingInput(description="Sort customers."),
        description="List of the shop's customers.",
    )
    permission_groups = FilterInputConnectionField(
        Group,
        filter=PermissionGroupFilterInput(
            description="Filtering options for permission groups."
        ),
        sort_by=PermissionGroupSortingInput(description="Sort permission groups."),
        description="List of permission groups.",
    )
    permission_group = graphene.Field(
        Group,
        id=graphene.Argument(
            graphene.ID, description="ID of the group.", required=True
        ),
        description="Look up permission group by ID.",
    )
    me = graphene.Field(User, description="Return the currently authenticated user.")
    staff_users = FilterInputConnectionField(
        User,
        filter=StaffUserInput(description="Filtering options for staff users."),
        sort_by=UserSortingInput(description="Sort staff users."),
        description="List of the shop's staff users.",
    )
    user = graphene.Field(
        User,
        id=graphene.Argument(graphene.ID, description="ID of the user."),
        email=graphene.Argument(
            graphene.String, description="Email address of the user."
        ),
        description="Look up a user by ID or email address.",
    )

    agent_users = FilterInputConnectionField(
        User,
        company=graphene.Argument(
            graphene.ID, description="ID of the company.", required=True
        ),
        filter=AgentUserInput(description="Filtering options for agent users."),
        sort_by=UserSortingInput(description="Sort agent users."),
        description="List of the shop's agent users.",
    )

    agent_user_details = graphene.Field(
        User,
        id=graphene.Argument(graphene.ID, description="ID of the user."),
        email=graphene.Argument(
            graphene.String, description="Email address of the user."
        ),
        description="Look up a user by ID or email address.",
    )

    user_quantity_stat = graphene.List(
        UserStat,
        period=graphene.Argument(DateTimeRangeInput, required=True),
        description="The accumulative number of users by date.",
    )

    registered_user_quantity_stat = graphene.List(
        UserStat,
        period=graphene.Argument(DateTimeRangeInput, required=True),
        description="The number of new registered users by date.",
    )

    active_user_quantity_stat = graphene.List(
        UserStat,
        period=graphene.Argument(DateTimeRangeInput, required=True),
        description="The number of users who log in by date.",
    )

    def resolve_address_validation_rules(
        self, info, country_code, country_area=None, city=None, city_area=None
    ):
        return resolve_address_validation_rules(
            info,
            country_code,
            country_area=country_area,
            city=city,
            city_area=city_area,
        )

    @permission_required(AccountPermissions.MANAGE_USERS)
    def resolve_customers(self, info, **kwargs):
        requestor = info.context.user
        return resolve_customers(info, requestor, **kwargs)

    @permission_required(AccountPermissions.MANAGE_STAFF)
    def resolve_permission_groups(self, info, **kwargs):
        return resolve_permission_groups(info, **kwargs)

    @permission_required(AccountPermissions.MANAGE_STAFF)
    def resolve_permission_group(self, info, id):
        _, id = from_global_id_or_error(id, Group)
        return resolve_permission_group(id)

    def resolve_me(self, info):
        user = info.context.user
        return user if user.is_authenticated else None

    @permission_required(AccountPermissions.MANAGE_STAFF)
    def resolve_staff_users(self, info, **kwargs):
        return resolve_staff_users(info, **kwargs)

    @permission_required(AccountPermissions.MANAGE_USERS)
    def resolve_agent_users(self, info, **kwargs):
        return resolve_agent_users(info, **kwargs)

    @one_of_permissions_required(
        [AccountPermissions.MANAGE_STAFF, AccountPermissions.MANAGE_USERS]
    )
    def resolve_user(self, info, id=None, email=None):
        validate_one_of_args_is_in_query("id", id, "email", email)
        return resolve_user(info, id, email)

    @one_of_permissions_required([AccountPermissions.MANAGE_USERS])
    def resolve_agent_user_details(self, info, id=None, email=None):
        validate_one_of_args_is_in_query("id", id, "email", email)
        return resolve_agent_user_details(info, id, email)

    def resolve_address(self, info, id):
        return resolve_address(info, id)

    @permission_required(StatPermissions.MANAGE_USER_STATS)
    @traced_resolver
    def resolve_user_quantity_stat(self, info, period, **_kwargs):
        requestor = info.context.user
        if requestor_is_staff_member_or_app(requestor):
            total_days = period.lte - period.gte
            if total_days.days > 2000:
                raise ValidationError(
                    "You can't request more than 2000 days.", code="too_much_entries"
                )
            if period.lte.date() > date.today():
                raise ValidationError(
                    "You can't request stats for future dates.", code="future_stats"
                )
            return resolve_user_quantity_stat(info, period.gte, period.lte)
        else:
            raise PermissionDenied

    @permission_required(StatPermissions.MANAGE_USER_STATS)
    def resolve_registered_user_quantity_stat(self, info, period, **_kwargs):
        requestor = info.context.user
        if requestor_is_staff_member_or_app(requestor):
            total_days = period.lte - period.gte
            if total_days.days > 2000:
                raise ValidationError(
                    "You can't request more than 2000 days.", code="too_much_entries"
                )
            if period.lte.date() > date.today():
                raise ValidationError(
                    "You can't request stats for future dates.", code="future_stats"
                )
            return resolve_registered_user_quantity_stat(info, period.gte, period.lte)
        else:
            raise PermissionDenied

    @permission_required(StatPermissions.MANAGE_USER_STATS)
    def resolve_active_user_quantity_stat(self, info, period, **_kwargs):
        requestor = info.context.user
        if requestor_is_staff_member_or_app(requestor):
            total_days = period.lte - period.gte
            if total_days.days > 2000:
                raise ValidationError(
                    "You can't request more than 2000 days.", code="too_much_entries"
                )
            if period.lte.date() > date.today():
                raise ValidationError(
                    "You can't request stats for future dates.", code="future_stats"
                )
            return resolve_active_user_quantity_stat(info, period.gte, period.lte)
        else:
            raise PermissionDenied


class AccountMutations(graphene.ObjectType):
    # Base mutations
    token_create = CreateToken.Field()
    token_refresh = RefreshToken.Field()
    token_verify = VerifyToken.Field()
    tokens_deactivate_all = DeactivateAllUserTokens.Field()

    external_authentication_url = ExternalAuthenticationUrl.Field()
    external_obtain_access_tokens = ExternalObtainAccessTokens.Field()

    external_refresh = ExternalRefresh.Field()
    external_logout = ExternalLogout.Field()
    external_verify = ExternalVerify.Field()

    request_password_reset = RequestPasswordReset.Field()
    confirm_account = ConfirmAccount.Field()
    set_password = SetPassword.Field()
    password_change = PasswordChange.Field()
    request_email_change = RequestEmailChange.Field()
    confirm_email_change = ConfirmEmailChange.Field()

    # Account mutations
    account_address_create = AccountAddressCreate.Field()
    account_address_update = AccountAddressUpdate.Field()
    account_address_delete = AccountAddressDelete.Field()
    account_set_default_address = AccountSetDefaultAddress.Field()

    account_register = AccountRegister.Field()
    account_update = AccountUpdate.Field()
    account_request_deletion = AccountRequestDeletion.Field()
    account_delete = AccountDelete.Field()

    set_account_categories_preferences = SetAccountCategoriesPreferences.Field()
    set_account_location_preferences = SetAccountLocationPreferences.Field()

    # Staff mutations
    address_create = AddressCreate.Field()
    address_update = AddressUpdate.Field()
    address_delete = AddressDelete.Field()
    address_set_default = AddressSetDefault.Field()

    customer_create = CustomerCreate.Field()
    customer_update = CustomerUpdate.Field()
    customer_delete = CustomerDelete.Field()
    customer_bulk_delete = CustomerBulkDelete.Field()

    staff_create = StaffCreate.Field()
    staff_update = StaffUpdate.Field()
    staff_delete = StaffDelete.Field()
    staff_bulk_delete = StaffBulkDelete.Field()

    user_avatar_update = UserAvatarUpdate.Field()
    user_avatar_delete = UserAvatarDelete.Field()
    user_bulk_set_active = UserBulkSetActive.Field()

    # Permission group mutations
    permission_group_create = PermissionGroupCreate.Field()
    permission_group_update = PermissionGroupUpdate.Field()
    permission_group_delete = PermissionGroupDelete.Field()
