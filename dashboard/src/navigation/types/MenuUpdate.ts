/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuItemMoveInput, MenuErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: MenuUpdate
// ====================================================

export interface MenuUpdate_menuUpdate_errors {
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

export interface MenuUpdate_menuUpdate {
  __typename: "MenuUpdate";
  errors: MenuUpdate_menuUpdate_errors[];
}

export interface MenuUpdate_menuItemMove_errors {
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

export interface MenuUpdate_menuItemMove {
  __typename: "MenuItemMove";
  errors: MenuUpdate_menuItemMove_errors[];
}

export interface MenuUpdate_menuItemBulkDelete_errors {
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

export interface MenuUpdate_menuItemBulkDelete {
  __typename: "MenuItemBulkDelete";
  errors: MenuUpdate_menuItemBulkDelete_errors[];
}

export interface MenuUpdate {
  /**
   * Updates a menu.
   */
  menuUpdate: MenuUpdate_menuUpdate | null;
  /**
   * Moves items of menus.
   */
  menuItemMove: MenuUpdate_menuItemMove | null;
  /**
   * Deletes menu items.
   */
  menuItemBulkDelete: MenuUpdate_menuItemBulkDelete | null;
}

export interface MenuUpdateVariables {
  id: string;
  name: string;
  moves: (MenuItemMoveInput | null)[];
  removeIds: (string | null)[];
}
