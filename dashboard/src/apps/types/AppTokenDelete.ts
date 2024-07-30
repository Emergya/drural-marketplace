/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppTokenDelete
// ====================================================

export interface AppTokenDelete_appTokenDelete_appToken {
  __typename: "AppToken";
  /**
   * Name of the authenticated token.
   */
  name: string | null;
  /**
   * Last 4 characters of the token.
   */
  authToken: string | null;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface AppTokenDelete_appTokenDelete_errors {
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

export interface AppTokenDelete_appTokenDelete {
  __typename: "AppTokenDelete";
  appToken: AppTokenDelete_appTokenDelete_appToken | null;
  errors: AppTokenDelete_appTokenDelete_errors[];
}

export interface AppTokenDelete {
  /**
   * Deletes an authentication token assigned to app.
   */
  appTokenDelete: AppTokenDelete_appTokenDelete | null;
}

export interface AppTokenDeleteVariables {
  id: string;
}
