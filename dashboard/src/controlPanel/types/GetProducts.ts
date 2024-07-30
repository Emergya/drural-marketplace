/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrder, ProductFilterInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface GetProducts_products_edges_node_category {
  __typename: "Category";
  name: string;
}

export interface GetProducts_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  rating: number;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: GetProducts_products_edges_node_thumbnail | null;
  category: GetProducts_products_edges_node_category | null;
}

export interface GetProducts_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetProducts_products_edges_node;
}

export interface GetProducts_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: GetProducts_products_edges[];
}

export interface GetProducts {
  /**
   * List of the shop's products.
   */
  products: GetProducts_products | null;
}

export interface GetProductsVariables {
  first?: number | null;
  sortBy?: ProductOrder | null;
  filter?: ProductFilterInput | null;
}
