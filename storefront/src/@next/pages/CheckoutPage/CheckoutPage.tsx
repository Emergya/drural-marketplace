import { useCart, useCheckout } from "@drural/sdk";
import { CompleteCheckout_checkoutComplete_order } from "@drural/sdk/lib/mutations/gqlTypes/CompleteCheckout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";

import { Button, Loader, Redirect } from "@components/atoms";
import { CheckoutProgressBar } from "@components/molecules";
import {
  adyenNotNegativeConfirmationStatusCodes,
  CartSummary,
  PaymentGatewaysList,
  translateAdyenConfirmationError,
} from "@components/organisms";
import { Checkout } from "@components/templates";
import { useRedirectToCorrectCheckoutStep } from "@hooks";
import { useResetCheckout } from "@hooks/useResetCheckout/useResetCheckout";
import { paths } from "@paths";
import { paymentGatewayNames } from "@temp/constants";
import { ICardData, IFormError, IPaymentSubmitResult } from "@types";

import {
  CheckoutAddressSubpage,
  CheckoutPaymentSubpage,
  CheckoutReviewSubpage,
  CheckoutShippingSubpage,
} from "./subpages";
import {
  CHECKOUT_STEPS,
  CheckoutStep,
  getAvailableSteps,
  getContinueButtonText,
  getCurrentStep,
  prepareCartSummaryProducts,
  stepSubmitSuccessHandler,
  SubpageCompleteHandler,
} from "./utils";

const CHECKOUT_GETEWAY_FORM_ID = "gateway-form";

