import { Button, Typography } from "@material-ui/core";
import useNavigator from "@saleor/hooks/useNavigator";
import { productAddUrl } from "@saleor/products/urls";
import classNames from "classnames";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

import stripeConfigurationSuccessImg from "../../../../../assets/images/dRuralImages/stripe-configuration-success.svg";
import { useStyles } from "../../styles";
import { IStripeConectionSuccessStepProps } from "./types";

export const StripeConectionSuccessStep: React.FC<IStripeConectionSuccessStepProps> = ({
  disabled
}) => {
  const classes = useStyles();
  const navigate = useNavigator();

  return (
    <div className={classes.flexContainer}>
      <div className={classes.completeFlowImagWrapper}>
        <SVG src={stripeConfigurationSuccessImg} />
      </div>
      <div className={classes.contentCol}>
        <div className={classes.contentWrapper}>
          <Typography className={classes.paragraphSpacer} variant="h6">
            <FormattedMessage defaultMessage="Thank you!" />
          </Typography>
          <Typography className={classes.paragraphSpacer}>
            <FormattedMessage defaultMessage="The Stripe onboarding proccess has been completed." />
          </Typography>
          <Typography>
            <FormattedMessage defaultMessage="Now you can publish your first service." />
          </Typography>
        </div>
        <div
          className={classNames(
            classes.mobileActionWrapper,
            classes.mobileActionWrapperCenter
          )}
        >
          <Button
            color="primary"
            disabled={disabled}
            variant="contained"
            onClick={() => navigate(productAddUrl())}
          >
            <FormattedMessage defaultMessage="Publish a service" />
          </Button>
        </div>
      </div>
    </div>
  );
};
