from email.headerregistry import Address
from email.utils import parseaddr
from typing import Optional

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.exceptions import ImproperlyConfigured
from django.core.validators import (
    MaxLengthValidator,
    MaxValueValidator,
    MinValueValidator,
    RegexValidator,
)
from django.db import models

from ..core.permissions import SitePermissions
from ..core.units import WeightUnits
from ..core.utils.translations import Translation, TranslationProxy
from .error_codes import SiteErrorCode
from .patch_sites import patch_contrib_sites

patch_contrib_sites()


def email_sender_name_validators():
    return [
        RegexValidator(
            r"[\n\r]",
            inverse_match=True,
            message="New lines are not allowed.",
            code=SiteErrorCode.FORBIDDEN_CHARACTER.value,
        ),
        MaxLengthValidator(settings.DEFAULT_MAX_EMAIL_DISPLAY_NAME_LENGTH),
    ]

class SiteSettings(models.Model):
    """
    Represents the settings for a site.

    The site settings are used to store all site-specific data, like the header text,
    description, menus, and other site-specific data.

    Attributes:
        site (OneToOneField): The site associated with these settings.
        header_text (str): The header text for the site.
        description (str): The description of the site.
        top_menu (ForeignKey): The top menu of the site.
        bottom_menu (ForeignKey): The bottom menu of the site.
        include_taxes_in_prices (bool): Indicates if taxes are included in prices.
        display_gross_prices (bool): Indicates if gross prices are displayed.
        charge_taxes_on_shipping (bool): Indicates if taxes are charged on shipping.
        track_inventory_by_default (bool): Indicates if inventory is tracked by default.
        default_weight_unit (str): The default weight unit for the site.
        automatic_fulfillment_digital_products (bool): Indicates if digital products are automatically fulfilled.
        default_digital_max_downloads (int): The default maximum number of downloads for digital products.
        default_digital_url_valid_days (int): The default number of days digital URLs are valid.
        company_address (ForeignKey): The company address.
        default_mail_sender_name (str): The default sender name for emails.
        default_mail_sender_address (str): The default sender address for emails.
        customer_set_password_url (str): The URL for customers to set their password.
        automatically_confirm_all_new_orders (bool): Indicates if all new orders are automatically confirmed.
        translated (TranslationProxy): Proxy for translation.
        default_language (str): The default language for the site.
        primary_color (str): The primary color for the site.
        secondary_color (str): The secondary color for the site.
        logo (ImageField): The logo of the site.
        logo_alt (str): The alt text for the logo.
        dashboard_banner (ImageField): The dashboard banner of the site.
        dashboard_banner_alt (str): The alt text for the dashboard banner.
        storefront_banner (ImageField): The storefront banner of the site.
        storefront_banner_alt (str): The alt text for the storefront banner.
        commission_rate (float): The commission rate for the site.
    """
    site = models.OneToOneField(Site, related_name="settings", on_delete=models.CASCADE)
    header_text = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=500, blank=True)
    top_menu = models.ForeignKey(
        "menu.Menu", on_delete=models.SET_NULL, related_name="+", blank=True, null=True
    )
    bottom_menu = models.ForeignKey(
        "menu.Menu", on_delete=models.SET_NULL, related_name="+", blank=True, null=True
    )
    include_taxes_in_prices = models.BooleanField(default=True)
    display_gross_prices = models.BooleanField(default=True)
    charge_taxes_on_shipping = models.BooleanField(default=True)
    track_inventory_by_default = models.BooleanField(default=True)
    default_weight_unit = models.CharField(
        max_length=30,
        choices=WeightUnits.CHOICES,  # type: ignore
        default=WeightUnits.KG,  # type: ignore
    )
    automatic_fulfillment_digital_products = models.BooleanField(default=False)
    default_digital_max_downloads = models.IntegerField(blank=True, null=True)
    default_digital_url_valid_days = models.IntegerField(blank=True, null=True)
    company_address = models.ForeignKey(
        "account.Address", blank=True, null=True, on_delete=models.SET_NULL
    )
    default_mail_sender_name = models.CharField(
        max_length=settings.DEFAULT_MAX_EMAIL_DISPLAY_NAME_LENGTH,
        blank=True,
        default="",
        validators=email_sender_name_validators(),
    )
    default_mail_sender_address = models.EmailField(blank=True, null=True)
    customer_set_password_url = models.CharField(max_length=255, blank=True, null=True)
    automatically_confirm_all_new_orders = models.BooleanField(default=True)
    translated = TranslationProxy()
    default_language = models.CharField(
        max_length=35, choices=settings.LANGUAGES, default=settings.LANGUAGE_CODE
    )
    primary_color = models.CharField(max_length=10, blank=True, null=True)
    secondary_color = models.CharField(max_length=10, blank=True, null=True)
    logo = models.ImageField(upload_to="customization", blank=True, null=True)
    logo_alt = models.CharField(max_length=128, blank=True)
    dashboard_banner = models.ImageField(
        upload_to="customization", blank=True, null=True
    )
    dashboard_banner_alt = models.CharField(max_length=128, blank=True, null=True)
    storefront_banner = models.ImageField(
        upload_to="customization", blank=True, null=True
    )
    storefront_banner_alt = models.CharField(max_length=128, blank=True, null=True)
    commission_rate = models.FloatField(
        validators=[MaxValueValidator(1), MinValueValidator(0)], default=0
    )

    class Meta:
        permissions = (
            (SitePermissions.MANAGE_SETTINGS.codename, "Manage settings."),
            (SitePermissions.MANAGE_TRANSLATIONS.codename, "Manage translations."),
        )

    def __str__(self):
        return self.site.name

    @property
    def default_from_email(self) -> str:
        """
        Returns the default 'from' email address formatted according to RFC 5322.
        """
        sender_name: str = self.default_mail_sender_name
        sender_address: Optional[str] = self.default_mail_sender_address

        if not sender_address:
            sender_address = settings.DEFAULT_FROM_EMAIL

            if not sender_address:
                raise ImproperlyConfigured("No sender email address has been set-up")

            sender_name, sender_address = parseaddr(sender_address)

        value = str(Address(sender_name, addr_spec=sender_address))
        return value


