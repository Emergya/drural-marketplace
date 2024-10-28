/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AuthenticateSocialMediaUser
// ====================================================

export interface AuthenticateSocialMediaUser_authenticateSocialMediaUser_errors {
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

export interface AuthenticateSocialMediaUser_authenticateSocialMediaUser_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface AuthenticateSocialMediaUser_authenticateSocialMediaUser {
  __typename: "AuthenticateSocialMediaUser";
  /**
   * CSRF token required to regenerate access token.
   */
  csrfToken: string | null;
  /**
   * JWT refresh token, required to regenerate access token.
   */
  refreshToken: string | null;
  /**
   * JWT token, required to authenticate.
   */
  token: string | null;
  errors: AuthenticateSocialMediaUser_authenticateSocialMediaUser_errors[];
  /**
   * A user instance.
   */
  user: AuthenticateSocialMediaUser_authenticateSocialMediaUser_user | null;
}

export interface AuthenticateSocialMediaUser {
  /**
   * Authenticate a user using Open ID.
   */
  authenticateSocialMediaUser: AuthenticateSocialMediaUser_authenticateSocialMediaUser | null;
}

export interface AuthenticateSocialMediaUserVariables {
  openId: string;
}
