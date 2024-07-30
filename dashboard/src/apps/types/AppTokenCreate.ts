/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppTokenInput, AppErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppTokenCreate
// ====================================================

export interface AppTokenCreate_appTokenCreate_appToken {
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

export interface AppTokenCreate_appTokenCreate_errors {
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

export interface AppTokenCreate_appTokenCreate {
  __typename: "AppTokenCreate";
  appToken: AppTokenCreate_appTokenCreate_appToken | null;
  /**
   * The newly created authentication token.
   */
  authToken: string | null;
  errors: AppTokenCreate_appTokenCreate_errors[];
}

export interface AppTokenCreate {
  /**
   * Creates a new token.
   */
  appTokenCreate: AppTokenCreate_appTokenCreate | null;
}

export interface AppTokenCreateVariables {
  input: AppTokenInput;
}
