import { Button, Typography } from "@material-ui/core";
import { commonMessages } from "@saleor/intl";
import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";

import { useStyles } from "../../styles";
import { IConnectWithStripeStepProps } from "./types";

export const ConnectWithStripeStep: React.FC<IConnectWithStripeStepProps> = ({
  disabled,
  onCreateStripeAccount
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contentWrapper}>
        <Typography className={classes.paragraphSpacer}>
          <FormattedMessage defaultMessage="If you want to collect payments in dRural, you must connect to Stripe and create a new Stripe account. " />
        </Typography>
        <Typography>
          <FormattedMessage defaultMessage="Just click on the button below and follow the instructions to start the process." />
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
          onClick={onCreateStripeAccount}
        >
          <FormattedMessage {...commonMessages.connectWithStripe} />
        </Button>
      </div>
    </>
  );
};
