/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionGroupCreateInput, PermissionGroupErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PermissionGroupCreate
// ====================================================

export interface PermissionGroupCreate_permissionGroupCreate_errors {
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

export interface PermissionGroupCreate_permissionGroupCreate_group_users_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface PermissionGroupCreate_permissionGroupCreate_group_users {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  avatar: PermissionGroupCreate_permissionGroupCreate_group_users_avatar | null;
}

export interface PermissionGroupCreate_permissionGroupCreate_group_permissions {
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

export interface PermissionGroupCreate_permissionGroupCreate_group {
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
  users: (PermissionGroupCreate_permissionGroupCreate_group_users | null)[] | null;
  /**
   * List of group permissions
   */
  permissions: (PermissionGroupCreate_permissionGroupCreate_group_permissions | null)[] | null;
}

export interface PermissionGroupCreate_permissionGroupCreate {
  __typename: "PermissionGroupCreate";
  errors: PermissionGroupCreate_permissionGroupCreate_errors[];
  group: PermissionGroupCreate_permissionGroupCreate_group | null;
}

export interface PermissionGroupCreate {
  /**
   * Create new permission group.
   */
  permissionGroupCreate: PermissionGroupCreate_permissionGroupCreate | null;
}

export interface PermissionGroupCreateVariables {
  input: PermissionGroupCreateInput;
}
