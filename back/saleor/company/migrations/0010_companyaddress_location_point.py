# Generated by Django 3.2.6 on 2021-11-19 09:29

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("company", "0009_company_rating"),
    ]

    operations = [
        migrations.AddField(
            model_name="companyaddress",
            name="location_point",
            field=django.contrib.gis.db.models.fields.PointField(
                blank=True, null=True, srid=4326
            ),
        ),
    ]
