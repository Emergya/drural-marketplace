/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: MenuDelete
// ====================================================

export interface MenuDelete_menuDelete_errors {
  __typename: "MenuError";
  /**
   * The error code.
   */
  code: MenuErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface MenuDelete_menuDelete {
  __typename: "MenuDelete";
  errors: MenuDelete_menuDelete_errors[];
}

export interface MenuDelete {
  /**
   * Deletes a menu.
   */
  menuDelete: MenuDelete_menuDelete | null;
}

export interface MenuDeleteVariables {
  id: string;
}
