# Generated by Django 3.2.6 on 2021-09-01 09:57

import django.db.models.deletion
import django_countries.fields
from django.db import migrations, models

import saleor.core.db.fields
import saleor.core.utils.editorjs


class Migration(migrations.Migration):

    dependencies = [
        ("company", "0006_alter_company_language_code"),
        ("product", "0148_merge_0147_auto_20210817_1015_0147_category_icon_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="category",
        ),
        migrations.AddField(
            model_name="product",
            name="company",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="products",
                to="company.company",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="product",
            name="details",
            field=saleor.core.db.fields.SanitizedJSONField(
                blank=True,
                null=True,
                sanitizer=saleor.core.utils.editorjs.clean_editor_js,
            ),
        ),
        migrations.AddField(
            model_name="product",
            name="details_plaintext",
            field=models.TextField(blank=True),
        ),
        migrations.CreateModel(
            name="CategoryProduct",
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
                    "sort_order",
                    models.IntegerField(db_index=True, editable=False, null=True),
                ),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="categoryproduct",
                        to="product.category",
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="categoryproduct",
                        to="product.product",
                    ),
                ),
            ],
            options={
                "unique_together": {("product", "category")},
            },
        ),
        migrations.CreateModel(
            name="ProductAddress",
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
                ("street", models.CharField(max_length=2000)),
                ("postal_code", models.CharField(max_length=10)),
                ("locality", models.CharField(max_length=100)),
                ("region", models.CharField(max_length=100)),
                ("country", django_countries.fields.CountryField(max_length=2)),
                (
                    "product",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="product_address",
                        to="product.product",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="product",
            name="categories",
            field=models.ManyToManyField(
                related_name="products",
                through="product.CategoryProduct",
                to="product.Category",
            ),
        ),
    ]
