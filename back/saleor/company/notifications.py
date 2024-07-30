from django.conf import settings

from ..core.notifications import get_language_code_or_default, get_site_context
from ..core.notify_events import NotifyEventType
from .models import Company
from ..account.notifications import get_default_user_payload


def get_default_company_payload(company):
    return {
        "id": company.id,
        "name": company.name,
        "public_name": company.public_name,
        "cif": company.cif,
        "address": {
            "street": company.address.street,
            "postal_code": company.address.postal_code,
            "locality": company.address.locality,
            "region": company.address.region,
            "country": company.address.country.name,
        },
        "phone": company.phone,
        "status": company.get_status_display(),
        "email": company.email,
        "language_code": company.language_code,
        "description": company.description,
        "image": company.image.url,
    }


def get_company_manager_email(manager):
    return manager.email


def send_company_created_notification(
    company, manager, channel_slug=settings.DEFAULT_CHANNEL_SLUG
):
    """Trigger sending a notification company pending to the user."""
    payload = {
        "company": get_default_company_payload(company),
        "recipient_email": get_company_manager_email(company.managers.first()),
        "channel_slug": channel_slug,
        **get_site_context(),
        "language_code": get_language_code_or_default(company)
    }
    manager.notify(
        NotifyEventType.COMPANY_CREATED,
        payload=payload,
        channel_slug=channel_slug,
    )


def send_company_validation_notification(
    company: Company, manager, reason: str, channel_slug=settings.DEFAULT_CHANNEL_SLUG
):
    """Trigger sending a notification company validation to the user."""
    payload = {
        "company": get_default_company_payload(company),
        "recipient_email": get_company_manager_email(company.managers.first()),
        "reason": reason,
        "channel_slug": channel_slug,
        "language_code": get_language_code_or_default(company),
        **get_site_context(),
    }
    manager.notify(
        NotifyEventType.COMPANY_VALIDATION,
        payload=payload,
        channel_slug=channel_slug,
    )

def send_new_agent_created_notification(
    company, manager, user, channel_slug=settings.DEFAULT_CHANNEL_SLUG
):
    """Trigger sending a notification company agent added"""
    payload = {
        "user": get_default_user_payload(user),
        "company": get_default_company_payload(company),
        "recipient_email": get_company_manager_email(user),
        "channel_slug": channel_slug,
        "language_code": get_language_code_or_default(user),
        **get_site_context(),
    }
    manager.notify(
        NotifyEventType.COMPANY_ADD_AGENT,
        payload=payload,
        channel_slug=channel_slug,
    )