const CheckoutPage: React.FC<NextPage> = () => {
  const { push, pathname, query } = useRouter();

  const {
    loaded: cartLoaded,
    shippingPrice,
    discount,
    subtotalPrice,
    totalPrice,
    items,
  } = useCart();
  const {
    loaded: checkoutLoaded,
    checkout,
    payment,
    availablePaymentGateways,
    createPayment,
    completeCheckout,
    removeCheckout,
  } = useCheckout();
  const intl = useIntl();
  const isFullyLoaded = cartLoaded && checkoutLoaded;
  const alert = useAlert();
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    string | undefined
  >(payment?.gateway);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | undefined
  >();
  const [
    selectedPaymentGatewayToken,
    setSelectedPaymentGatewayToken,
  ] = useState<string | undefined>(payment?.token);
  const [paymentGatewayErrors, setPaymentGatewayErrors] = useState<
    IFormError[]
  >([]);
  const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);
  const pageCompleteRef = useRef<SubpageCompleteHandler>(null);

  const steps = getAvailableSteps(items);
  const { activeStepIndex, activeStep } = getCurrentStep(pathname, steps);
  const handleStepSubmitSuccess = stepSubmitSuccessHandler(
    push,
    steps,
    activeStepIndex
  );
  const buttonText = getContinueButtonText(activeStep.step, items);
  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? { gross: shippingPrice, net: shippingPrice }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };
  const pageProps = {
    ref: pageCompleteRef,
    changeSubmitProgress: setSubmitInProgress,
    onSubmitSuccess: handleStepSubmitSuccess,
  };

  const checkoutSubpage = useMemo(() => {
    const subpageMapping: Partial<Record<CheckoutStep, JSX.Element>> = {
      [CheckoutStep.Address]: <CheckoutAddressSubpage {...pageProps} />,
      [CheckoutStep.Shipping]: <CheckoutShippingSubpage {...pageProps} />,
      [CheckoutStep.Payment]: (
        <CheckoutPaymentSubpage
          {...pageProps}
          paymentGatewayFormRef={checkoutGatewayFormRef}
          onPaymentGatewayError={setPaymentGatewayErrors}
          selectedPaymentMethod={selectedPaymentMethod}
        />
      ),
      [CheckoutStep.Review]: (
        <CheckoutReviewSubpage
          {...pageProps}
          paymentGatewayFormRef={checkoutGatewayFormRef}
          selectedPaymentGatewayToken={selectedPaymentGatewayToken}
          products={prepareCartSummaryProducts(items) || []}
        />
      ),
    };
    return subpageMapping[activeStep.step];
  }, [activeStep.step]);

  const handleProcessPayment = async (
    gateway: string,
    token?: string,
    cardData?: ICardData
  ) => {
    const paymentConfirmStepLink = CHECKOUT_STEPS.find(
      step => step.step === CheckoutStep.PaymentConfirm
    )?.link;
    const { dataError } = await createPayment({
      gateway,
      token,
      creditCard: cardData,
      returnUrl: `${window.location.origin}${paymentConfirmStepLink}`,
    });
    const errors = dataError?.error;
    setSubmitInProgress(false);
    if (errors) {
      setPaymentGatewayErrors(errors);
    } else {
      setPaymentGatewayErrors([]);
      handleStepSubmitSuccess(CheckoutStep.Payment);
    }
  };

  const handleSubmitPayment = async (paymentData?: object) => {
    const response = await completeCheckout({ paymentData });
    return {
      confirmationData: response.data?.confirmationData,
      confirmationNeeded: response.data?.confirmationNeeded,
      order: response.data?.order,
      errors: response.dataError?.error,
    } as IPaymentSubmitResult;
  };

  const handleSubmitPaymentSuccess = (
    order?: CompleteCheckout_checkoutComplete_order | null
  ) => {
    setPaymentGatewayErrors([]);
    handleStepSubmitSuccess(CheckoutStep.Review, {
      id: order?.id,
      orderStatus: order?.status,
      orderNumber: order?.number,
      token: order?.token,
    });
  };

  const handlePaymentGatewayError = (errors: IFormError[]) => {
    setSubmitInProgress(false);
    setPaymentGatewayErrors(errors);
    const paymentStepLink = steps.find(
      step => step.step === CheckoutStep.Payment
    )?.link;
    if (paymentStepLink) {
      push(paymentStepLink);
    }
  };

  const paymentGateways = availablePaymentGateways && (
    <PaymentGatewaysList
      paymentGateways={availablePaymentGateways}
      paymentMethods={
        items
          ? items[0]?.variant?.product?.paymentMethods
            ? items[0]?.variant?.product?.paymentMethods
            : []
          : []
      }
      stripeAccountId={
        items
          ? items[0].variant?.product?.company?.stripeCredentials?.accountId ||
            ""
          : ""
      }
      processPayment={handleProcessPayment}
      submitPayment={handleSubmitPayment}
      submitPaymentSuccess={handleSubmitPaymentSuccess}
      formId={CHECKOUT_GETEWAY_FORM_ID}
      formRef={checkoutGatewayFormRef}
      selectedPaymentGateway={selectedPaymentGateway}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      selectedPaymentMethod={selectedPaymentMethod}
      selectPaymentGateway={setSelectedPaymentGateway}
      selectPaymentMethod={setSelectedPaymentMethod}
      onError={handlePaymentGatewayError}
      errors={paymentGatewayErrors}
    />
  );

  const handlePaymentConfirm = async () => {
    /**
     * Prevent proceeding in confirmation flow in case of gateways that don't support it to prevent unknown bugs.
     */
    if (
      payment?.gateway !== paymentGatewayNames.adyen &&
      payment?.gateway !== paymentGatewayNames.stripe
    ) {
      const paymentStepLink = steps.find(
        step => step.step === CheckoutStep.Payment
      )?.link;
      if (paymentStepLink) {
        push(paymentStepLink);
      }
    }

    setSubmitInProgress(true);
    setPaymentConfirmation(true);
    /**
     * Saleor API creates an order for not fully authorised payments, thus we accept all non negative payment result codes,
     * assuming the payment is completed, what means we can proceed further.
     * https://docs.adyen.com/checkout/drop-in-web?tab=http_get_1#step-6-present-payment-result
     */
    if (
      adyenNotNegativeConfirmationStatusCodes.includes(
        query.resultCode as string
      )
    ) {
      const { data, dataError } = await completeCheckout();
      const errors = dataError?.error;
      if (errors) {
        setSubmitInProgress(false);
        setPaymentGatewayErrors(errors);
        const paymentStepLink = steps.find(
          step => step.step === CheckoutStep.Payment
        )?.link;
        if (paymentStepLink) {
          push(paymentStepLink);
        }
      } else {
        setPaymentGatewayErrors([]);
        handleStepSubmitSuccess(CheckoutStep.Review, {
          id: data?.order?.id,
          orderStatus: data?.order?.status,
          orderNumber: data?.order?.number,
          token: data?.order?.token,
        });
      }
    } else {
      setPaymentGatewayErrors([
        {
          message: translateAdyenConfirmationError(
            query.resultCode as string,
            intl
          ),
        },
      ]);
      const paymentStepLink = steps.find(
        step => step.step === CheckoutStep.Payment
      )?.link;
      if (paymentStepLink) {
        push(paymentStepLink);
        setSubmitInProgress(false);
        setPaymentConfirmation(false);
      }
    }
  };

  useRedirectToCorrectCheckoutStep(isFullyLoaded);
  useEffect(() => setSelectedPaymentGateway(payment?.gateway), [
    payment?.gateway,
  ]);
  useEffect(() => setSelectedPaymentGatewayToken(payment?.token), [
    payment?.token,
  ]);
  // TODO try if this is whats causing the damn redirect
  useEffect(() => {
    const paymentConfirmStepLink = CHECKOUT_STEPS.find(
      step => step.step === CheckoutStep.PaymentConfirm
    )?.link;
    if (
      !submitInProgress &&
      checkout &&
      pathname === paymentConfirmStepLink &&
      !paymentConfirmation
    ) {
      handlePaymentConfirm();
    }
  }, [pathname, query, submitInProgress, checkout]);

  useEffect(() => {
    if (paymentGatewayErrors.length > 0) {
      paymentGatewayErrors.map(error =>
        alert.show(
          {
            content: error.message,
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        )
      );
    }
  }, [paymentGatewayErrors]);

  // Ensures to reset checkout and create a new one for each checkout flow
  const loadingResetCheckout = useResetCheckout(
    checkout,
    checkoutLoaded,
    removeCheckout
  );

  return isFullyLoaded &&
    !loadingResetCheckout &&
    !submitInProgress &&
    !items?.length ? (
    <Redirect url={paths.cart} />
  ) : (
    <Checkout
      loading={submitInProgress}
      navigation={
        isFullyLoaded && (
          <CheckoutProgressBar steps={steps} activeStep={activeStepIndex} />
        )
      }
      cartSummary={
        <CartSummary
          shipping={shippingTaxedPrice}
          subtotal={subtotalPrice}
          promoCode={promoTaxedPrice}
          total={totalPrice}
          products={prepareCartSummaryProducts(items)}
        />
      }
      checkout={isFullyLoaded ? checkoutSubpage : <Loader />}
      paymentGateways={paymentGateways}
      hidePaymentGateways={steps[activeStepIndex].step !== CheckoutStep.Payment}
      button={
        cartLoaded &&
        buttonText && (
          <Button
            testingContext="checkoutPageNextStepButton"
            onClick={() => pageCompleteRef.current?.()}
            type="submit"
            disabled={!isFullyLoaded || submitInProgress}
          >
            {buttonText}
          </Button>
        )
      }
    />
  );
};

export { CheckoutPage };
