import { StripeAccountConfigurationSteps } from "@saleor/components/StripeAccountConfiguration/types";

export interface BusinessStripeConfiigurationPageProps {
  activeStep: StripeAccountConfigurationSteps;
  disabled: boolean;
  onBack: () => void;
  onCreateStripeAccount: () => void;
  onLinkStripeAccount: () => void;
}
