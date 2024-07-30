/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchCollections
// ====================================================

export interface SearchCollections_search_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchCollections_search_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchCollections_search_edges_node;
}

export interface SearchCollections_search_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface SearchCollections_search {
  __typename: "CollectionCountableConnection";
  edges: SearchCollections_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchCollections_search_pageInfo;
}

export interface SearchCollections {
  /**
   * List of the shop's collections.
   */
  search: SearchCollections_search | null;
}

export interface SearchCollectionsVariables {
  after?: string | null;
  first: number;
  query: string;
}