class ShopChatwootCredentials(models.Model):
    """
    Represents the Chatwoot credentials for a shop.

    Attributes:
        site_settings (OneToOneField): The site settings associated with these credentials.
        email (str): The email associated with the Chatwoot account.
        chatwoot_user_id (int): The user ID in Chatwoot.
        chatwoot_account_id (int): The account ID in Chatwoot.
        is_active (bool): Indicates if the credentials are active.
        user_api_key (str): The API key for the Chatwoot user.
        website_token (str): The website token for Chatwoot.
        hmac (str): The HMAC for Chatwoot.
    """
    site_settings = models.OneToOneField(
        SiteSettings,
        primary_key=True,
        related_name="chatwoot_credentials",
        on_delete=models.CASCADE,
    )
    email = models.EmailField(max_length=50, unique=True)
    chatwoot_user_id = models.PositiveIntegerField(
        null=True, validators=[MinValueValidator(1)]
    )
    chatwoot_account_id = models.PositiveBigIntegerField(
        null=True, validators=[MinValueValidator(1)]
    )
    is_active = models.BooleanField(default=True)
    user_api_key = models.CharField(max_length=128, blank=True, null=True)
    website_token = models.CharField(max_length=128, blank=True, null=True)
    hmac = models.CharField(max_length=128, blank=True, null=True)


class SiteSettingsTranslation(Translation):
    """
    Represents the translation of site settings.

    Attributes:
        site_settings (ForeignKey): The site settings associated with this translation.
        header_text (str): The translated header text for the site.
        description (str): The translated description of the site.
    """
    site_settings = models.ForeignKey(
        SiteSettings, related_name="translations", on_delete=models.CASCADE
    )
    header_text = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=500, blank=True)

    class Meta:
        unique_together = (("language_code", "site_settings"),)

    def __repr__(self):
        class_ = type(self)
        return "%s(pk=%r, site_settings_pk=%r)" % (
            class_.__name__,
            self.pk,
            self.site_settings_id,
        )

    def __str__(self):
        return self.site_settings.site.name

    def get_translated_object_id(self):
        return "Shop", self.site_settings_id

    def get_translated_keys(self):
        return {
            "header_text": self.header_text,
            "description": self.description,
        }


class ShopGoogleAnalytics(models.Model):
    """
    Represents the Google Analytics settings for a shop.

    Attributes:
        site_settings (OneToOneField): The site settings associated with these Google Analytics settings.
        measurement_id (str): The Google Analytics measurement ID.
        is_active (bool): Indicates if Google Analytics is active.
    """
    site_settings = models.OneToOneField(
        SiteSettings,
        primary_key=True,
        related_name="google_analytics",
        on_delete=models.CASCADE,
    )
    measurement_id = models.CharField(max_length=128, blank=True, null=True)
    is_active = models.BooleanField(default=True)
