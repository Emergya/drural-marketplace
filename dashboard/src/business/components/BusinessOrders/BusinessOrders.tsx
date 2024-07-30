import { makeStyles } from "@drural/macaw-ui";
import {
  Button,
  Card,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import useNavigator from "@saleor/hooks/useNavigator";
import { orderListPath } from "@saleor/orders/urls";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  {
    link: {
      cursor: "pointer"
    },
    textRight: {
      textAlign: "right"
    }
  },
  { name: "BusinessOrders" }
);

const BusinessOrders = () => {
  const intl = useIntl();
  const navigate = useNavigator();
  const classes = useStyles();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Last orders",
          description: "last orders, section header"
        })}
        toolbar={
          // TODO ATM is navigating to general orders list
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(orderListPath)}
          >
            <FormattedMessage
              defaultMessage="View all orders"
              description="button"
            />
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage
                defaultMessage="No. of Order"
                description="number of order"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                defaultMessage="Date"
                description="order placement date"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                defaultMessage="Status"
                description="order status"
              />
            </TableCell>
            <TableCell className={classes.textRight}>
              <FormattedMessage
                defaultMessage="Total"
                description="order total amount"
              />
            </TableCell>
          </TableRow>
        </TableHead>
      </ResponsiveTable>
    </Card>
  );
};
export default BusinessOrders;
