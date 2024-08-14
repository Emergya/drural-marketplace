from django.conf import settings
from django.contrib.gis.db import models as models_geo
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField

from ..account.models import User
from ..core.models import ModelWithMetadata
from ..core.permissions import CompanyPermissions, StatPermissions


class CompanyAddress(models.Model):
    """
    Model representing a company address.

    Attributes:
        street (str): The street of the address.
        street_second_line (str): The second line of the street address.
        postal_code (str): The postal code of the address.
        locality (str): The locality of the address.
        region (str): The region of the address.
        location_point (PointField): The location point of the address.
        country (CountryField): The country of the address.
        company (OneToOneField): The company associated with the address.
    """
    street = models.CharField(max_length=2000, blank=True, null=True)
    street_second_line = models.CharField(max_length=2000, blank=True, null=True)
    postal_code = models.CharField(max_length=10, blank=True, null=True)
    locality = models.CharField(max_length=100, blank=True, null=True)
    region = models.CharField(max_length=100, blank=True, null=True)
    location_point = models_geo.PointField(null=True, blank=True)
    country = CountryField(blank=True, null=True)
    company = models.OneToOneField(
        "Company", related_name="address", on_delete=models.CASCADE
    )


class Company(ModelWithMetadata):
    """
    A model representing a company.

    The company model is used to represent a company in the system.

    Attributes:
        name (str): The name of the company.
        public_name (str): The public name of the company.
        cif (str): The CIF (tax identification number) of the company.
        phone (str): The phone number of the company.
        email (str): The email address of the company.
        language_code (str): The language code of the company.
        status (str): The status of the company.
        is_enabled (bool): Indicates if the company is enabled.
        description (str): The description of the company.
        image (ImageField): The image of the company.
        banner (ImageField): The banner image of the company.
        banner_alt (str): The alternative text for the banner image.
        managers (ManyToManyField): The managers of the company.
        created (DateTimeField): The date and time when the company was created.
        modified (DateTimeField): The date and time when the company was last modified.
        rating (float): The rating of the company.

    Methods:
        image_url: Returns the URL of the company's image.

    Meta:
        ordering: Specifies the default ordering for Company objects.
        permissions: Specifies the permissions for managing companies and viewing company stats.
    """
    class Status(models.TextChoices):
        PENDING = "PEN", _("Pending")
        ACCEPTED = "ACC", _("Accepted")
        REJECTED = "REJ", _("Rejected")
        DEACTIVATED = "DEA", _("Deactivated")

    name = models.CharField(max_length=100, unique=True)
    public_name = models.CharField(max_length=100, unique=True)
    cif = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=50, unique=True)
    language_code = models.CharField(
        max_length=35, choices=settings.LANGUAGES, default=settings.LANGUAGE_CODE
    )
    status = models.CharField(
        max_length=3,
        choices=Status.choices,
        default=Status.PENDING,
    )
    is_enabled = models.BooleanField(default=False)
    description = models.TextField(max_length=200)
    image = models.ImageField(upload_to="companies")
    banner = models.ImageField(upload_to="companies/banners", null=True, blank=True)
    banner_alt = models.CharField(max_length=128, blank=True)
    managers = models.ManyToManyField(User, related_name="companies")
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    rating = models.FloatField(default=0)

    @property
    def image_url(self):
        return self.image.url

    def __str__(self):
        return self.name

    class Meta(ModelWithMetadata.Meta):
        ordering = ("name",)
        permissions = (
            (CompanyPermissions.MANAGE_COMPANIES.codename, "Manage companies."),
            (
                StatPermissions.MANAGE_COMPANY_STATS.codename,
                "Permission view for company stats.",
            ),
        )


class StripeCredentials(models.Model):
    """
    Model representing the Stripe credentials of a company.
    """
    company = models.OneToOneField(
        Company,
        primary_key=True,
        on_delete=models.CASCADE,
        related_name="stripe_credentials",
    )
    account_id = models.CharField(max_length=100, blank=True, null=True)
    is_enabled = models.BooleanField(default=False)


class ChatwootCredentials(models.Model):
    """
    Model representing the Chatwoot credentials of a company.
    
    """
    company = models.OneToOneField(
        Company,
        primary_key=True,
        on_delete=models.CASCADE,
        related_name="chatwoot_credentials",
    )
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


class CompanyValidationEvent(models.Model):
    """
    Model representing a company validation event.
    """
    company = models.ForeignKey(
        Company,
        related_name="validation_events",
        on_delete=models.CASCADE,
    )
    status = models.CharField(max_length=3, choices=Company.Status.choices)
    reason = models.TextField(max_length=2000, blank=True, null=True)
    validated_by = models.ForeignKey(User, on_delete=models.RESTRICT)
    created = models.DateTimeField()
