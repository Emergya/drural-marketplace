/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchAvailablePageAttributes
// ====================================================

export interface SearchAvailablePageAttributes_pageType_availableAttributes_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
}

export interface SearchAvailablePageAttributes_pageType_availableAttributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchAvailablePageAttributes_pageType_availableAttributes_edges_node;
}

export interface SearchAvailablePageAttributes_pageType_availableAttributes_pageInfo {
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

export interface SearchAvailablePageAttributes_pageType_availableAttributes {
  __typename: "AttributeCountableConnection";
  edges: SearchAvailablePageAttributes_pageType_availableAttributes_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchAvailablePageAttributes_pageType_availableAttributes_pageInfo;
}

export interface SearchAvailablePageAttributes_pageType {
  __typename: "PageType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Attributes that can be assigned to the page type.
   */
  availableAttributes: SearchAvailablePageAttributes_pageType_availableAttributes | null;
}

export interface SearchAvailablePageAttributes {
  /**
   * Look up a page type by ID.
   */
  pageType: SearchAvailablePageAttributes_pageType | null;
}

export interface SearchAvailablePageAttributesVariables {
  id: string;
  after?: string | null;
  first: number;
  query: string;
}
