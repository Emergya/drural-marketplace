/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountLocationPreferencesInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: setAccountLocationPreferences
// ====================================================

export interface setAccountLocationPreferences_setAccountLocationPreferences_user {
  __typename: "User";
  isLocationAllowed: boolean;
  distance: number | null;
}

export interface setAccountLocationPreferences_setAccountLocationPreferences_errors {
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

export interface setAccountLocationPreferences_setAccountLocationPreferences {
  __typename: "SetAccountLocationPreferences";
  user: setAccountLocationPreferences_setAccountLocationPreferences_user | null;
  errors: setAccountLocationPreferences_setAccountLocationPreferences_errors[];
}

export interface setAccountLocationPreferences {
  /**
   * Updates user's location preferences.
   */
  setAccountLocationPreferences: setAccountLocationPreferences_setAccountLocationPreferences | null;
}

export interface setAccountLocationPreferencesVariables {
  input: AccountLocationPreferencesInput;
}
