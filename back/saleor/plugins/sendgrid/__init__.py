from dataclasses import dataclass
from typing import Optional


@dataclass
class SendgridConfiguration:
    api_key: Optional[str]
    sender_name: Optional[str]
    sender_address: Optional[str]
    account_confirmation_template_id: Optional[str]
    account_set_customer_password_template_id: Optional[str]
    account_delete_template_id: Optional[str]
    account_change_email_confirm_template_id: Optional[str]
    account_change_email_request_template_id: Optional[str]
    account_password_reset_template_id: Optional[str]
    invoice_ready_template_id: Optional[str]
    order_confirmation_template_id: Optional[str]
    custom_order_confirmation_template_id: Optional[str]
    order_confirmed_template_id: Optional[str]
    order_fulfillment_confirmation_template_id: Optional[str]
    order_fulfillment_update_template_id: Optional[str]
    order_payment_confirmation_template_id: Optional[str]
    order_canceled_template_id: Optional[str]
    order_refund_confirmation_template_id: Optional[str]
    company_created_template_id: Optional[str]
    company_validation_template_id: Optional[str]
    company_add_agent_template_id: Optional[str]
    fraudulent_product_report_template_id: Optional[str]
    product_featured_template_id: Optional[str]
