# Generated by Django 3.2.6 on 2021-10-19 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("company", "0008_alter_company_is_enabled"),
    ]

    operations = [
        migrations.AddField(
            model_name="company",
            name="rating",
            field=models.FloatField(blank=True, null=True),
        ),
    ]
