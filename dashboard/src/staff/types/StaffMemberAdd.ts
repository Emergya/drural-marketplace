/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StaffCreateInput, AccountErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: StaffMemberAdd
// ====================================================

export interface StaffMemberAdd_staffCreate_errors {
  __typename: "StaffError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface StaffMemberAdd_staffCreate_user_permissionGroups {
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

export interface StaffMemberAdd_staffCreate_user_userPermissions {
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

export interface StaffMemberAdd_staffCreate_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface StaffMemberAdd_staffCreate_user {
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
  permissionGroups: (StaffMemberAdd_staffCreate_user_permissionGroups | null)[] | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (StaffMemberAdd_staffCreate_user_userPermissions | null)[] | null;
  avatar: StaffMemberAdd_staffCreate_user_avatar | null;
}

export interface StaffMemberAdd_staffCreate {
  __typename: "StaffCreate";
  errors: StaffMemberAdd_staffCreate_errors[];
  user: StaffMemberAdd_staffCreate_user | null;
}

export interface StaffMemberAdd {
  /**
   * Creates a new staff user.
   */
  staffCreate: StaffMemberAdd_staffCreate | null;
}

export interface StaffMemberAddVariables {
  input: StaffCreateInput;
}
