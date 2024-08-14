from decimal import Decimal
from operator import attrgetter
from re import match
from typing import Optional
from uuid import uuid4

from django.conf import settings
from django.contrib.postgres.indexes import GinIndex
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import JSONField  # type: ignore
from django.db.models import F, Max, Sum
from django.db.models.expressions import Exists, OuterRef
from django.utils.timezone import now
from django_measurement.models import MeasurementField
from django_prices.models import MoneyField, TaxedMoneyField
from measurement.measures import Weight

from ..app.models import App
from ..channel.models import Channel
from ..core.models import ModelWithMetadata
from ..core.permissions import OrderPermissions
from ..core.units import WeightUnits
from ..core.utils.json_serializer import CustomJsonEncoder
from ..core.weight import zero_weight
from ..discount import DiscountValueType
from ..discount.models import Voucher
from ..giftcard.models import GiftCard
from ..payment import ChargeStatus, TransactionKind
from ..payment.model_helpers import get_subtotal, get_total_authorized
from ..payment.models import Payment
from ..shipping.models import ShippingMethod
from . import FulfillmentStatus, OrderEvents, OrderOrigin, OrderStatus


class OrderLineQueryset(models.QuerySet):
    """
    Return lines with digital products.

    Returns:
        generator: A generator that yields OrderLine objects with digital products.
    """
    def digital(self):
        """Return lines with digital products."""
        for line in self.all():
            if line.is_digital:
                yield line

    def physical(self):
        """Return lines with physical products."""
        for line in self.all():
            if not line.is_digital:
                yield line


class OrderLine(models.Model):
    """
    Represents a line item in an order.

    Order lines are different from product variants in that they store the
    quantity of a product that was sold, whereas product variants represent
    the specific product with its price and attributes.

    Attributes:
        order (Order): The order to which this line item belongs.
        variant (ProductVariant): The product variant associated with this line item.
        product_name (str): The name of the product.
        variant_name (str): The name of the variant.
        translated_product_name (str): The translated name of the product.
        translated_variant_name (str): The translated name of the variant.
        product_sku (str): The SKU (stock keeping unit) of the product.
        is_shipping_required (bool): Indicates whether shipping is required for this line item.
        quantity (int): The quantity of the line item.
        quantity_fulfilled (int): The quantity of the line item that has been fulfilled.
        currency (str): The currency code for the line item.
        unit_discount_amount (Decimal): The amount of discount applied to each unit of the line item.
        unit_discount (Money): The discount applied to each unit of the line item.
        unit_discount_type (str): The type of discount applied to each unit of the line item.
        unit_discount_reason (str): The reason for the discount applied to each unit of the line item.
        unit_price_net_amount (Decimal): The net price of each unit of the line item.
        unit_discount_value (Decimal): The value of the applied discount for each unit of the line item.
        unit_price_net (Money): The net price of each unit of the line item.
        unit_price_gross_amount (Decimal): The gross price of each unit of the line item.
        unit_price_gross (Money): The gross price of each unit of the line item.
        unit_price (TaxedMoney): The taxed price of each unit of the line item.
        total_price_net_amount (Decimal): The net total price of the line item.
        total_price_net (Money): The net total price of the line item.
        total_price_gross_amount (Decimal): The gross total price of the line item.
        total_price_gross (Money): The gross total price of the line item.
        total_price (TaxedMoney): The taxed total price of the line item.
        undiscounted_unit_price_gross_amount (Decimal): The undiscounted gross price of each unit of the line item.
        undiscounted_unit_price_net_amount (Decimal): The undiscounted net price of each unit of the line item.
        undiscounted_unit_price (TaxedMoney): The undiscounted taxed price of each unit of the line item.
        undiscounted_total_price_gross_amount (Decimal): The undiscounted gross total price of the line item.
        undiscounted_total_price_net_amount (Decimal): The undiscounted net total price of the line item.
        undiscounted_total_price (TaxedMoney): The undiscounted taxed total price of the line item.
        tax_rate (Decimal): The tax rate applied to the line item.
    """
    order = models.ForeignKey(
        "Order", related_name="lines", editable=False, on_delete=models.CASCADE
    )
    variant = models.ForeignKey(
        "product.ProductVariant",
        related_name="order_lines",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    # max_length is as produced by ProductVariant's display_product method
    product_name = models.CharField(max_length=386)
    variant_name = models.CharField(max_length=255, default="", blank=True)
    translated_product_name = models.CharField(max_length=386, default="", blank=True)
    translated_variant_name = models.CharField(max_length=255, default="", blank=True)
    product_sku = models.CharField(max_length=255)
    is_shipping_required = models.BooleanField()
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    quantity_fulfilled = models.IntegerField(
        validators=[MinValueValidator(0)], default=0
    )

    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
    )

    unit_discount_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    unit_discount = MoneyField(
        amount_field="unit_discount_amount", currency_field="currency"
    )
    unit_discount_type = models.CharField(
        max_length=10,
        choices=DiscountValueType.CHOICES,
        default=DiscountValueType.FIXED,
    )
    unit_discount_reason = models.TextField(blank=True, null=True)

    unit_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    # stores the value of the applied discount. Like 20 of %
    unit_discount_value = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    unit_price_net = MoneyField(
        amount_field="unit_price_net_amount", currency_field="currency"
    )

    unit_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    unit_price_gross = MoneyField(
        amount_field="unit_price_gross_amount", currency_field="currency"
    )

    unit_price = TaxedMoneyField(
        net_amount_field="unit_price_net_amount",
        gross_amount_field="unit_price_gross_amount",
        currency="currency",
    )

    total_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    total_price_net = MoneyField(
        amount_field="total_price_net_amount",
        currency_field="currency",
    )

    total_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    total_price_gross = MoneyField(
        amount_field="total_price_gross_amount",
        currency_field="currency",
    )

    total_price = TaxedMoneyField(
        net_amount_field="total_price_net_amount",
        gross_amount_field="total_price_gross_amount",
        currency="currency",
    )

    undiscounted_unit_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    undiscounted_unit_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    undiscounted_unit_price = TaxedMoneyField(
        net_amount_field="undiscounted_unit_price_net_amount",
        gross_amount_field="undiscounted_unit_price_gross_amount",
        currency="currency",
    )

    undiscounted_total_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    undiscounted_total_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    undiscounted_total_price = TaxedMoneyField(
        net_amount_field="undiscounted_total_price_net_amount",
        gross_amount_field="undiscounted_total_price_gross_amount",
        currency="currency",
    )

    tax_rate = models.DecimalField(
        max_digits=5, decimal_places=4, default=Decimal("0.0")
    )

    objects = models.Manager.from_queryset(OrderLineQueryset)()

    class Meta:
        ordering = ("pk",)

    def __str__(self):
        return (
            f"{self.product_name} ({self.variant_name})"
            if self.variant_name
            else self.product_name
        )

    @property
    def quantity_unfulfilled(self):
        return self.quantity - self.quantity_fulfilled

    @property
    def is_digital(self) -> Optional[bool]:
        """Check if a variant is digital and contains digital content."""
        if not self.variant:
            return None
        is_digital = self.variant.is_digital()
        has_digital = hasattr(self.variant, "digital_content")
        return is_digital and has_digital


