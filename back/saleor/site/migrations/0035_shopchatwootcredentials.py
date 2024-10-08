# Generated by Django 3.2.6 on 2022-06-08 06:25

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("site", "0034_sitesettings_chatwoot_platform_api_key"),
    ]

    operations = [
        migrations.CreateModel(
            name="ShopChatwootCredentials",
            fields=[
                (
                    "site_settings",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        related_name="chatwoot_credentials",
                        serialize=False,
                        to="site.sitesettings",
                    ),
                ),
                ("email", models.EmailField(max_length=50)),
                (
                    "chatwoot_user_id",
                    models.PositiveIntegerField(
                        null=True,
                        validators=[django.core.validators.MinValueValidator(1)],
                    ),
                ),
                (
                    "chatwoot_account_id",
                    models.PositiveBigIntegerField(
                        null=True,
                        validators=[django.core.validators.MinValueValidator(1)],
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                (
                    "user_api_key",
                    models.CharField(blank=True, max_length=128, null=True),
                ),
                (
                    "website_token",
                    models.CharField(blank=True, max_length=128, null=True),
                ),
                ("hmac", models.CharField(blank=True, max_length=128, null=True)),
            ],
        ),
    ]
