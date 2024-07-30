/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ExternalVerifyToken
// ====================================================

export interface ExternalVerifyToken_externalVerify_user_userPermissions {
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

export interface ExternalVerifyToken_externalVerify_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ExternalVerifyToken_externalVerify_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  /**
   * Determines if an user is seller
   */
  isSeller: boolean | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (ExternalVerifyToken_externalVerify_user_userPermissions | null)[] | null;
  avatar: ExternalVerifyToken_externalVerify_user_avatar | null;
}

export interface ExternalVerifyToken_externalVerify {
  __typename: "ExternalVerify";
  /**
   * External data.
   */
  verifyData: any | null;
  /**
   * User assigned to data.
   */
  user: ExternalVerifyToken_externalVerify_user | null;
}

export interface ExternalVerifyToken {
  /**
   * Verify external authentication data by plugin.
   */
  externalVerify: ExternalVerifyToken_externalVerify | null;
}

export interface ExternalVerifyTokenVariables {
  pluginId: string;
  input: any;
}
