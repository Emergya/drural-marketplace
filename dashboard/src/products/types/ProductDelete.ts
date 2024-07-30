/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductDelete
// ====================================================

export interface ProductDelete_productDelete_errors {
  __typename: "ProductError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
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

export interface ProductDelete_productDelete_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductDelete_productDelete {
  __typename: "ProductDelete";
  errors: ProductDelete_productDelete_errors[];
  product: ProductDelete_productDelete_product | null;
}

export interface ProductDelete {
  /**
   * Deletes a product.
   */
  productDelete: ProductDelete_productDelete | null;
}

export interface ProductDeleteVariables {
  id: string;
}
