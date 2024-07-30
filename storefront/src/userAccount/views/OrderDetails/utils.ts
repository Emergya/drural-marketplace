import { OrderDetail_lines } from "@drural/sdk/lib/fragments/gqlTypes/OrderDetail";
import { OrderByToken_orderByToken } from "@drural/sdk/lib/queries/gqlTypes/OrderByToken";
import { UserOrderByToken_orderByToken } from "@drural/sdk/lib/queries/gqlTypes/UserOrderByToken";
import { OrderStatus } from "gqlTypes/globalTypes";
import moment from "moment-timezone";

import { ILine } from "@temp/components/CartTable/types";

export const extractOrderLines = (lines: OrderDetail_lines[]): ILine[] => {
  return lines
    .map(line => ({
      quantity: line.quantity,
      totalPrice: line.totalPrice,
      ...line.variant,
      name: line.productName,
    }))
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};

export const getShouldOrderCancel = (
  order: OrderByToken_orderByToken | UserOrderByToken_orderByToken
): boolean => {
  const isOrderCanceled = order.status === OrderStatus.CANCELED;
  const isOrderFulfilled = order.status === OrderStatus.FULFILLED;
  const isBeforeBookingTime = order.booking
    ? moment().isBefore(order.booking.startDate)
    : true;

  return !isOrderCanceled && !isOrderFulfilled && isBeforeBookingTime;
};

export const getShouldDownloadInvoice = (
  order: OrderByToken_orderByToken | UserOrderByToken_orderByToken
): boolean => "invoices" in order && order.invoices?.length > 0;
