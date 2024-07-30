/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_errors {
  __typename: "AccountError";
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

export interface TokenAuth_tokenCreate_user_userPermissions {
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

export interface TokenAuth_tokenCreate_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface TokenAuth_tokenCreate_user {
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
  userPermissions: (TokenAuth_tokenCreate_user_userPermissions | null)[] | null;
  avatar: TokenAuth_tokenCreate_user_avatar | null;
}

export interface TokenAuth_tokenCreate {
  __typename: "CreateToken";
  errors: TokenAuth_tokenCreate_errors[];
  /**
   * CSRF token required to re-generate access token.
   */
  csrfToken: string | null;
  /**
   * JWT token, required to authenticate.
   */
  token: string | null;
  /**
   * A user instance.
   */
  user: TokenAuth_tokenCreate_user | null;
}

export interface TokenAuth {
  /**
   * Create JWT token.
   */
  tokenCreate: TokenAuth_tokenCreate | null;
}

export interface TokenAuthVariables {
  email: string;
  password: string;
}
