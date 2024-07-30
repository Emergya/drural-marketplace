/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ApolloLinkRefreshToken
// ====================================================

export interface ApolloLinkRefreshToken_tokenRefresh_errors {
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

export interface ApolloLinkRefreshToken_tokenRefresh {
  __typename: "RefreshToken";
  /**
   * JWT token, required to authenticate.
   */
  token: string | null;
  errors: ApolloLinkRefreshToken_tokenRefresh_errors[];
}

export interface ApolloLinkRefreshToken {
  /**
   * Refresh JWT token. Mutation tries to take refreshToken from the input.If it
   * fails it will try to take refreshToken from the http-only cookie
   * -refreshToken. csrfToken is required when refreshToken is provided as a cookie.
   */
  tokenRefresh: ApolloLinkRefreshToken_tokenRefresh | null;
}

export interface ApolloLinkRefreshTokenVariables {
  token: string;
}
