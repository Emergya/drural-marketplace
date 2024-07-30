/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetAccountCategoriesPreferences
// ====================================================

export interface SetAccountCategoriesPreferences_setAccountCategoriesPreferences_errors {
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

export interface SetAccountCategoriesPreferences_setAccountCategoriesPreferences_user_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SetAccountCategoriesPreferences_setAccountCategoriesPreferences_user_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SetAccountCategoriesPreferences_setAccountCategoriesPreferences_user_categories_edges_node;
}

export interface SetAccountCategoriesPreferences_setAccountCategoriesPreferences_user_categories {
  __typename: "CategoryCountableConnection";
  edges: SetAccountCategoriesPreferences_setAccountCategoriesPreferences_user_categories_edges[];
}

export interface SetAccountCategoriesPreferences_setAccountCategoriesPreferences_user {
  __typename: "User";
  categories: SetAccountCategoriesPreferences_setAccountCategoriesPreferences_user_categories;
}

export interface SetAccountCategoriesPreferences_setAccountCategoriesPreferences {
  __typename: "SetAccountCategoriesPreferences";
  errors: SetAccountCategoriesPreferences_setAccountCategoriesPreferences_errors[];
  /**
   * A user instance with new categories.
   */
  user: SetAccountCategoriesPreferences_setAccountCategoriesPreferences_user | null;
}

export interface SetAccountCategoriesPreferences {
  /**
   * Updates user's categories preferences.
   */
  setAccountCategoriesPreferences: SetAccountCategoriesPreferences_setAccountCategoriesPreferences | null;
}

export interface SetAccountCategoriesPreferencesVariables {
  categories: string[];
}
