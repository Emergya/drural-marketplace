from typing import Union

from django.conf import settings
from django.contrib.auth.models import _user_has_perm  # type: ignore
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    Group,
    Permission,
    PermissionsMixin,
)
from django.contrib.postgres.indexes import GinIndex
from django.db import models
from django.db.models import JSONField  # type: ignore
from django.db.models import Q, QuerySet, Value
from django.db.models.expressions import Exists, OuterRef
from django.forms.models import model_to_dict
from django.utils import timezone
from django.utils.crypto import get_random_string
from django_countries.fields import Country, CountryField
from phonenumber_field.modelfields import PhoneNumber, PhoneNumberField
from versatileimagefield.fields import VersatileImageField

from ..app.models import App
from ..core.models import ModelWithMetadata
from ..core.permissions import (
    AccountPermissions,
    BasePermissionEnum,
    StatPermissions,
    get_permissions,
)
from ..core.utils.json_serializer import CustomJsonEncoder
from ..order.models import Order, OrderLine
from . import CustomerEvents
from .validators import validate_possible_number


class PossiblePhoneNumberField(PhoneNumberField):
    """Less strict field for phone numbers written to database."""

    default_validators = [validate_possible_number]


class AddressQueryset(models.QuerySet):
    def annotate_default(self, user):
        # Set default shipping/billing address pk to None
        # if default shipping/billing address doesn't exist
        default_shipping_address_pk, default_billing_address_pk = None, None
        if user.default_shipping_address:
            default_shipping_address_pk = user.default_shipping_address.pk
        if user.default_billing_address:
            default_billing_address_pk = user.default_billing_address.pk

        return user.addresses.annotate(
            user_default_shipping_address_pk=Value(
                default_shipping_address_pk, models.IntegerField()
            ),
            user_default_billing_address_pk=Value(
                default_billing_address_pk, models.IntegerField()
            ),
        )


