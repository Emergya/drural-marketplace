/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllCategories
// ====================================================

export interface GetAllCategories_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  iconId: string | null;
}

export interface GetAllCategories_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetAllCategories_categories_edges_node;
}

export interface GetAllCategories_categories_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface GetAllCategories_categories {
  __typename: "CategoryCountableConnection";
  edges: GetAllCategories_categories_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetAllCategories_categories_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GetAllCategories {
  /**
   * List of the shop's categories.
   */
  categories: GetAllCategories_categories | null;
}

export interface GetAllCategoriesVariables {
  first: number;
}
