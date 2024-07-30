/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum, AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ExternalObtainAccessTokens
// ====================================================

export interface ExternalObtainAccessTokens_externalObtainAccessTokens_user_userPermissions {
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

export interface ExternalObtainAccessTokens_externalObtainAccessTokens_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ExternalObtainAccessTokens_externalObtainAccessTokens_user {
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
  userPermissions: (ExternalObtainAccessTokens_externalObtainAccessTokens_user_userPermissions | null)[] | null;
  avatar: ExternalObtainAccessTokens_externalObtainAccessTokens_user_avatar | null;
}

export interface ExternalObtainAccessTokens_externalObtainAccessTokens_errors {
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
   * A type of address that causes the error.
   */
  addressType: AddressTypeEnum | null;
}

export interface ExternalObtainAccessTokens_externalObtainAccessTokens {
  __typename: "ExternalObtainAccessTokens";
  /**
   * The token, required to authenticate.
   */
  token: string | null;
  /**
   * CSRF token required to re-generate external access token.
   */
  csrfToken: string | null;
  /**
   * A user instance.
   */
  user: ExternalObtainAccessTokens_externalObtainAccessTokens_user | null;
  errors: ExternalObtainAccessTokens_externalObtainAccessTokens_errors[];
}

export interface ExternalObtainAccessTokens {
  /**
   * Obtain external access tokens for user by custom plugin.
   */
  externalObtainAccessTokens: ExternalObtainAccessTokens_externalObtainAccessTokens | null;
}

export interface ExternalObtainAccessTokensVariables {
  pluginId: string;
  input: any;
}