class OrderQueryset(models.QuerySet):
    """
    Return orders with digital products.
    """
    def get_by_checkout_token(self, token):
        """Return non-draft order with matched checkout token."""
        return self.non_draft().filter(checkout_token=token).first()

    def confirmed(self):
        """Return orders that aren't draft or unconfirmed."""
        return self.exclude(status__in=[OrderStatus.DRAFT, OrderStatus.UNCONFIRMED])

    def non_draft(self):
        """Return orders that aren't draft."""
        return self.exclude(status=OrderStatus.DRAFT)

    def drafts(self):
        """Return draft orders."""
        return self.filter(status=OrderStatus.DRAFT)

    def get_by_company(self, company_id):
        """Return draft orders related to products of the company."""
        order_lines = OrderLine.objects.filter(variant__product__company_id=company_id)
        return self.filter(lines__in=order_lines)

    def ready_to_fulfill(self):
        """Return orders that can be fulfilled.

        Orders ready to fulfill are fully paid but unfulfilled (or partially
        fulfilled).
        """
        statuses = {OrderStatus.UNFULFILLED, OrderStatus.PARTIALLY_FULFILLED}
        payments = Payment.objects.filter(is_active=True).values("id")
        qs = self.annotate(amount_paid=Sum("payments__captured_amount"))
        return qs.filter(
            Exists(payments.filter(order_id=OuterRef("id"))),
            status__in=statuses,
            total_gross_amount__lte=F("amount_paid"),
        )

    def ready_to_capture(self):
        """Return orders with payments to capture.

        Orders ready to capture are those which are not draft or canceled and
        have a preauthorized payment. The preauthorized payment can not
        already be partially or fully captured.
        """
        payments = Payment.objects.filter(
            is_active=True, charge_status=ChargeStatus.NOT_CHARGED
        ).values("id")
        qs = self.filter(Exists(payments.filter(order_id=OuterRef("id"))))
        return qs.exclude(status={OrderStatus.DRAFT, OrderStatus.CANCELED})

    def ready_to_confirm(self):
        """Return unconfirmed orders."""
        return self.filter(status=OrderStatus.UNCONFIRMED)


