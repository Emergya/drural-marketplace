/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionGroupErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: PermissionGroupErrorFragment
// ====================================================

export interface PermissionGroupErrorFragment {
  __typename: "PermissionGroupError";
  /**
   * The error code.
   */
  code: PermissionGroupErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
