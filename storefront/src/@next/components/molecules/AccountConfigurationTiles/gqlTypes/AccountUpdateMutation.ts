/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountInput, LanguageCodeEnum } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountUpdateMutation
// ====================================================

export interface AccountUpdateMutation_accountUpdate_errors {
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
}

export interface AccountUpdateMutation_accountUpdate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User language code.
   */
  languageCode: LanguageCodeEnum;
}

export interface AccountUpdateMutation_accountUpdate {
  __typename: "AccountUpdate";
  errors: AccountUpdateMutation_accountUpdate_errors[];
  user: AccountUpdateMutation_accountUpdate_user | null;
}

export interface AccountUpdateMutation {
  /**
   * Updates the account of the logged-in user.
   */
  accountUpdate: AccountUpdateMutation_accountUpdate | null;
}

export interface AccountUpdateMutationVariables {
  input: AccountInput;
}
