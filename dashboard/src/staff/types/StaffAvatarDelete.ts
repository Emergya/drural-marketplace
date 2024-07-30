/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: StaffAvatarDelete
// ====================================================

export interface StaffAvatarDelete_userAvatarDelete_errors {
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

export interface StaffAvatarDelete_userAvatarDelete_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface StaffAvatarDelete_userAvatarDelete_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  avatar: StaffAvatarDelete_userAvatarDelete_user_avatar | null;
}

export interface StaffAvatarDelete_userAvatarDelete {
  __typename: "UserAvatarDelete";
  errors: StaffAvatarDelete_userAvatarDelete_errors[];
  /**
   * An updated user instance.
   */
  user: StaffAvatarDelete_userAvatarDelete_user | null;
}

export interface StaffAvatarDelete {
  /**
   * Deletes a user avatar.
   */
  userAvatarDelete: StaffAvatarDelete_userAvatarDelete | null;
}
