import {
  FileValidationError,
  IFileDimensions
} from "@saleor/utils/_types/files";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  minDimensions: {
    defaultMessage: "Minimun image size is {minWidth}px x {minHeight}px"
  },
  maxDimensions: {
    defaultMessage: "Maximun image size is {maxWidth}px x {maxHeight}px"
  },
  maxSize: {
    defaultMessage: "File exceeds the maximum upload size of 2MB"
  }
});

function getFileValidationErrorMessage(
  dimesions: IFileDimensions,
  err: FileValidationError | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err) {
      case FileValidationError.MIN_DIMENSIONS:
        return intl.formatMessage(messages.minDimensions, {
          minWidth: dimesions.width.min,
          minHeight: dimesions.height.min
        });
      case FileValidationError.MAX_DIMENSIONS:
        return intl.formatMessage(messages.maxDimensions, {
          maxWidth: dimesions.width.max,
          maxHeight: dimesions.height.max
        });
      case FileValidationError.SIZE:
        return intl.formatMessage(messages.maxSize);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }
  return undefined;
}

export default getFileValidationErrorMessage;
