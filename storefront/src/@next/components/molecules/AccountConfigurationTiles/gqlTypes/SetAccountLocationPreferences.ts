/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountLocationPreferencesInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: SetAccountLocationPreferences
// ====================================================

export interface SetAccountLocationPreferences_setAccountLocationPreferences_errors {
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

export interface SetAccountLocationPreferences_setAccountLocationPreferences_user {
  __typename: "User";
  isLocationAllowed: boolean;
  distance: number | null;
}

export interface SetAccountLocationPreferences_setAccountLocationPreferences {
  __typename: "SetAccountLocationPreferences";
  errors: SetAccountLocationPreferences_setAccountLocationPreferences_errors[];
  user: SetAccountLocationPreferences_setAccountLocationPreferences_user | null;
}

export interface SetAccountLocationPreferences {
  /**
   * Updates user's location preferences.
   */
  setAccountLocationPreferences: SetAccountLocationPreferences_setAccountLocationPreferences | null;
}

export interface SetAccountLocationPreferencesVariables {
  input: AccountLocationPreferencesInput;
}
