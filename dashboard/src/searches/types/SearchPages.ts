/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchPages
// ====================================================

export interface SearchPages_search_edges_node {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
}

export interface SearchPages_search_edges {
  __typename: "PageCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchPages_search_edges_node;
}

export interface SearchPages_search_pageInfo {
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

export interface SearchPages_search {
  __typename: "PageCountableConnection";
  edges: SearchPages_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchPages_search_pageInfo;
}

export interface SearchPages {
  /**
   * List of the shop's pages.
   */
  search: SearchPages_search | null;
}

export interface SearchPagesVariables {
  after?: string | null;
  first: number;
  query: string;
}
