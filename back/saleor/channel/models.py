from django.conf import settings
from django.db import models
from django_countries.fields import CountryField

from ..core.permissions import ChannelPermissions


class Channel(models.Model):
    """
    Represents a channel in the marketplace.

    The channel saves all product configuration.

    Attributes:
        name (str): The name of the channel.
        is_active (bool): Indicates whether the channel is active or not.
        slug (str): The unique slug for the channel.
        currency_code (str): The currency code for the channel.
        default_country (CountryField): The default country for the channel.

    Meta:
        ordering (tuple): The ordering of the channels.
        app_label (str): The label of the app.
        permissions (tuple): The permissions for managing channels.

    Methods:
        __str__(): Returns the slug of the channel.

    """
    ...
    name = models.CharField(max_length=250)
    is_active = models.BooleanField(default=False)
    slug = models.SlugField(max_length=255, unique=True)
    currency_code = models.CharField(max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH)
    default_country = CountryField()

    class Meta:
        ordering = ("slug",)
        app_label = "channel"
        permissions = (
            (
                ChannelPermissions.MANAGE_CHANNELS.codename,
                "Manage channels.",
            ),
        )

    def __str__(self):
        return self.slug
