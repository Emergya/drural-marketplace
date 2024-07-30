export enum StripeConnectionStatus {
  success = "success",
  error = "error"
}

export type StripeReturned = Partial<{
  stripeReturned: boolean;
}>;

export type StripeConnection = Partial<{
  stripeConnection: StripeConnectionStatus;
}>;

export enum StripeAccountConfigurationSteps {
  connectWithStripe = "connectWithStripe",
  loadingStripe = "loadingStripe",
  setUpStripeAccount = "setUpStripeAccount",
  stripeConectionError = "stripeConectionError",
  stripeConectionSuccess = "stripeConectionSuccess"
}
export interface IStripeAccountConfigurationProps {
  activeStep: StripeAccountConfigurationSteps;
  disabled: boolean;
  onBack: () => void;
  onCreateStripeAccount: () => void;
  onLinkStripeAccount: () => void;
}
