from ..email_common import get_email_subject, get_email_template_or_default
from . import constants
from .tasks import (
    send_account_confirmation_email_task,
    send_account_delete_confirmation_email_task,
    send_company_created_email_task,
    send_company_add_agent_email_task,
    send_company_validation_email_task,
    send_fraudulent_product_report_task,
    send_fulfillment_confirmation_email_task,
    send_fulfillment_update_email_task,
    send_invoice_email_task,
    send_order_canceled_email_task,
    send_order_confirmation_email_task,
    send_order_confirmed_email_task,
    send_order_custom_confirmation_email_task,
    send_order_refund_email_task,
    send_password_reset_email_task,
    send_payment_confirmation_email_task,
    send_product_featured_task,
    send_request_email_change_email_task,
    send_set_user_password_email_task,
    send_user_change_email_notification_task,
    send_product_review_report_task,
)


def send_account_password_reset_event(
    payload: dict, config: dict, plugin_configuration: list
):
    language_code = payload.get("language_code", "en")
    recipient_email = payload["recipient_email"]
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ACCOUNT_PASSWORD_RESET_TEMPLATE_FIELD,
        constants.ACCOUNT_PASSWORD_RESET_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ACCOUNT_PASSWORD_RESET_SUBJECT_FIELD,
        constants.ACCOUNT_PASSWORD_RESET_DEFAULT_SUBJECT,
    )
    send_password_reset_email_task.delay(
        recipient_email,
        payload,
        config,
        subject,
        template,
    )


