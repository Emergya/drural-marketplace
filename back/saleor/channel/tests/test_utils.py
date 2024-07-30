import warnings

import pytest

from ..exceptions import NoDefaultChannel
from ..utils import DEPRECATION_WARNING_MESSAGE, get_default_channel


def test_get_default_channel_without_channels():
    with pytest.raises(NoDefaultChannel):
        get_default_channel()


def test_get_default_channel_with_one_channels(channel_EUR):
    with warnings.catch_warnings(record=True) as warns:
        get_default_channel()
        assert any(
            [str(warning.message) == DEPRECATION_WARNING_MESSAGE for warning in warns]
        )

