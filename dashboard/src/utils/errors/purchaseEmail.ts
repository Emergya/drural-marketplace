import { ProductErrorCode } from "@saleor/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import { ProductPurchaseEmailUpdate_productUpdate_errors } from "../../products/types/ProductPurchaseEmailUpdate";
import commonErrorMessages from "./common";

const messages = defineMessages({
  invalidSubject: {
    defaultMessage: "Max characters for subject is 65."
  },
  invalidTitle: {
    defaultMessage: "Max characters for title is 65."
  },
  requiredSubject: {
    defaultMessage: "Email subject is cannot be blank."
  },
  requiredTitle: {
    defaultMessage: "Email title is cannot be blank."
  },
  requiredContent: {
    defaultMessage: "Email content is cannot be blank."
  }
});

function getPurchaseEmailErrorMessage(
  err:
    | Omit<ProductPurchaseEmailUpdate_productUpdate_errors, "__typename">
    | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case ProductErrorCode.INVALID:
        if (err.field === "subject") {
          return intl.formatMessage(messages.invalidSubject);
        }
        if (err.field === "title") {
          return intl.formatMessage(messages.invalidTitle);
        }
      case ProductErrorCode.REQUIRED:
        if (err.field === "subject") {
          return intl.formatMessage(messages.requiredSubject);
        }
        if (err.field === "title") {
          return intl.formatMessage(messages.requiredTitle);
        }
        if (err.field === "content") {
          return intl.formatMessage(messages.requiredContent);
        }
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }
  return undefined;
}

export default getPurchaseEmailErrorMessage;
