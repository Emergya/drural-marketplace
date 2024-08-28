from typing import Set

from django.conf import settings
from django.contrib.auth.models import Permission
from django.db import models
from oauthlib.common import generate_token

from ..core.models import Job, ModelWithMetadata
from ..core.permissions import AppPermission
from ..webhook.event_types import WebhookEventType
from .types import AppType


class AppQueryset(models.QuerySet):
    def for_event_type(self, event_type: str):
        permissions = {}
        required_permission = WebhookEventType.PERMISSIONS.get(event_type)
        if required_permission:
            app_label, codename = required_permission.value.split(".")
            permissions["permissions__content_type__app_label"] = app_label
            permissions["permissions__codename"] = codename
        return self.filter(
            is_active=True,
            webhooks__is_active=True,
            webhooks__events__event_type=event_type,
            **permissions,
        )


class App(ModelWithMetadata):
    """
    Represents an application in the marketplace.

    Attributes:
        name (str): The name of the application.
        created (datetime): The date and time when the application was created.
        is_active (bool): Indicates whether the application is active or not.
        type (str): The type of the application.
        identifier (str): The identifier of the application.
        permissions (ManyToManyField): The permissions associated with the application.
        about_app (str): Information about the application.
        data_privacy (str): The data privacy policy of the application.
        data_privacy_url (str): The URL to the data privacy policy of the application.
        homepage_url (str): The URL to the homepage of the application.
        support_url (str): The URL to the support page of the application.
        configuration_url (str): The URL to the configuration page of the application.
        app_url (str): The URL to the application.
        version (str): The version of the application.
        user (ForeignKey): The user associated with the application.


    """
    name = models.CharField(max_length=60)
    created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    type = models.CharField(
        choices=AppType.CHOICES, default=AppType.LOCAL, max_length=60
    )
    identifier = models.CharField(blank=True, null=True, max_length=256)
    permissions = models.ManyToManyField(
        Permission,
        blank=True,
        help_text="Specific permissions for this app.",
        related_name="app_set",
        related_query_name="app",
    )
    about_app = models.TextField(blank=True, null=True)
    data_privacy = models.TextField(blank=True, null=True)
    data_privacy_url = models.URLField(blank=True, null=True)
    homepage_url = models.URLField(blank=True, null=True)
    support_url = models.URLField(blank=True, null=True)
    configuration_url = models.URLField(blank=True, null=True)
    app_url = models.URLField(blank=True, null=True)
    version = models.CharField(max_length=60, blank=True, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    objects = models.Manager.from_queryset(AppQueryset)()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("name", "pk")
        permissions = (
            (
                AppPermission.MANAGE_APPS.codename,
                "Manage apps",
            ),
        )

    def __str__(self):
        return self.name

    def get_permissions(self) -> Set[str]:
        """Return the permissions of the app."""
        if not self.is_active:
            return set()
        perm_cache_name = "_app_perm_cache"
        if not hasattr(self, perm_cache_name):
            perms = self.permissions.all()
            perms = perms.values_list("content_type__app_label", "codename").order_by()
            setattr(self, perm_cache_name, {f"{ct}.{name}" for ct, name in perms})
        return getattr(self, perm_cache_name)

    def has_perms(self, perm_list):
        """Return True if the app has each of the specified permissions."""
        if not self.is_active:
            return False

        try:
            wanted_perms = {perm.value for perm in perm_list}
        except AttributeError:
            wanted_perms = set(perm_list)
        actual_perms = self.get_permissions()

        return (wanted_perms & actual_perms) == wanted_perms

    def has_perm(self, perm):
        """Return True if the app has the specified permission."""
        if not self.is_active:
            return False

        perm_value = perm.value if hasattr(perm, "value") else perm
        return perm_value in self.get_permissions()


class AppToken(models.Model):
    """
    Model representing an app token.

    Attributes:
        app (ForeignKey): The app associated with the token.
        name (CharField): The name of the token.
        auth_token (CharField): The authentication token.
    """
    app = models.ForeignKey(App, on_delete=models.CASCADE, related_name="tokens")
    name = models.CharField(blank=True, default="", max_length=128)
    auth_token = models.CharField(default=generate_token, unique=True, max_length=30)


class AppInstallation(Job):
    """
    Represents an installation of an app.

    Attributes:
        app_name (str): The name of the app.
        manifest_url (str): The URL of the app's manifest.
        permissions (ManyToManyField): The permissions assigned to the app.
    """
    app_name = models.CharField(max_length=60)
    manifest_url = models.URLField()
    permissions = models.ManyToManyField(
        Permission,
        blank=True,
        help_text="Specific permissions which will be assigned to app.",
        related_name="app_installation_set",
        related_query_name="app_installation",
    )
