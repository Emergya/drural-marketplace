/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PermissionGroupDetails
// ====================================================

export interface PermissionGroupDetails_permissionGroup_users_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface PermissionGroupDetails_permissionGroup_users {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  avatar: PermissionGroupDetails_permissionGroup_users_avatar | null;
}

export interface PermissionGroupDetails_permissionGroup_permissions {
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

export interface PermissionGroupDetails_permissionGroup {
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
  users: (PermissionGroupDetails_permissionGroup_users | null)[] | null;
  /**
   * List of group permissions
   */
  permissions: (PermissionGroupDetails_permissionGroup_permissions | null)[] | null;
}

export interface PermissionGroupDetails_user_editableGroups {
  __typename: "Group";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface PermissionGroupDetails_user_userPermissions_sourcePermissionGroups {
  __typename: "Group";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface PermissionGroupDetails_user_userPermissions {
  __typename: "UserPermission";
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * List of user permission groups which contains this permission.
   */
  sourcePermissionGroups: PermissionGroupDetails_user_userPermissions_sourcePermissionGroups[] | null;
}

export interface PermissionGroupDetails_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of user's permission groups which user can manage.
   */
  editableGroups: (PermissionGroupDetails_user_editableGroups | null)[] | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (PermissionGroupDetails_user_userPermissions | null)[] | null;
}

export interface PermissionGroupDetails {
  /**
   * Look up permission group by ID.
   */
  permissionGroup: PermissionGroupDetails_permissionGroup | null;
  /**
   * Look up a user by ID or email address.
   */
  user: PermissionGroupDetails_user | null;
}

export interface PermissionGroupDetailsVariables {
  id: string;
  userId: string;
}
