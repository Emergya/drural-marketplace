# Generated by Django 3.2.6 on 2022-07-08 06:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('site', '0036_alter_shopchatwootcredentials_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShopGoogleAnalytics',
            fields=[
                ('site_settings', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='google_analytics', serialize=False, to='site.sitesettings')),
                ('measurement_id', models.CharField(blank=True, max_length=128, null=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
    ]
