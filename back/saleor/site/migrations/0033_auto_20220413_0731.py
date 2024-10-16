# Generated by Django 3.2.6 on 2022-04-13 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("site", "0032_auto_20220406_0638"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sitesettings",
            name="dashboard_banner",
            field=models.ImageField(blank=True, null=True, upload_to="customization"),
        ),
        migrations.AlterField(
            model_name="sitesettings",
            name="logo",
            field=models.ImageField(blank=True, null=True, upload_to="customization"),
        ),
        migrations.AlterField(
            model_name="sitesettings",
            name="storefront_banner",
            field=models.ImageField(blank=True, null=True, upload_to="customization"),
        ),
    ]
