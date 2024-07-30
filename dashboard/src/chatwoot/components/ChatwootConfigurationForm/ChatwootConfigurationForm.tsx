import { Button, Card, CardContent, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import Hr from "@saleor/components/Hr";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { buttonMessages } from "../../../intl";
import { getCardDescription } from "../ChatwootConfiguration/utils";
import { ChatwootForm } from "./Form";
import { useStyles } from "./styles";
import {
  ChatwootConfigurationFormDataEnum,
  IChatwootConfigurationFormProps
} from "./types";

const ChatwootConfigurationForm: React.FC<IChatwootConfigurationFormProps> = ({
  data,
  disabled,
  formDisabled,
  formErrors,
  isFormOpen,
  passwordError,
  type,
  switchDisabled,
  onChange,
  onSwitch,
  onFormOpen,
  handlePasswordValidation,
  onFormCancel,
  onFormSubmit
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const { hasChat, isChatActive } = data || {};

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({ defaultMessage: "Chat configuration" })}
      />
      <CardContent className={classes.activeWrapper}>
        <div>
          <Typography>
            {intl.formatMessage({ defaultMessage: "Enable chat" })}
          </Typography>
          <Typography
            className={classes.subtitleDescription}
            variant="caption"
            component="div"
          >
            {getCardDescription(type, intl)}
          </Typography>
        </div>
        <ControlledSwitch
          className={classes.switch}
          name={ChatwootConfigurationFormDataEnum.isChatActive}
          label=""
          checked={isChatActive}
          onClick={() => onSwitch(isChatActive)}
          disabled={hasChat ? switchDisabled : formDisabled}
        />
      </CardContent>
      <Hr />
      <CardContent>
        {hasChat ? (
          isFormOpen ? (
            <ChatwootForm
              data={data}
              disabled={disabled}
              formDisabled={formDisabled}
              formErrors={formErrors}
              passwordError={passwordError}
              type={type}
              hasButtons
              handlePasswordValidation={handlePasswordValidation}
              onChange={onChange}
              onFormCancel={onFormCancel}
              onFormSubmit={onFormSubmit}
            />
          ) : (
            <Button
              color="primary"
              variant="contained"
              disabled={disabled || !data.isChatActive}
              onClick={onFormOpen}
            >
              <FormattedMessage {...buttonMessages.resetPassword} />
            </Button>
          )
        ) : (
          <ChatwootForm
            data={data}
            disabled={disabled}
            formDisabled={formDisabled}
            formErrors={formErrors}
            passwordError={passwordError}
            type={type}
            handlePasswordValidation={handlePasswordValidation}
            onChange={onChange}
            onFormCancel={onFormCancel}
            onFormSubmit={onFormSubmit}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ChatwootConfigurationForm;
