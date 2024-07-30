/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAlldRuralCategories
// ====================================================

export interface GetAlldRuralCategories_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface GetAlldRuralCategories_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetAlldRuralCategories_categories_edges_node;
}

export interface GetAlldRuralCategories_categories {
  __typename: "CategoryCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: GetAlldRuralCategories_categories_edges[];
}

export interface GetAlldRuralCategories {
  /**
   * List of the shop's categories.
   */
  categories: GetAlldRuralCategories_categories | null;
}
