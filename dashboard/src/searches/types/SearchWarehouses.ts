/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchWarehouses
// ====================================================

export interface SearchWarehouses_search_edges_node {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchWarehouses_search_edges {
  __typename: "WarehouseCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchWarehouses_search_edges_node;
}

export interface SearchWarehouses_search_pageInfo {
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

export interface SearchWarehouses_search {
  __typename: "WarehouseCountableConnection";
  edges: SearchWarehouses_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchWarehouses_search_pageInfo;
}

export interface SearchWarehouses {
  /**
   * List of warehouses.
   */
  search: SearchWarehouses_search | null;
}

export interface SearchWarehousesVariables {
  after?: string | null;
  first: number;
  query: string;
}
