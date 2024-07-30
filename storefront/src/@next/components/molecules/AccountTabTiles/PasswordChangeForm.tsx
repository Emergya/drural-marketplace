import { Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";

import { Button } from "@components/atoms";
import { commonMessages } from "@temp/intl";
import { IFormError } from "@types";

import { TextField } from "../TextField";
import * as S from "./styles";

export const PasswordChangeForm: React.FC<{
  handleSubmit: (data: any) => void;
  hide: () => void;
  error?: IFormError[];
}> = ({ handleSubmit, hide, error }) => {
  const intl = useIntl();
  const fieldErrors: any = {};

  if (error) {
    error.map(({ field, message }: { field?: string; message?: string }) => {
      if (field && message) {
        fieldErrors[field] = fieldErrors[field]
          ? [...fieldErrors[field], { message }]
          : [{ message }];
      }
    });
  }
  const PasswordUpdateSchema = Yup.object().shape({
    oldPassword: Yup.string().required(
      intl.formatMessage({ defaultMessage: "Required field" })
    ),
    newPassword: Yup.string()
      .required(intl.formatMessage({ defaultMessage: "Required field" }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\-_])(?=.{7,})/,
        intl.formatMessage({
          defaultMessage:
            "Must contain 7 characters and at least an uppercase, a lowercase, a number and a special case.",
        })
      ),
    newPasswordRepeat: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      intl.formatMessage({ defaultMessage: "Password must match!" })
    ),
  });
  return (
    <>
      <Formik
        initialValues={{
          newPasswordRepeat: "",
          newPassword: "",
          oldPassword: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit({
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
            newPasswordRepeat: values.newPasswordRepeat,
          });
          setSubmitting(false);
        }}
        validateOnChange={false}
        validationSchema={PasswordUpdateSchema}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
        }) => {
          return (
            <S.ColumnForm
              onSubmit={handleSubmit}
              data-test="changePasswordForm"
            >
              <TextField
                name="oldPassword"
                label={intl.formatMessage({ defaultMessage: "Old Password" })}
                type="password"
                value={values.oldPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={
                  touched.oldPassword && errors.oldPassword
                    ? [{ message: errors.oldPassword }]
                    : undefined || fieldErrors!.oldPassword
                }
              />
              <TextField
                name="newPassword"
                label={intl.formatMessage({ defaultMessage: "New Password" })}
                type="password"
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={
                  touched.newPassword && errors.newPassword
                    ? [{ message: errors.newPassword }]
                    : undefined || fieldErrors!.newPassword
                }
              />
              <TextField
                name="newPasswordRepeat"
                label={intl.formatMessage({
                  defaultMessage: "Confirm Password",
                })}
                type="password"
                value={values.newPasswordRepeat}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={
                  touched.newPasswordRepeat && errors.newPasswordRepeat
                    ? [{ message: errors.newPasswordRepeat }]
                    : undefined || fieldErrors!.newPasswordRepeat
                }
              />
              <S.FormButtons>
                <Button
                  testingContext="cancelButton"
                  type="button"
                  color="labelOnly"
                  onClick={hide}
                >
                  <FormattedMessage {...commonMessages.cancel} />
                </Button>
                <Button
                  testingContext="submit"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  <FormattedMessage {...commonMessages.save} />
                </Button>
              </S.FormButtons>
            </S.ColumnForm>
          );
        }}
      </Formik>
    </>
  );
};
