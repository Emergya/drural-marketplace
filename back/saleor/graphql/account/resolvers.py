from datetime import timedelta
from itertools import chain
from typing import Optional

from django.contrib.auth import models as auth_models
from django.db.models import Q
from django.db.models.aggregates import Count
from django.db.models.functions.datetime import TruncDate
from i18naddress import get_validation_rules

from ...account import models
from ...core.exceptions import PermissionDenied
from ...core.permissions import AccountPermissions
from ...core.tracing import traced_resolver
from ...payment import gateway
from ...payment.utils import fetch_customer_id
from ..core.utils import from_global_id_or_error
from ..utils import format_permissions_for_display, get_user_or_app_from_context
from .types import Address, AddressValidationData, ChoiceValue, User
from .utils import (
    get_allowed_fields_camel_case,
    get_required_fields_camel_case,
    get_upper_fields_camel_case,
    get_user_permissions,
)

USER_SEARCH_FIELDS = (
    "email",
    "first_name",
    "last_name",
    "default_shipping_address__first_name",
    "default_shipping_address__last_name",
    "default_shipping_address__city",
    "default_shipping_address__country",
)


def resolve_customers(info, requestor, **_kwargs):
    if requestor.is_staff:
        return models.User.objects.customers()
    return models.User.objects.seller_customers(requestor)


def resolve_permission_group(id):
    return auth_models.Group.objects.filter(id=id).first()


def resolve_permission_groups(info, **_kwargs):
    return auth_models.Group.objects.all()


def resolve_staff_users(info, **_kwargs):
    return models.User.objects.staff()


def resolve_agent_users(info, **_kwargs):
    requestor = get_user_or_app_from_context(info.context)
    _, company_id = from_global_id_or_error(_kwargs["company"], only_type="CompanyType")

    if not requestor.is_company_manager(company_id) and not requestor.is_staff:
        raise PermissionDenied()

    return models.User.objects.filter(companies=company_id).exclude(
        email=requestor.email
    )


@traced_resolver
def resolve_user(info, id=None, email=None):
    requester = get_user_or_app_from_context(info.context)

    # get todas las orders de las compañias que tenga el usuaro que realiza la peticion
    orders = models.Order.objects.filter(
        lines__variant__product__company__in=requester.companies.all()
    )

    if requester:
        filter_kwargs = {}
        if id:
            _model, filter_kwargs["pk"] = from_global_id_or_error(id, User)
            is_my_customer = orders.filter(user_id=filter_kwargs["pk"]).exists()
            if filter_kwargs["pk"]:
                is_me = int(filter_kwargs["pk"]) == requester.id
        if email:
            filter_kwargs["email"] = email
            is_my_customer = orders.filter(user__email=email).exists()
            is_me = requester.email == email
        # Quizas debe quitarse el is staff
        if requester.has_perms(
            [AccountPermissions.MANAGE_STAFF, AccountPermissions.MANAGE_USERS]
        ):
            return models.User.objects.filter(**filter_kwargs).first()
        if requester.has_perm(AccountPermissions.MANAGE_STAFF):
            return models.User.objects.staff().filter(**filter_kwargs).first()
        # comprobamos que el usuario sea el cliente de alguna de las orders.
        if (
            requester.has_perm(AccountPermissions.MANAGE_USERS)
            and is_my_customer
            or requester.is_staff
            or is_me
        ):
            return models.User.objects.customers().filter(**filter_kwargs).first()
    return PermissionDenied()


@traced_resolver
def resolve_agent_user_details(info, id=None, email=None):
    requestor = get_user_or_app_from_context(info.context)

    if requestor:
        filter_kwargs = {}
        if id:
            _model, filter_kwargs["pk"] = from_global_id_or_error(id, User)
        if email:
            filter_kwargs["email"] = email

        user = models.User.objects.filter(**filter_kwargs).first()
        if user:
            companies_ids = set([company.id for company in user.companies.all()])
            is_agent_of_company = map(requestor.is_company_manager, companies_ids)

            if user.is_seller and any(is_agent_of_company) or requestor.is_staff:
                return models.User.objects.filter(**filter_kwargs).first()

    return PermissionDenied()


