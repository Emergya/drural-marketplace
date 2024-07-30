import { hasWhiteSpace } from "@saleor/utils/strings/strings";
import { defineMessages, IntlShape } from "react-intl";

import { PurchaseEmailVariable, VariablesEnum } from "./types";

const messages = defineMessages({
  userName: {
    defaultMessage: "Name of the client who purchased the service."
  },
  productName: {
    defaultMessage: "Name of the purchased service."
  },
  price: {
    defaultMessage: "Price of the purchased service."
  },
  currency: {
    defaultMessage: "Curency with which the service was purchased."
  },
  billingAddress: {
    defaultMessage: "Billing address of the client."
  },
  bookingReference: {
    defaultMessage: "Booking refenrence number."
  },
  bookbleResourceName: {
    defaultMessage: "Name of the booked bookable resource."
  },
  bookingStartDate: {
    defaultMessage: "Start date of the reservation."
  },
  productDuration: {
    defaultMessage: "Duration of the service."
  },
  notWhiteSpacesInVariables: {
    defaultMessage:
      "Not white spaces are allowed between the variable name and the curly braces. Review variable: {variable}"
  },
  notFoundVariable: {
    defaultMessage:
      "Varaible {variable} was not found in the list of suportted variables"
  }
});

export const getPurchaseEmailCommonVariables = (
  intl: IntlShape
): PurchaseEmailVariable[] => [
  {
    name: VariablesEnum.user_name,
    helperText: intl.formatMessage(messages.userName)
  },
  {
    name: VariablesEnum.product_name,
    helperText: intl.formatMessage(messages.productName)
  },
  {
    name: VariablesEnum.price,
    helperText: intl.formatMessage(messages.price)
  },
  {
    name: VariablesEnum.currency,
    helperText: intl.formatMessage(messages.currency)
  },
  {
    name: VariablesEnum.billing_address,
    helperText: intl.formatMessage(messages.billingAddress)
  }
];

export const getPurchaseEmailBookingVariables = (
  intl: IntlShape
): PurchaseEmailVariable[] => [
  {
    name: VariablesEnum.booking_reference,
    helperText: intl.formatMessage(messages.bookingReference)
  },
  {
    name: VariablesEnum.bookable_resource_name,
    helperText: intl.formatMessage(messages.bookbleResourceName)
  },
  {
    name: VariablesEnum.booking_start_date,
    helperText: intl.formatMessage(messages.bookingStartDate)
  },
  {
    name: VariablesEnum.product_duration,
    helperText: intl.formatMessage(messages.productDuration)
  }
];

export const validateVariable = (variable: string, intl: IntlShape): string => {
  let containsVariable: boolean = false;
  let errorMessage: string = "";

  if (hasWhiteSpace(variable)) {
    errorMessage = intl.formatMessage(messages.notWhiteSpacesInVariables, {
      variable
    });
    return errorMessage;
  }

  for (const value in VariablesEnum) {
    if (VariablesEnum[value] === variable) {
      containsVariable = true;
    }
  }

  if (!containsVariable) {
    errorMessage = intl.formatMessage(messages.notFoundVariable, {
      variable
    });
  }

  return errorMessage;
};
