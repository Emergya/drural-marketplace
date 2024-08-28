from decimal import Decimal
from functools import partial
from typing import TYPE_CHECKING, Optional

from django.conf import settings
from django.contrib.postgres.indexes import GinIndex
from django.db import models
from django.db.models import F, Q
from django.utils import timezone
from django_countries.fields import CountryField
from django_prices.models import MoneyField
from django_prices.templatetags.prices import amount
from prices import Money, TaxedMoney, fixed_discount, percentage_discount

from ..channel.models import Channel
from ..core.models import ModelWithMetadata
from ..core.permissions import DiscountPermissions
from ..core.taxes import display_gross_prices
from ..core.utils.translations import Translation, TranslationProxy
from . import DiscountValueType, OrderDiscountType, VoucherType

if TYPE_CHECKING:
    from ..account.models import User


class NotApplicable(ValueError):
    """Exception raised when a discount is not applicable to a checkout.

    The error is raised if the order value is below the minimum required
    price or the order quantity is below the minimum quantity of items.
    Minimum price will be available as the `min_spent` attribute.
    Minimum quantity will be available as the `min_checkout_items_quantity` attribute.
    """

    def __init__(self, msg, min_spent=None, min_checkout_items_quantity=None):
        super().__init__(msg)
        self.min_spent = min_spent
        self.min_checkout_items_quantity = min_checkout_items_quantity


class VoucherQueryset(models.QuerySet):
    """
    A custom QuerySet for Voucher model.

    This QuerySet provides methods for filtering vouchers based on their active status,
    expiration status, and channel.

    Methods:
    - active(date): Filters vouchers that are currently active.
    - active_in_channel(date, channel_slug): Filters vouchers that are active in a specific channel.
    - expired(date): Filters vouchers that have expired.

    """
    def active(self, date):
        return self.filter(
            Q(usage_limit__isnull=True) | Q(used__lt=F("usage_limit")),
            Q(end_date__isnull=True) | Q(end_date__gte=date),
            start_date__lte=date,
        )

    def active_in_channel(self, date, channel_slug: str):
        return self.active(date).filter(
            channel_listings__channel__slug=channel_slug,
            channel_listings__channel__is_active=True,
        )

    def expired(self, date):
        return self.filter(
            Q(used__gte=F("usage_limit")) | Q(end_date__lt=date), start_date__lt=date
        )


