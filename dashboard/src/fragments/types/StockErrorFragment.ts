/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StockErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: StockErrorFragment
// ====================================================

export interface StockErrorFragment {
  __typename: "StockError";
  /**
   * The error code.
   */
  code: StockErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
