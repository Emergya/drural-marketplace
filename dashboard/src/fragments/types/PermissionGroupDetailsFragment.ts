/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: PermissionGroupDetailsFragment
// ====================================================

export interface PermissionGroupDetailsFragment_users_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface PermissionGroupDetailsFragment_users {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  avatar: PermissionGroupDetailsFragment_users_avatar | null;
}

export interface PermissionGroupDetailsFragment_permissions {
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

export interface PermissionGroupDetailsFragment {
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
  users: (PermissionGroupDetailsFragment_users | null)[] | null;
  /**
   * List of group permissions
   */
  permissions: (PermissionGroupDetailsFragment_permissions | null)[] | null;
}