@traced_resolver
def resolve_users(info, ids=None, emails=None):
    requester = get_user_or_app_from_context(info.context)
    if not requester:
        return models.User.objects.none()

    if requester.has_perms(
        [AccountPermissions.MANAGE_STAFF, AccountPermissions.MANAGE_USERS]
    ):
        qs = models.User.objects
    elif requester.has_perm(AccountPermissions.MANAGE_STAFF):
        qs = models.User.objects.staff()
    elif requester.has_perm(AccountPermissions.MANAGE_USERS):
        qs = models.User.objects.customers()
    elif requester.id:
        # If user has no access to all users, we can only return themselves, but
        # only if they are authenticated and one of requested users
        qs = models.User.objects.filter(id=requester.id)
    else:
        qs = models.User.objects.none()

    if ids:
        ids = {from_global_id_or_error(id, User, raise_error=True)[1] for id in ids}

    if ids and emails:
        return qs.filter(Q(id__in=ids) | Q(email__in=emails))
    elif ids:
        return qs.filter(id__in=ids)
    return qs.filter(email__in=emails)


@traced_resolver
def resolve_address_validation_rules(
    info,
    country_code: str,
    country_area: Optional[str],
    city: Optional[str],
    city_area: Optional[str],
):

    params = {
        "country_code": country_code,
        "country_area": country_area,
        "city": city,
        "city_area": city_area,
    }
    rules = get_validation_rules(params)
    return AddressValidationData(
        country_code=rules.country_code,
        country_name=rules.country_name,
        address_format=rules.address_format,
        address_latin_format=rules.address_latin_format,
        allowed_fields=get_allowed_fields_camel_case(rules.allowed_fields),
        required_fields=get_required_fields_camel_case(rules.required_fields),
        upper_fields=get_upper_fields_camel_case(rules.upper_fields),
        country_area_type=rules.country_area_type,
        country_area_choices=[
            ChoiceValue(area[0], area[1]) for area in rules.country_area_choices
        ],
        city_type=rules.city_type,
        city_choices=[ChoiceValue(area[0], area[1]) for area in rules.city_choices],
        city_area_type=rules.city_area_type,
        city_area_choices=[
            ChoiceValue(area[0], area[1]) for area in rules.city_area_choices
        ],
        postal_code_type=rules.postal_code_type,
        postal_code_matchers=[
            compiled.pattern for compiled in rules.postal_code_matchers
        ],
        postal_code_examples=rules.postal_code_examples,
        postal_code_prefix=rules.postal_code_prefix,
    )


@traced_resolver
def resolve_payment_sources(info, user: models.User, channel_slug: str):
    manager = info.context.plugins
    stored_customer_accounts = (
        (gtw.id, fetch_customer_id(user, gtw.id))
        for gtw in gateway.list_gateways(manager, channel_slug)
    )
    return list(
        chain(
            *[
                prepare_graphql_payment_sources_type(
                    gateway.list_payment_sources(
                        gtw, customer_id, manager, channel_slug
                    )
                )
                for gtw, customer_id in stored_customer_accounts
                if customer_id is not None
            ]
        )
    )


def prepare_graphql_payment_sources_type(payment_sources):
    sources = []
    for src in payment_sources:
        sources.append(
            {
                "gateway": src.gateway,
                "payment_method_id": src.id,
                "credit_card_info": {
                    "last_digits": src.credit_card_info.last_4,
                    "exp_year": src.credit_card_info.exp_year,
                    "exp_month": src.credit_card_info.exp_month,
                    "brand": src.credit_card_info.brand,
                    "first_digits": src.credit_card_info.first_4,
                },
            }
        )
    return sources


