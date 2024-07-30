/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RefreshToken
// ====================================================

export interface RefreshToken_tokenRefresh_errors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface RefreshToken_tokenRefresh_user_userPermissions {
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

export interface RefreshToken_tokenRefresh_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface RefreshToken_tokenRefresh_user {
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
  userPermissions: (RefreshToken_tokenRefresh_user_userPermissions | null)[] | null;
  avatar: RefreshToken_tokenRefresh_user_avatar | null;
}

export interface RefreshToken_tokenRefresh {
  __typename: "RefreshToken";
  errors: RefreshToken_tokenRefresh_errors[];
  /**
   * JWT token, required to authenticate.
   */
  token: string | null;
  /**
   * A user instance.
   */
  user: RefreshToken_tokenRefresh_user | null;
}

export interface RefreshToken {
  /**
   * Refresh JWT token. Mutation tries to take refreshToken from the input.If it
   * fails it will try to take refreshToken from the http-only cookie
   * -refreshToken. csrfToken is required when refreshToken is provided as a cookie.
   */
  tokenRefresh: RefreshToken_tokenRefresh | null;
}

export interface RefreshTokenVariables {
  token: string;
}
