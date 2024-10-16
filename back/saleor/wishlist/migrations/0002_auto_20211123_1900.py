# Generated by Django 3.2.6 on 2021-11-23 19:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("product", "0155_remove_product_default_address"),
        ("wishlist", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="wishlist",
            name="default",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="wishlist",
            name="image",
            field=models.ImageField(
                default="wishlists/default-wishlist.png", upload_to="wishlists"
            ),
        ),
        migrations.AddField(
            model_name="wishlist",
            name="name",
            field=models.CharField(
                blank=True, default="Default wishlist", max_length=256
            ),
        ),
        migrations.AddField(
            model_name="wishlistitem",
            name="variant",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="wishlist_items",
                to="product.productvariant",
            ),
        ),
        migrations.AlterField(
            model_name="wishlist",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="wishlists",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterUniqueTogether(
            name="wishlistitem",
            unique_together={("wishlist", "variant")},
        ),
        migrations.RemoveField(
            model_name="wishlistitem",
            name="product",
        ),
        migrations.RemoveField(
            model_name="wishlistitem",
            name="variants",
        ),
    ]