@traced_resolver
def resolve_address(info, id):
    user = info.context.user
    app = info.context.app
    _model, address_pk = from_global_id_or_error(id, Address)
    if app and app.has_perm(AccountPermissions.MANAGE_USERS) or user.is_staff:
        return models.Address.objects.filter(pk=address_pk).first()
    if user and not user.is_anonymous:
        return user.addresses.filter(id=address_pk).first()
    raise PermissionDenied()


@traced_resolver
def resolve_user_quantity_stat(info, start_date, end_date):
    # This method will return the accumulative number of users by date.
    # Number of users registered before the start_date
    users_before = models.User.objects.filter(
        date_joined__lt=(start_date), is_active=True
    ).count()

    data = (
        models.User.objects.filter(
            date_joined__date__range=(start_date, end_date), is_active=True
        )
        # Annotate a new field date with the date format
        .annotate(date=TruncDate("date_joined"))
        # Group by value "date"
        .values("date")
        # Orders by date
        .order_by("date")
        # Annotate as total the count of users of the given date
        .annotate(**{"total": Count("date")})
        # Groups by date with its total
        .values("date", "total")
    )
    # Acumulating number of users from the start to the end date
    response = []
    date = start_date.date()
    index = 0
    while date <= end_date.date():
        if len(data) != 0 and date == data[index].get("date"):
            # Update current number of users if it is required
            users_before = users_before + data[index].get("total")
            if index < len(data) - 1:
                index = index + 1
        # Add the new entry to the response list
        new_entry = {
            "date": date,
            "total": users_before,
        }
        response.append(new_entry)
        date = date + timedelta(days=1)
    return response


@traced_resolver
def resolve_registered_user_quantity_stat(info, start_date, end_date):
    # This method will return the number of new registered users by date.

    data = (
        models.User.objects.filter(
            date_joined__range=(start_date, end_date), is_active=True
        )
        .annotate(date=TruncDate("date_joined"))
        .values("date")
        .order_by("date")
        .annotate(**{"total": Count("date")})
        .values("date", "total")
    )
    # Acumulating number of users from the start to the end date
    response = []
    date = start_date.date()
    index = 0
    users = 0
    while date <= end_date.date():
        if len(data) != 0 and date == data[index].get("date"):
            # Update current number of users if it is required
            users = data[index].get("total")
            if index < len(data) - 1:
                index = index + 1
        else:
            users = 0

        # Add the new entry to the response list
        new_entry = {
            "date": date,
            "total": users,
        }
        response.append(new_entry)
        date = date + timedelta(days=1)
    return response


@traced_resolver
def resolve_active_user_quantity_stat(info, start_date, end_date):
    # This method will return the number of users who log in by date.

    data = (
        models.CustomerEvent.objects.filter(
            type="logged_in", date__date__range=(start_date, end_date)
        )
        .annotate(simple_date=TruncDate("date"))
        .values("simple_date")
        .order_by("simple_date")
        .annotate(**{"total": Count("simple_date")})
        .values("simple_date", "total")
    )
    # Acumulating number of users from the start to the end date
    response = []
    date = start_date.date()
    end_date = end_date.date()
    index = 0
    users = 0
    while date <= end_date:

        if len(data) != 0 and date == data[index].get("simple_date"):
            # Update current number of users if it is required
            users = data[index].get("total")
            if index < len(data) - 1:
                index = index + 1
        else:
            users = 0

        # Add the new entry to the response list
        new_entry = {
            "date": date,
            "total": users,
        }
        response.append(new_entry)
        date = date + timedelta(days=1)
    return response


def resolve_addresses(info, ids):
    user = info.context.user
    app = info.context.app
    ids = [
        from_global_id_or_error(address_id, Address, raise_error=True)[1]
        for address_id in ids
    ]
    if app and app.has_perm(AccountPermissions.MANAGE_USERS):
        return models.Address.objects.filter(id__in=ids)
    if user and not user.is_anonymous:
        return user.addresses.filter(id__in=ids)
    return models.Address.objects.none()


def resolve_permissions(root: models.User):
    permissions = get_user_permissions(root)
    permissions = permissions.order_by("codename")
    return format_permissions_for_display(permissions)
