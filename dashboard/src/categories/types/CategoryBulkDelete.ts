/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CategoryBulkDelete
// ====================================================

export interface CategoryBulkDelete_categoryBulkDelete_errors {
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

export interface CategoryBulkDelete_categoryBulkDelete {
  __typename: "CategoryBulkDelete";
  errors: CategoryBulkDelete_categoryBulkDelete_errors[];
}

export interface CategoryBulkDelete {
  /**
   * Deletes categories.
   */
  categoryBulkDelete: CategoryBulkDelete_categoryBulkDelete | null;
}

export interface CategoryBulkDeleteVariables {
  ids: (string | null)[];
}
