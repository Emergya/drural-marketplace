/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AvatarDelete
// ====================================================

export interface AvatarDelete_userAvatarDelete_errors {
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
}

export interface AvatarDelete_userAvatarDelete_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface AvatarDelete_userAvatarDelete_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  avatar: AvatarDelete_userAvatarDelete_user_avatar | null;
}

export interface AvatarDelete_userAvatarDelete {
  __typename: "UserAvatarDelete";
  errors: AvatarDelete_userAvatarDelete_errors[];
  /**
   * An updated user instance.
   */
  user: AvatarDelete_userAvatarDelete_user | null;
}

export interface AvatarDelete {
  /**
   * Deletes a user avatar.
   */
  userAvatarDelete: AvatarDelete_userAvatarDelete | null;
}