class Order(ModelWithMetadata):
    """
    Represents an order in the marketplace.

    An order is a collection of products that a customer has purchased.

    Attributes:
        created (DateTimeField): The date and time when the order was created.
        status (CharField): The status of the order.
        user (ForeignKey): The user associated with the order.
        language_code (CharField): The language code for the order.
        tracking_client_id (CharField): The tracking client ID for the order.
        billing_address (ForeignKey): The billing address for the order.
        shipping_address (ForeignKey): The shipping address for the order.
        user_email (EmailField): The email address of the user associated with the order.
        original (ForeignKey): The original order from which this order was created.
        origin (CharField): The origin of the order.
        currency (CharField): The currency used for the order.
        shipping_method (ForeignKey): The shipping method for the order.
        shipping_method_name (CharField): The name of the shipping method.
        channel (ForeignKey): The channel associated with the order.
        shipping_price_net_amount (DecimalField): The net amount of the shipping price.
        shipping_price_net (MoneyField): The net shipping price.
        shipping_price_gross_amount (DecimalField): The gross amount of the shipping price.
        shipping_price_gross (MoneyField): The gross shipping price.
        shipping_price (TaxedMoneyField): The taxed shipping price.
        shipping_tax_rate (DecimalField): The tax rate for the shipping price.
        token (CharField): The token associated with the order.
        checkout_token (CharField): The token of the checkout instance that the order was created from.
        total_net_amount (DecimalField): The net amount of the total price.
        undiscounted_total_net_amount (DecimalField): The undiscounted net amount of the total price.
        total_net (MoneyField): The net total price.
        undiscounted_total_net (MoneyField): The undiscounted net total price.
        total_gross_amount (DecimalField): The gross amount of the total price.
        undiscounted_total_gross_amount (DecimalField): The undiscounted gross amount of the total price.
        total_gross (MoneyField): The gross total price.
        undiscounted_total_gross (MoneyField): The undiscounted gross total price.
        total (TaxedMoneyField): The taxed total price.
        undiscounted_total (TaxedMoneyField): The undiscounted taxed total price.
        total_paid_amount (DecimalField): The amount that has been paid for the order.
        total_paid (MoneyField): The total amount paid for the order.
        voucher (ForeignKey): The voucher associated with the order.
        gift_cards (ManyToManyField): The gift cards associated with the order.
        display_gross_prices (BooleanField): Indicates whether gross prices should be displayed.
        customer_note (TextField): The customer's note for the order.
        weight (MeasurementField): The weight of the order.
        redirect_url (URLField): The redirect URL for the order.
        booking (OneToOneField): The booking associated with the order.
    """

    created = models.DateTimeField(default=now, editable=False)
    status = models.CharField(
        max_length=32, default=OrderStatus.UNFULFILLED, choices=OrderStatus.CHOICES
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        related_name="orders",
        on_delete=models.SET_NULL,
    )
    language_code = models.CharField(
        max_length=35, choices=settings.LANGUAGES, default=settings.LANGUAGE_CODE
    )
    tracking_client_id = models.CharField(max_length=36, blank=True, editable=False)
    billing_address = models.ForeignKey(
        "account.Address",
        related_name="+",
        editable=False,
        null=True,
        on_delete=models.SET_NULL,
    )
    shipping_address = models.ForeignKey(
        "account.Address",
        related_name="+",
        editable=False,
        null=True,
        on_delete=models.SET_NULL,
    )
    user_email = models.EmailField(blank=True, default="")
    original = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.SET_NULL
    )
    origin = models.CharField(max_length=32, choices=OrderOrigin.CHOICES)

    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
    )

    shipping_method = models.ForeignKey(
        ShippingMethod,
        blank=True,
        null=True,
        related_name="orders",
        on_delete=models.SET_NULL,
    )
    shipping_method_name = models.CharField(
        max_length=255, null=True, default=None, blank=True, editable=False
    )
    channel = models.ForeignKey(
        Channel,
        related_name="orders",
        on_delete=models.PROTECT,
    )
    shipping_price_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
        editable=False,
    )
    shipping_price_net = MoneyField(
        amount_field="shipping_price_net_amount", currency_field="currency"
    )

    shipping_price_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
        editable=False,
    )
    shipping_price_gross = MoneyField(
        amount_field="shipping_price_gross_amount", currency_field="currency"
    )

    shipping_price = TaxedMoneyField(
        net_amount_field="shipping_price_net_amount",
        gross_amount_field="shipping_price_gross_amount",
        currency_field="currency",
    )
    shipping_tax_rate = models.DecimalField(
        max_digits=5, decimal_places=4, default=Decimal("0.0")
    )

    token = models.CharField(max_length=36, unique=True, blank=True)
    # Token of a checkout instance that this order was created from
    checkout_token = models.CharField(max_length=36, blank=True)

    total_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    undiscounted_total_net_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )

    total_net = MoneyField(amount_field="total_net_amount", currency_field="currency")
    undiscounted_total_net = MoneyField(
        amount_field="undiscounted_total_net_amount", currency_field="currency"
    )

    total_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    undiscounted_total_gross_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )

    total_gross = MoneyField(
        amount_field="total_gross_amount", currency_field="currency"
    )
    undiscounted_total_gross = MoneyField(
        amount_field="undiscounted_total_gross_amount", currency_field="currency"
    )

    total = TaxedMoneyField(
        net_amount_field="total_net_amount",
        gross_amount_field="total_gross_amount",
        currency_field="currency",
    )
    undiscounted_total = TaxedMoneyField(
        net_amount_field="undiscounted_total_net_amount",
        gross_amount_field="undiscounted_total_gross_amount",
        currency_field="currency",
    )

    total_paid_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0,
    )
    total_paid = MoneyField(amount_field="total_paid_amount", currency_field="currency")

    voucher = models.ForeignKey(
        Voucher, blank=True, null=True, related_name="+", on_delete=models.SET_NULL
    )
    gift_cards = models.ManyToManyField(GiftCard, blank=True, related_name="orders")

    display_gross_prices = models.BooleanField(default=True)
    customer_note = models.TextField(blank=True, default="")
    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,  # type: ignore
        default=zero_weight,
    )
    redirect_url = models.URLField(blank=True, null=True)
    booking = models.OneToOneField(
        "product.Booking",
        related_name="order",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    objects = models.Manager.from_queryset(OrderQueryset)()

    class Meta:
        ordering = ("-pk",)
        permissions = ((OrderPermissions.MANAGE_ORDERS.codename, "Manage orders."),)
        indexes = [*ModelWithMetadata.Meta.indexes, GinIndex(fields=["user_email"])]

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = str(uuid4())
        return super().save(*args, **kwargs)

    def is_fully_paid(self):
        return self.total_paid >= self.total.gross

    def is_partly_paid(self):
        return self.total_paid_amount > 0

    def get_customer_email(self):
        return self.user.email if self.user else self.user_email

    def update_total_paid(self):
        self.total_paid_amount = (
            sum(self.payments.values_list("captured_amount", flat=True)) or 0
        )
        self.save(update_fields=["total_paid_amount"])

    def _index_billing_phone(self):
        return self.billing_address.phone

    def _index_shipping_phone(self):
        return self.shipping_address.phone

    def __repr__(self):
        return "<Order #%r>" % (self.id,)

    def __str__(self):
        return "#%d" % (self.id,)

    def get_last_payment(self):
        return max(self.payments.all(), default=None, key=attrgetter("pk"))

    def is_pre_authorized(self):
        return (
            self.payments.filter(
                is_active=True,
                transactions__kind=TransactionKind.AUTH,
                transactions__action_required=False,
            )
            .filter(transactions__is_success=True)
            .exists()
        )

    def is_captured(self):
        return (
            self.payments.filter(
                is_active=True,
                transactions__kind=TransactionKind.CAPTURE,
                transactions__action_required=False,
            )
            .filter(transactions__is_success=True)
            .exists()
        )

    def is_shipping_required(self):
        return any(line.is_shipping_required for line in self.lines.all())

    def get_subtotal(self):
        return get_subtotal(self.lines.all(), self.currency)

    def get_total_quantity(self):
        return sum([line.quantity for line in self.lines.all()])

    def is_draft(self):
        return self.status == OrderStatus.DRAFT

    def is_unconfirmed(self):
        return self.status == OrderStatus.UNCONFIRMED

    def is_open(self):
        statuses = {OrderStatus.UNFULFILLED, OrderStatus.PARTIALLY_FULFILLED}
        return self.status in statuses

    def can_cancel(self):
        statuses_allowed_to_cancel = [
            FulfillmentStatus.CANCELED,
            FulfillmentStatus.REFUNDED,
            FulfillmentStatus.REPLACED,
            FulfillmentStatus.REFUNDED_AND_RETURNED,
            FulfillmentStatus.RETURNED,
        ]
        return (
            not self.fulfillments.exclude(
                status__in=statuses_allowed_to_cancel
            ).exists()
        ) and self.status not in {OrderStatus.CANCELED, OrderStatus.DRAFT}

    def can_capture(self, payment=None):
        if not payment:
            payment = self.get_last_payment()
        if not payment:
            return False
        order_status_ok = self.status not in {OrderStatus.DRAFT, OrderStatus.CANCELED}
        return payment.can_capture() and order_status_ok

    def can_void(self, payment=None):
        if not payment:
            payment = self.get_last_payment()
        if not payment:
            return False
        return payment.can_void()

    def can_refund(self, payment=None):
        if not payment:
            payment = self.get_last_payment()
        if not payment:
            return False
        return payment.can_refund()

    def can_mark_as_paid(self, payments=None):
        if not payments:
            payments = self.payments.all()
        return len(payments) == 0

    @property
    def total_authorized(self):
        return get_total_authorized(self.payments.all(), self.currency)

    @property
    def total_captured(self):
        return self.total_paid

    @property
    def total_balance(self):
        return self.total_captured - self.total.gross

    def get_total_weight(self, *_args):
        return self.weight


class Fulfillment(ModelWithMetadata):
    """
    Represents a fulfillment of an order.

    A fulfillment is a collection of products that have been shipped.

    Attributes:
        fulfillment_order (int): The order in which the fulfillment was created.
        order (Order): The order associated with the fulfillment.
        status (str): The status of the fulfillment.
        tracking_number (str): The tracking number for the fulfillment.
        created (datetime): The date and time when the fulfillment was created.
        shipping_refund_amount (Decimal): The amount refunded for shipping.
        total_refund_amount (Decimal): The total amount refunded.

    """
    fulfillment_order = models.PositiveIntegerField(editable=False)
    order = models.ForeignKey(
        Order, related_name="fulfillments", editable=False, on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=32,
        default=FulfillmentStatus.FULFILLED,
        choices=FulfillmentStatus.CHOICES,
    )
    tracking_number = models.CharField(max_length=255, default="", blank=True)
    created = models.DateTimeField(auto_now_add=True)

    shipping_refund_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        null=True,
        blank=True,
    )
    total_refund_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        null=True,
        blank=True,
    )

    class Meta(ModelWithMetadata.Meta):
        ordering = ("pk",)

    def __str__(self):
        return f"Fulfillment #{self.composed_id}"

    def __iter__(self):
        return iter(self.lines.all())

    def save(self, *args, **kwargs):
        """Assign an auto incremented value as a fulfillment order."""
        if not self.pk:
            groups = self.order.fulfillments.all()
            existing_max = groups.aggregate(Max("fulfillment_order"))
            existing_max = existing_max.get("fulfillment_order__max")
            self.fulfillment_order = existing_max + 1 if existing_max is not None else 1
        return super().save(*args, **kwargs)

    @property
    def composed_id(self):
        return "%s-%s" % (self.order.id, self.fulfillment_order)

    def can_edit(self):
        return self.status != FulfillmentStatus.CANCELED

    def get_total_quantity(self):
        return sum([line.quantity for line in self.lines.all()])

    @property
    def is_tracking_number_url(self):
        return bool(match(r"^[-\w]+://", self.tracking_number))


