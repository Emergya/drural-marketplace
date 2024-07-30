/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchSuggestionsQuery
// ====================================================

export interface SearchSuggestionsQuery_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface SearchSuggestionsQuery_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchSuggestionsQuery_products_edges_node;
}

export interface SearchSuggestionsQuery_products {
  __typename: "ProductCountableConnection";
  edges: SearchSuggestionsQuery_products_edges[];
}

export interface SearchSuggestionsQuery {
  /**
   * List of the shop's products.
   */
  products: SearchSuggestionsQuery_products | null;
}

export interface SearchSuggestionsQueryVariables {
  query: string;
  channel: string;
  pageSize?: number | null;
}
