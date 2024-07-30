import pytest
from django.conf import settings

from ....channel.models import Channel


@pytest.fixture
def channel_EUR(db):
    return Channel.objects.create(
        name="Default-channel",
        slug=settings.DEFAULT_CHANNEL_SLUG,
        currency_code="EUR",
        default_country="ES",
        is_active=True,
    )


@pytest.fixture
def other_channel_EUR(db):
    return Channel.objects.create(
        name="Other Channel EUR",
        slug="other-eur",
        currency_code="EUR",
        default_country="ES",
        is_active=True,
    )
