/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: PasswordChange
// ====================================================

export interface PasswordChange_passwordChange_errors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface PasswordChange_passwordChange {
  __typename: "PasswordChange";
  errors: PasswordChange_passwordChange_errors[];
}

export interface PasswordChange {
  /**
   * Change the password of the logged in user.
   */
  passwordChange: PasswordChange_passwordChange | null;
}

export interface PasswordChangeVariables {
  newPassword: string;
  newPasswordRepeat: string;
  oldPassword: string;
}
