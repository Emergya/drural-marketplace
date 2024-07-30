/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: StaffMemberDetailsFragment
// ====================================================

export interface StaffMemberDetailsFragment_permissionGroups {
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

export interface StaffMemberDetailsFragment_userPermissions {
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

export interface StaffMemberDetailsFragment_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface StaffMemberDetailsFragment {
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
  permissionGroups: (StaffMemberDetailsFragment_permissionGroups | null)[] | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (StaffMemberDetailsFragment_userPermissions | null)[] | null;
  avatar: StaffMemberDetailsFragment_avatar | null;
}
