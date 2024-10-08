# Generated by Django 3.2.6 on 2022-01-26 12:11

import django_countries.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("product", "0163_auto_20220126_1139"),
        ("product", "0163_auto_20220119_1452"),
    ]

    operations = [
        migrations.AddField(
            model_name="productaddress",
            name="street_second_line",
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name="productaddress",
            name="country",
            field=django_countries.fields.CountryField(
                blank=True, max_length=2, null=True
            ),
        ),
        migrations.AlterField(
            model_name="productaddress",
            name="locality",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name="productaddress",
            name="postal_code",
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name="productaddress",
            name="region",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name="productaddress",
            name="street",
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
    ]
