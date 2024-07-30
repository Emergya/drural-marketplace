/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FooterCategoriesQuery
// ====================================================

export interface FooterCategoriesQuery_categories_edges_node_children_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface FooterCategoriesQuery_categories_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: FooterCategoriesQuery_categories_edges_node_children_edges_node;
}

export interface FooterCategoriesQuery_categories_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: FooterCategoriesQuery_categories_edges_node_children_edges[];
}

export interface FooterCategoriesQuery_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  /**
   * List of children of the category.
   */
  children: FooterCategoriesQuery_categories_edges_node_children | null;
}

export interface FooterCategoriesQuery_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: FooterCategoriesQuery_categories_edges_node;
}

export interface FooterCategoriesQuery_categories {
  __typename: "CategoryCountableConnection";
  edges: FooterCategoriesQuery_categories_edges[];
}

export interface FooterCategoriesQuery {
  /**
   * List of the shop's categories.
   */
  categories: FooterCategoriesQuery_categories | null;
}
