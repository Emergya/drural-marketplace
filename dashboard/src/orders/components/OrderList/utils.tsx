import { ColumnPickerChoice } from "@saleor/components/ColumnPicker";
import Money, { IMoney } from "@saleor/components/Money";
import StatusLabel from "@saleor/components/StatusLabel";
import { OrderList_orders_edges_node_payments } from "@saleor/orders/types/OrderList";
import { Currency } from "@saleor/utils/_types/Currency";
import React, { ReactNode } from "react";

import { OrderListColumns } from "../OrderListPage/types";
import { AmountType, OrderNodeStatusModified } from "./types";

export const getOrderCellHeaderContent = (
  columns: ColumnPickerChoice[],
  column: OrderListColumns
): ReactNode => {
  const selectedColumn = columns.find(col => col.value === column);
  return selectedColumn.label;
};

export const getOrderVariableCellContent = (
  column: OrderListColumns,
  order: OrderNodeStatusModified
): JSX.Element | null => {
  switch (column) {
    case OrderListColumns.status:
    case OrderListColumns.paymentStatus:
      return (
        <StatusLabel
          status={order[column]?.status}
          label={order[column]?.localized}
        />
      );

    case OrderListColumns.totalSeller:
    case OrderListColumns.capturedAmount:
    case OrderListColumns.refunded:
    case OrderListColumns.druralFee:
    case OrderListColumns.stripeFee:
    case OrderListColumns.totalFee:
      return <Money money={getOrderTotalAmount(order.payments, column)} />;

    case OrderListColumns.total:
      return <Money money={order.total?.gross} />;

    default:
      return null;
  }
};

export const getOrderTotalAmount = (
  orderPayments: OrderList_orders_edges_node_payments[] | undefined,
  amountType: AmountType
): IMoney => {
  let amount: number = null;
  let currency: string = Currency.EUR;

  if (orderPayments) {
    orderPayments.forEach(payment => {
      amount += payment[amountType].amount;
      currency = payment[amountType].currency;
    });
  }

  return { amount, currency };
};
