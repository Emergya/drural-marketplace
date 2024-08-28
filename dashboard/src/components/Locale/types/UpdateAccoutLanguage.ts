/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountInput, LanguageCodeEnum, AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateAccoutLanguage
// ====================================================

export interface UpdateAccoutLanguage_accountUpdate_user {
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

export interface UpdateAccoutLanguage_accountUpdate_errors {
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

export interface UpdateAccoutLanguage_accountUpdate {
  __typename: "AccountUpdate";
  user: UpdateAccoutLanguage_accountUpdate_user | null;
  errors: UpdateAccoutLanguage_accountUpdate_errors[];
}

export interface UpdateAccoutLanguage {
  /**
   * Updates the account of the logged-in user.
   */
  accountUpdate: UpdateAccoutLanguage_accountUpdate | null;
}

export interface UpdateAccoutLanguageVariables {
  input: AccountInput;
}
