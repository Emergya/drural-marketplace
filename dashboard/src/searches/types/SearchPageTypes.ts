/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchPageTypes
// ====================================================

export interface SearchPageTypes_search_edges_node {
  __typename: "PageType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchPageTypes_search_edges {
  __typename: "PageTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchPageTypes_search_edges_node;
}

export interface SearchPageTypes_search_pageInfo {
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

export interface SearchPageTypes_search {
  __typename: "PageTypeCountableConnection";
  edges: SearchPageTypes_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchPageTypes_search_pageInfo;
}

export interface SearchPageTypes {
  /**
   * List of the page types.
   */
  search: SearchPageTypes_search | null;
}

export interface SearchPageTypesVariables {
  after?: string | null;
  first: number;
  query: string;
}
