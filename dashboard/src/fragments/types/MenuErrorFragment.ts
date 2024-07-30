/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: MenuErrorFragment
// ====================================================

export interface MenuErrorFragment {
  __typename: "MenuError";
  /**
   * The error code.
   */
  code: MenuErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
