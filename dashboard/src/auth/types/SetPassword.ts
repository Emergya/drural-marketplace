/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, AddressTypeEnum, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SetPassword
// ====================================================

export interface SetPassword_setPassword_errors {
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

export interface SetPassword_setPassword_user_userPermissions {
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

export interface SetPassword_setPassword_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SetPassword_setPassword_user {
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
  userPermissions: (SetPassword_setPassword_user_userPermissions | null)[] | null;
  avatar: SetPassword_setPassword_user_avatar | null;
}

export interface SetPassword_setPassword {
  __typename: "SetPassword";
  errors: SetPassword_setPassword_errors[];
  /**
   * CSRF token required to re-generate access token.
   */
  csrfToken: string | null;
  /**
   * JWT refresh token, required to re-generate access token.
   */
  refreshToken: string | null;
  /**
   * JWT token, required to authenticate.
   */
  token: string | null;
  /**
   * A user instance.
   */
  user: SetPassword_setPassword_user | null;
}

export interface SetPassword {
  /**
   * Sets the user's password from the token sent by email using the RequestPasswordReset mutation.
   */
  setPassword: SetPassword_setPassword | null;
}

export interface SetPasswordVariables {
  email: string;
  password: string;
  token: string;
}
