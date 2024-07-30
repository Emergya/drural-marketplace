import { maybe } from "@saleor/misc";
import { defineMessages, IntlShape } from "react-intl";

import { ShopChatwoot_shop_chatwootCredentials } from "../../types/ShopChatwoot";
import { ChatwootConfigurationFormData } from "../ChatwootConfigurationForm/types";
import { ChatwootConfigurationType } from "./types";

const messages = defineMessages({
  companyCardDescription: {
    defaultMessage: "Here you can activate or deactivate your company's chat."
  },
  shopCardDescription: {
    defaultMessage:
      "Here you can activate or deactivate your marketplace's chat. This will enable communication between the sellers and the administrators of your marketplace."
  },
  companyEmailHelperText: {
    defaultMessage: "Enter the email for your company's chat"
  },
  shopEmailHelperText: {
    defaultMessage: "Enter the email for your marketplace's chat"
  },
  companyPasswordHelperText: {
    defaultMessage: "Enter the password for your company's chat"
  },
  shopPasswordHelperText: {
    defaultMessage: "Enter the password for your marketplace's chat"
  },
  companyResetPasswordHelperText: {
    defaultMessage: "Repeat your company's chat password"
  },
  shopResetPasswordHelperText: {
    defaultMessage: "Repeat your marketplace's chat password"
  }
});

export const getIntialData = (
  chatwootCredentials: ShopChatwoot_shop_chatwootCredentials
): ChatwootConfigurationFormData => ({
  chatPassword: "",
  chatPasswordRepeat: "",
  chatEmail: "",
  hasChat: maybe(() => !!chatwootCredentials, false),
  isChatActive: maybe(() => chatwootCredentials.isActive, false)
});

export const getCardDescription = (
  type: ChatwootConfigurationType,
  intl: IntlShape
): string | undefined => {
  switch (type) {
    case ChatwootConfigurationType.company:
      return intl.formatMessage(messages.companyCardDescription);
    case ChatwootConfigurationType.shop:
      return intl.formatMessage(messages.shopCardDescription);
    default:
      return;
  }
};

export const getEmailHelperText = (
  type: ChatwootConfigurationType,
  intl: IntlShape
): string | undefined => {
  switch (type) {
    case ChatwootConfigurationType.company:
      return intl.formatMessage(messages.companyEmailHelperText);
    case ChatwootConfigurationType.shop:
      return intl.formatMessage(messages.shopEmailHelperText);
    default:
      return;
  }
};

export const getPasswordHelperText = (
  type: ChatwootConfigurationType,
  intl: IntlShape
): string | undefined => {
  switch (type) {
    case ChatwootConfigurationType.company:
      return intl.formatMessage(messages.companyPasswordHelperText);
    case ChatwootConfigurationType.shop:
      return intl.formatMessage(messages.shopPasswordHelperText);
    default:
      return;
  }
};

export const getResetPasswordHelperText = (
  type: ChatwootConfigurationType,
  intl: IntlShape
): string | undefined => {
  switch (type) {
    case ChatwootConfigurationType.company:
      return intl.formatMessage(messages.companyResetPasswordHelperText);
    case ChatwootConfigurationType.shop:
      return intl.formatMessage(messages.shopResetPasswordHelperText);
    default:
      return;
  }
};
