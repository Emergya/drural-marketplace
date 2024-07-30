import { CompanyChatwootCreate_companyChatwootCreate_errors } from "@saleor/business/types/CompanyChatwootCreate";
import { ShopChatwootCreate_shopChatwootCreate_errors } from "@saleor/chatwoot/types/ShopChatwootCreate";
import { commonMessages } from "@saleor/intl";
import { defineMessages, IntlShape } from "react-intl";

import { CompanyErrorCode } from "../../types/globalTypes";
import commonErrorMessages from "./common";

const messages = defineMessages({
  invalidEmail: {
    defaultMessage: "Invalid email."
  },
  invalidPassword: {
    defaultMessage:
      "Chat password must contain an uppercase, lowercase letters, a number and a special character."
  },
  uniqueChatwoot: {
    defaultMessage: "Chatwoot is already enabled."
  },
  uniqueEmail: {
    defaultMessage: "Chatwoot emial must be unique."
  }
});

function getChatwootErrorMessage(
  err:
    | Omit<
        | CompanyChatwootCreate_companyChatwootCreate_errors
        | ShopChatwootCreate_shopChatwootCreate_errors,
        "__typename"
      >
    | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case CompanyErrorCode.UNIQUE:
        if (err.field === "id") {
          return intl.formatMessage(messages.uniqueChatwoot);
        }
        if (err.field === "email") {
          return intl.formatMessage(messages.uniqueEmail);
        }
      case CompanyErrorCode.REQUIRED:
        return intl.formatMessage(commonMessages.requiredField);
      case CompanyErrorCode.INVALID:
        if (err.field === "email") {
          return intl.formatMessage(messages.invalidEmail);
        }
        if (err.field === "password") {
          return intl.formatMessage(messages.invalidPassword);
        }
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }
  return undefined;
}

export default getChatwootErrorMessage;
