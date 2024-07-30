/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountRequestDeletion
// ====================================================

export interface AccountRequestDeletion_accountRequestDeletion_accountErrors {
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

export interface AccountRequestDeletion_accountRequestDeletion {
  __typename: "AccountRequestDeletion";
  accountErrors: AccountRequestDeletion_accountRequestDeletion_accountErrors[];
}

export interface AccountRequestDeletion {
  /**
   * Sends an email with the account removal link for the logged-in user.
   */
  accountRequestDeletion: AccountRequestDeletion_accountRequestDeletion | null;
}

export interface AccountRequestDeletionVariables {
  redirectUrl: string;
}
