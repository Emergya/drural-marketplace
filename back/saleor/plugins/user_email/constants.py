import os

from django.conf import settings

PLUGIN_ID = "mirumee.notifications.user_email"


DEFAULT_EMAIL_TEMPLATES_PATH = os.path.join(
    settings.PROJECT_ROOT, "saleor/plugins/user_email/default_email_templates"
)

ACCOUNT_CONFIRMATION_TEMPLATE_FIELD = "account_confirmation"
ACCOUNT_SET_CUSTOMER_PASSWORD_TEMPLATE_FIELD = "account_set_customer_password"
ACCOUNT_DELETE_TEMPLATE_FIELD = "account_delete"
ACCOUNT_CHANGE_EMAIL_CONFIRM_TEMPLATE_FIELD = "account_change_email_confirm"
ACCOUNT_CHANGE_EMAIL_REQUEST_TEMPLATE_FIELD = "account_change_email_request"
ACCOUNT_PASSWORD_RESET_TEMPLATE_FIELD = "account_password_reset"
INVOICE_READY_TEMPLATE_FIELD = "invoice_ready"
ORDER_CONFIRMATION_TEMPLATE_FIELD = "order_confirmation"
CUSTOM_ORDER_CONFIRMATION_TEMPLATE_FIELD = "custom_order_confirmation"
ORDER_CONFIRMED_TEMPLATE_FIELD = "order_confirmed"
ORDER_FULFILLMENT_CONFIRMATION_TEMPLATE_FIELD = "order_fulfillment_confirmation"
ORDER_FULFILLMENT_UPDATE_TEMPLATE_FIELD = "order_fulfillment_update"
ORDER_PAYMENT_CONFIRMATION_TEMPLATE_FIELD = "order_payment_confirmation"
ORDER_CANCELED_TEMPLATE_FIELD = "order_canceled"
ORDER_REFUND_CONFIRMATION_TEMPLATE_FIELD = "order_refund_confirmation"
COMPANY_CREATED_TEMPLATE_FIELD = "company_created"
COMPANY_ADD_AGENT_TEMPLATE_FIELD = "agent_company_created"
COMPANY_VALIDATION_TEMPLATE_FIELD = "company_validation"
FRAUDULENT_PRODUCT_REPORT_TEMPLATE_FIELD = "fraudulent_product_report"
PRODUCT_FEATURED_TEMPLATE_FIELD = "product_featured"
PRODUCT_REVIEW_REPORT_TEMPLATE_FIELD = "product_review_report"

TEMPLATE_FIELDS = [
    ACCOUNT_CONFIRMATION_TEMPLATE_FIELD,
    ACCOUNT_SET_CUSTOMER_PASSWORD_TEMPLATE_FIELD,
    ACCOUNT_DELETE_TEMPLATE_FIELD,
    ACCOUNT_CHANGE_EMAIL_CONFIRM_TEMPLATE_FIELD,
    ACCOUNT_CHANGE_EMAIL_REQUEST_TEMPLATE_FIELD,
    ACCOUNT_PASSWORD_RESET_TEMPLATE_FIELD,
    INVOICE_READY_TEMPLATE_FIELD,
    ORDER_CONFIRMATION_TEMPLATE_FIELD,
    CUSTOM_ORDER_CONFIRMATION_TEMPLATE_FIELD,
    ORDER_CONFIRMED_TEMPLATE_FIELD,
    ORDER_FULFILLMENT_CONFIRMATION_TEMPLATE_FIELD,
    ORDER_FULFILLMENT_UPDATE_TEMPLATE_FIELD,
    ORDER_PAYMENT_CONFIRMATION_TEMPLATE_FIELD,
    ORDER_CANCELED_TEMPLATE_FIELD,
    ORDER_REFUND_CONFIRMATION_TEMPLATE_FIELD,
    COMPANY_CREATED_TEMPLATE_FIELD,
    COMPANY_ADD_AGENT_TEMPLATE_FIELD,
    COMPANY_VALIDATION_TEMPLATE_FIELD,
    FRAUDULENT_PRODUCT_REPORT_TEMPLATE_FIELD,
    PRODUCT_FEATURED_TEMPLATE_FIELD,
    PRODUCT_REVIEW_REPORT_TEMPLATE_FIELD,
]

ACCOUNT_CONFIRMATION_DEFAULT_TEMPLATE = "confirm.html"
ACCOUNT_SET_CUSTOMER_PASSWORD_DEFAULT_TEMPLATE = "set_customer_password.html"
ACCOUNT_DELETE_DEFAULT_TEMPLATE = "account_delete.html"
ACCOUNT_CHANGE_EMAIL_CONFIRM_DEFAULT_TEMPLATE = "email_changed_notification.html"
ACCOUNT_CHANGE_EMAIL_REQUEST_DEFAULT_TEMPLATE = "request_email_change.html"
ACCOUNT_PASSWORD_RESET_DEFAULT_TEMPLATE = "password_reset.html"
INVOICE_READY_DEFAULT_TEMPLATE = "send_invoice.html"
ORDER_CONFIRMATION_DEFAULT_TEMPLATE = "confirm_order.html"
ORDER_CONFIRMATION_CUSTOM_TEMPLATE = "custom_confirm_order.html"
ORDER_CONFIRMED_DEFAULT_TEMPLATE = "confirmed_order.html"
ORDER_FULFILLMENT_CONFIRMATION_DEFAULT_TEMPLATE = "confirm_fulfillment.html"
ORDER_FULFILLMENT_UPDATE_DEFAULT_TEMPLATE = "update_fulfillment.html"
ORDER_PAYMENT_CONFIRMATION_DEFAULT_TEMPLATE = "confirm_payment.html"
ORDER_CANCELED_DEFAULT_TEMPLATE = "order_cancel.html"
ORDER_REFUND_CONFIRMATION_DEFAULT_TEMPLATE = "order_refund.html"
COMPANY_CREATED_DEFAULT_TEMPLATE = "company_created.html"
COMPANY_ADD_AGENT_DEFAULT_TEMPLATE = "company_add_agent.html"
COMPANY_VALIDATION_DEFAULT_TEMPLATE = "company_validation.html"
FRAUDULENT_PRODUCT_REPORT_TEMPLATE = "fraudulent_product_report.html"
PRODUCT_FEATURED_DEFAULT_TEMPLATE = "product_featured.html"
PRODUCT_REVIEW_REPORT_TEMPLATE = "product_review_report.html"


