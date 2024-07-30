/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PermissionGroupFragment
// ====================================================

export interface PermissionGroupFragment_users {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
}

export interface PermissionGroupFragment {
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
  users: (PermissionGroupFragment_users | null)[] | null;
}
