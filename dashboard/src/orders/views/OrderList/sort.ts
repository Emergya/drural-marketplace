import { OrderListUrlSortField } from "@saleor/orders/urls";
import { OrderSortField } from "@saleor/types/globalTypes";
import { createGetSortQueryVariables } from "@saleor/utils/sort";

export function getSortQueryField(sort: OrderListUrlSortField): OrderSortField {
  switch (sort) {
    case OrderListUrlSortField.number:
      return OrderSortField.NUMBER;
    case OrderListUrlSortField.date:
      return OrderSortField.CREATION_DATE;
    case OrderListUrlSortField.customer:
      return OrderSortField.CUSTOMER;

    case OrderListUrlSortField.paymentStatus:
      return OrderSortField.PAYMENT;
    case OrderListUrlSortField.status:
      return OrderSortField.FULFILLMENT_STATUS;

    case OrderListUrlSortField.totalSeller:
      return OrderSortField.TOTAL_SELLER;
    case OrderListUrlSortField.capturedAmount:
      return OrderSortField.CAPTURED_AMOUNT;
    case OrderListUrlSortField.refunded:
      return OrderSortField.REFUNDED_AMOUNT;
    case OrderListUrlSortField.druralFee:
      return OrderSortField.DRURAL_FEE;
    case OrderListUrlSortField.stripeFee:
      return OrderSortField.STRIPE_FEE;
    case OrderListUrlSortField.totalFee:
      return OrderSortField.TOTAL_FEE;

    case OrderListUrlSortField.total:
      return OrderSortField.TOTAL;

    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
