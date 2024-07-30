import { IntlShape } from "react-intl";

export function translateAdyenConfirmationError(
  status: string,
  intl: IntlShape
): string {
  switch (status) {
    case "Error":
      return intl.formatMessage({
        defaultMessage: "Error processing payment occured.",
      });
    case "Refused":
      return intl.formatMessage({
        defaultMessage:
          "The payment was refused. Try the payment again using a different payment method or card.",
      });
    case "Cancelled":
      return intl.formatMessage({
        defaultMessage: "Payment was cancelled.",
      });
    default:
      return intl.formatMessage({
        defaultMessage: "Payment could not be confirmed.",
      });
  }
}
