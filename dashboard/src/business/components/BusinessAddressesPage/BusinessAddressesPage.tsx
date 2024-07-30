import { Backlink, makeStyles } from "@drural/macaw-ui";
import { BusinessDetails_company } from "@saleor/business/types/BusinessDetails";
import CardSpacer from "@saleor/components/CardSpacer";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import React from "react";
import { useIntl } from "react-intl";
import { defineMessages } from "react-intl";
import { FormattedMessage } from "react-intl";

import BusinessAddresses from "../BusinessAddresses";

const messages = defineMessages({
  businessAddress: {
    defaultMessage: "{businessName}'s Address Book",
    description: "business' address book, header"
  },
  businessDetails: {
    defaultMessage: "{businessName}'s Details",
    description: "business details, header"
  }
});

const useStyles = makeStyles(
  theme => ({
    root: {
      display: "grid",
      gap: `${theme.spacing(3)}px`,
      gridTemplateColumns: "repeat(3, 1fr)",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)"
      },
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(1, 1fr)"
      }
    }
  }),
  { name: "BusinessAddressesPage" }
);

export interface BusinessAddressListPageProps {
  business: BusinessDetails_company;
  disabled: boolean;
  id: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

const BusinessAddressListPage: React.FC<BusinessAddressListPageProps> = props => {
  const { business, disabled, id, onBack, onEdit } = props;

  const intl = useIntl();
  const classes = useStyles();

  const businessName = business?.name;
  const isEmpty = business && Object.keys(business?.address).length === 0;

  return (
    <Container>
      <Backlink onClick={onBack}>
        {intl.formatMessage(messages.businessDetails, { businessName })}
      </Backlink>
      <PageHeader
        title={intl.formatMessage(messages.businessAddress, { businessName })}
      />
      <CardSpacer />
      {isEmpty ? (
        <div>
          <FormattedMessage defaultMessage="No addresses found" />
        </div>
      ) : (
        <div className={classes.root}>
          <BusinessAddresses
            address={business?.address}
            disabled={disabled}
            onEdit={() => onEdit(id)}
          />
        </div>
      )}
    </Container>
  );
};
export default BusinessAddressListPage;
