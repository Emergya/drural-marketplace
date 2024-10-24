class UserNotifyEvent:
    ACCOUNT_CONFIRMATION = "account_confirmation"
    ACCOUNT_PASSWORD_RESET = "account_password_reset"
    ACCOUNT_CHANGE_EMAIL_REQUEST = "account_change_email_request"
    ACCOUNT_CHANGE_EMAIL_CONFIRM = "account_change_email_confirm"
    ACCOUNT_DELETE = "account_delete"
    ACCOUNT_SET_CUSTOMER_PASSWORD = "account_set_customer_password"
    INVOICE_READY = "invoice_ready"
    ORDER_CONFIRMATION = "order_confirmation"
    CUSTOM_ORDER_CONFIRMATION = "custom_order_confirmation"
    ORDER_CONFIRMED = "order_confirmed"
    ORDER_FULFILLMENT_CONFIRMATION = "order_fulfillment_confirmation"
    ORDER_FULFILLMENT_UPDATE = "order_fulfillment_update"
    ORDER_PAYMENT_CONFIRMATION = "order_payment_confirmation"
    ORDER_CANCELED = "order_canceled"
    ORDER_REFUND_CONFIRMATION = "order_refund_confirmation"
    COMPANY_CREATED = "company_created"
    COMPANY_ADD_AGENT = "company_add_agent"
    COMPANY_VALIDATION = "company_validation"
    FRAUDULENT_PRODUCT_REPORT = "fraudulent_product_report"
    PRODUCT_FEATURED = "product_featured"

    CHOICES = [
        ACCOUNT_CONFIRMATION,
        ACCOUNT_PASSWORD_RESET,
        ACCOUNT_CHANGE_EMAIL_REQUEST,
        ACCOUNT_CHANGE_EMAIL_CONFIRM,
        ACCOUNT_DELETE,
        ACCOUNT_SET_CUSTOMER_PASSWORD,
        INVOICE_READY,
        ORDER_CONFIRMATION,
        CUSTOM_ORDER_CONFIRMATION,
        ORDER_CONFIRMED,
        ORDER_FULFILLMENT_CONFIRMATION,
        ORDER_FULFILLMENT_UPDATE,
        ORDER_PAYMENT_CONFIRMATION,
        ORDER_CANCELED,
        ORDER_REFUND_CONFIRMATION,
        COMPANY_CREATED,
        COMPANY_VALIDATION,
        FRAUDULENT_PRODUCT_REPORT,
        PRODUCT_FEATURED,
        COMPANY_ADD_AGENT,
    ]


class AdminNotifyEvent:
    ACCOUNT_SET_STAFF_PASSWORD = "account_set_staff_password"
    ACCOUNT_STAFF_RESET_PASSWORD = "account_staff_reset_password"
    CSV_PRODUCT_EXPORT_SUCCESS = "csv_export_products_success"
    CSV_EXPORT_FAILED = "csv_export_failed"
    STAFF_ORDER_CONFIRMATION = "staff_order_confirmation"

    CHOICES = [
        ACCOUNT_SET_STAFF_PASSWORD,
        CSV_PRODUCT_EXPORT_SUCCESS,
        CSV_EXPORT_FAILED,
        STAFF_ORDER_CONFIRMATION,
        ACCOUNT_STAFF_RESET_PASSWORD,
    ]


class NotifyEventType(UserNotifyEvent, AdminNotifyEvent):
    CHOICES = UserNotifyEvent.CHOICES + AdminNotifyEvent.CHOICES
