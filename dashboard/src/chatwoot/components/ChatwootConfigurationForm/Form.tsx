import { Button, TextField } from "@material-ui/core";
import getChatwootErrorMessage from "@saleor/utils/errors/chatwoot";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { buttonMessages } from "../../../intl";
import { ChatwootConfigurationType } from "../ChatwootConfiguration/types";
import {
  getEmailHelperText,
  getPasswordHelperText,
  getResetPasswordHelperText
} from "../ChatwootConfiguration/utils";
import { useStyles } from "./styles";
import { ChatwootConfigurationFormDataEnum, IChatwootFormProps } from "./types";

export const ChatwootForm: React.FC<IChatwootFormProps> = ({
  data,
  disabled,
  formDisabled,
  formErrors,
  passwordError,
  type,
  hasButtons,
  handlePasswordValidation,
  onChange,
  onFormSubmit,
  onFormCancel
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const { hasChat, chatEmail, chatPassword, chatPasswordRepeat } = data || {};
  const hasEmail = type === ChatwootConfigurationType.shop && !hasChat;

  return (
    <div className={classes.formWrapper}>
      {hasEmail && (
        <TextField
          className={classes.emailInput}
          disabled={disabled}
          error={!!formErrors.email}
          helperText={
            getChatwootErrorMessage(formErrors.email, intl) ||
            getEmailHelperText(type, intl)
          }
          fullWidth
          autoComplete="new-password"
          name={ChatwootConfigurationFormDataEnum.chatEmail}
          type="email"
          label={intl.formatMessage({ defaultMessage: "Chat email" })}
          value={chatEmail}
          onChange={onChange}
          required
        />
      )}
      <TextField
        className={classes.input}
        disabled={disabled}
        error={!!passwordError || !!formErrors.password}
        helperText={
          passwordError ||
          getChatwootErrorMessage(formErrors.password, intl) ||
          getPasswordHelperText(type, intl)
        }
        fullWidth
        autoComplete="new-password"
        name={ChatwootConfigurationFormDataEnum.chatPassword}
        type="password"
        label={intl.formatMessage({ defaultMessage: "Chat password" })}
        value={chatPassword}
        onBlur={handlePasswordValidation}
        onChange={onChange}
      />
      <TextField
        className={classes.input}
        disabled={disabled}
        error={!!passwordError || !!formErrors.password}
        helperText={
          passwordError ||
          getChatwootErrorMessage(formErrors.password, intl) ||
          getResetPasswordHelperText(type, intl)
        }
        fullWidth
        autoComplete="new-password"
        name={ChatwootConfigurationFormDataEnum.chatPasswordRepeat}
        type="password"
        label={intl.formatMessage({
          defaultMessage: "Repeat chat password"
        })}
        value={chatPasswordRepeat}
        onBlur={handlePasswordValidation}
        onChange={onChange}
      />
      {hasButtons && (
        <div className={classes.buttonsWrapper}>
          <Button color="secondary" onClick={onFormCancel}>
            <FormattedMessage {...buttonMessages.cancel} />
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={formDisabled}
            onClick={onFormSubmit}
          >
            <FormattedMessage {...buttonMessages.confirm} />
          </Button>
        </div>
      )}
    </div>
  );
};
