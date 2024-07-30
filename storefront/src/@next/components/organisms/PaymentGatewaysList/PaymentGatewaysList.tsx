import React from "react";
import { FormattedMessage } from "react-intl";

import { Radio } from "@components/atoms";
import { PROVIDERS } from "@temp/core/config";
import { IPaymentGateway } from "@types";

import {
  /*   AdyenPaymentGateway, */
  BasicPayment,
  /*   BraintreePaymentGateway,
  DummyPaymentGateway, */
  StripePaymentGateway,
} from "..";
import * as S from "./styles";
import { IProps, PaymentMethodsEnum } from "./types";

/**
 * Payment Gateways list
 */
const PaymentGatewaysList: React.FC<IProps> = ({
  paymentGateways,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  formRef,
  formId,
  processPayment,
  submitPayment,
  submitPaymentSuccess,
  errors,
  onError,
  paymentMethods,
  stripeAccountId,
  selectPaymentMethod,
  selectedPaymentMethod,
}: IProps) => {
  // ATM, since we are only using Stripe, we will bypass the other Saleor possibilities

  const stripeGateway = paymentGateways.find(
    payment => payment.name === PROVIDERS.STRIPE.label
  );

  const getStripeGateway = (stripeGateway: IPaymentGateway) => {
    return (
      <div>
        <StripePaymentGateway
          config={stripeGateway.config}
          formRef={formRef}
          formId={formId}
          processPayment={(token, cardData) =>
            processPayment(stripeGateway.id, token, cardData)
          }
          stripeAccountId={stripeAccountId}
          submitPayment={submitPayment}
          submitPaymentSuccess={submitPaymentSuccess}
          errors={errors}
          onError={onError}
        />
      </div>
    );
  };

  /*   const getPaymentGateway = () =>
    paymentGateways.map(({ id, name, config }, index) => {
      const checked = selectedPaymentGateway === id;
      // As mentioned before, we will only be using Stripe gateway, but this switch is left in case
      // of needing in future releases
      switch (name) {
        case PROVIDERS.BRAINTREE.label:
          return (
            <div key={index}>
              <S.Tile checked={checked}>
                <Radio
                  data-test="checkoutPaymentGatewayBraintreeInput"
                  name="payment-method"
                  value="credit-card"
                  checked={checked}
                  onChange={() =>
                    selectPaymentGateway && selectPaymentGateway(id)
                  }
                  customLabel
                >
                  <span data-test="checkoutPaymentGatewayBraintreeName">
                    {name}
                  </span>
                </Radio>
              </S.Tile>
              {checked && (
                <BraintreePaymentGateway
                  config={config}
                  formRef={formRef}
                  formId={formId}
                  processPayment={(token, cardData) =>
                    processPayment(id, token, cardData)
                  }
                  errors={errors}
                  onError={onError}
                />
              )}
            </div>
          );

        case PROVIDERS.DUMMY.label:
          return (
            <div key={index}>
              <S.Tile checked={checked}>
                <Radio
                  data-test="checkoutPaymentGatewayDummyInput"
                  name="payment-method"
                  value="dummy"
                  checked={checked}
                  onChange={() =>
                    selectPaymentGateway && selectPaymentGateway(id)
                  }
                  customLabel
                >
                  <span data-test="checkoutPaymentGatewayDummyName">
                    {name}
                  </span>
                </Radio>
              </S.Tile>
              {checked && (
                <DummyPaymentGateway
                  formRef={formRef}
                  formId={formId}
                  processPayment={token => processPayment(id, token)}
                  initialStatus={selectedPaymentGatewayToken}
                />
              )}
            </div>
          );

        case PROVIDERS.STRIPE.label:
          return (
            <div key={index}>
              <StripePaymentGateway
                config={config}
                formRef={formRef}
                formId={formId}
                processPayment={(token, cardData) =>
                  processPayment(id, token, cardData)
                }
                submitPayment={submitPayment}
                submitPaymentSuccess={submitPaymentSuccess}
                errors={errors}
                onError={onError}
              />
            </div>
          );

        case PROVIDERS.ADYEN.label:
          return (
            <div key={index}>
              <S.Tile checked={checked}>
                <Radio
                  data-test="checkoutPaymentGatewayAdyenInput"
                  name="payment-method"
                  value="adyen"
                  checked={checked}
                  onChange={() =>
                    selectPaymentGateway && selectPaymentGateway(id)
                  }
                  customLabel
                >
                  <span data-test="checkoutPaymentGatewayAdyenName">
                    {name}
                  </span>
                </Radio>
              </S.Tile>
              {checked && (
                <AdyenPaymentGateway
                  config={config}
                  formRef={formRef}
                  scriptConfig={PROVIDERS.ADYEN.script}
                  styleConfig={PROVIDERS.ADYEN.style}
                  processPayment={() => processPayment(id)}
                  submitPayment={submitPayment}
                  submitPaymentSuccess={submitPaymentSuccess}
                  errors={errors}
                  onError={onError}
                />
              )}
            </div>
          );

        default:
          return null;
      }
    }); */

  const getBasicPayment = (paymentMethodIdentifier: string) => {
    return (
      <BasicPayment
        formRef={formRef}
        formId={formId}
        paymentMethodIdentifier={paymentMethodIdentifier}
        processPayment={() => processPayment(paymentMethodIdentifier)}
        // TODO: specific error handling associated with basic payment methods
        /* errors={errors} */
      />
    );
  };

  const getPaymentMethods = () =>
    paymentMethods &&
    paymentMethods.map(method => {
      const identifier = method?.identifier;
      const checked = selectedPaymentMethod === identifier;

      switch (identifier) {
        case PaymentMethodsEnum.CARD:
          return (
            <div key={identifier}>
              <S.Tile checked={checked}>
                <Radio
                  data-test="checkoutPaymentMethodInput"
                  name="payment-method"
                  value={identifier}
                  checked={checked}
                  onChange={() => {
                    if (typeof selectPaymentMethod === "function") {
                      selectPaymentMethod(identifier);
                    }
                    if (stripeGateway) {
                      selectPaymentGateway(stripeGateway.id);
                    }
                  }}
                  customLabel
                >
                  <span data-test="checkoutPaymentMethod">
                    <FormattedMessage defaultMessage="Credit card" />
                  </span>
                </Radio>
              </S.Tile>
              {checked && stripeGateway && getStripeGateway(stripeGateway)}
            </div>
          );
        case PaymentMethodsEnum.PAY_AT_STORE:
          return (
            <div key={identifier}>
              <S.Tile checked={checked}>
                <Radio
                  data-test="checkoutPaymentMethodInput"
                  name="payment-method"
                  value={identifier}
                  checked={checked}
                  onChange={() =>
                    selectPaymentMethod && selectPaymentMethod(identifier)
                  }
                  customLabel
                >
                  <span data-test="checkoutPaymentMethod">
                    <FormattedMessage defaultMessage="Pay at the store" />
                  </span>
                </Radio>
              </S.Tile>
              {checked && getBasicPayment(identifier)}
            </div>
          );
        case PaymentMethodsEnum.BANK_TRANSFER:
          return (
            <div key={identifier}>
              <S.Tile checked={checked}>
                <Radio
                  data-test="checkoutPaymentMethodInput"
                  name="payment-method"
                  value={identifier}
                  checked={checked}
                  onChange={() =>
                    selectPaymentMethod && selectPaymentMethod(identifier)
                  }
                  customLabel
                >
                  <span data-test="checkoutPaymentMethod">
                    <FormattedMessage defaultMessage="Bank transfer" />
                  </span>
                </Radio>
              </S.Tile>
              {checked && getBasicPayment(identifier)}
            </div>
          );
        default:
          return null;
      }
    });

  return <S.Wrapper>{getPaymentMethods()}</S.Wrapper>;
};

export { PaymentGatewaysList };
