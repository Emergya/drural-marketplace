import { Formik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";

import { Button, NotificationTemplate } from "@components/atoms";
import { TextField } from "@components/molecules";
import { paths } from "@paths";
import { channelSlug } from "@temp/constants";
import { commonMessages } from "@temp/intl";
import { IFormError } from "@types";

import { ResetPasswordRequest } from "./gqlTypes/ResetPasswordRequest";
import { TypedPasswordResetRequestMutation } from "./queries";

import "./scss/index.scss";

const PasswordResetRequestForm: React.FC = () => {
  // 1. Varaibles
  const intl = useIntl();
  const { push } = useRouter();
  const [formError, setFormError] = React.useState("");

  // 2. Form validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage(commonMessages.invalidEmail))
      .required(intl.formatMessage(commonMessages.required)),
  });

  // 3. Methods
  const getBackErrorMessage = (error: IFormError[]) => {
    const fieldErrors: any = {};

    if (error) {
      error.map(({ field, message }: IFormError) => {
        if (field && message) {
          fieldErrors[field] = fieldErrors[field]
            ? [...fieldErrors[field], { message }]
            : [{ message }];
        }
      });
    }
    return fieldErrors!.email;
  };

  const buttonMessage = (loading: boolean, data: ResetPasswordRequest) => {
    if (loading) {
      return intl.formatMessage(commonMessages.loading);
    }
    if (data?.requestPasswordReset.errors.length === 0) {
      return intl.formatMessage({ defaultMessage: "Check your inbox" });
    }
    return intl.formatMessage({ defaultMessage: "Reset password" });
  };

  // 4. Render
  return (
    <div className="password-reset-form">
      <h2 className="password-reset-form__title">
        <FormattedMessage defaultMessage="Password recovery" />
      </h2>
      <p className="password-reset-form__text">
        <FormattedMessage defaultMessage="Enter your email, we will send you instructions to reset your password." />
      </p>
      <TypedPasswordResetRequestMutation
        onCompleted={data => {
          const dataErrors = data.requestPasswordReset?.errors;

          if (!dataErrors.length) {
            push(paths.passwordRequested);
          }
        }}
        onError={error => {
          if (error) {
            setFormError(error.message);
          }
        }}
      >
        {(passwordReset, { loading, data }) => {
          return (
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                if (values.email) {
                  passwordReset({
                    variables: {
                      email: values.email,
                      redirectUrl: `${location.origin}${paths.passwordReset}`,
                      channel: channelSlug,
                    },
                  });
                  setSubmitting(false);
                }
              }}
              validateOnChange={false}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                isValid,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      label={intl.formatMessage(commonMessages.eMail)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      errors={
                        touched.email && errors.email
                          ? [{ message: errors.email }]
                          : undefined ||
                            getBackErrorMessage(
                              data?.requestPasswordReset?.errors
                            )
                      }
                      required
                    />
                    <div className="password-reset-form__button">
                      <Button
                        testingContext="submit"
                        type="submit"
                        fullWidth
                        disabled={loading || isSubmitting || !isValid}
                      >
                        {buttonMessage(loading || isSubmitting, data)}
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          );
        }}
      </TypedPasswordResetRequestMutation>
      {formError && (
        <NotificationTemplate
          id="passwordResetNotification"
          close={() => setFormError("")}
          message={{ title: "Error", content: formError }}
          options={{ type: "error" }}
          style={{}}
        />
      )}
    </div>
  );
};

export default PasswordResetRequestForm;
