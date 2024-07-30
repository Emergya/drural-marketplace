import { UilExternalLinkAlt } from "@iconscout/react-unicons";
import { Button, Typography } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";

import { useStyles } from "../../styles";
import { ISetUpStripeAccountStepProps } from "./types";

export const SetUpStripeAccountStep: React.FC<ISetUpStripeAccountStepProps> = ({
  disabled,
  onLinkStripeAccount
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contentWrapper}>
        <Typography className={classes.paragraphSpacer}>
          <FormattedMessage defaultMessage="Congrats!" />
        </Typography>
        <Typography className={classes.paragraphSpacer}>
          <FormattedMessage defaultMessage="Your new Stripe account has been created." />
        </Typography>
        <Typography>
          <FormattedMessage defaultMessage="Now you must head to Stripe and continue the onboarding proccess there. You will be redirected to dRural after you set up your Stripe account" />
        </Typography>
      </div>
      <div
        className={classNames(
          classes.actionWrapper,
          classes.actionWrapperCenter
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
    </>
  );
};
