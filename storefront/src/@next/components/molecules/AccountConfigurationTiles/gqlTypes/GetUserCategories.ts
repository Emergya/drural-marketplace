/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserCategories
// ====================================================

export interface GetUserCategories_me_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  iconId: string | null;
}

export interface GetUserCategories_me_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserCategories_me_categories_edges_node;
}

export interface GetUserCategories_me_categories_pageInfo {
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

export interface GetUserCategories_me_categories {
  __typename: "CategoryCountableConnection";
  edges: GetUserCategories_me_categories_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetUserCategories_me_categories_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GetUserCategories_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  categories: GetUserCategories_me_categories;
}

export interface GetUserCategories {
  /**
   * Return the currently authenticated user.
   */
  me: GetUserCategories_me | null;
}

export interface GetUserCategoriesVariables {
  first: number;
  after?: string | null;
}
