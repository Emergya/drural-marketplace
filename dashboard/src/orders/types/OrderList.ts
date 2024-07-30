/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderFilterInput, OrderSortingInput, PaymentChargeStatusEnum, OrderStatus } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: OrderList
// ====================================================

export interface OrderList_orders_edges_node_billingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface OrderList_orders_edges_node_billingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: OrderList_orders_edges_node_billingAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderList_orders_edges_node_booking_bookableResource {
  __typename: "BookableResource";
  name: string;
}

export interface OrderList_orders_edges_node_booking {
  __typename: "Booking";
  bookableResource: OrderList_orders_edges_node_booking_bookableResource | null;
  endDate: any | null;
  startDate: any | null;
}

export interface OrderList_orders_edges_node_total_gross {
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

export interface OrderList_orders_edges_node_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderList_orders_edges_node_total_gross;
}

export interface OrderList_orders_edges_node_payments_totalSeller {
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

export interface OrderList_orders_edges_node_payments_capturedAmount {
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

export interface OrderList_orders_edges_node_payments_refunded {
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

export interface OrderList_orders_edges_node_payments_totalFee {
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

export interface OrderList_orders_edges_node_payments_druralFee {
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

export interface OrderList_orders_edges_node_payments_stripeFee {
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

export interface OrderList_orders_edges_node_payments {
  __typename: "Payment";
  /**
   * Total amount for seller.
   */
  totalSeller: OrderList_orders_edges_node_payments_totalSeller | null;
  /**
   * Total amount captured for this payment.
   */
  capturedAmount: OrderList_orders_edges_node_payments_capturedAmount | null;
  /**
   * Refunded money
   */
  refunded: OrderList_orders_edges_node_payments_refunded | null;
  /**
   * Total Fee.
   */
  totalFee: OrderList_orders_edges_node_payments_totalFee | null;
  /**
   * dRural Fee.
   */
  druralFee: OrderList_orders_edges_node_payments_druralFee | null;
  /**
   * Stripe Fee.
   */
  stripeFee: OrderList_orders_edges_node_payments_stripeFee | null;
}

export interface OrderList_orders_edges_node {
  __typename: "Order";
  billingAddress: OrderList_orders_edges_node_billingAddress | null;
  /**
   * Booking of the order
   */
  booking: OrderList_orders_edges_node_booking | null;
  created: any;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum;
  status: OrderStatus;
  /**
   * Total amount of the order.
   */
  total: OrderList_orders_edges_node_total;
  /**
   * List of payments for the order.
   */
  payments: (OrderList_orders_edges_node_payments | null)[] | null;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
}

export interface OrderList_orders_edges {
  __typename: "OrderCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: OrderList_orders_edges_node;
}

export interface OrderList_orders_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface OrderList_orders {
  __typename: "OrderCountableConnection";
  edges: OrderList_orders_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: OrderList_orders_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface OrderList {
  /**
   * List of orders.
   */
  orders: OrderList_orders | null;
}

export interface OrderListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: OrderFilterInput | null;
  sort?: OrderSortingInput | null;
  company?: string | null;
}
