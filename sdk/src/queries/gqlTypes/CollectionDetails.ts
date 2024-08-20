/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionDetails
// ====================================================

export interface CollectionDetails_collection_backgroundImage {
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

export interface CollectionDetails_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  seoDescription: string | null;
  seoTitle: string | null;
  backgroundImage: CollectionDetails_collection_backgroundImage | null;
  description: any | null;
}

export interface CollectionDetails {
  /**
   * Look up a collection by ID.
   */
  collection: CollectionDetails_collection | null;
}

export interface CollectionDetailsVariables {
  id?: string | null;
  slug?: string | null;
  channel?: string | null;
}
