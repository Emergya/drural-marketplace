import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";
import { commonMessages } from "@saleor/intl";
import { ProductErrorCode } from "@saleor/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  nameInvalid: {
    defaultMessage:
      "Invalid, name contains more than 15 characters or is already taken by another category"
  },
  descriptionInvalid: {
    defaultMessage: "Description cannot exceed 120 characters"
  }
});

export const getCategoryErrorMessage = (
  err: Omit<ProductErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string => {
  if (err) {
    switch (err.code) {
      case ProductErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case ProductErrorCode.INVALID:
        if (err.field === "name") {
          return intl.formatMessage(messages.nameInvalid);
        }
        if (err.field === "description") {
          return intl.formatMessage(messages.descriptionInvalid);
        }
        return intl.formatMessage(commonErrorMessages.invalid);
      case ProductErrorCode.REQUIRED:
        return intl.formatMessage(commonMessages.requiredField);
      case ProductErrorCode.UNIQUE:
        return intl.formatMessage(commonMessages.nameAlreadyTaken);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }
  return undefined;
};
