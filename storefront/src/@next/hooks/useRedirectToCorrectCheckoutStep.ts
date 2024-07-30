import { useCart, useCheckout } from "@drural/sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { CHECKOUT_STEPS } from "@pages/CheckoutPage/utils";
import { checkIfShippingRequiredForProducts } from "@utils/core";

import { useCheckoutStepState } from "./useCheckoutStepState";

export const useRedirectToCorrectCheckoutStep = (isFullyLoaded: boolean) => {
  const { pathname, replace } = useRouter();
  const { totalPrice, items } = useCart();
  const { checkout, payment } = useCheckout();
  const { recommendedStep, maxPossibleStep } = useCheckoutStepState(
    items,
    checkout,
    payment,
    totalPrice
  );

  useEffect(() => {
    const stepFromPath = CHECKOUT_STEPS.find(({ link }) => link === pathname)
      ?.step;
    const isShippingRequired = checkIfShippingRequiredForProducts(items);
    const isIncorrectStep =
      !stepFromPath ||
      stepFromPath > maxPossibleStep ||
      (pathname === CHECKOUT_STEPS[1].link && !isShippingRequired);

    const getStepLink = () =>
      CHECKOUT_STEPS.find(stepObj => stepObj.step === recommendedStep)?.link ||
      CHECKOUT_STEPS[0].link;

    if (isFullyLoaded && isIncorrectStep) {
      replace(getStepLink());
    }
  }, [pathname, isFullyLoaded, recommendedStep, maxPossibleStep]);
};
