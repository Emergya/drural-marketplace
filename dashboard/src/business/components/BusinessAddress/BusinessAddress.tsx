import { makeStyles } from "@drural/macaw-ui";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { BusinessDetails_company_address } from "@saleor/business/types/BusinessDetails";
import AddressFormatter from "@saleor/components/AddressFormatter";
import CardTitle from "@saleor/components/CardTitle";
import { buttonMessages, commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "../../../misc";

const useStyles = makeStyles(
  theme => ({
    label: {
      fontWeight: 600,
      marginBottom: theme.spacing(1)
    }
  }),
  { name: "BusinessAddress" }
);

export interface BusinessAddressProps {
  address: BusinessDetails_company_address;
  disabled: boolean;
  onAddressManageClick: () => void;
}

const BusinessAddress: React.FC<BusinessAddressProps> = props => {
  const { address, disabled, onAddressManageClick } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Address",
          description: "header"
        })}
        toolbar={
          <Button
            color="primary"
            disabled={disabled}
            variant="text"
            onClick={onAddressManageClick}
          >
            <FormattedMessage {...buttonMessages.manage} />
          </Button>
        }
      />

      <CardContent>
        <Typography className={classes.label}>
          {intl.formatMessage(commonMessages.address)}
        </Typography>
        <AddressFormatter businessAddress={maybe(() => address)} />
      </CardContent>
    </Card>
  );
};
BusinessAddress.displayName = "BusinessAddress";
export default BusinessAddress;
