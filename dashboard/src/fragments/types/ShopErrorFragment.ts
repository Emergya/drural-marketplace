/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ShopErrorFragment
// ====================================================

export interface ShopErrorFragment {
  __typename: "ShopError";
  /**
   * The error code.
   */
  code: ShopErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
