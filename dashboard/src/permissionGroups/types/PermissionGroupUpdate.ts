/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionGroupUpdateInput, PermissionGroupErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PermissionGroupUpdate
// ====================================================

export interface PermissionGroupUpdate_permissionGroupUpdate_errors {
  __typename: "PermissionGroupError";
  /**
   * The error code.
   */
  code: PermissionGroupErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface PermissionGroupUpdate_permissionGroupUpdate_group_users_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface PermissionGroupUpdate_permissionGroupUpdate_group_users {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  avatar: PermissionGroupUpdate_permissionGroupUpdate_group_users_avatar | null;
}

export interface PermissionGroupUpdate_permissionGroupUpdate_group_permissions {
  __typename: "Permission";
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * Describe action(s) allowed to do by permission.
   */
  name: string;
}

export interface PermissionGroupUpdate_permissionGroupUpdate_group {
  __typename: "Group";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * True, if the currently authenticated user has rights to manage a group.
   */
  userCanManage: boolean;
  /**
   * List of group users
   */
  users: (PermissionGroupUpdate_permissionGroupUpdate_group_users | null)[] | null;
  /**
   * List of group permissions
   */
  permissions: (PermissionGroupUpdate_permissionGroupUpdate_group_permissions | null)[] | null;
}

export interface PermissionGroupUpdate_permissionGroupUpdate {
  __typename: "PermissionGroupUpdate";
  errors: PermissionGroupUpdate_permissionGroupUpdate_errors[];
  group: PermissionGroupUpdate_permissionGroupUpdate_group | null;
}

export interface PermissionGroupUpdate {
  /**
   * Update permission group.
   */
  permissionGroupUpdate: PermissionGroupUpdate_permissionGroupUpdate | null;
}

export interface PermissionGroupUpdateVariables {
  id: string;
  input: PermissionGroupUpdateInput;
}
