/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderSettingsErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: OrderSettingsErrorFragment
// ====================================================

export interface OrderSettingsErrorFragment {
  __typename: "OrderSettingsError";
  /**
   * The error code.
   */
  code: OrderSettingsErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
