# Generated by Django 3.2.6 on 2022-01-11 09:10

import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("product", "0159_auto_20220110_1048"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="booking",
            options={"ordering": ("variant", "bookable_resource", "user")},
        ),
        migrations.RenameField(
            model_name="booking",
            old_name="product_name",
            new_name="variant_name",
        ),
        migrations.RenameField(
            model_name="booking",
            old_name="product_sku",
            new_name="variant_sku",
        ),
        migrations.RemoveField(
            model_name="booking",
            name="product",
        ),
        migrations.AddField(
            model_name="booking",
            name="booking_reference",
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
        migrations.AddField(
            model_name="booking",
            name="variant",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="bookings",
                to="product.productvariant",
            ),
        ),
        migrations.CreateModel(
            name="BookableResourceProduct",
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
                    "bookable_resource",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="product.BookableResource",
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="product.product",
                    ),
                ),
            ],
            options={
                "unique_together": {("product", "bookable_resource")},
            },
        ),
        migrations.AddField(
            model_name="product",
            name="bookable_resources",
            field=models.ManyToManyField(
                related_name="products",
                through="product.BookableResourceProduct",
                to="product.BookableResource",
            ),
        ),
    ]
