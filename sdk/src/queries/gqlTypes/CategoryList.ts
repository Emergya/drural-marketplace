/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryList
// ====================================================

export interface CategoryList_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CategoryList_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryList_categories_edges_node;
}

export interface CategoryList_categories_pageInfo {
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

export interface CategoryList_categories {
  __typename: "CategoryCountableConnection";
  edges: CategoryList_categories_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  /**
   * Pagination data for this connection.
   */
  pageInfo: CategoryList_categories_pageInfo;
}

export interface CategoryList {
  /**
   * List of the shop's categories.
   */
  categories: CategoryList_categories | null;
}

export interface CategoryListVariables {
  first: number;
  after?: string | null;
}
