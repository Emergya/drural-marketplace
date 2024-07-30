/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FulfillmentStatus } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: OrderRefundData
// ====================================================

export interface OrderRefundData_order_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderRefundData_order_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderRefundData_order_total_gross;
}

export interface OrderRefundData_order_totalCaptured {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderRefundData_order_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderRefundData_order_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderRefundData_order_shippingPrice_gross;
}

export interface OrderRefundData_order_lines_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderRefundData_order_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderRefundData_order_lines_unitPrice_gross;
}

export interface OrderRefundData_order_lines_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderRefundData_order_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  productName: string;
  quantity: number;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderRefundData_order_lines_unitPrice;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrderRefundData_order_lines_thumbnail | null;
  quantityFulfilled: number;
}

export interface OrderRefundData_order_fulfillments_lines_orderLine_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderRefundData_order_fulfillments_lines_orderLine_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderRefundData_order_fulfillments_lines_orderLine_unitPrice_gross;
}

export interface OrderRefundData_order_fulfillments_lines_orderLine_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderRefundData_order_fulfillments_lines_orderLine {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  productName: string;
  quantity: number;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderRefundData_order_fulfillments_lines_orderLine_unitPrice;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrderRefundData_order_fulfillments_lines_orderLine_thumbnail | null;
}

export interface OrderRefundData_order_fulfillments_lines {
  __typename: "FulfillmentLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  orderLine: OrderRefundData_order_fulfillments_lines_orderLine | null;
}

export interface OrderRefundData_order_fulfillments {
  __typename: "Fulfillment";
  /**
   * The ID of the object.
   */
  id: string;
  status: FulfillmentStatus;
  fulfillmentOrder: number;
  /**
   * List of lines for the fulfillment.
   */
  lines: (OrderRefundData_order_fulfillments_lines | null)[] | null;
}

export interface OrderRefundData_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Total amount of the order.
   */
  total: OrderRefundData_order_total;
  /**
   * Amount captured by payment.
   */
  totalCaptured: OrderRefundData_order_totalCaptured;
  /**
   * Total price of shipping.
   */
  shippingPrice: OrderRefundData_order_shippingPrice;
  /**
   * List of order lines.
   */
  lines: (OrderRefundData_order_lines | null)[];
  /**
   * List of shipments for the order.
   */
  fulfillments: (OrderRefundData_order_fulfillments | null)[];
}

export interface OrderRefundData {
  /**
   * Look up an order by ID.
   */
  order: OrderRefundData_order | null;
}

export interface OrderRefundDataVariables {
  orderId: string;
}