class FulfillmentLine(models.Model):
    """
    Represents a line item in a fulfillment.

    

    Attributes:
        order_line (OrderLine): The order line associated with this fulfillment line.
        fulfillment (Fulfillment): The fulfillment associated with this fulfillment line.
        quantity (int): The quantity of items in this fulfillment line.
        stock (Stock): The stock associated with this fulfillment line (optional).
    """
    order_line = models.ForeignKey(
        OrderLine, related_name="fulfillment_lines", on_delete=models.CASCADE
    )
    fulfillment = models.ForeignKey(
        Fulfillment, related_name="lines", on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()
    stock = models.ForeignKey(
        "warehouse.Stock",
        related_name="fulfillment_lines",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )


class OrderEvent(models.Model):
    """Model used to store events that happened during the order lifecycle.

    Args:
        parameters: Values needed to display the event on the storefront
        type: Type of an order

    """

    date = models.DateTimeField(default=now, editable=False)
    type = models.CharField(
        max_length=255,
        choices=[
            (type_name.upper(), type_name) for type_name, _ in OrderEvents.CHOICES
        ],
    )
    order = models.ForeignKey(Order, related_name="events", on_delete=models.CASCADE)
    parameters = JSONField(blank=True, default=dict, encoder=CustomJsonEncoder)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    app = models.ForeignKey(App, related_name="+", on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ("date",)

    def __repr__(self):
        return f"{self.__class__.__name__}(type={self.type!r}, user={self.user!r})"
