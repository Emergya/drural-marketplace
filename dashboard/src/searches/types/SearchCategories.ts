/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchCategories
// ====================================================

export interface SearchCategories_search_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchCategories_search_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchCategories_search_edges_node;
}

export interface SearchCategories_search_pageInfo {
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

export interface SearchCategories_search {
  __typename: "CategoryCountableConnection";
  edges: SearchCategories_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchCategories_search_pageInfo;
}

export interface SearchCategories {
  /**
   * List of the shop's categories.
   */
  search: SearchCategories_search | null;
}

export interface SearchCategoriesVariables {
  after?: string | null;
  first: number;
  query: string;
}
