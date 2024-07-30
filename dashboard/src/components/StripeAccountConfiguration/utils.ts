import {
  StripeAccountConfigurationSteps,
  StripeConnectionStatus
} from "./types";

export const getStripeAccountConfigurationStep = (
  stripeAccountId: string,
  stripeEnabled: boolean,
  stripeLoading: boolean,
  stripeReturned: boolean,
  stripeConnection: StripeConnectionStatus
): StripeAccountConfigurationSteps => {
  if (stripeLoading) {
    return StripeAccountConfigurationSteps.loadingStripe;
  }
  if (!stripeAccountId) {
    return StripeAccountConfigurationSteps.connectWithStripe;
  }
  if (stripeAccountId && !stripeEnabled) {
    if (!stripeReturned) {
      return StripeAccountConfigurationSteps.setUpStripeAccount;
    }
    if (stripeReturned) {
      return stripeConnection === StripeConnectionStatus.success
        ? StripeAccountConfigurationSteps.stripeConectionSuccess
        : StripeAccountConfigurationSteps.stripeConectionError;
    }
  }
  if (stripeEnabled) {
    return StripeAccountConfigurationSteps.stripeConectionSuccess;
  }
};