def send_account_confirmation(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ACCOUNT_CONFIRMATION_TEMPLATE_FIELD,
        constants.ACCOUNT_CONFIRMATION_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ACCOUNT_CONFIRMATION_SUBJECT_FIELD,
        constants.ACCOUNT_CONFIRMATION_DEFAULT_SUBJECT,
    )
    send_account_confirmation_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_account_change_email_request(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ACCOUNT_CHANGE_EMAIL_REQUEST_TEMPLATE_FIELD,
        constants.ACCOUNT_CHANGE_EMAIL_REQUEST_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ACCOUNT_CHANGE_EMAIL_REQUEST_SUBJECT_FIELD,
        constants.ACCOUNT_CHANGE_EMAIL_REQUEST_DEFAULT_SUBJECT,
    )
    send_request_email_change_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_account_change_email_confirm(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")

    template = get_email_template_or_default(
        plugin_configuration,
        constants.ACCOUNT_CHANGE_EMAIL_CONFIRM_TEMPLATE_FIELD,
        constants.ACCOUNT_CHANGE_EMAIL_CONFIRM_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ACCOUNT_CHANGE_EMAIL_CONFIRM_SUBJECT_FIELD,
        constants.ACCOUNT_CHANGE_EMAIL_CONFIRM_DEFAULT_SUBJECT,
    )
    send_user_change_email_notification_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_account_delete(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ACCOUNT_DELETE_TEMPLATE_FIELD,
        constants.ACCOUNT_DELETE_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ACCOUNT_DELETE_SUBJECT_FIELD,
        constants.ACCOUNT_DELETE_DEFAULT_SUBJECT,
    )
    send_account_delete_confirmation_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_account_set_customer_password(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ACCOUNT_SET_CUSTOMER_PASSWORD_TEMPLATE_FIELD,
        constants.ACCOUNT_SET_CUSTOMER_PASSWORD_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ACCOUNT_SET_CUSTOMER_PASSWORD_SUBJECT_FIELD,
        constants.ACCOUNT_SET_CUSTOMER_PASSWORD_DEFAULT_SUBJECT,
    )
    send_set_user_password_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_invoice(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.INVOICE_READY_TEMPLATE_FIELD,
        constants.INVOICE_READY_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.INVOICE_READY_SUBJECT_FIELD,
        constants.INVOICE_READY_DEFAULT_SUBJECT,
    )
    send_invoice_email_task.delay(recipient_email, payload, config, subject, template)


def send_order_confirmation(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    # Esto devuelve el template cargado.
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ORDER_CONFIRMATION_TEMPLATE_FIELD,
        constants.ORDER_CONFIRMATION_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ORDER_CONFIRMATION_SUBJECT_FIELD,
        constants.ORDER_CONFIRMATION_DEFAULT_SUBJECT,
    )
    send_order_confirmation_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_custom_order_confirmation(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.CUSTOM_ORDER_CONFIRMATION_TEMPLATE_FIELD,
        constants.ORDER_CONFIRMATION_CUSTOM_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = payload.pop("subject")
    send_order_custom_confirmation_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_fulfillment_confirmation(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ORDER_FULFILLMENT_CONFIRMATION_TEMPLATE_FIELD,
        constants.ORDER_FULFILLMENT_CONFIRMATION_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ORDER_FULFILLMENT_CONFIRMATION_SUBJECT_FIELD,
        constants.ORDER_FULFILLMENT_CONFIRMATION_DEFAULT_SUBJECT,
    )
    send_fulfillment_confirmation_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_fulfillment_update(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ORDER_FULFILLMENT_UPDATE_TEMPLATE_FIELD,
        constants.ORDER_FULFILLMENT_UPDATE_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ORDER_FULFILLMENT_UPDATE_SUBJECT_FIELD,
        constants.ORDER_FULFILLMENT_UPDATE_DEFAULT_SUBJECT,
    )
    send_fulfillment_update_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_payment_confirmation(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ORDER_PAYMENT_CONFIRMATION_TEMPLATE_FIELD,
        constants.ORDER_PAYMENT_CONFIRMATION_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ORDER_PAYMENT_CONFIRMATION_SUBJECT_FIELD,
        constants.ORDER_PAYMENT_CONFIRMATION_DEFAULT_SUBJECT,
    )
    send_payment_confirmation_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_order_canceled(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ORDER_CANCELED_TEMPLATE_FIELD,
        constants.ORDER_CANCELED_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ORDER_CANCELED_SUBJECT_FIELD,
        constants.ORDER_CANCELED_DEFAULT_SUBJECT,
    )
    send_order_canceled_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_order_refund(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ORDER_REFUND_CONFIRMATION_TEMPLATE_FIELD,
        constants.ORDER_REFUND_CONFIRMATION_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ORDER_REFUND_CONFIRMATION_SUBJECT_FIELD,
        constants.ORDER_REFUND_CONFIRMATION_DEFAULT_SUBJECT,
    )
    send_order_refund_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_order_confirmed(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    template = get_email_template_or_default(
        plugin_configuration,
        constants.ORDER_CONFIRMED_TEMPLATE_FIELD,
        constants.ORDER_CONFIRMED_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.ORDER_CONFIRMED_SUBJECT_FIELD,
        constants.ORDER_CONFIRMED_DEFAULT_SUBJECT,
    )
    send_order_confirmed_email_task.delay(
        recipient_email, payload, config, subject, template
    )


def send_company_created(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    email_template_str = get_email_template_or_default(
        plugin_configuration,
        constants.COMPANY_CREATED_TEMPLATE_FIELD,
        constants.COMPANY_CREATED_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.COMPANY_CREATED_SUBJECT_FIELD,
        constants.COMPANY_CREATED_DEFAULT_SUBJECT,
    )
    send_company_created_email_task.delay(
        recipient_email, payload, config, subject, email_template_str
    )

def send_company_add_agent(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    email_template_str = get_email_template_or_default(
        plugin_configuration,
        constants.COMPANY_ADD_AGENT_SUBJECT_FIELD,
        constants.COMPANY_ADD_AGENT_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.COMPANY_ADD_AGENT_SUBJECT_FIELD,
        constants.COMPANY_ADD_AGENT_DEFAULT_SUBJECT,
    )
    send_company_add_agent_email_task.delay(
        recipient_email, payload, config, subject, email_template_str
    )

def send_company_validation(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    email_template_str = get_email_template_or_default(
        plugin_configuration,
        constants.COMPANY_VALIDATION_TEMPLATE_FIELD,
        constants.COMPANY_VALIDATION_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.COMPANY_VALIDATION_SUBJECT_FIELD,
        constants.COMPANY_VALIDATION_DEFAULT_SUBJECT,
    )
    send_company_validation_email_task.delay(
        recipient_email, payload, config, subject, email_template_str
    )


def send_fraudulent_product_report(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    email_template_str = get_email_template_or_default(
        plugin_configuration,
        constants.FRAUDULENT_PRODUCT_REPORT_TEMPLATE_FIELD,
        constants.FRAUDULENT_PRODUCT_REPORT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.FRAUDULENT_PRODUCT_REPORT_SUBJECT_FIELD,
        constants.FRAUDULENT_PRODUCT_REPORT_DEFAULT_SUBJECT,
    )
    send_fraudulent_product_report_task.delay(
        recipient_email, payload, config, subject, email_template_str
    )


def send_product_featured(payload: dict, config: dict, plugin_configuration: list):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    email_template_str = get_email_template_or_default(
        plugin_configuration,
        constants.PRODUCT_FEATURED_TEMPLATE_FIELD,
        constants.PRODUCT_FEATURED_DEFAULT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.PRODUCT_FEATURED_SUBJECT_FIELD,
        constants.PRODUCT_FEATURED_DEFAULT_SUBJECT,
    )
    send_product_featured_task.delay(
        recipient_email, payload, config, subject, email_template_str
    )

def send_product_review_report(
    payload: dict, config: dict, plugin_configuration: list
):
    recipient_email = payload["recipient_email"]
    language_code = payload.get("language_code", "en")
    email_template_str = get_email_template_or_default(
        plugin_configuration,
        constants.PRODUCT_REVIEW_REPORT_TEMPLATE_FIELD,
        constants.PRODUCT_REVIEW_REPORT_TEMPLATE,
        constants.DEFAULT_EMAIL_TEMPLATES_PATH,
        language_code=language_code,
    )
    subject = get_email_subject(
        plugin_configuration,
        constants.PRODUCT_REVIEW_REPORT_SUBJECT_FIELD,
        constants.PRODUCT_REVIEW_REPORT_DEFAULT_SUBJECT,
    )
    send_product_review_report_task.delay(        
        recipient_email, payload, config, subject, email_template_str
    )