class Voucher(ModelWithMetadata):
    """
    Represents a voucher that can be applied to an order to provide a discount.

    Attributes:
        type (str): The type of the voucher. Choices are defined in VoucherType.CHOICES.
        name (str): The name of the voucher.
        code (str): The unique code of the voucher.
        usage_limit (int): The maximum number of times the voucher can be used.
        used (int): The number of times the voucher has been used.
        start_date (datetime): The start date of the voucher's validity period.
        end_date (datetime): The end date of the voucher's validity period.
        apply_once_per_order (bool): Indicates if the discount should be applied per order.
        apply_once_per_customer (bool): Indicates if the discount should be applied once per customer.
        only_for_staff (bool): Indicates if the voucher is only valid for staff customers.
        discount_value_type (str): The type of discount value. Choices are defined in DiscountValueType.CHOICES.
        countries (list): The list of countries for which the voucher is valid.
        min_checkout_items_quantity (int): The minimum quantity of items required to apply the voucher.
        products (QuerySet): The products to which the voucher is applicable.
        collections (QuerySet): The collections to which the voucher is applicable.
        categories (QuerySet): The categories to which the voucher is applicable.
        objects (QuerySet): The manager for querying Voucher objects.
        translated (TranslationProxy): The proxy for accessing translated fields of the voucher.

    """
    type = models.CharField(
        max_length=20, choices=VoucherType.CHOICES, default=VoucherType.ENTIRE_ORDER
    )
    name = models.CharField(max_length=255, null=True, blank=True)
    code = models.CharField(max_length=12, unique=True, db_index=True)
    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    used = models.PositiveIntegerField(default=0, editable=False)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    # this field indicates if discount should be applied per order or
    # individually to every item
    apply_once_per_order = models.BooleanField(default=False)
    apply_once_per_customer = models.BooleanField(default=False)

    only_for_staff = models.BooleanField(default=False)

    discount_value_type = models.CharField(
        max_length=10,
        choices=DiscountValueType.CHOICES,
        default=DiscountValueType.FIXED,
    )

    # not mandatory fields, usage depends on type
    countries = CountryField(multiple=True, blank=True)
    min_checkout_items_quantity = models.PositiveIntegerField(null=True, blank=True)
    products = models.ManyToManyField("product.Product", blank=True)
    collections = models.ManyToManyField("product.Collection", blank=True)
    categories = models.ManyToManyField("product.Category", blank=True)

    objects = models.Manager.from_queryset(VoucherQueryset)()
    translated = TranslationProxy()

    class Meta:
        ordering = ("code",)

    @property
    def is_free(self):
        return (
            self.discount_value == Decimal(100)
            and self.discount_value_type == DiscountValueType.PERCENTAGE
        )

    def get_discount(self, channel: Channel):
        voucher_channel_listing = self.channel_listings.filter(channel=channel).first()
        if not voucher_channel_listing:
            raise NotApplicable("This voucher is not assigned to this channel")
        if self.discount_value_type == DiscountValueType.FIXED:
            discount_amount = Money(
                voucher_channel_listing.discount_value, voucher_channel_listing.currency
            )
            return partial(fixed_discount, discount=discount_amount)
        if self.discount_value_type == DiscountValueType.PERCENTAGE:
            return partial(
                percentage_discount, percentage=voucher_channel_listing.discount_value
            )
        raise NotImplementedError("Unknown discount type")

    def get_discount_amount_for(self, price: Money, channel: Channel):
        discount = self.get_discount(channel)
        after_discount = discount(price)
        if after_discount.amount < 0:
            return price
        return price - after_discount

    def validate_min_spent(self, value: TaxedMoney, channel: Channel):
        value = value.gross if display_gross_prices() else value.net
        voucher_channel_listing = self.channel_listings.filter(channel=channel).first()
        if not voucher_channel_listing:
            raise NotApplicable("This voucher is not assigned to this channel")
        min_spent = voucher_channel_listing.min_spent
        if min_spent and value < min_spent:
            msg = f"This offer is only valid for orders over {amount(min_spent)}."
            raise NotApplicable(msg, min_spent=min_spent)

    def validate_min_checkout_items_quantity(self, quantity):
        min_checkout_items_quantity = self.min_checkout_items_quantity
        if min_checkout_items_quantity and min_checkout_items_quantity > quantity:
            msg = (
                "This offer is only valid for orders with a minimum of "
                f"{min_checkout_items_quantity} quantity."
            )
            raise NotApplicable(
                msg,
                min_checkout_items_quantity=min_checkout_items_quantity,
            )

    def validate_once_per_customer(self, customer_email):
        voucher_customer = VoucherCustomer.objects.filter(
            voucher=self, customer_email=customer_email
        )
        if voucher_customer:
            msg = "This offer is valid only once per customer."
            raise NotApplicable(msg)

    def validate_only_for_staff(self, customer: Optional["User"]):
        if not self.only_for_staff:
            return

        if not customer or not customer.is_staff:
            msg = "This offer is valid only for staff customers."
            raise NotApplicable(msg)


