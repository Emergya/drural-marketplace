# Generated by Django 3.2.6 on 2021-11-10 13:49

import django.db.models.deletion
import django.utils.timezone
import versatileimagefield.fields
from django.conf import settings
from django.db import migrations, models

import saleor.product.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("product", "0155_remove_product_default_address"),
    ]

    operations = [
        migrations.CreateModel(
            name="FraudulentProductReport",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("reason", models.CharField(max_length=1000)),
                (
                    "date",
                    models.DateTimeField(
                        default=django.utils.timezone.now, editable=False
                    ),
                ),
                (
                    "phone",
                    saleor.product.models.PossiblePhoneNumberField(
                        blank=True,
                        db_index=True,
                        default="",
                        max_length=128,
                        region=None,
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="productreport",
                        to="product.product",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="userreport",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="FraudulentProductReportMedia",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    versatileimagefield.fields.VersatileImageField(
                        blank=True, null=True, upload_to="fraudulent_product_reports"
                    ),
                ),
                ("alt", models.CharField(blank=True, max_length=128)),
                (
                    "external_url",
                    models.CharField(blank=True, max_length=256, null=True),
                ),
                ("oembed_data", models.JSONField(blank=True, default=dict)),
                (
                    "fraudulent_product_report",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="media",
                        to="product.fraudulentproductreport",
                    ),
                ),
            ],
        ),
    ]
