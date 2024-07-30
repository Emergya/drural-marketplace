/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountDelete
// ====================================================

export interface AccountDelete_accountDelete_accountErrors {
  __typename: "AccountError";
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
  code: AccountErrorCode;
}

export interface AccountDelete_accountDelete {
  __typename: "AccountDelete";
  accountErrors: AccountDelete_accountDelete_accountErrors[];
}

export interface AccountDelete {
  /**
   * Remove user account.
   */
  accountDelete: AccountDelete_accountDelete | null;
}

export interface AccountDeleteVariables {
  token: string;
}