class Address(models.Model):
    """
    Represents user's address.

    Attributes:
        first_name (str): The first name of the user.
        last_name (str): The last name of the user.
        company_name (str): The name of the company associated with the address.
        street_address_1 (str): The first line of the street address.
        street_address_2 (str): The second line of the street address.
        city (str): The city of the address.
        city_area (str): The area within the city.
        postal_code (str): The postal code of the address.
        country (CountryField): The country of the address.
        country_area (str): The area within the country.
        phone (PossiblePhoneNumberField): The phone number associated with the address.
    Methods:
        full_name(): Returns the full name of the user.
        __str__(): Returns a string representation of the address.
        __eq__(other): Checks if the address is equal to another address.
        as_data(): Returns the address as a dictionary suitable for passing as kwargs.
        get_copy(): Returns a new instance of the same address.
    """

    first_name = models.CharField(max_length=256, blank=True)
    last_name = models.CharField(max_length=256, blank=True)
    company_name = models.CharField(max_length=256, blank=True)
    street_address_1 = models.CharField(max_length=256, blank=True)
    street_address_2 = models.CharField(max_length=256, blank=True)
    city = models.CharField(max_length=256, blank=True)
    city_area = models.CharField(max_length=128, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = CountryField()
    country_area = models.CharField(max_length=128, blank=True)
    phone = PossiblePhoneNumberField(blank=True, default="", db_index=True)

    objects = models.Manager.from_queryset(AddressQueryset)()

    class Meta:
        ordering = ("pk",)
        indexes = [
            GinIndex(
                name="address_search_gin",
                # `opclasses` and `fields` should be the same length
                fields=["first_name", "last_name", "city", "country"],
                opclasses=["gin_trgm_ops"] * 4,
            ),
        ]

    @property
    def full_name(self):
        return "%s %s" % (self.first_name, self.last_name)

    def __str__(self):
        if self.company_name:
            return "%s - %s" % (self.company_name, self.full_name)
        return self.full_name

    def __eq__(self, other):
        if not isinstance(other, Address):
            return False
        return self.as_data() == other.as_data()

    __hash__ = models.Model.__hash__

    def as_data(self):
        """Return the address as a dict suitable for passing as kwargs.

        Result does not contain the primary key or an associated user.
        """
        data = model_to_dict(self, exclude=["id", "user"])
        if isinstance(data["country"], Country):
            data["country"] = data["country"].code
        if isinstance(data["phone"], PhoneNumber):
            data["phone"] = data["phone"].as_e164
        return data

    def get_copy(self):
        """Return a new instance of the same address."""
        return Address.objects.create(**self.as_data())


class UserManager(BaseUserManager):
    """

    Custom user manager for creating and managing user instances.
    
    """
    def create_user(
        self, email, password=None, is_staff=False, is_active=True, **extra_fields
    ):
        """Create a user instance with the given email and password."""
        email = UserManager.normalize_email(email)
        # Google OAuth2 backend send unnecessary username field
        extra_fields.pop("username", None)

        user = self.model(
            email=email, is_active=is_active, is_staff=is_staff, **extra_fields
        )
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(
            email, password, is_staff=True, is_superuser=True, **extra_fields
        )

    def customers(self):
        orders = Order.objects.values("user_id")
        return self.get_queryset().filter(
            Q(is_staff=False)
            | (Q(is_staff=True) & (Exists(orders.filter(user_id=OuterRef("pk")))))
        )

    def seller_customers(self, requestor):
        orders_lines = OrderLine.objects.filter(
            variant__product__company__managers__in=[requestor]
        )
        orders = Order.objects.filter(lines__in=orders_lines).values("user_id")
        return self.get_queryset().filter(
            Q(is_staff=False), Exists(orders.filter(user_id=OuterRef("pk")))
        )

    def staff(self):
        return self.get_queryset().filter(is_staff=True)


class User(PermissionsMixin, ModelWithMetadata, AbstractBaseUser):
    """
    Represents a user in the system.

    Attributes:
        email (str): The email address of the user. Must be unique.
        first_name (str): The first name of the user. Can be blank.
        last_name (str): The last name of the user. Can be blank.
        addresses (ManyToManyField): The addresses associated with the user.
        is_staff (bool): Indicates if the user is a staff member. Default is False.
        is_active (bool): Indicates if the user is active. Default is True.
        is_onboard (bool): Indicates if the user has completed the onboarding process. Default is False.
        info_request (bool): Indicates if the user has requested additional information. Default is False.
        note (str): Additional notes about the user. Can be null and blank.
        date_joined (datetime): The date and time when the user joined. Default is the current time.
        default_shipping_address (ForeignKey): The default shipping address for the user. Can be null and blank.
        default_billing_address (ForeignKey): The default billing address for the user. Can be null and blank.
        avatar (VersatileImageField): The avatar image of the user. Can be null and blank.
        jwt_token_key (str): The JWT token key for the user. Default is a randomly generated string.
        language_code (str): The language code for the user. Default is the system's language code.
        distance (int): The distance for location-based operations. Can be null and blank. Default is 50.
        is_location_allowed (bool): Indicates if the user's location is allowed. Default is False.
        categories (ManyToManyField): The categories associated with the user.

    Methods:
        is_seller(): Checks if the user is a seller.
        effective_permissions(): Returns the effective permissions of the user.
        get_full_name(): Returns the full name of the user.
        get_short_name(): Returns the short name of the user.
        product_consumed(product): Checks if the user has consumed a specific product.
        has_perm(perm, obj=None): Checks if the user has a specific permission.
        is_company_manager(company_id): Checks if the user is a manager in a given company.
    """
    ...
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=256, blank=True)
    last_name = models.CharField(max_length=256, blank=True)
    addresses = models.ManyToManyField(
        Address, blank=True, related_name="user_addresses"
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_onboard = models.BooleanField(default=False)
    info_request = models.BooleanField(default=False)
    note = models.TextField(null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now, editable=False)
    default_shipping_address = models.ForeignKey(
        Address, related_name="+", null=True, blank=True, on_delete=models.SET_NULL
    )
    default_billing_address = models.ForeignKey(
        Address, related_name="+", null=True, blank=True, on_delete=models.SET_NULL
    )
    avatar = VersatileImageField(upload_to="user-avatars", blank=True, null=True)
    jwt_token_key = models.CharField(max_length=12, default=get_random_string)
    language_code = models.CharField(
        max_length=35, choices=settings.LANGUAGES, default=settings.LANGUAGE_CODE
    )
    distance = models.IntegerField(default=50, null=True, blank=True)
    is_location_allowed = models.BooleanField(default=False)
    categories = models.ManyToManyField("product.Category", related_name="users")

    USERNAME_FIELD = "email"

    objects = UserManager()

    class Meta:
        ordering = ("email",)
        permissions = (
            (AccountPermissions.MANAGE_USERS.codename, "Manage customers."),
            (AccountPermissions.MANAGE_STAFF.codename, "Manage staff."),
            (AccountPermissions.IMPERSONATE_USER.codename, "Impersonate user."),
            (
                StatPermissions.MANAGE_USER_STATS.codename,
                "Permission view for user stats.",
            ),
        )
        indexes = [
            *ModelWithMetadata.Meta.indexes,
            # Orders searching index
            GinIndex(
                name="user_search_gin",
                # `opclasses` and `fields` should be the same length
                fields=["email", "first_name", "last_name"],
                opclasses=["gin_trgm_ops"] * 3,
            ),
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._effective_permissions = None

    @property
    def is_seller(self):
        return self.companies.exists()

    @property
    def effective_permissions(self) -> "QuerySet[Permission]":
        if self._effective_permissions is None:
            self._effective_permissions = get_permissions()
            if not self.is_superuser:

                UserPermission = User.user_permissions.through
                user_permission_queryset = UserPermission.objects.filter(
                    user_id=self.pk
                ).values("permission_id")

                UserGroup = User.groups.through
                GroupPermission = Group.permissions.through
                user_group_queryset = UserGroup.objects.filter(user_id=self.pk).values(
                    "group_id"
                )
                group_permission_queryset = GroupPermission.objects.filter(
                    Exists(user_group_queryset.filter(group_id=OuterRef("group_id")))
                ).values("permission_id")

                self._effective_permissions = self._effective_permissions.filter(
                    Q(
                        Exists(
                            user_permission_queryset.filter(
                                permission_id=OuterRef("pk")
                            )
                        )
                    )
                    | Q(
                        Exists(
                            group_permission_queryset.filter(
                                permission_id=OuterRef("pk")
                            )
                        )
                    )
                )
        return self._effective_permissions

    @effective_permissions.setter
    def effective_permissions(self, value: "QuerySet[Permission]"):
        self._effective_permissions = value
        # Drop cache for authentication backend
        self._effective_permissions_cache = None

    def get_full_name(self):
        if self.first_name or self.last_name:
            return ("%s %s" % (self.first_name, self.last_name)).strip()
        if self.default_billing_address:
            first_name = self.default_billing_address.first_name
            last_name = self.default_billing_address.last_name
            if first_name or last_name:
                return ("%s %s" % (first_name, last_name)).strip()
        return self.email

    def get_short_name(self):
        return self.email

    def product_consumed(self, product):
        if not hasattr(self, "orders"):
            False
        return self.orders.confirmed().filter(lines__variant__product=product).exists()

    def has_perm(self, perm: Union[BasePermissionEnum, str], obj=None):  # type: ignore
        # This method is overridden to accept perm as BasePermissionEnum
        perm = perm.value if hasattr(perm, "value") else perm  # type: ignore

        # Active superusers have all permissions.
        if self.is_active and self.is_superuser and not self._effective_permissions:
            return True
        return _user_has_perm(self, perm, obj)

    def is_company_manager(self, company_id):
        """Verify if user is a manager in a given company."""
        return self.companies.filter(pk=company_id).exists()


class CustomerNote(models.Model):
    """
    Model representing a customer note.

    Attributes:
        user (ForeignKey): The user associated with the note (optional).
        date (DateTimeField): The date and time the note was created.
        content (TextField): The content of the note.
        is_public (BooleanField): Indicates if the note is public or private.
        customer (ForeignKey): The customer associated with the note.

    Meta:
        ordering (tuple): The default ordering of the notes by date.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.SET_NULL
    )
    date = models.DateTimeField(db_index=True, auto_now_add=True)
    content = models.TextField()
    is_public = models.BooleanField(default=True)
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="notes", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ("date",)


class CustomerEvent(models.Model):
    """Model used to store events that happened during the customer lifecycle."""

    date = models.DateTimeField(default=timezone.now, editable=False)
    type = models.CharField(
        max_length=255,
        choices=[
            (type_name.upper(), type_name) for type_name, _ in CustomerEvents.CHOICES
        ],
    )
    order = models.ForeignKey("order.Order", on_delete=models.SET_NULL, null=True)
    parameters = JSONField(blank=True, default=dict, encoder=CustomJsonEncoder)
    user = models.ForeignKey(
        User, related_name="events", on_delete=models.CASCADE, null=True
    )
    app = models.ForeignKey(App, related_name="+", on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ("date",)

    def __repr__(self):
        return f"{self.__class__.__name__}(type={self.type!r}, user={self.user!r})"


class StaffNotificationRecipient(models.Model):
    """
    Model representing a staff notification recipient.

    Attributes:
        user (User): The user associated with the recipient (OneToOneField).
        staff_email (str): The email address of the recipient (EmailField).
        active (bool): Indicates if the recipient is active or not (BooleanField).

    """
    user = models.OneToOneField(
        User,
        related_name="staff_notification",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    staff_email = models.EmailField(unique=True, blank=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ("staff_email",)

    def get_email(self):
        return self.user.email if self.user else self.staff_email
