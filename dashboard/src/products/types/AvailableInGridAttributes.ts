/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AvailableInGridAttributes
// ====================================================

export interface AvailableInGridAttributes_availableInGrid_edges_node {
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

export interface AvailableInGridAttributes_availableInGrid_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: AvailableInGridAttributes_availableInGrid_edges_node;
}

export interface AvailableInGridAttributes_availableInGrid_pageInfo {
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

export interface AvailableInGridAttributes_availableInGrid {
  __typename: "AttributeCountableConnection";
  edges: AvailableInGridAttributes_availableInGrid_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: AvailableInGridAttributes_availableInGrid_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface AvailableInGridAttributes {
  /**
   * List of the shop's attributes.
   */
  availableInGrid: AvailableInGridAttributes_availableInGrid | null;
}

export interface AvailableInGridAttributesVariables {
  first: number;
  after?: string | null;
}
