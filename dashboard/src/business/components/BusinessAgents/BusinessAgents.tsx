import { UilUserCheck } from "@iconscout/react-unicons";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { businessAgentListUrl } from "@saleor/business/urls";
import CardTitle from "@saleor/components/CardTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { FormattedMessage } from "react-intl";

import { useStyles } from "./styles";
import { BusinessAgentsProps } from "./types";

export const BusinessAgents: React.FC<BusinessAgentsProps> = ({
  businessId,
  disabled
}) => {
  const classes = useStyles();
  const navigate = useNavigator();

  return (
    <Card>
      <CardTitle title={<FormattedMessage {...sectionNames.shopAgents} />} />
      <CardContent>
        <Typography className={classes.content}>
          <FormattedMessage defaultMessage="You can add agents to your shop to help you manage it." />
        </Typography>
        <Button
          color="secondary"
          disabled={disabled}
          fullWidth
          variant="outlined"
          onClick={() => navigate(businessAgentListUrl(businessId))}
        >
          <UilUserCheck className={classes.iconButton} />
          <FormattedMessage defaultMessage="Add agents" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BusinessAgents;
