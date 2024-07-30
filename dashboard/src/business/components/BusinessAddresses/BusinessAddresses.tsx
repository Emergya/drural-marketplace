import { makeStyles } from "@drural/macaw-ui";
import { Card, CardContent } from "@material-ui/core";
import { BusinessDetails_company_address } from "@saleor/business/types/BusinessDetails";
import AddressFormatter from "@saleor/components/AddressFormatter";
import CardMenu from "@saleor/components/CardMenu";
import CardTitle from "@saleor/components/CardTitle";
import { maybe } from "@saleor/misc";
import React from "react";
import { defineMessages } from "react-intl";
import { useIntl } from "react-intl";

const messages = defineMessages({
  defaultAddress: {
    defaultMessage: "Default Address"
  },
  editAddress: {
    defaultMessage: "Edit Address"
  }
});
const useStyles = makeStyles(
  {
    actions: {
      flexDirection: "row"
    },
    actionsContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "flex-end"
    },
    card: {
      display: "flex",
      flexDirection: "column"
    }
  },
  { name: "BusinessAddresses" }
);

export interface BusinessAddressesProps {
  address: BusinessDetails_company_address;
  disabled: boolean;
  onEdit: () => void;
}

const BusinessAddresses: React.FC<BusinessAddressesProps> = props => {
  const { address, disabled, onEdit } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <Card className={classes.card}>
      <CardTitle
        title={intl.formatMessage(messages.defaultAddress)}
        height="const"
        toolbar={
          <CardMenu
            disabled={disabled}
            menuItems={[
              {
                label: intl.formatMessage(messages.editAddress),
                onSelect: () => onEdit()
              }
            ]}
          />
        }
      />
      <CardContent>
        <AddressFormatter businessAddress={maybe(() => address)} />
      </CardContent>
    </Card>
  );
};
BusinessAddresses.displayName = "BusinessAddresses";
export default BusinessAddresses;
