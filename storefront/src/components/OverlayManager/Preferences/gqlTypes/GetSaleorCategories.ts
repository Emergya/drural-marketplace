/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSaleorCategories
// ====================================================

export interface GetSaleorCategories_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  iconId: string | null;
}

export interface GetSaleorCategories_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: GetSaleorCategories_categories_edges_node;
}

export interface GetSaleorCategories_categories_pageInfo {
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

export interface GetSaleorCategories_categories {
  __typename: "CategoryCountableConnection";
  edges: GetSaleorCategories_categories_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetSaleorCategories_categories_pageInfo;
}

export interface GetSaleorCategories {
  /**
   * List of the shop's categories.
   */
  categories: GetSaleorCategories_categories | null;
}
