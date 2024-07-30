/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchAttributes
// ====================================================

export interface SearchAttributes_search_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface SearchAttributes_search_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchAttributes_search_edges_node;
}

export interface SearchAttributes_search_pageInfo {
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

export interface SearchAttributes_search {
  __typename: "AttributeCountableConnection";
  edges: SearchAttributes_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchAttributes_search_pageInfo;
}

export interface SearchAttributes {
  /**
   * List of the shop's attributes.
   */
  search: SearchAttributes_search | null;
}

export interface SearchAttributesVariables {
  after?: string | null;
  first: number;
  query: string;
}
