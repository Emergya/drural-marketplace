/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: StaffMemberDetails
// ====================================================

export interface StaffMemberDetails_user_permissionGroups {
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
}

export interface StaffMemberDetails_user_userPermissions {
  __typename: "UserPermission";
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * Describe action(s) allowed to do by permission.
   */
  name: string;
}

export interface StaffMemberDetails_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface StaffMemberDetails_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  /**
   * List of user's permission groups.
   */
  permissionGroups: (StaffMemberDetails_user_permissionGroups | null)[] | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (StaffMemberDetails_user_userPermissions | null)[] | null;
  avatar: StaffMemberDetails_user_avatar | null;
}

export interface StaffMemberDetails {
  /**
   * Look up a user by ID or email address.
   */
  user: StaffMemberDetails_user | null;
}

export interface StaffMemberDetailsVariables {
  id: string;
}
