import { ColumnPickerChoice } from "@saleor/components/ColumnPicker";
import { defineMessages, IntlShape } from "react-intl";

import { OrderListColumns } from "./types";

export const orderListColumnMessages = defineMessages<OrderListColumns>({
  capturedAmount: {
    defaultMessage: "Captured"
  },
  druralFee: {
    defaultMessage: "Drural Fee"
  },
  paymentStatus: {
    defaultMessage: "Payment"
  },
  status: {
    defaultMessage: "Fulfillment Status"
  },
  refunded: {
    defaultMessage: "Refunded"
  },
  stripeFee: {
    defaultMessage: "Stripe Fee"
  },
  total: {
    defaultMessage: "Total"
  },
  totalSeller: {
    defaultMessage: "Profit"
  },
  totalFee: {
    defaultMessage: "Total fee"
  }
});

export const getColumns = (intl: IntlShape): ColumnPickerChoice[] =>
  Object.keys(OrderListColumns).map(column => ({
    label: intl.formatMessage(orderListColumnMessages[column]),
    value: column
  }));
