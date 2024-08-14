import os
from datetime import date

from django.conf import settings
from django.db import models
from django.db.models import Q
from django_prices.models import MoneyField

from ..core.permissions import GiftcardPermissions


class GiftCardQueryset(models.QuerySet):
    """
    Returns a queryset of active gift cards based on the given date.

    Parameters:
        date (datetime.date): The date to filter the gift cards.

    Returns:
        QuerySet: A queryset of active gift cards.

    """
    def active(self, date):
        return self.filter(
            Q(end_date__isnull=True) | Q(end_date__gte=date),
            start_date__lte=date,
            is_active=True,
        )


class GiftCard(models.Model):
    """
    Model representing a gift card.

    Gif card is a type of voucher that can be used as a payment method.

    Attributes:
        code (str): The code of the gift card.
        user (User): The user associated with the gift card.
        created (datetime): The date and time when the gift card was created.
        start_date (date): The start date of the gift card validity.
        end_date (date): The end date of the gift card validity.
        last_used_on (datetime): The date and time when the gift card was last used.
        is_active (bool): Indicates if the gift card is active.
        currency (str): The currency of the gift card.
        initial_balance_amount (Decimal): The initial balance amount of the gift card.
        initial_balance (Money): The initial balance of the gift card.
        current_balance_amount (Decimal): The current balance amount of the gift card.
        current_balance (Money): The current balance of the gift card.

    Methods:
        display_code(): Returns the display code of the gift card.
    """
    code = models.CharField(max_length=16, unique=True, db_index=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="gift_cards",
    )
    created = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(default=date.today)
    end_date = models.DateField(null=True, blank=True)
    last_used_on = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
        default=os.environ.get("DEFAULT_CURRENCY", "EUR"),
    )

    initial_balance_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    initial_balance = MoneyField(
        amount_field="initial_balance_amount", currency_field="currency"
    )

    current_balance_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    current_balance = MoneyField(
        amount_field="current_balance_amount", currency_field="currency"
    )

    objects = models.Manager.from_queryset(GiftCardQueryset)()

    class Meta:
        ordering = ("code",)
        permissions = (
            (GiftcardPermissions.MANAGE_GIFT_CARD.codename, "Manage gift cards."),
        )

    @property
    def display_code(self):
        return "****%s" % self.code[-4:]
