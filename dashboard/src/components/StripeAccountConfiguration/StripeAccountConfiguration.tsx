import { Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ConnectWithStripeStep } from "./steps/ConnectWithStripeStep/ConnectWithStripeStep";
import { LoadingStripeStep } from "./steps/LoadingStripeStep";
import { SetUpStripeAccountStep } from "./steps/SetUpStripeAccountStep/SetUpStripeAccountStep";
import { StripeConectionErrorStep } from "./steps/StripeConectionErrorStep/StripeConectionErrorStep";
import { StripeConectionSuccessStep } from "./steps/StripeConectionSuccessStep/StripeConectionSuccessStep";
import { StripeErrorStep } from "./steps/StripeErrorStep/StripeErrorStep";
import {
  IStripeAccountConfigurationProps,
  StripeAccountConfigurationSteps
} from "./types";

const StripeAccountConfiguration: React.FC<IStripeAccountConfigurationProps> = ({
  activeStep,
  disabled,
  onBack,
  onCreateStripeAccount,
  onLinkStripeAccount
}) => (
  <Card>
    <CardTitle
      title={<FormattedMessage {...commonMessages.connectWithStripe} />}
    />
    <CardContent>
      {(activeStep => {
        switch (activeStep) {
          case StripeAccountConfigurationSteps.connectWithStripe:
            return (
              <ConnectWithStripeStep
                disabled={disabled}
                onCreateStripeAccount={onCreateStripeAccount}
              />
            );
          case StripeAccountConfigurationSteps.loadingStripe:
            return <LoadingStripeStep />;
          case StripeAccountConfigurationSteps.setUpStripeAccount:
            return (
              <SetUpStripeAccountStep
                disabled={disabled}
                onLinkStripeAccount={onLinkStripeAccount}
              />
            );
          case StripeAccountConfigurationSteps.stripeConectionError:
            return (
              <StripeConectionErrorStep
                disabled={disabled}
                onLinkStripeAccount={onLinkStripeAccount}
              />
            );
          case StripeAccountConfigurationSteps.stripeConectionSuccess:
            return <StripeConectionSuccessStep disabled={disabled} />;
          default:
            return <StripeErrorStep disabled={disabled} onBack={onBack} />;
        }
      })(activeStep)}
    </CardContent>
  </Card>
);

StripeAccountConfiguration.displayName = "StripeAccountConfiguration";
export default StripeAccountConfiguration;
