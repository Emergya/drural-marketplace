# Generated by Django 3.2.6 on 2022-03-29 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("company", "0015_company_banner"),
    ]

    operations = [
        migrations.AddField(
            model_name="company",
            name="banner_alt",
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AlterField(
            model_name="company",
            name="banner",
            field=models.ImageField(
                blank=True, null=True, upload_to="companies/banners"
            ),
        ),
    ]
