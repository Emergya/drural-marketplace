/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionSortingInput, CollectionFilterInput } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CollectionList
// ====================================================

export interface CollectionList_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CollectionList_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionList_collections_edges_node;
}

export interface CollectionList_collections_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface CollectionList_collections {
  __typename: "CollectionCountableConnection";
  edges: CollectionList_collections_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionList_collections_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CollectionList {
  /**
   * List of the shop's collections.
   */
  collections: CollectionList_collections | null;
}

export interface CollectionListVariables {
  first: number;
  after?: string | null;
  sortBy?: CollectionSortingInput | null;
  filter?: CollectionFilterInput | null;
  channel?: string | null;
}
