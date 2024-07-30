/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionInput, CollectionErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CollectionUpdate
// ====================================================

export interface CollectionUpdate_collectionUpdate_collection_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionUpdate_collectionUpdate_collection_channelListings {
  __typename: "CollectionChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  channel: CollectionUpdate_collectionUpdate_collection_channelListings_channel;
}

export interface CollectionUpdate_collectionUpdate_collection_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface CollectionUpdate_collectionUpdate_collection_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface CollectionUpdate_collectionUpdate_collection_backgroundImage {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CollectionUpdate_collectionUpdate_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of channels in which the collection is available.
   */
  channelListings: CollectionUpdate_collectionUpdate_collection_channelListings[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (CollectionUpdate_collectionUpdate_collection_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (CollectionUpdate_collectionUpdate_collection_privateMetadata | null)[];
  backgroundImage: CollectionUpdate_collectionUpdate_collection_backgroundImage | null;
  slug: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CollectionUpdate_collectionUpdate_errors {
  __typename: "CollectionError";
  /**
   * The error code.
   */
  code: CollectionErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface CollectionUpdate_collectionUpdate {
  __typename: "CollectionUpdate";
  collection: CollectionUpdate_collectionUpdate_collection | null;
  errors: CollectionUpdate_collectionUpdate_errors[];
}

export interface CollectionUpdate {
  /**
   * Updates a collection.
   */
  collectionUpdate: CollectionUpdate_collectionUpdate | null;
}

export interface CollectionUpdateVariables {
  id: string;
  input: CollectionInput;
}
