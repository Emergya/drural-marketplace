# Generated by Django 3.2.6 on 2021-11-02 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("product", "0152_product_created_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="category",
            name="name",
            field=models.CharField(max_length=15),
        ),
    ]
