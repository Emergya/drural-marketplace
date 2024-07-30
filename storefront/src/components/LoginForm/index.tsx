import { useAuth } from "@drural/sdk";
import { useRouter } from "next/router";
import * as React from "react";
import { useIntl } from "react-intl";
import { UrlObject } from "url";

import { Button } from "@components/atoms/Button";
import { InputLoginFormWrapper } from "@components/containers/InputLoginFormWrapper";
import { paths } from "@paths";
import { demoMode } from "@temp/constants";
import { commonMessages } from "@temp/intl";

import { Form } from "..";

import "./scss/index.scss";

interface ILoginForm {
  redirectUrl?: UrlObject | string;
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ redirectUrl, hide }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const { push } = useRouter();

  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();

    setLoading(true);

    const { data: user, dataError } = await signIn(email, password);

    setLoading(false);

    if (dataError?.error) {
      setErrors(dataError.error);
    } else if (user && hide) {
      setErrors(null);

      if (redirectUrl) {
        push(redirectUrl);
      }

      if (!redirectUrl && !user?.isOnboard) {
        push(paths.onboarding);
      }

      hide();
    }
  };

  const formData = demoMode
    ? {
        email: "admin@example.com",
        password: "admin",
      }
    : {};

  const intl = useIntl();

  return (
    <div className="login-form">
      <Form data={formData} errors={errors || []} onSubmit={handleOnSubmit}>
        <InputLoginFormWrapper
          name="email"
          autoComplete="email"
          label={intl.formatMessage(commonMessages.eMail)}
          type="email"
          required
        />
        <InputLoginFormWrapper
          name="password"
          autoComplete="password"
          label={intl.formatMessage(commonMessages.password)}
          type="password"
          required
        />

        <Button
          testingContext="submit"
          color="primary"
          fullWidth
          {...(loading && { disabled: true })}
        >
          {loading
            ? intl.formatMessage(commonMessages.loading)
            : intl.formatMessage({ defaultMessage: "Sign in" })}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
