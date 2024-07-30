import {
  Card,
  CardContent,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import useLocale from "@saleor/hooks/useLocale";
import { commonMessages } from "@saleor/intl";
import { dateFormat, timeFormat } from "@saleor/utils/date/contants";
import React from "react";
import { useIntl } from "react-intl";
import Moment from "react-moment";

import { useStyles } from "./styles";
import { IOrderBookingDetailsProps } from "./types";

const OrderBookingDetails: React.FC<IOrderBookingDetailsProps> = ({
  bookableResourceName,
  bookingReference,
  endDate,
  startDate
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const { locale } = useLocale();

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.bookingDetails)} />
      <CardContent className={classes.content}>
        <ResponsiveTable>
          <TableHead>
            <TableRow>
              <TableCell className={classes.nameTableCell}>
                {intl.formatMessage(commonMessages.resource)}
              </TableCell>
              <TableCell className={classes.dateTableCell}>
                {intl.formatMessage(commonMessages.date)}
              </TableCell>
              <TableCell className={classes.dateTableCell}>
                {intl.formatMessage(commonMessages.hour)}
              </TableCell>
              <TableCell>
                {intl.formatMessage(commonMessages.bookingReference)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.bodyTableRow}>
              <TableCell>{bookableResourceName}</TableCell>
              <TableCell>
                <Moment date={startDate} format={dateFormat} locale={locale} />
              </TableCell>
              <TableCell>
                <Moment date={startDate} format={timeFormat} locale={locale} />
                {" - "}
                <Moment date={endDate} format={timeFormat} locale={locale} />
              </TableCell>
              <TableCell>{bookingReference}</TableCell>
            </TableRow>
          </TableBody>
        </ResponsiveTable>
      </CardContent>
    </Card>
  );
};
OrderBookingDetails.displayName = "OrderBookingDetails";
export default OrderBookingDetails;
