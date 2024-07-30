/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCollectionBySlug
// ====================================================

export interface GetCollectionBySlug_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface GetCollectionBySlug {
  /**
   * Look up a collection by ID.
   */
  collection: GetCollectionBySlug_collection | null;
}

export interface GetCollectionBySlugVariables {
  slug?: string | null;
}