class VoucherChannelListing(models.Model):
    """
    Model representing the relationship between a Voucher and a Channel.

    Attributes:
        voucher (ForeignKey): The voucher associated with the channel listing.
        channel (ForeignKey): The channel associated with the voucher listing.
        discount_value (Decimal): The value of the discount.
        discount (MoneyField): The discount amount in the specified currency.
        currency (CharField): The currency code.
        min_spent_amount (Decimal): The minimum amount that needs to be spent to apply the voucher.
        min_spent (MoneyField): The minimum spent amount in the specified currency.

    Meta:
        unique_together (tuple): Specifies that the combination of voucher and channel should be unique.
        ordering (tuple): Specifies the default ordering of the model instances.
    """
    voucher = models.ForeignKey(
        Voucher,
        null=False,
        blank=False,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        null=False,
        blank=False,
        related_name="voucher_listings",
        on_delete=models.CASCADE,
    )
    discount_value = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    discount = MoneyField(amount_field="discount_value", currency_field="currency")
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
    )
    min_spent_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    min_spent = MoneyField(amount_field="min_spent_amount", currency_field="currency")

    class Meta:
        unique_together = (("voucher", "channel"),)
        ordering = ("pk",)


class VoucherCustomer(models.Model):
    """
    Represents a customer associated with a voucher.

    Attributes:
        voucher (ForeignKey): The voucher associated with the customer.
        customer_email (EmailField): The email address of the customer.

    Meta:
        ordering (tuple): The fields used for ordering the VoucherCustomer instances.
        unique_together (tuple): The fields that must be unique together for each VoucherCustomer instance.
    """
    voucher = models.ForeignKey(
        Voucher, related_name="customers", on_delete=models.CASCADE
    )
    customer_email = models.EmailField()

    class Meta:
        ordering = ("voucher", "customer_email", "pk")
        unique_together = (("voucher", "customer_email"),)


class SaleQueryset(models.QuerySet):
    """
    Returns a queryset of active sales.
   
    """
    def active(self, date=None):
        if date is None:
            date = timezone.now()
        return self.filter(
            Q(end_date__isnull=True) | Q(end_date__gte=date), start_date__lte=date
        )

    def expired(self, date=None):
        if date is None:
            date = timezone.now()
        return self.filter(end_date__lt=date, start_date__lt=date)


class VoucherTranslation(Translation):
    """
    Represents a translation of a Voucher object.

    Attributes:
        voucher (Voucher): The Voucher object associated with this translation.
        name (str): The translated name of the voucher.

    Meta:
        ordering (tuple): The ordering of the translations based on language code, voucher, and primary key.
        unique_together (tuple): The combination of language code and voucher must be unique.

    Methods:
        get_translated_object_id: Returns the object ID of the translated Voucher.
        get_translated_keys: Returns the translated keys of the Voucher.

    """

    voucher = models.ForeignKey(
        Voucher, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        ordering = ("language_code", "voucher", "pk")
        unique_together = (("language_code", "voucher"),)

    def get_translated_object_id(self):
        return "Voucher", self.voucher_id

    def get_translated_keys(self):
        return {"name": self.name}


class Sale(ModelWithMetadata):
    """
    Represents a sale in the marketplace.

    The sale can be applied to products, categories, or collections.

    Attributes:
        name (str): The name of the sale.
        type (str): The type of the sale. Choices are defined in DiscountValueType.CHOICES.
        products (ManyToManyField): The products associated with the sale.
        categories (ManyToManyField): The categories associated with the sale.
        collections (ManyToManyField): The collections associated with the sale.
        start_date (DateTimeField): The start date of the sale.
        end_date (DateTimeField): The end date of the sale.


    """
    name = models.CharField(max_length=255)
    type = models.CharField(
        max_length=10,
        choices=DiscountValueType.CHOICES,
        default=DiscountValueType.FIXED,
    )
    products = models.ManyToManyField("product.Product", blank=True)
    categories = models.ManyToManyField("product.Category", blank=True)
    collections = models.ManyToManyField("product.Collection", blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)

    objects = models.Manager.from_queryset(SaleQueryset)()
    translated = TranslationProxy()

    class Meta:
        ordering = ("name", "pk")
        app_label = "discount"
        permissions = (
            (
                DiscountPermissions.MANAGE_DISCOUNTS.codename,
                "Manage sales and vouchers.",
            ),
        )

    def __repr__(self):
        return "Sale(name=%r, type=%s)" % (
            str(self.name),
            self.get_type_display(),
        )

    def __str__(self):
        return self.name

    def get_discount(self, sale_channel_listing):
        if not sale_channel_listing:
            raise NotApplicable("This sale is not assigned to this channel.")
        if self.type == DiscountValueType.FIXED:
            discount_amount = Money(
                sale_channel_listing.discount_value, sale_channel_listing.currency
            )
            return partial(fixed_discount, discount=discount_amount)
        if self.type == DiscountValueType.PERCENTAGE:
            return partial(
                percentage_discount,
                percentage=sale_channel_listing.discount_value,
            )
        raise NotImplementedError("Unknown discount type")


class SaleChannelListing(models.Model):
    """
    Model representing the relationship between a Sale and a Channel.

    Attributes:
        sale (Sale): The Sale object associated with the channel listing.
        channel (Channel): The Channel object associated with the channel listing.
        discount_value (Decimal): The discount value for the channel listing.
        currency (str): The currency code for the channel listing.

    Meta:
        unique_together (list): A list of fields that must be unique together.
        ordering (tuple): A tuple specifying the default ordering of instances.
    """
    sale = models.ForeignKey(
        Sale,
        null=False,
        blank=False,
        related_name="channel_listings",
        on_delete=models.CASCADE,
    )
    channel = models.ForeignKey(
        Channel,
        null=False,
        blank=False,
        related_name="sale_listings",
        on_delete=models.CASCADE,
    )
    discount_value = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
    )

    class Meta:
        unique_together = [["sale", "channel"]]
        ordering = ("pk",)


