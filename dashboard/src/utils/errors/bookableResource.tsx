import { BookableResourceCreate_bookableResourceCreate_errors } from "@saleor/bookableResources/types/BookableResourceCreate";
import { commonMessages } from "@saleor/intl";
import { BookableResourceErrorCode } from "@saleor/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  bookableResourceNotFound: {
    defaultMessage: "Resource not found."
  },
  duplicatedInputItem: {
    defaultMessage: "Variant with these attributes already exists."
  },
  invalidInputData: {
    defaultMessage: "Type of provided input data is not allowed."
  },
  invalidDefault: {
    defaultMessage:
      "A resource with this name already exists. Please provide another."
  },
  invalidQuantity: {
    defaultMessage:
      "Quantity must be greater than 0. If your resource is inexhaustible, please select that option."
  },
  uniqueName: {
    defaultMessage:
      "A resource with this name already exists. Please provide another."
  }
});

function getBookableResourceErrorMessage(
  err:
    | Omit<BookableResourceCreate_bookableResourceCreate_errors, "__typename">
    | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case BookableResourceErrorCode.DUPLICATED_INPUT_ITEM:
        return intl.formatMessage(messages.duplicatedInputItem);
      case BookableResourceErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case BookableResourceErrorCode.INVALID:
        if (err.field === "timePeriods") {
          return intl.formatMessage(commonMessages.invalidTimePeriod);
        } else if (err.field === "quantity") {
          return intl.formatMessage(messages.invalidQuantity);
        }
        return intl.formatMessage(messages.invalidDefault);
      case BookableResourceErrorCode.NOT_FOUND:
        return intl.formatMessage(messages.bookableResourceNotFound);
      case BookableResourceErrorCode.REQUIRED:
        return intl.formatMessage(commonMessages.requiredField);
      case BookableResourceErrorCode.UNIQUE:
        return intl.formatMessage(messages.uniqueName);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }
  return undefined;
}

export default getBookableResourceErrorMessage;
