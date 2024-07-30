/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: MenuBulkDelete
// ====================================================

export interface MenuBulkDelete_menuBulkDelete_errors {
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

export interface MenuBulkDelete_menuBulkDelete {
  __typename: "MenuBulkDelete";
  errors: MenuBulkDelete_menuBulkDelete_errors[];
}

export interface MenuBulkDelete {
  /**
   * Deletes menus.
   */
  menuBulkDelete: MenuBulkDelete_menuBulkDelete | null;
}

export interface MenuBulkDeleteVariables {
  ids: (string | null)[];
}
