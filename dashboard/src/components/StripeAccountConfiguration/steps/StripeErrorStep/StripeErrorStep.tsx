import { Button, Typography } from "@material-ui/core";
import { commonMessages } from "@saleor/intl";
import classNames from "classnames";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

import stripeConfigurationErrorImg from "../../../../../assets/images/dRuralImages/oooops.svg";
import { useStyles } from "../../styles";
import { IStripeErrorStepProps } from "./types";

export const StripeErrorStep: React.FC<IStripeErrorStepProps> = ({
  disabled,
  onBack
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
            <FormattedMessage defaultMessage="It seems there is an error. Please go back and try it later." />
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
            onClick={onBack}
          >
            <FormattedMessage defaultMessage="Go back" />
          </Button>
        </div>
      </div>
    </div>
  );
};