ACCOUNT_CONFIRMATION_SUBJECT_FIELD = "account_confirmation_subject"
ACCOUNT_SET_CUSTOMER_PASSWORD_SUBJECT_FIELD = "account_set_customer_password_subject"
ACCOUNT_DELETE_SUBJECT_FIELD = "account_delete_subject"
ACCOUNT_CHANGE_EMAIL_CONFIRM_SUBJECT_FIELD = "account_change_email_confirm_subject"
ACCOUNT_CHANGE_EMAIL_REQUEST_SUBJECT_FIELD = "account_change_email_request_subject"
ACCOUNT_PASSWORD_RESET_SUBJECT_FIELD = "account_password_reset_subject"
INVOICE_READY_SUBJECT_FIELD = "invoice_ready_subject"
ORDER_CONFIRMATION_SUBJECT_FIELD = "order_confirmation_subject"
ORDER_CONFIRMED_SUBJECT_FIELD = "order_confirmed_subject"
ORDER_FULFILLMENT_CONFIRMATION_SUBJECT_FIELD = "order_fulfillment_confirmation_subject"
ORDER_FULFILLMENT_UPDATE_SUBJECT_FIELD = "order_fulfillment_update_subject"
ORDER_PAYMENT_CONFIRMATION_SUBJECT_FIELD = "order_payment_confirmation_subject"
ORDER_CANCELED_SUBJECT_FIELD = "order_canceled_subject"
ORDER_REFUND_CONFIRMATION_SUBJECT_FIELD = "order_refund_confirmation_subject"
COMPANY_CREATED_SUBJECT_FIELD = "company_created_subject"
COMPANY_ADD_AGENT_SUBJECT_FIELD = "company_add_agent_subject"
COMPANY_VALIDATION_SUBJECT_FIELD = "company_validation_subject"
FRAUDULENT_PRODUCT_REPORT_SUBJECT_FIELD = "fraduludent_product_report_subject"
PRODUCT_FEATURED_SUBJECT_FIELD = "product_featured_subject"
PRODUCT_REVIEW_REPORT_SUBJECT_FIELD = "product_review_report_subject"


ACCOUNT_CONFIRMATION_DEFAULT_SUBJECT = "Account confirmation e-mail"
ACCOUNT_SET_CUSTOMER_PASSWORD_DEFAULT_SUBJECT = "Hello from {{ site_name }}!"
ACCOUNT_DELETE_DEFAULT_SUBJECT = "Delete your account"
ACCOUNT_CHANGE_EMAIL_CONFIRM_DEFAULT_SUBJECT = "Email change e-mail"
ACCOUNT_CHANGE_EMAIL_REQUEST_DEFAULT_SUBJECT = "Email change e-mail"
ACCOUNT_PASSWORD_RESET_DEFAULT_SUBJECT = "Password reset e-mail"
INVOICE_READY_DEFAULT_SUBJECT = "Invoice"
ORDER_CONFIRMATION_DEFAULT_SUBJECT = "Order #{{ order.number }} details"
ORDER_CONFIRMED_DEFAULT_SUBJECT = "Order #{{ order.number }} confirmed"
ORDER_FULFILLMENT_CONFIRMATION_DEFAULT_SUBJECT = (
    "Your order {{ order.number }} has been fulfilled"
)
ORDER_FULFILLMENT_UPDATE_DEFAULT_SUBJECT = (
    "Shipping update for order {{ order.number }}"
)
ORDER_PAYMENT_CONFIRMATION_DEFAULT_SUBJECT = "Order {{ order.number }} payment details"
ORDER_CANCELED_DEFAULT_SUBJECT = "Order {{ order.number }} canceled"
ORDER_REFUND_CONFIRMATION_DEFAULT_SUBJECT = "Order {{ order.number }} refunded"

COMPANY_CREATED_DEFAULT_SUBJECT = "Company created"
COMPANY_ADD_AGENT_DEFAULT_SUBJECT = "Agent created"
COMPANY_VALIDATION_DEFAULT_SUBJECT = "Company validation"
FRAUDULENT_PRODUCT_REPORT_DEFAULT_SUBJECT = "Fraduludent product report"
PRODUCT_FEATURED_DEFAULT_SUBJECT = "Product featured"
PRODUCT_REVIEW_REPORT_DEFAULT_SUBJECT = "Product review report"
