from ..email_common import get_email_subject, get_email_template_or_default
from . import constants
from .tasks import (
    send_email_with_link_to_download_file_task,
    send_export_failed_email_task,
    send_set_staff_password_email_task,
    send_staff_order_confirmation_email_task,
    send_staff_password_reset_email_task,
)


def send_set_staff_password_email(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.SET_STAFF_PASSWORD_TEMPLATE_FIELD,
        constants.SET_STAFF_PASSWORD_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.SET_STAFF_PASSWORD_SUBJECT_FIELD,
        constants.SET_STAFF_PASSWORD_DEFAULT_SUBJECT,
    )
    send_set_staff_password_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_csv_product_export_success(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload.get("recipient_email")
    language_code = payload.get("language_code", "en")
    if recipient_email:
        template = get_email_template_or_default(
            plugin_configuration,
            constants.CSV_PRODUCT_EXPORT_SUCCESS_TEMPLATE_FIELD,
            constants.CSV_PRODUCT_EXPORT_SUCCESS_DEFAULT_TEMPLATE,
            constants.DEFAULT_EMAIL_TEMPLATES_PATH,
            language_code=language_code,
        )
        subject = get_email_subject(
            plugin_configuration,
            constants.CSV_PRODUCT_EXPORT_SUCCESS_SUBJECT_FIELD,
            constants.CSV_PRODUCT_EXPORT_SUCCESS_DEFAULT_SUBJECT,
        )
        send_email_with_link_to_download_file_task.delay(
            recipient_email, payload, config, subject, template
        )


def send_staff_order_confirmation(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_list = payload.get("recipient_list")
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.STAFF_ORDER_CONFIRMATION_TEMPLATE_FIELD,
        constants.STAFF_ORDER_CONFIRMATION_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.STAFF_ORDER_CONFIRMATION_SUBJECT_FIELD,
        constants.STAFF_ORDER_CONFIRMATION_DEFAULT_SUBJECT,
    )
    send_staff_order_confirmation_email_task.delay(
        recipient_list, payload, config, subject, template
    )


def send_csv_export_failed(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload.get("recipient_email")
    language_code = payload.get("language_code", "en")
    if recipient_email:
        template = get_email_template_or_default(
            plugin_configuration,
            constants.CSV_EXPORT_FAILED_TEMPLATE_FIELD,
            constants.CSV_EXPORT_FAILED_TEMPLATE_DEFAULT_TEMPLATE,
            constants.DEFAULT_EMAIL_TEMPLATES_PATH,
            language_code=language_code,
        )
        subject = get_email_subject(
            plugin_configuration,
            constants.CSV_EXPORT_FAILED_SUBJECT_FIELD,
            constants.CSV_EXPORT_FAILED_DEFAULT_SUBJECT,
        )
        send_export_failed_email_task.delay(
            recipient_email, payload, config, subject, template
        )


def send_staff_reset_password(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload.get("recipient_email")
    language_code = payload.get("language_code", "en")
    if recipient_email:
        template = get_email_template_or_default(
            plugin_configuration,
            constants.STAFF_PASSWORD_RESET_TEMPLATE_FIELD,
            constants.STAFF_PASSWORD_RESET_DEFAULT_TEMPLATE,
            constants.DEFAULT_EMAIL_TEMPLATES_PATH,
            language_code=language_code,
        )
        subject = get_email_subject(
            plugin_configuration,
            constants.STAFF_PASSWORD_RESET_SUBJECT_FIELD,
            constants.STAFF_PASSWORD_RESET_DEFAULT_SUBJECT,
        )
        send_staff_password_reset_email_task.delay(
            recipient_email, payload, config, subject, template
        )
