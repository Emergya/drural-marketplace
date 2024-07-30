/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyToken
// ====================================================

export interface VerifyToken_tokenVerify_user_userPermissions {
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

export interface VerifyToken_tokenVerify_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface VerifyToken_tokenVerify_user {
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
  userPermissions: (VerifyToken_tokenVerify_user_userPermissions | null)[] | null;
  avatar: VerifyToken_tokenVerify_user_avatar | null;
}

export interface VerifyToken_tokenVerify {
  __typename: "VerifyToken";
  /**
   * JWT payload.
   */
  payload: any | null;
  /**
   * User assigned to token.
   */
  user: VerifyToken_tokenVerify_user | null;
}

export interface VerifyToken {
  /**
   * Verify JWT token.
   */
  tokenVerify: VerifyToken_tokenVerify | null;
}

export interface VerifyTokenVariables {
  token: string;
}
