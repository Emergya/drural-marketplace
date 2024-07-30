/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setAccountCategoriesPreferences
// ====================================================

export interface setAccountCategoriesPreferences_setAccountCategoriesPreferences_errors {
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

export interface setAccountCategoriesPreferences_setAccountCategoriesPreferences {
  __typename: "SetAccountCategoriesPreferences";
  errors: setAccountCategoriesPreferences_setAccountCategoriesPreferences_errors[];
}

export interface setAccountCategoriesPreferences {
  /**
   * Updates user's categories preferences.
   */
  setAccountCategoriesPreferences: setAccountCategoriesPreferences_setAccountCategoriesPreferences | null;
}

export interface setAccountCategoriesPreferencesVariables {
  categories: string[];
}
