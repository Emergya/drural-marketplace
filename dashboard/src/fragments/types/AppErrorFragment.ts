/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: AppErrorFragment
// ====================================================

export interface AppErrorFragment {
  __typename: "AppError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: AppErrorCode;
  /**
   * List of permissions which causes the error.
   */
  permissions: PermissionEnum[] | null;
}
