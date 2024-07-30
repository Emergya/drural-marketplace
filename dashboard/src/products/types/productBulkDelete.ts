/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: productBulkDelete
// ====================================================

export interface productBulkDelete_productBulkDelete_errors {
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

export interface productBulkDelete_productBulkDelete {
  __typename: "ProductBulkDelete";
  errors: productBulkDelete_productBulkDelete_errors[];
}

export interface productBulkDelete {
  /**
   * Deletes products.
   */
  productBulkDelete: productBulkDelete_productBulkDelete | null;
}

export interface productBulkDeleteVariables {
  ids: string[];
}
