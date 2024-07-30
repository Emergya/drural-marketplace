import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow
} from "@material-ui/core";
import Money from "@saleor/components/Money";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TablePagination from "@saleor/components/TablePagination";
import { TimezoneConsumer } from "@saleor/components/Timezone";
import useLocale from "@saleor/hooks/useLocale";
import { commonMessages, sectionNames } from "@saleor/intl";
import {
  maybe,
  renderCollection,
  transformOrderStatus,
  transformPaymentStatus
} from "@saleor/misc";
import { BookingListUrlSortField } from "@saleor/orders/urls";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Moment from "react-moment";

import { dateFormat, timeFormat } from "../../../utils/date/contants";
import { useStyles } from "./styles";
import { IBookingListProps } from "./types";
import { numberOfColumns } from "./utils";

export const BookingList: React.FC<IBookingListProps> = props => {
  const {
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
  const { locale } = useLocale();

  const orderList = orders
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
              sort.sort === BookingListUrlSortField.number
                ? getArrowDirection(sort.asc)
                : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(BookingListUrlSortField.number)}
            className={classes.colNumber}
          >
            <FormattedMessage defaultMessage="No. of Order" />
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === BookingListUrlSortField.customer
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(BookingListUrlSortField.customer)}
            className={classes.colCustomer}
          >
            <FormattedMessage
              defaultMessage="Customer"
              description="e-mail or full name"
            />
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === BookingListUrlSortField.bookableResource
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(BookingListUrlSortField.bookableResource)}
            className={classes.colPayment}
          >
            <FormattedMessage
              defaultMessage="Resource"
              description="payment status"
            />
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === BookingListUrlSortField.bookingDate
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(BookingListUrlSortField.bookingDate)}
            className={classes.colDate}
          >
            <FormattedMessage
              defaultMessage="Date"
              description="date when booking was placed"
            />
          </TableCellHeader>
          <TableCellHeader onClick={() => null} className={classes.colDate}>
            <FormattedMessage
              defaultMessage="Time"
              description="time when booking was placed"
            />
          </TableCellHeader>
          <TableCellHeader
            onClick={() => null}
            textAlign="right"
            className={classes.colTotal}
          >
            <FormattedMessage
              defaultMessage="Total"
              description="total booking price"
            />
          </TableCellHeader>
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
            <TimezoneConsumer key={order ? order.id : "skeleton"}>
              {tz => (
                <TableRow
                  data-test-id="booking-table-row"
                  hover={!!order}
                  className={!!order ? classes.link : undefined}
                  onClick={order ? onRowClick(order.id) : undefined}
                >
                  <TableCell className={classes.colNumber}>
                    {maybe(() => order.number) ? (
                      "#" + order.number
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
                  <TableCell className={classes.colPayment}>
                    {maybe(() => order.booking.bookableResource.name) ? (
                      order.booking.bookableResource.name
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colDate}>
                    {maybe(() => order.booking) ? (
                      <Moment format={dateFormat} locale={locale} tz={tz}>
                        {order.booking.startDate}
                      </Moment>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colDate}>
                    {maybe(() => order.booking) ? (
                      <>
                        <Moment format={timeFormat} locale={locale} tz={tz}>
                          {order.booking.startDate}
                        </Moment>
                        {" - "}
                        <Moment format={timeFormat} locale={locale} tz={tz}>
                          {order.booking.endDate}
                        </Moment>
                      </>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colTotal}>
                    {maybe(() => order.total.gross) ? (
                      <Money money={order.total.gross} />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TimezoneConsumer>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No bookings found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
BookingList.displayName = "BookingList";
export default BookingList;
