/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteCheckout
// ====================================================

export interface DeleteCheckout_checkoutDelete_errors {
  __typename: "CheckoutError";
  /**
   * The error code.
   */
  code: CheckoutErrorCode;
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

export interface DeleteCheckout_checkoutDelete_checkout {
  __typename: "Checkout";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface DeleteCheckout_checkoutDelete {
  __typename: "CheckoutDelete";
  errors: DeleteCheckout_checkoutDelete_errors[];
  checkout: DeleteCheckout_checkoutDelete_checkout | null;
}

export interface DeleteCheckout {
  /**
   * Delete an existing checkout.
   */
  checkoutDelete: DeleteCheckout_checkoutDelete | null;
}

export interface DeleteCheckoutVariables {
  checkoutId: string;
}
