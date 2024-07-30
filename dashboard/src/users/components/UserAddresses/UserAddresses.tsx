import { Button, Card, CardContent, Typography } from "@material-ui/core";
import AddressFormatter from "@saleor/components/AddressFormatter";
import CardTitle from "@saleor/components/CardTitle";
import { Hr } from "@saleor/components/Hr";
import { buttonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "../../../misc";
import { useStyles } from "./styles";
import { UserAddressesProps } from "./types";

const UserAddresses: React.FC<UserAddressesProps> = props => {
  const { user, disabled, onAddressManageClick } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Address Information",
          description: "header"
        })}
        toolbar={
          !!onAddressManageClick && (
            <Button
              color="primary"
              disabled={disabled}
              variant="text"
              onClick={onAddressManageClick}
            >
              <FormattedMessage {...buttonMessages.manage} />
            </Button>
          )
        }
      />
      {maybe(() => user.defaultBillingAddress.id) !==
      maybe(() => user.defaultShippingAddress.id) ? (
        <>
          {maybe(() => user.defaultBillingAddress) !== null && (
            <CardContent>
              <Typography className={classes.label}>
                <FormattedMessage
                  defaultMessage="Billing Address"
                  description="subsection header"
                />
              </Typography>
              <AddressFormatter
                address={maybe(() => user.defaultBillingAddress)}
              />
            </CardContent>
          )}
          {maybe(
            () => user.defaultBillingAddress && user.defaultShippingAddress
          ) && <Hr />}
          {maybe(() => user.defaultShippingAddress) && (
            <CardContent>
              <Typography className={classes.label}>
                <FormattedMessage
                  defaultMessage="Shipping Address"
                  description="subsection header"
                />
              </Typography>
              <AddressFormatter
                address={maybe(() => user.defaultShippingAddress)}
              />
            </CardContent>
          )}
        </>
      ) : maybe(() => user.defaultBillingAddress) === null &&
        maybe(() => user.defaultShippingAddress) === null ? (
        user.addresses.length === 0 ? (
          <CardContent>
            <Typography>
              <FormattedMessage defaultMessage="This user has no addresses yet" />
            </Typography>
          </CardContent>
        ) : (
          <CardContent>
            <Typography className={classes.label}>
              <FormattedMessage
                defaultMessage="Address"
                description="subsection header"
              />
            </Typography>
            <AddressFormatter address={maybe(() => user.addresses[0])} />
          </CardContent>
        )
      ) : (
        <CardContent>
          <Typography className={classes.label}>
            <FormattedMessage
              defaultMessage="Address"
              description="subsection header"
            />
          </Typography>
          <AddressFormatter address={maybe(() => user.defaultBillingAddress)} />
        </CardContent>
      )}
    </Card>
  );
};
UserAddresses.displayName = "UserAddresses";
export default UserAddresses;
