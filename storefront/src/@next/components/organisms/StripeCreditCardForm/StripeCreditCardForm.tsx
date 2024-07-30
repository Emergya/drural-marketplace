import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Formik } from "formik";
import React from "react";

import { ErrorMessage, StripeInputElement } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Stripe credit card form.
 */
const StripeCreditCardForm: React.FC<IProps> = ({
  formRef,
  formId,
  errors = [],
  onSubmit,
  resetSubmitErrors,
}: IProps) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <Formik
      initialValues={null}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(stripe, elements);
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        isValid,
      }) => (
        <S.Form id={formId} ref={formRef} onSubmit={handleSubmit}>
          <S.Card data-test="stripeForm">
            <S.CardNumberField>
              <StripeInputElement
                type="CardNumber"
                label="Card number"
                onChange={event => {
                  handleChange(event);
                  resetSubmitErrors();
                }}
              />
            </S.CardNumberField>
            <S.CardExpiryField>
              <StripeInputElement
                type="CardExpiry"
                label="Expiration date"
                onChange={event => {
                  handleChange(event);
                  resetSubmitErrors();
                }}
              />
            </S.CardExpiryField>
            <S.CardCvcField>
              <StripeInputElement
                type="CardCvc"
                label="CVC"
                onChange={event => {
                  handleChange(event);
                  resetSubmitErrors();
                }}
              />
            </S.CardCvcField>
          </S.Card>
          <ErrorMessage errors={errors} />
        </S.Form>
      )}
    </Formik>
  );
};

export { StripeCreditCardForm };
