import pytest

from ...manager import get_plugins_manager
from ..plugin import SendgridEmailPlugin


@pytest.fixture
def sendgrid_email_plugin(settings, channel_EUR):
    def fun(
        active=True,
        sender_name=None,
        sender_address=None,
        account_confirmation_template_id=None,
        account_set_customer_password_template_id=None,
        account_delete_template_id=None,
        account_change_email_confirm_template_id=None,
        account_change_email_request_template_id=None,
        account_password_reset_template_id=None,
        invoice_ready_template_id=None,
        order_confirmation_template_id=None,
        custom_order_confirmation_template_id=None,
        order_confirmed_template_id=None,
        order_fulfillment_confirmation_template_id=None,
        order_fulfillment_update_template_id=None,
        order_payment_confirmation_template_id=None,
        order_canceled_template_id=None,
        order_refund_confirmation_template_id=None,
        api_key=None,
    ):

        settings.PLUGINS = ["saleor.plugins.sendgrid.plugin.SendgridEmailPlugin"]
        manager = get_plugins_manager()
        manager.save_plugin_configuration(
            SendgridEmailPlugin.PLUGIN_ID,
            channel_EUR.slug,
            {
                "active": active,
                "configuration": [
                    {"name": "sender_name", "value": sender_name},
                    {"name": "sender_address", "value": sender_address},
                    {
                        "name": "account_confirmation_template_id",
                        "value": account_confirmation_template_id,
                    },
                    {
                        "name": "account_set_customer_password_template_id",
                        "value": account_set_customer_password_template_id,
                    },
                    {
                        "name": "account_delete_template_id",
                        "value": account_delete_template_id,
                    },
                    {
                        "name": "account_change_email_confirm_template_id",
                        "value": account_change_email_confirm_template_id,
                    },
                    {
                        "name": "account_change_email_request_template_id",
                        "value": account_change_email_request_template_id,
                    },
                    {
                        "name": "account_password_reset_template_id",
                        "value": account_password_reset_template_id,
                    },
                    {
                        "name": "invoice_ready_template_id",
                        "value": invoice_ready_template_id,
                    },
                    {
                        "name": "order_confirmation_template_id",
                        "value": order_confirmation_template_id,
                    },
                    {
                        "name": "custom_order_confirmation_template_id",
                        "value": custom_order_confirmation_template_id,
                    },
                    {
                        "name": "order_confirmed_template_id",
                        "value": order_confirmed_template_id,
                    },
                    {
                        "name": "order_fulfillment_confirmation_template_id",
                        "value": order_fulfillment_confirmation_template_id,
                    },
                    {
                        "name": "order_fulfillment_update_template_id",
                        "value": order_fulfillment_update_template_id,
                    },
                    {
                        "name": "order_payment_confirmation_template_id",
                        "value": order_payment_confirmation_template_id,
                    },
                    {
                        "name": "order_canceled_template_id",
                        "value": order_canceled_template_id,
                    },
                    {
                        "name": "order_refund_confirmation_template_id",
                        "value": order_refund_confirmation_template_id,
                    },
                    {"name": "api_key", "value": api_key},
                ],
            },
        )
        manager = get_plugins_manager()
        return manager.plugins_per_channel[channel_EUR.slug][0]

    return fun
