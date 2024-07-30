import { Backlink } from "@drural/macaw-ui";
import { Container } from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import StripeAccountConfiguration from "@saleor/components/StripeAccountConfiguration";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { BusinessStripeConfiigurationPageProps } from "./types";

const BusinessStripeConfiigurationPage: React.FC<BusinessStripeConfiigurationPageProps> = ({
  activeStep,
  disabled,
  onBack,
  onCreateStripeAccount,
  onLinkStripeAccount
}) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Container>
      <Backlink onClick={onBack}>
        {intl.formatMessage(commonMessages.shop)}
      </Backlink>
      <PageHeader title={intl.formatMessage(commonMessages.stripePayments)} />
      <CardSpacer />
      <Grid className={classes.grid}>
        <div>
          <StripeAccountConfiguration
            activeStep={activeStep}
            disabled={disabled}
            onBack={onBack}
            onCreateStripeAccount={onCreateStripeAccount}
            onLinkStripeAccount={onLinkStripeAccount}
          />
        </div>
      </Grid>
    </Container>
  );
};
BusinessStripeConfiigurationPage.displayName =
  "BusinessStripeConfiigurationPage";
export default BusinessStripeConfiigurationPage;
