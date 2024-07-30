/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchShippingZones
// ====================================================

export interface SearchShippingZones_search_edges_node {
  __typename: "ShippingZone";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchShippingZones_search_edges {
  __typename: "ShippingZoneCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchShippingZones_search_edges_node;
}

export interface SearchShippingZones_search_pageInfo {
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

export interface SearchShippingZones_search {
  __typename: "ShippingZoneCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: SearchShippingZones_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchShippingZones_search_pageInfo;
}

export interface SearchShippingZones {
  /**
   * List of the shop's shipping zones.
   */
  search: SearchShippingZones_search | null;
}

export interface SearchShippingZonesVariables {
  query: string;
  first: number;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
