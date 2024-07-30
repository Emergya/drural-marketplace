import os

from django.template.response import TemplateResponse


def home(request):
    storefront_url = os.environ.get("MK_STOREFRONT_URL", "")
    dashboard_url = os.environ.get("MK_DASHBOARD_URL", "")
    return TemplateResponse(
        request,
        "home/index.html",
        {"storefront_url": storefront_url, "dashboard_url": dashboard_url},
    )
