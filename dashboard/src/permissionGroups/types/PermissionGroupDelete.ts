/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionGroupErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PermissionGroupDelete
// ====================================================

export interface PermissionGroupDelete_permissionGroupDelete_errors {
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

export interface PermissionGroupDelete_permissionGroupDelete {
  __typename: "PermissionGroupDelete";
  errors: PermissionGroupDelete_permissionGroupDelete_errors[];
}

export interface PermissionGroupDelete {
  /**
   * Delete permission group.
   */
  permissionGroupDelete: PermissionGroupDelete_permissionGroupDelete | null;
}

export interface PermissionGroupDeleteVariables {
  id: string;
}
