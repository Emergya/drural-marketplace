/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: StaffAvatarUpdate
// ====================================================

export interface StaffAvatarUpdate_userAvatarUpdate_errors {
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

export interface StaffAvatarUpdate_userAvatarUpdate_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface StaffAvatarUpdate_userAvatarUpdate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  avatar: StaffAvatarUpdate_userAvatarUpdate_user_avatar | null;
}

export interface StaffAvatarUpdate_userAvatarUpdate {
  __typename: "UserAvatarUpdate";
  errors: StaffAvatarUpdate_userAvatarUpdate_errors[];
  /**
   * An updated user instance.
   */
  user: StaffAvatarUpdate_userAvatarUpdate_user | null;
}

export interface StaffAvatarUpdate {
  /**
   * Create a user avatar. This mutation must be sent as a `multipart` request.
   * More detailed specs of the upload format can be found here:
   * https: // github.com/jaydenseric/graphql-multipart-request-spec
   */
  userAvatarUpdate: StaffAvatarUpdate_userAvatarUpdate | null;
}

export interface StaffAvatarUpdateVariables {
  image: any;
}
