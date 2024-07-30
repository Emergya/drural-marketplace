/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrder } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: LastConsumedProducts
// ====================================================

export interface LastConsumedProducts_products_edges_node_category {
  __typename: "Category";
  name: string;
}

export interface LastConsumedProducts_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface LastConsumedProducts_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: LastConsumedProducts_products_edges_node_category | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: LastConsumedProducts_products_edges_node_thumbnail | null;
}

export interface LastConsumedProducts_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: LastConsumedProducts_products_edges_node;
}

export interface LastConsumedProducts_products {
  __typename: "ProductCountableConnection";
  edges: LastConsumedProducts_products_edges[];
}

export interface LastConsumedProducts {
  /**
   * List of the shop's products.
   */
  products: LastConsumedProducts_products | null;
}

export interface LastConsumedProductsVariables {
  first?: number | null;
  sort?: ProductOrder | null;
}
