import { CompanyStripeAccountCreate_companyStripeAccountCreate_errors } from "@saleor/business/types/CompanyStripeAccountCreate";
import { errorMessages } from "@saleor/intl";
import { CompanyErrorCode } from "@saleor/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

const messages = defineMessages({
  alreadyExists: {
    defaultMessage: "This shop is already connected with stripe"
  },
  notFound: {
    defaultMessage: "This shop has not created an account on Stripe yet."
  }
});

export const getBusinessStripeAccountCreateErrorMessage = (
  err: CompanyStripeAccountCreate_companyStripeAccountCreate_errors | undefined,
  intl: IntlShape
): string => {
  if (err) {
    switch (err.code) {
      case CompanyErrorCode.ALREADY_EXISTS:
        return intl.formatMessage(messages.alreadyExists);
      default:
        return intl.formatMessage(errorMessages.unableToConnectWithStripe);
    }
  }
  return undefined;
};

export const getBusinessLinkStripeAccountErrorMessage = (
  err: CompanyStripeAccountCreate_companyStripeAccountCreate_errors | undefined,
  intl: IntlShape
): string => {
  if (err) {
    switch (err.code) {
      case CompanyErrorCode.NOT_FOUND:
        return intl.formatMessage(messages.notFound);
      default:
        return intl.formatMessage(errorMessages.unableToSetUpStripeAccount);
    }
  }
  return undefined;
};

export const getBusinessEnableStripeErrorMessage = (
  err: CompanyStripeAccountCreate_companyStripeAccountCreate_errors | undefined,
  intl: IntlShape
): string => {
  if (err) {
    switch (err.code) {
      case CompanyErrorCode.NOT_FOUND:
        return intl.formatMessage(messages.notFound);
      default:
        return intl.formatMessage(errorMessages.unableToActivateStripe);
    }
  }
  return undefined;
};
