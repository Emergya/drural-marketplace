/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchProducts
// ====================================================

export interface SearchProducts_search_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SearchProducts_search_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SearchProducts_search_edges_node_thumbnail | null;
}

export interface SearchProducts_search_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProducts_search_edges_node;
}

export interface SearchProducts_search_pageInfo {
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

export interface SearchProducts_search {
  __typename: "ProductCountableConnection";
  edges: SearchProducts_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchProducts_search_pageInfo;
}

export interface SearchProducts {
  /**
   * List of the shop's products.
   */
  search: SearchProducts_search | null;
}

export interface SearchProductsVariables {
  after?: string | null;
  first: number;
  query: string;
}
