import { UilCheck, UilCreditCard } from "@iconscout/react-unicons";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { businessStripeConfigurationPath } from "@saleor/business/urls";
import CardTitle from "@saleor/components/CardTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage } from "react-intl";

import { useStyles } from "./styles";
import { BusinessStripeConfigurationProps } from "./types";

export const BusinessStripeConfiguration: React.FC<BusinessStripeConfigurationProps> = ({
  businessId,
  disabled,
  isStripeEnabled
}) => {
  const classes = useStyles();
  const navigate = useNavigator();

  return (
    <Card>
      <CardTitle
        title={<FormattedMessage {...commonMessages.connectWithStripe} />}
      />
      <CardContent>
        {isStripeEnabled ? (
          <div className={classes.unenabledContent}>
            <UilCheck className={classes.unenabledIcon} />
            <Typography className={classes.unenabledtext}>
              <FormattedMessage defaultMessage="Your company is already connected with Stripe." />
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.enabledContent}>
              <FormattedMessage defaultMessage="Click the link below to configure and connect your company with Stripe." />
            </Typography>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              disabled={disabled}
              onClick={() =>
                navigate(businessStripeConfigurationPath(businessId))
              }
            >
              <UilCreditCard className={classes.stripeIcon} />
              <FormattedMessage {...commonMessages.connectWithStripe} />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
