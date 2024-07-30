import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow
} from "@material-ui/core";
import { DateTime } from "@saleor/components/Date";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TablePagination from "@saleor/components/TablePagination";
import { commonMessages, sectionNames } from "@saleor/intl";
import {
  maybe,
  renderCollection,
  transformOrderStatus,
  transformPaymentStatus
} from "@saleor/misc";
import { OrderListUrlSortField } from "@saleor/orders/urls";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useStyles } from "./styles";
import { OrderListProps, OrderNodeStatusModified } from "./types";
import {
  getOrderCellHeaderContent,
  getOrderVariableCellContent
} from "./utils";

export const OrderList: React.FC<OrderListProps> = props => {
  const {
    columns,
    disabled,
    settings,
    orders,
    pageInfo,
    totalCount,
    onPreviousPage,
    onNextPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    sort
  } = props;
  const classes = useStyles(props);
  const intl = useIntl();

  const numberOfColumns = 3 + settings.columns.length;

  const orderList: OrderNodeStatusModified[] = orders
    ? orders.map(order => ({
        ...order,
        paymentStatus: transformPaymentStatus(order.paymentStatus, intl),
        status: transformOrderStatus(order.status, intl)
      }))
    : undefined;
  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlSortField.number
                ? getArrowDirection(sort.asc)
                : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(OrderListUrlSortField.number)}
            className={classes.colNumber}
          >
            <FormattedMessage defaultMessage="No. of Order" />
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlSortField.date
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(OrderListUrlSortField.date)}
            className={classes.colDate}
          >
            <FormattedMessage
              defaultMessage="Date"
              description="date when order was placed"
            />
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlSortField.customer
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(OrderListUrlSortField.customer)}
            className={classes.colCustomer}
          >
            <FormattedMessage
              defaultMessage="Customer"
              description="e-mail or full name"
            />
          </TableCellHeader>
          {settings.columns.map(column => (
            <TableCellHeader
              key={column}
              className={classes.colType}
              direction={
                sort.sort === OrderListUrlSortField[column]
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
              onClick={() => onSort(OrderListUrlSortField[column])}
            >
              {maybe<React.ReactNode>(
                () => getOrderCellHeaderContent(columns, column),
                <Skeleton />
              )}
            </TableCellHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
            // Table total count data
            numberOfRows={orders?.length}
            tableName={
              orders?.length === 1
                ? intl.formatMessage(commonMessages.order)
                : intl.formatMessage(sectionNames.orders)
            }
            totalCount={totalCount}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          orderList,
          order => (
            <TableRow
              data-test-id="order-table-row"
              hover={!!order}
              className={!!order ? classes.link : undefined}
              onClick={order ? onRowClick(order.id) : undefined}
              key={order ? order.id : "skeleton"}
            >
              <TableCell className={classes.colNumber}>
                {maybe(() => order.number) ? "#" + order.number : <Skeleton />}
              </TableCell>
              <TableCell className={classes.colDate}>
                {maybe(() => order.created) ? (
                  <DateTime date={order.created} />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colCustomer}>
                {maybe(() => order.billingAddress) ? (
                  <>
                    {order.billingAddress.firstName}
                    &nbsp;
                    {order.billingAddress.lastName}
                  </>
                ) : maybe(() => order.userEmail) !== undefined ? (
                  order.userEmail
                ) : (
                  <Skeleton />
                )}
              </TableCell>

              {settings.columns.map(column => (
                <TableCell
                  key={column}
                  className={classes.colType}
                  data-test="business-attribute"
                  data-test-attribute={column}
                >
                  {maybe<React.ReactNode>(() =>
                    order ? (
                      getOrderVariableCellContent(column, order)
                    ) : (
                      <Skeleton />
                    )
                  )}
                </TableCell>
              ))}
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No orders found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
OrderList.displayName = "OrderList";
export default OrderList;
