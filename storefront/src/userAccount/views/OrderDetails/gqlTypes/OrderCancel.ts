/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderCancel
// ====================================================

export interface OrderCancel_orderCancel_errors {
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
   * The error message.
   */
  message: string | null;
}

export interface OrderCancel_orderCancel {
  __typename: "OrderCancel";
  errors: OrderCancel_orderCancel_errors[];
}

export interface OrderCancel {
  /**
   * Cancel an order.
   */
  orderCancel: OrderCancel_orderCancel | null;
}

export interface OrderCancelVariables {
  id: string;
}
