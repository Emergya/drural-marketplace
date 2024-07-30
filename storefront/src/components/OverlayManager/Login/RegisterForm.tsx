import { useRouter } from "next/router";
import * as React from "react";
import { AlertManager, useAlert } from "react-alert";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { UrlObject } from "url";

import { Button } from "@components/atoms/Button";
import { CheckBoxLoginWrapper } from "@components/containers/CheckBoxLoginWrapper";
import { InputLoginFormWrapper } from "@components/containers/InputLoginFormWrapper";
import { paths } from "@paths";
/* import { channelSlug } from "@temp/constants"; */
import { commonMessages } from "@temp/intl";

import { maybe } from "../../../core/utils";
import { Form } from "../..";
import { RegisterAccount } from "./gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "./queries";

import "./scss/index.scss";

const showSuccessNotification = (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager,
  intl: IntlShape,
  push: (
    url: UrlObject | string,
    as?: UrlObject | string,
    options?: any
  ) => Promise<boolean>
) => {
  const successful = maybe(() => !data.accountRegister.errors.length);

  if (successful) {
    hide();
    push(paths.registrationMessage);
  }
};

const RegisterForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const intl = useIntl();
  const { push } = useRouter();
  return (
    <TypedAccountRegisterMutation
      onCompleted={data =>
        showSuccessNotification(data, hide, alert, intl, push)
      }
    >
      {(registerCustomer, { loading, data }) => {
        return (
          <Form
            errors={maybe(() => data.accountRegister.errors, [])}
            onSubmit={(
              event,
              { firstName, lastName, infoRequest, email, password, channel }
            ) => {
              event.preventDefault();
              const redirectUrl = `${location.origin}${paths.accountConfirm}`;
              registerCustomer({
                variables: {
                  firstName,
                  lastName,
                  infoRequest,
                  email,
                  password,
                  redirectUrl,
                  /* channel: channelSlug, */
                  channel: "default-channel",
                },
              });
            }}
          >
            <InputLoginFormWrapper
              name="email"
              autoComplete="email"
              label={intl.formatMessage(commonMessages.eMail)}
              type="email"
              required
            />
            <div id="name-inputs">
              <InputLoginFormWrapper
                name="firstName"
                autoComplete="First name"
                label={intl.formatMessage(commonMessages.firstName)}
                type="text"
                required
              />
              <InputLoginFormWrapper
                name="lastName"
                autoComplete="Last name"
                label={intl.formatMessage(commonMessages.lastName)}
                type="text"
                required
              />
            </div>
            <InputLoginFormWrapper
              name="password"
              autoComplete="password"
              label={intl.formatMessage(commonMessages.password)}
              type="password"
              required
            />
            <CheckBoxLoginWrapper name="infoRequest">
              <p id="check-info">
                <FormattedMessage defaultMessage="I want to receive information from dRural" />
              </p>
            </CheckBoxLoginWrapper>
            <Button
              testingContext="submit"
              color="primary"
              fullWidth
              {...(loading && { disabled: true })}
            >
              {loading
                ? intl.formatMessage(commonMessages.loading)
                : intl.formatMessage({ defaultMessage: "Register" })}
            </Button>
          </Form>
        );
      }}
    </TypedAccountRegisterMutation>
  );
};

export default RegisterForm;
