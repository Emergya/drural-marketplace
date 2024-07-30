import { WebhookEventTypeEnum } from "@saleor/types/globalTypes";
import { WebhookDetails_webhook_events } from "@saleor/webhooks/types/WebhookDetails";
import { defineMessages, IntlShape } from "react-intl";

export const messages = defineMessages({
  allEvents: {
    defaultMessage: "All events",
    description: "event"
  },
  checkoutCreated: {
    defaultMessage: "Checkout created",
    description: "event"
  },
  checkoutUpdated: {
    defaultMessage: "Checkout updated",
    description: "event"
  },
  customerCreated: {
    defaultMessage: "Customer created",
    description: "event"
  },
  customerUpdated: {
    defaultMessage: "Customer updated",
    description: "event"
  },
  orderCancelled: {
    defaultMessage: "Order cancelled",
    description: "event"
  },
  orderCreated: {
    defaultMessage: "Order created",
    description: "event"
  },
  orderConfirmed: {
    defaultMessage: "Order confirmed",
    description: "event"
  },
  orderFulfilled: {
    defaultMessage: "Order fulfilled",
    description: "event"
  },
  orderFullyPaid: {
    defaultMessage: "Order fully paid",
    description: "event"
  },
  orderUpdated: {
    defaultMessage: "Order updated",
    description: "event"
  },
  pageCreated: {
    defaultMessage: "Page created",
    description: "event"
  },
  pageDeleted: {
    defaultMessage: "Page deleted",
    description: "event"
  },
  pageUpdated: {
    defaultMessage: "Page updated",
    description: "event"
  },
  productCreated: {
    defaultMessage: "Product created",
    description: "event"
  },
  productUpdated: {
    defaultMessage: "Product updated",
    description: "event"
  },
  productDeleted: {
    defaultMessage: "Product deleted",
    description: "event"
  },
  fulfillmentCreated: {
    defaultMessage: "Fulfillment created",
    description: "event"
  },
  invoiceRequested: {
    defaultMessage: "Invoice requested",
    description: "event"
  },
  invoiceSent: {
    defaultMessage: "Invoice sent",
    description: "event"
  },
  userNotified: {
    defaultMessage: "User notified",
    description: "event"
  }
});

export const getEventMessage = (
  event: WebhookEventTypeEnum,
  intl: IntlShape
): string => {
  switch (event) {
    case WebhookEventTypeEnum.CHECKOUT_CREATED:
      return intl.formatMessage(messages.checkoutCreated);
    case WebhookEventTypeEnum.CHECKOUT_UPDATED:
      return intl.formatMessage(messages.checkoutUpdated);
    case WebhookEventTypeEnum.CUSTOMER_CREATED:
      return intl.formatMessage(messages.customerCreated);
    case WebhookEventTypeEnum.CUSTOMER_UPDATED:
      return intl.formatMessage(messages.customerUpdated);
    case WebhookEventTypeEnum.ORDER_CANCELLED:
      return intl.formatMessage(messages.orderCancelled);
    case WebhookEventTypeEnum.ORDER_CREATED:
      return intl.formatMessage(messages.orderCreated);
    case WebhookEventTypeEnum.ORDER_CONFIRMED:
      return intl.formatMessage(messages.orderConfirmed);
    case WebhookEventTypeEnum.ORDER_FULFILLED:
      return intl.formatMessage(messages.orderFulfilled);
    case WebhookEventTypeEnum.ORDER_FULLY_PAID:
      return intl.formatMessage(messages.orderFullyPaid);
    case WebhookEventTypeEnum.ORDER_UPDATED:
      return intl.formatMessage(messages.orderUpdated);
    case WebhookEventTypeEnum.PAGE_CREATED:
      return intl.formatMessage(messages.pageCreated);
    case WebhookEventTypeEnum.PAGE_DELETED:
      return intl.formatMessage(messages.pageDeleted);
    case WebhookEventTypeEnum.PAGE_UPDATED:
      return intl.formatMessage(messages.pageUpdated);
    case WebhookEventTypeEnum.PRODUCT_CREATED:
      return intl.formatMessage(messages.productCreated);
    case WebhookEventTypeEnum.PRODUCT_DELETED:
      return intl.formatMessage(messages.productDeleted);
    case WebhookEventTypeEnum.PRODUCT_UPDATED:
      return intl.formatMessage(messages.productUpdated);
    case WebhookEventTypeEnum.FULFILLMENT_CREATED:
      return intl.formatMessage(messages.fulfillmentCreated);
    case WebhookEventTypeEnum.INVOICE_REQUESTED:
      return intl.formatMessage(messages.invoiceRequested);
    case WebhookEventTypeEnum.INVOICE_SENT:
      return intl.formatMessage(messages.invoiceSent);
    case WebhookEventTypeEnum.NOTIFY_USER:
      return intl.formatMessage(messages.userNotified);
    default:
      break;
  }
};

export const getStaticEvents = (isStaff: boolean): WebhookEventTypeEnum[] => {
  const staffEvetns = Object.values(WebhookEventTypeEnum).sort();
  const sellerEvents = staffEvetns.filter(
    event =>
      event !== WebhookEventTypeEnum.CUSTOMER_CREATED &&
      event !== WebhookEventTypeEnum.CUSTOMER_UPDATED
  );

  return isStaff ? staffEvetns : sellerEvents;
};

export const getEventsFromData = (
  events: WebhookDetails_webhook_events[] | undefined = []
): WebhookEventTypeEnum[] => events?.map(event => event.eventType);
