/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionChannelListingUpdateInput, ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CollectionChannelListingUpdate
// ====================================================

export interface CollectionChannelListingUpdate_collectionChannelListingUpdate_errors {
  __typename: "CollectionChannelListingError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * List of channels IDs which causes the error.
   */
  channels: string[] | null;
}

export interface CollectionChannelListingUpdate_collectionChannelListingUpdate {
  __typename: "CollectionChannelListingUpdate";
  errors: CollectionChannelListingUpdate_collectionChannelListingUpdate_errors[];
}

export interface CollectionChannelListingUpdate {
  /**
   * Manage collection's availability in channels.
   */
  collectionChannelListingUpdate: CollectionChannelListingUpdate_collectionChannelListingUpdate | null;
}

export interface CollectionChannelListingUpdateVariables {
  id: string;
  input: CollectionChannelListingUpdateInput;
}
