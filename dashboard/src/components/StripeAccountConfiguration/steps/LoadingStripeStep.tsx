import { CircularProgress, Typography } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

import StripeLogo from "../../../../assets/images/dRuralImages/stripe-logo.svg";
import dRuralLogo from "../../../../assets/images/dRuralLogos/Icon-Negative.svg";
import { useStyles } from "../styles";

export const LoadingStripeStep: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contentWrapper}>
        <Typography className={classes.loadingPretitle} variant="subtitle1">
          <FormattedMessage defaultMessage="Connecting with Stripe..." />
        </Typography>
      </div>
      <div
        className={classNames(
          classes.actionWrapper,
          classes.actionWrapperCenter,
          classes.loadingActionWrapper
        )}
      >
        <SVG className={classes.dRuralLogo} src={dRuralLogo} />

        <CircularProgress className={classes.loader} size={54} />

        <SVG src={StripeLogo} />
      </div>
    </>
  );
};
