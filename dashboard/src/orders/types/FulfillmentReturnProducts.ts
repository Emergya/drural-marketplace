/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderReturnProductsInput, OrderErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: FulfillmentReturnProducts
// ====================================================

export interface FulfillmentReturnProducts_orderFulfillmentReturnProducts_errors {
  __typename: "OrderError";
  /**
   * The error code.
   */
  code: OrderErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * A type of address that causes the error.
   */
  addressType: AddressTypeEnum | null;
}

export interface FulfillmentReturnProducts_orderFulfillmentReturnProducts_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface FulfillmentReturnProducts_orderFulfillmentReturnProducts_replaceOrder {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface FulfillmentReturnProducts_orderFulfillmentReturnProducts {
  __typename: "FulfillmentReturnProducts";
  errors: FulfillmentReturnProducts_orderFulfillmentReturnProducts_errors[];
  /**
   * Order which fulfillment was returned.
   */
  order: FulfillmentReturnProducts_orderFulfillmentReturnProducts_order | null;
  /**
   * A draft order which was created for products with replace flag.
   */
  replaceOrder: FulfillmentReturnProducts_orderFulfillmentReturnProducts_replaceOrder | null;
}

export interface FulfillmentReturnProducts {
  /**
   * Return products.
   */
  orderFulfillmentReturnProducts: FulfillmentReturnProducts_orderFulfillmentReturnProducts | null;
}

export interface FulfillmentReturnProductsVariables {
  id: string;
  input: OrderReturnProductsInput;
}
