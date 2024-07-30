import commonErrorMessages from "@saleor/utils/form/intls";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { getFormErrors } from "../../../utils/errors/index";
import {
  getIsSamePassword,
  validatePassword
} from "../../../utils/form/password";
import ChatwootConfigurationForm from "../ChatwootConfigurationForm";
import {
  ChatwootConfigurationType,
  IChatwootConfigurationProps
} from "./types";

const ChatwootConfiguration: React.FC<IChatwootConfigurationProps> = ({
  data,
  disabled,
  errors,
  type,
  onChange,
  onCreateChatwoot,
  onToggleChatwoot,
  onResetChatwootPassword,
  onSet
}) => {
  // 1. Variables
  const intl = useIntl();

  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>(null);

  const { hasChat, chatPassword, chatPasswordRepeat } = data || {};

  const formErrors = getFormErrors(["email", "password"], errors);

  const hasEmail = type === ChatwootConfigurationType.shop && !hasChat;

  const switchDisabled = disabled || isFormOpen;
  const formDisabled =
    disabled ||
    !chatPassword ||
    !chatPasswordRepeat ||
    !!passwordError ||
    (hasEmail && !data.chatEmail);

  const isSamePassword = getIsSamePassword(chatPassword, chatPasswordRepeat);
  const isPasswordValid = validatePassword(chatPassword);

  // 2. Events
  const handlePasswordValidation = () => {
    if (!isSamePassword) {
      setPasswordError(
        intl.formatMessage(commonErrorMessages.notSamePasswords)
      );
    } else if (!isPasswordValid) {
      setPasswordError(intl.formatMessage(commonErrorMessages.invalidPassword));
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordReset = () => {
    onSet({ chatPassword: "", chatPasswordRepeat: "" });
    setPasswordError(null);
  };

  const onSwitch = async (isChatActive: boolean) => {
    if (hasChat) {
      const chatwootData = await onToggleChatwoot(data);
      if (
        !chatwootData.errors &&
        !chatwootData.data[
          type === ChatwootConfigurationType.shop
            ? "shopChatwootUpdate"
            : "companyChatwootUpdate"
        ]?.errors
      ) {
        onSet({ isChatActive: !isChatActive });
      }
    } else {
      const chatwootData = await onCreateChatwoot(data);
      if (
        !chatwootData.errors &&
        !chatwootData.data[
          type === ChatwootConfigurationType.shop
            ? "shopChatwootCreate"
            : "companyChatwootCreate"
        ]?.errors
      ) {
        onSet({ isChatActive: !isChatActive });
      }
      handlePasswordReset();
    }
  };

  const onFormOpen = () => setFormOpen(true);

  const onFormCancel = () => {
    setFormOpen(false);
    handlePasswordReset();
  };

  const onFormSubmit = () => {
    onResetChatwootPassword(data);
    setFormOpen(false);
    handlePasswordReset();
  };

  // 3. Render
  return (
    <ChatwootConfigurationForm
      data={data}
      disabled={disabled}
      formDisabled={formDisabled}
      formErrors={formErrors}
      isFormOpen={isFormOpen}
      passwordError={passwordError}
      type={type}
      switchDisabled={switchDisabled}
      handlePasswordValidation={handlePasswordValidation}
      onChange={onChange}
      onFormCancel={onFormCancel}
      onFormOpen={onFormOpen}
      onFormSubmit={onFormSubmit}
      onSwitch={onSwitch}
    />
  );
};

export default ChatwootConfiguration;
