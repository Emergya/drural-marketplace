/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CategoryDelete
// ====================================================

export interface CategoryDelete_categoryDelete_errors {
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

export interface CategoryDelete_categoryDelete {
  __typename: "CategoryDelete";
  errors: CategoryDelete_categoryDelete_errors[];
}

export interface CategoryDelete {
  /**
   * Deletes a category.
   */
  categoryDelete: CategoryDelete_categoryDelete | null;
}

export interface CategoryDeleteVariables {
  id: string;
}
