from django.contrib.auth.models import Permission
from django.db.models import Q

from ..account.models import User
from ..account.notifications import get_default_user_payload
from ..core.notifications import get_language_code_or_default, get_site_context
from ..core.notify_events import NotifyEventType


def send_fraudulent_product_report_notification(
    manager, fraudulent_product_report, images
):
    perm = Permission.objects.get(codename="manage_products")
    admins = (
        User.objects.filter(is_staff=True)
        .filter(Q(groups__permissions=perm) | Q(user_permissions=perm))
        .distinct()
    )

    for admin in admins:
        payload = {
            "user": get_default_user_payload(admin),
            "recipient_email": admin.email,
            "reason": fraudulent_product_report.reason,
            "requestor_full_name": fraudulent_product_report.user.get_full_name(),
            "product_name": fraudulent_product_report.product.name,
            "images": images,
            **get_site_context(),
            "language_code": get_language_code_or_default(admin)
        }
        manager.notify(NotifyEventType.FRAUDULENT_PRODUCT_REPORT, payload=payload)


def send_featured_product_notification(user, manager, product_name):
    payload = {
        "user": get_default_user_payload(user),
        "recipient_email": user.email,
        "product": product_name,
        "language_code": get_language_code_or_default(user),
        **get_site_context(),
    }
    manager.notify(NotifyEventType.PRODUCT_FEATURED, payload=payload)
