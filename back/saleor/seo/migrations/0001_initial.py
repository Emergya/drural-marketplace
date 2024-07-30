# Generated by Django 3.2.6 on 2022-07-08 11:15

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_keyword', models.CharField(blank=True, max_length=70, null=True, unique=True, validators=[django.core.validators.MaxLengthValidator(70)])),
            ],
            options={
                'ordering': ['pk'],
            },
        ),
    ]