class SaleTranslation(Translation):
    """
    Model representing the translation of a Sale object.

    Attributes:
        name (str): The translated name of the Sale.
        sale (Sale): The Sale object associated with this translation.

    Meta:
        ordering (tuple): The ordering of the SaleTranslation objects.
        unique_together (tuple): The unique constraints for the SaleTranslation objects.
    """
    name = models.CharField(max_length=255, null=True, blank=True)
    sale = models.ForeignKey(
        Sale, related_name="translations", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ("language_code", "name", "pk")
        unique_together = (("language_code", "sale"),)

    def get_translated_object_id(self):
        return "Sale", self.sale_id

    def get_translated_keys(self):
        return {"name": self.name}


class OrderDiscount(models.Model):
    """
    Represents a discount applied to an order.

    Attributes:
        order (ForeignKey): The order to which the discount is applied.
        type (CharField): The type of the discount.
        value_type (CharField): The type of value used for the discount.
        value (DecimalField): The value of the discount.
        amount_value (DecimalField): The amount value of the discount.
        amount (MoneyField): The amount of the discount.
        currency (CharField): The currency used for the discount.
        name (CharField): The name of the discount.
        translated_name (CharField): The translated name of the discount.
        reason (TextField): The reason for the discount.

    """
    order = models.ForeignKey(
        "order.Order",
        related_name="discounts",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    type = models.CharField(
        max_length=10,
        choices=OrderDiscountType.CHOICES,
        default=OrderDiscountType.MANUAL,
    )
    value_type = models.CharField(
        max_length=10,
        choices=DiscountValueType.CHOICES,
        default=DiscountValueType.FIXED,
    )
    value = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )

    amount_value = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    amount = MoneyField(amount_field="amount_value", currency_field="currency")
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
    )

    name = models.CharField(max_length=255, null=True, blank=True)
    translated_name = models.CharField(max_length=255, null=True, blank=True)
    reason = models.TextField(blank=True, null=True)

    class Meta:
        # Orders searching index
        indexes = [GinIndex(fields=["name", "translated_name"])]
