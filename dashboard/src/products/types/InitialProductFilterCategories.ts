/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InitialProductFilterCategories
// ====================================================

export interface InitialProductFilterCategories_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface InitialProductFilterCategories_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: InitialProductFilterCategories_categories_edges_node;
}

export interface InitialProductFilterCategories_categories {
  __typename: "CategoryCountableConnection";
  edges: InitialProductFilterCategories_categories_edges[];
}

export interface InitialProductFilterCategories {
  /**
   * List of the shop's categories.
   */
  categories: InitialProductFilterCategories_categories | null;
}

export interface InitialProductFilterCategoriesVariables {
  categories?: string[] | null;
}
