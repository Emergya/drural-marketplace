import { UilExclamationTriangle } from "@iconscout/react-unicons";
import { Button, Typography } from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import CloseIcon from "@saleor/components/CloseIcon";
import React from "react";
import { FormattedMessage } from "react-intl";

import { useStyles } from "./styles";
import { IStripeWarningProps } from "./types";

const StripeWarning: React.FC<IStripeWarningProps> = ({
  spacer,
  text,
  onClose,
  onConfigureStripe
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <CloseIcon
          className={classes.closeIconWrapper}
          size={20}
          onClose={onClose}
        />
        <div className={classes.contentWrapper}>
          <div className={classes.warningIconWrapper}>
            <div className={classes.warningIconInnerWrapper}>
              <UilExclamationTriangle size={22} />
            </div>
          </div>
          <div className={classes.contentInnerWrapper}>
            <Typography variant="h4" className={classes.title}>
              <FormattedMessage defaultMessage="This is important" />
            </Typography>
            <Typography>{text}</Typography>
            <div className={classes.actionWarpper}>
              <Button color="secondary" variant="outlined" onClick={onClose}>
                <FormattedMessage defaultMessage="Ignore" />
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={onConfigureStripe}
              >
                <FormattedMessage defaultMessage="Configure stripe" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {spacer && <CardSpacer />}
    </>
  );
};

StripeWarning.displayName = "StripeWarning";
export default StripeWarning;
