/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AvatarUpdate
// ====================================================

export interface AvatarUpdate_userAvatarUpdate_errors {
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

export interface AvatarUpdate_userAvatarUpdate_user_avatar {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface AvatarUpdate_userAvatarUpdate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  avatar: AvatarUpdate_userAvatarUpdate_user_avatar | null;
}

export interface AvatarUpdate_userAvatarUpdate {
  __typename: "UserAvatarUpdate";
  errors: AvatarUpdate_userAvatarUpdate_errors[];
  /**
   * An updated user instance.
   */
  user: AvatarUpdate_userAvatarUpdate_user | null;
}

export interface AvatarUpdate {
  /**
   * Create a user avatar. This mutation must be sent as a `multipart` request.
   * More detailed specs of the upload format can be found here:
   * https: // github.com/jaydenseric/graphql-multipart-request-spec
   */
  userAvatarUpdate: AvatarUpdate_userAvatarUpdate | null;
}

export interface AvatarUpdateVariables {
  image: any;
}
