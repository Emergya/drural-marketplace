/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: BulkStockErrorFragment
// ====================================================

export interface BulkStockErrorFragment {
  __typename: "BulkStockError";
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
   * Index of an input list item that caused the error.
   */
  index: number | null;
}
