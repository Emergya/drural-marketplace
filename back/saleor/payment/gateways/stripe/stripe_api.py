import logging
from contextlib import contextmanager
from typing import List, Optional, Tuple
from urllib.parse import urljoin

import stripe
from django.contrib.sites.models import Site
from django.urls import reverse
from stripe.error import AuthenticationError, InvalidRequestError, StripeError
from stripe.stripe_object import StripeObject

from ....core.tracing import opentracing_trace
from ....core.utils import build_absolute_uri
from ...interface import PaymentMethodInfo
from .consts import (
    AUTOMATIC_CAPTURE_METHOD,
    MANUAL_CAPTURE_METHOD,
    METADATA_IDENTIFIER,
    PLUGIN_ID,
    STRIPE_API_VERSION,
    WEBHOOK_EVENTS,
    WEBHOOK_PATH,
)

logger = logging.getLogger(__name__)


@contextmanager
def stripe_opentracing_trace(span_name):
    with opentracing_trace(
        span_name=span_name, component_name="payment", service_name="stripe"
    ):
        yield


def account_create(api_key, company):
    stripe.api_key = api_key
    return stripe.Account.create(
        type="standard",
        business_type="company",
        country=company.address.country,
        company={
            "address": {
                "city": company.address.locality,
                "country": company.address.country,
                "line1": company.address.street,
                "line2": company.address.street_second_line,
                "postal_code": company.address.postal_code,
                "state": company.address.region,
            },
            "name": company.name,
            "registration_number": company.cif,
        },
    )


def accounlink_create(api_key, account_id, refresh_url, return_url):
    stripe.api_key = api_key
    return stripe.AccountLink.create(
        account=account_id,
        refresh_url=refresh_url,
        return_url=return_url,
        type="account_onboarding",
    )


def get_account(api_key, account_id):
    stripe.api_key = api_key
    return stripe.Account.retrieve(account_id)


def is_secret_api_key_valid(api_key: str):
    """Call api to check if api_key is a correct key."""
    try:
        with stripe_opentracing_trace("stripe.WebhookEndpoint.list"):
            stripe.WebhookEndpoint.list(api_key, stripe_version=STRIPE_API_VERSION)
        return True
    except AuthenticationError:
        return False


def _extra_log_data(error: StripeError, payment_intent_id: Optional[str] = None):
    data = {
        "error_message": error.user_message,
        "http_status": error.http_status,
        "code": error.code,
    }
    if payment_intent_id is not None:
        data["payment_intent_id"] = payment_intent_id
    return data


def subscribe_webhook(api_key: str, channel_slug: str) -> Optional[StripeObject]:
    domain = Site.objects.get_current().domain
    api_path = reverse(
        "plugins-per-channel",
        kwargs={"plugin_id": PLUGIN_ID, "channel_slug": channel_slug},
    )

    base_url = build_absolute_uri(api_path)
    webhook_url = urljoin(base_url, WEBHOOK_PATH)  # type: ignore

    with stripe_opentracing_trace("stripe.WebhookEndpoint.create"):
        try:
            return stripe.WebhookEndpoint.create(
                api_key=api_key,
                url=webhook_url,
                enabled_events=WEBHOOK_EVENTS,
                metadata={METADATA_IDENTIFIER: domain},
                stripe_version=STRIPE_API_VERSION,
            )
        except StripeError as error:
            logger.warning(
                "Failed to create Stripe webhook",
                extra=_extra_log_data(error),
            )
            return None


def delete_webhook(api_key: str, webhook_id: str):
    try:
        with stripe_opentracing_trace("stripe.WebhookEndpoint.delete"):
            stripe.WebhookEndpoint.delete(
                webhook_id,
                api_key=api_key,
                stripe_version=STRIPE_API_VERSION,
            )
    except InvalidRequestError:
        # webhook doesn't exist
        pass


def get_or_create_customer(
    api_key: str,
    stripe_account_id: str,
    customer_id: Optional[str] = None,
    customer_email: Optional[str] = None,
    payment_method: Optional[str] = None,
) -> Optional[StripeObject]:
    try:
        stripe.api_key = api_key
        if customer_id:
            customer = stripe.Customer.retrieve(
                id=customer_id,
                stripe_account=stripe_account_id,
            )
        else:
            customer = stripe.Customer.create(
                email=customer_email,
                stripe_account=stripe_account_id,
                payment_method=payment_method,
            )
        return customer
    except StripeError as error:
        logger.warning(
            "Failed to get/create Stripe customer",
            extra=_extra_log_data(error),
        )
        return None


def create_payment_intent(
    api_key: str,
    total_amount: int,
    currency: str,
    drural_fee_amount: int,
    company_stripe_account_id: str,
    auto_capture: bool = True,
    customer: Optional[StripeObject] = None,
    payment_method_id: Optional[str] = None,
    metadata: Optional[dict] = None,
    setup_future_usage: Optional[str] = None,
    off_session: Optional[bool] = None,
    payment_method_types: Optional[List[str]] = None,
    customer_email: Optional[str] = None,
):
    stripe.api_key = api_key

    capture_method = AUTOMATIC_CAPTURE_METHOD if auto_capture else MANUAL_CAPTURE_METHOD
    additional_params = {}  # type: ignore

    if customer:
        additional_params["customer"] = customer

    if payment_method_id and customer:
        additional_params["payment_method"] = payment_method_id

        additional_params["off_session"] = off_session if off_session else False
        if off_session:
            additional_params["confirm"] = True

    if setup_future_usage in ["on_session", "off_session"] and not payment_method_id:
        additional_params["setup_future_usage"] = setup_future_usage

    if metadata:
        additional_params["metadata"] = metadata

    if payment_method_types and isinstance(payment_method_types, list):
        additional_params["payment_method_types"] = payment_method_types

    if customer_email:
        additional_params["receipt_email"] = customer_email

    try:
        return (
            stripe.PaymentIntent.create(
                amount=total_amount,
                currency=currency,
                application_fee_amount=drural_fee_amount,
                stripe_account=company_stripe_account_id,
                capture_method=capture_method,
                **additional_params,
            ),
            None,
        )
    except StripeError as error:
        logger.warning(
            "Failed to create Stripe payment intent", extra=_extra_log_data(error)
        )
        return None, error


