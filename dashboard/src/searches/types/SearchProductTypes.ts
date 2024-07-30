/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchProductTypes
// ====================================================

export interface SearchProductTypes_search_edges_node {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchProductTypes_search_edges {
  __typename: "ProductTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProductTypes_search_edges_node;
}

export interface SearchProductTypes_search_pageInfo {
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

export interface SearchProductTypes_search {
  __typename: "ProductTypeCountableConnection";
  edges: SearchProductTypes_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchProductTypes_search_pageInfo;
}

export interface SearchProductTypes {
  /**
   * List of the shop's product types.
   */
  search: SearchProductTypes_search | null;
}

export interface SearchProductTypesVariables {
  after?: string | null;
  first: number;
  query: string;
}
