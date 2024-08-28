import logging
from django.contrib.sites.models import Site
from django.conf import settings
from ..account.models import User
from ..company.models import Company
from ..order.models import Order

from ..site.models import SiteSettings

from ..settings import STATIC_URL
logger = logging.getLogger(__name__)

def get_site_context():
    site: Site = Site.objects.get_current()
    logo_mono = STATIC_URL + "logo-icon-mono-positive.png"
    logo_horizontal = STATIC_URL + "logo-horizontal-positive.png"

    # If possible, we will choose a custom logo
    if site.settings.logo:
        logo_mono = site.settings.logo.url
        logo_horizontal = site.settings.logo.url

    site_context = {
        "domain": site.domain,
        "site_name": site.name,
        "site_logo": logo_horizontal,
        "site_icon_logo": logo_mono,
        "site_primary_color": site.settings.primary_color,
        "site_secondary_color": site.settings.secondary_color,
    }
    return site_context


def get_booking_context(order):
    booking_context = {
        "bookable_resource": order.booking.bookable_resource.name,
        "booking_start_date": order.booking.start_date.strftime("%d/%m/%y"),
        "booking_start_time": order.booking.start_date.strftime("%H:%M"),
        "booking_reference": order.booking.booking_reference,
        "product_duration": order.lines.first().variant.product.duration,
    }
    return booking_context


def get_language_code_from_payload(object):

    if object is None:
        return None

    if isinstance(object, Order):
        return object.user.language_code if object.user else None
    if isinstance(object, User):
        return object.language_code if object else None
    if isinstance(object, Company):
        return object.managers.first().language_code
    return None

def get_language_code_or_default(object, seller=False):

    try:
        ## TIPO ORDER
        if isinstance(object, Order) and seller:
            return object.lines.first().variant.product.company.managers.first().language_code
        
        if isinstance(object, Order):
            return object.user.language_code if object.user else settings.DEFAULT_LANGAUGE_CODE
        
        ## tipo USER
        if isinstance(object, User):
            return object.language_code if object else settings.DEFAULT_LANGAUGE_CODE
        
        ## tipo COMPANY
        if isinstance(object, Company):
            return object.managers.first().language_code

        if SiteSettings.objects.exists():
            return SiteSettings.objects.first().default_language
        return settings.DEFAULT_LANGAUGE_CODE
    except:
        logger.error("Error en get_language_code_or_default")
        return settings.DEFAULT_LANGAUGE_CODE
 



