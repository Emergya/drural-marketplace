from django.db import models

from ..app.models import App
from ..app.validators import AppURLValidator


class WebhookURLField(models.URLField):
    """
    Custom URLField for webhook URLs with additional validation.

    Attributes:
        default_validators (list): A list of validators that includes AppURLValidator 
                                   to allow specific URL schemes: http, https, awssqs, gcpubsub.
    """
    default_validators = [
        AppURLValidator(schemes=["http", "https", "awssqs", "gcpubsub"])
    ]


class Webhook(models.Model):
    """
    Represents a webhook that can be used to send notifications to external services.

    Attributes:
        name (str): The name of the webhook.
        app (ForeignKey): The app associated with the webhook.
        target_url (WebhookURLField): The URL to which the webhook will send notifications.
        is_active (bool): Indicates whether the webhook is active.
        secret_key (str): A secret key used for signing webhook payloads.
    """
    name = models.CharField(max_length=255, null=True, blank=True)
    app = models.ForeignKey(App, related_name="webhooks", on_delete=models.CASCADE)
    target_url = WebhookURLField(max_length=255)
    is_active = models.BooleanField(default=True)
    secret_key = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        ordering = ("pk",)

    def __str__(self):
        return self.name


class WebhookEvent(models.Model):
    """
    Represents an event that can trigger a webhook.

    Attributes:
        webhook (ForeignKey): The webhook that will be triggered by the event.
        event_type (str): The type of event that will trigger the webhook.
    """
    webhook = models.ForeignKey(
        Webhook, related_name="events", on_delete=models.CASCADE
    )
    event_type = models.CharField("Event type", max_length=128, db_index=True)

    def __repr__(self):
        return self.event_type
