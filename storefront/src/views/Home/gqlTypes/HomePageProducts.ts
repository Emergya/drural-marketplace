/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePageProducts
// ====================================================

export interface HomePageProducts_shop {
  __typename: "Shop";
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Shop's name.
   */
  name: string;
}

export interface HomePageProducts_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  iconId: string | null;
}

export interface HomePageProducts_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageProducts_categories_edges_node;
}

export interface HomePageProducts_categories {
  __typename: "CategoryCountableConnection";
  edges: HomePageProducts_categories_edges[];
}

export interface HomePageProducts_collections_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface HomePageProducts_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  backgroundImage: HomePageProducts_collections_edges_node_backgroundImage | null;
}

export interface HomePageProducts_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePageProducts_collections_edges_node;
}

export interface HomePageProducts_collections {
  __typename: "CollectionCountableConnection";
  edges: HomePageProducts_collections_edges[];
}

export interface HomePageProducts {
  /**
   * Return information about the shop.
   */
  shop: HomePageProducts_shop;
  /**
   * List of the shop's categories.
   */
  categories: HomePageProducts_categories | null;
  /**
   * List of the shop's collections.
   */
  collections: HomePageProducts_collections | null;
}
