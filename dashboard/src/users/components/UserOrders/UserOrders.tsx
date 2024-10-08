import {
  Button,
  Card,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { DateTime } from "@saleor/components/Date";
import Money from "@saleor/components/Money";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import StatusLabel from "@saleor/components/StatusLabel";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe, renderCollection, transformPaymentStatus } from "../../../misc";
import { useStyles } from "./styles";
import { UserOrdersProps } from "./types";

const UserOrders: React.FC<UserOrdersProps> = props => {
  const { orders, onRowClick, onViewAllOrdersClick } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  const orderList = orders
    ? orders.map(order => ({
        ...order,
        paymentStatus: transformPaymentStatus(order.paymentStatus, intl)
      }))
    : undefined;
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Recent Orders",
          description: "section header"
        })}
        toolbar={
          <Button variant="text" color="primary" onClick={onViewAllOrdersClick}>
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
        <TableBody>
          {renderCollection(
            orderList,
            order => (
              <TableRow
                hover={!!order}
                className={!!order ? classes.link : undefined}
                onClick={order ? () => onRowClick(order.id) : undefined}
                key={order ? order.id : "skeleton"}
              >
                <TableCell>
                  {maybe(() => order.number) ? (
                    "#" + order.number
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {maybe(() => order.created) ? (
                    <DateTime date={order.created} />
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {maybe(() => order.paymentStatus.status) !== undefined ? (
                    order.paymentStatus.status === null ? null : (
                      <StatusLabel
                        status={order.paymentStatus.status}
                        label={order.paymentStatus.localized}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={classes.textRight}>
                  {maybe(() => order.total.gross) ? (
                    <Money money={order.total.gross} />
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={6}>
                  <FormattedMessage defaultMessage="No orders found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

UserOrders.displayName = "UserOrders";
export default UserOrders;
