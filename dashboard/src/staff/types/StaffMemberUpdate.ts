/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StaffUpdateInput, AccountErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: StaffMemberUpdate
// ====================================================

export interface StaffMemberUpdate_staffUpdate_errors {
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

export interface StaffMemberUpdate_staffUpdate_user_permissionGroups {
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

export interface StaffMemberUpdate_staffUpdate_user_userPermissions {
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

export interface StaffMemberUpdate_staffUpdate_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface StaffMemberUpdate_staffUpdate_user {
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
  permissionGroups: (StaffMemberUpdate_staffUpdate_user_permissionGroups | null)[] | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (StaffMemberUpdate_staffUpdate_user_userPermissions | null)[] | null;
  avatar: StaffMemberUpdate_staffUpdate_user_avatar | null;
}

export interface StaffMemberUpdate_staffUpdate {
  __typename: "StaffUpdate";
  errors: StaffMemberUpdate_staffUpdate_errors[];
  user: StaffMemberUpdate_staffUpdate_user | null;
}

export interface StaffMemberUpdate {
  /**
   * Updates an existing staff user.
   */
  staffUpdate: StaffMemberUpdate_staffUpdate | null;
}

export interface StaffMemberUpdateVariables {
  id: string;
  input: StaffUpdateInput;
}
