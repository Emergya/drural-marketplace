from unittest import mock

from django.core.files.uploadedfile import TemporaryUploadedFile

from ...core.notifications import get_site_context
from ...core.notify_events import AdminNotifyEvent
from ...core.utils import build_absolute_uri
from .. import notifications
from ..notifications import get_default_export_payload


@mock.patch("saleor.plugins.manager.PluginsManager.notify")
def test_send_export_download_link_notification(
    mocked_notify, site_settings, user_export_file, tmpdir, media_root
):
    # given
    file_mock = TemporaryUploadedFile(
        name="temp_file.csv", size=5, charset="utf8", content_type="application/CSV"
    )

    user_export_file.content_file = file_mock
    user_export_file.save()

    # when
    notifications.send_export_download_link_notification(user_export_file)

    # then
    expected_payload = {
        "export": get_default_export_payload(user_export_file),
        "csv_link": build_absolute_uri(user_export_file.content_file.url),
        "recipient_email": user_export_file.user.email,
        "language_code": "en",
        **get_site_context(),
    }

    mocked_notify.assert_called_once_with(
        AdminNotifyEvent.CSV_PRODUCT_EXPORT_SUCCESS, expected_payload
    )


@mock.patch("saleor.plugins.manager.PluginsManager.notify")
def test_send_export_failed_info(
    mocked_notify, site_settings, user_export_file, tmpdir, media_root
):
    # given
    file_mock = TemporaryUploadedFile(
        name="temp_file.csv", size=5, charset="utf8", content_type="application/CSV"
    )

    user_export_file.content_file = file_mock
    user_export_file.save()

    # when
    notifications.send_export_failed_info(user_export_file)

    # then
    expected_payload = {
        "export": get_default_export_payload(user_export_file),
        "recipient_email": user_export_file.user.email,
        "language_code": "en",
        **get_site_context(),
    }

    mocked_notify.assert_called_once_with(
        AdminNotifyEvent.CSV_EXPORT_FAILED, expected_payload
    )
