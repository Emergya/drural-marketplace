import { defineMessages, IntlShape } from "react-intl";

import { GetPaymentMethods_paymentMethods_edges_node } from "../../types/GetPaymentMethods";
import { PaymentMethodIdentifier, ProductMethodsData } from "./types";

const messages = defineMessages({
  bankTransfer: {
    defaultMessage: "Bank transfer"
  },
  card: {
    defaultMessage: "Card"
  },
  firstConfigureStripe: {
    defaultMessage: "Configure stripe to enabled card method"
  },
  payAtStore: {
    defaultMessage: "Pay at store"
  }
});

export function getProductPaymentMethodMessages(
  paymentMethod: GetPaymentMethods_paymentMethods_edges_node | undefined,
  intl: IntlShape
): string {
  if (paymentMethod) {
    switch (paymentMethod.identifier) {
      case PaymentMethodIdentifier.BANK_TRANSFER:
        return intl.formatMessage(messages.bankTransfer);
      case PaymentMethodIdentifier.CARD:
        return intl.formatMessage(messages.card);
      case PaymentMethodIdentifier.PAY_AT_STORE:
        return intl.formatMessage(messages.payAtStore);
    }
  }
  return undefined;
}

export const getIsChecked = (
  data: ProductMethodsData,
  method: GetPaymentMethods_paymentMethods_edges_node
) => data.paymentMethods.some(paymentMethodId => paymentMethodId === method.id);

export const getIsCardMethod = (
  method: GetPaymentMethods_paymentMethods_edges_node
) => method.identifier === PaymentMethodIdentifier.CARD;

export const getISCardMethodDisabled = (
  method: GetPaymentMethods_paymentMethods_edges_node,
  isStripeEnabled: boolean
) => getIsCardMethod(method) && !isStripeEnabled;

export const getIsDisabled = (
  disabled: boolean,
  method: GetPaymentMethods_paymentMethods_edges_node,
  isStripeEnabled: boolean
) => disabled || getISCardMethodDisabled(method, isStripeEnabled);

export const getHelperText = (
  method: GetPaymentMethods_paymentMethods_edges_node,
  isStripeEnabled: boolean,
  intl: IntlShape
) =>
  getISCardMethodDisabled(method, isStripeEnabled) &&
  intl.formatMessage(messages.firstConfigureStripe);
