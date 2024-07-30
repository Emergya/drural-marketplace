# Generated by Django 3.2.6 on 2022-01-19 14:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("product", "0163_auto_20220119_1452"),
        ("checkout", "0037_remove_empty_lines"),
    ]

    operations = [
        migrations.AddField(
            model_name="checkout",
            name="booking",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="checkout",
                to="product.booking",
            ),
        ),
    ]