def retrieve_txn(api_key: str, company_stripe_account_id: str, txn_id: str):
    stripe.api_key = api_key

    return stripe.BalanceTransaction.retrieve(
        txn_id, stripe_account=company_stripe_account_id
    )


def update_payment_method(api_key: str, payment_method_id: str, channel_slug: str):
    with stripe_opentracing_trace("stripe.PaymentMethod.modify"):
        try:
            stripe.PaymentMethod.modify(
                payment_method_id, api_key=api_key, metadata={"channel": channel_slug}
            )
        except StripeError as error:
            logger.warning(
                "Failed to assign channel slug to payment method",
                extra=_extra_log_data(error),
            )


def list_customer_payment_methods(
    api_key: str, customer_id: str
) -> Tuple[Optional[StripeObject], Optional[StripeError]]:
    try:
        with stripe_opentracing_trace("stripe.PaymentMethod.list"):
            payment_methods = stripe.PaymentMethod.list(
                api_key=api_key,
                customer=customer_id,
                stripe_version=STRIPE_API_VERSION,
                type="card",  # we support only cards for now
            )
        return payment_methods, None
    except StripeError as error:
        return None, error


def retrieve_payment_intent(
    api_key: str, payment_intent_id: str, stripe_account_id: str
) -> Tuple[Optional[StripeObject], Optional[StripeError]]:
    try:
        stripe.api_key = api_key
        payment_intent = stripe.PaymentIntent.retrieve(
            payment_intent_id,
            stripe_account=stripe_account_id,
        )
        return payment_intent, None
    except StripeError as error:
        logger.warning(
            "Unable to retrieve a payment intent",
            extra=_extra_log_data(error),
        )
        return None, error


def capture_payment_intent(
    api_key: str, payment_intent_id: str, amount_to_capture: int
) -> Tuple[Optional[StripeObject], Optional[StripeError]]:
    try:
        with stripe_opentracing_trace("stripe.PaymentIntent.capture"):
            payment_intent = stripe.PaymentIntent.capture(
                payment_intent_id,
                amount_to_capture=amount_to_capture,
                api_key=api_key,
                stripe_version=STRIPE_API_VERSION,
            )
        return payment_intent, None
    except StripeError as error:
        logger.warning(
            "Unable to capture a payment intent",
            extra=_extra_log_data(error),
        )
        return None, error


def refund_payment_intent(
    api_key: str, payment_intent_id: str, amount_to_refund: int, account_id
) -> Tuple[Optional[StripeObject], Optional[StripeError]]:
    try:
        stripe.api_key = api_key
        refund = stripe.Refund.create(
            payment_intent=payment_intent_id,
            amount=amount_to_refund,
            stripe_account=account_id,
        )
        return refund, None
    except StripeError as error:
        logger.warning(
            "Unable to refund a payment intent",
            extra=_extra_log_data(error),
        )
        return None, error


def cancel_payment_intent(
    api_key: str, payment_intent_id: str
) -> Tuple[Optional[StripeObject], Optional[StripeError]]:
    try:
        with stripe_opentracing_trace("stripe.PaymentIntent.cancel"):
            payment_intent = stripe.PaymentIntent.cancel(
                payment_intent_id,
                api_key=api_key,
                stripe_version=STRIPE_API_VERSION,
            )
        return payment_intent, None
    except StripeError as error:
        logger.warning(
            "Unable to cancel a payment intent",
            extra=_extra_log_data(error),
        )

        return None, error


def construct_stripe_event(
    api_key: str, payload: bytes, sig_header: str, endpoint_secret: str
) -> StripeObject:
    with stripe_opentracing_trace("stripe.Webhook.construct_event"):
        return stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret, api_key=api_key
        )


def get_payment_method_details(
    payment_intent: StripeObject,
) -> Optional[PaymentMethodInfo]:
    charges = payment_intent.get("charges", None)
    payment_method_info = None
    if charges:
        charges_data = charges.get("data", [])
        if not charges_data:
            return None
        charge_data = charges_data[-1]
        payment_method_details = charge_data.get("payment_method_details", {})

        if payment_method_details.get("type") == "card":
            card_details = payment_method_details.get("card", {})
            exp_year = card_details.get("exp_year", "")
            exp_year = int(exp_year) if exp_year else None
            exp_month = card_details.get("exp_month", "")
            exp_month = int(exp_month) if exp_month else None
            payment_method_info = PaymentMethodInfo(
                last_4=card_details.get("last4", ""),
                exp_year=exp_year,
                exp_month=exp_month,
                brand=card_details.get("brand", ""),
                type="card",
            )
    return payment_method_info
