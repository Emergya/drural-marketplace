import { ShopErrorFragment } from "@saleor/fragments/types/ShopErrorFragment";
import { commonMessages } from "@saleor/intl";
import { ShopErrorCode } from "@saleor/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  alreadyExists: {
    defaultMessage: "Authorization key with this type already exists",
    description: "add authorization key error"
  },
  invalidCommission: {
    defaultMessage:
      "Invalid. Rate value must be equal or greater than 0 and lower or equal than 1"
  }
});

function getShopErrorMessage(
  err: Omit<ShopErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case ShopErrorCode.ALREADY_EXISTS:
        return intl.formatMessage(messages.alreadyExists);
      case ShopErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case ShopErrorCode.REQUIRED:
        return intl.formatMessage(commonMessages.requiredField);
      case ShopErrorCode.INVALID:
        if (err.field === "commission") {
          return intl.formatMessage(messages.invalidCommission);
        }
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getShopErrorMessage;
