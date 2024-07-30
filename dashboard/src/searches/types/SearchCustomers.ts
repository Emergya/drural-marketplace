/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchCustomers
// ====================================================

export interface SearchCustomers_search_edges_node {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface SearchCustomers_search_edges {
  __typename: "UserCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchCustomers_search_edges_node;
}

export interface SearchCustomers_search_pageInfo {
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

export interface SearchCustomers_search {
  __typename: "UserCountableConnection";
  edges: SearchCustomers_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchCustomers_search_pageInfo;
}

export interface SearchCustomers {
  /**
   * List of the shop's customers.
   */
  search: SearchCustomers_search | null;
}

export interface SearchCustomersVariables {
  after?: string | null;
  first: number;
  query: string;
}
