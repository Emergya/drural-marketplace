import { defineMessages, IntlShape } from "react-intl";

import { SiteSettingsPageTagsFormData } from "../SiteSettingsPage/types";

const messages = defineMessages({
  inputError: {
    defaultMessage:
      "Unable to active Google Analytics 4 tag with out the property mesurement id"
  }
});

export const getGa4FormError = (data: SiteSettingsPageTagsFormData): boolean =>
  data.ga4Active && !data.ga4;

export const getInputErrorMessage = (
  data: SiteSettingsPageTagsFormData,
  intl: IntlShape
): string => {
  if (getGa4FormError(data)) {
    return intl.formatMessage(messages.inputError);
  }

  return undefined;
};
