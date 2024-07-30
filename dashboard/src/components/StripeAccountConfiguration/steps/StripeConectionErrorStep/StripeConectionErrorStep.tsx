import { UilExternalLinkAlt } from "@iconscout/react-unicons";
import { Button, Typography } from "@material-ui/core";
import { commonMessages } from "@saleor/intl";
import classNames from "classnames";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

import stripeConfigurationErrorImg from "../../../../../assets/images/dRuralImages/oooops.svg";
import { useStyles } from "../../styles";
import { IStripeConectionErrorStepProps } from "./types";

export const StripeConectionErrorStep: React.FC<IStripeConectionErrorStepProps> = ({
  disabled,
  onLinkStripeAccount
}) => {
  const classes = useStyles();

  return (
    <div className={classes.flexContainer}>
      <div className={classes.completeFlowImagWrapper}>
        <SVG src={stripeConfigurationErrorImg} />
      </div>
      <div className={classes.contentCol}>
        <div className={classes.contentWrapper}>
          <Typography className={classes.paragraphSpacer} variant="h6">
            <FormattedMessage {...commonMessages.oooops} />
          </Typography>
          <Typography>
            <FormattedMessage defaultMessage="Looks like there is some Stripe configuration left. Please click the button below and finish setting up." />
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
            onClick={onLinkStripeAccount}
          >
            <FormattedMessage defaultMessage="Set up Stripe account" />
            <UilExternalLinkAlt className={classes.iconButton} />
          </Button>
        </div>
      </div>
    </div>
  );
};
