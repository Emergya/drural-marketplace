/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppActivate
// ====================================================

export interface AppActivate_appActivate_errors {
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

export interface AppActivate_appActivate {
  __typename: "AppActivate";
  errors: AppActivate_appActivate_errors[];
}

export interface AppActivate {
  /**
   * Activate the app.
   */
  appActivate: AppActivate_appActivate | null;
}

export interface AppActivateVariables {
  id: string;
}
