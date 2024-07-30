/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchCatalog
// ====================================================

export interface SearchCatalog_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchCatalog_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchCatalog_categories_edges_node;
}

export interface SearchCatalog_categories {
  __typename: "CategoryCountableConnection";
  edges: SearchCatalog_categories_edges[];
}

export interface SearchCatalog_collections_edges_node_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchCatalog_collections_edges_node_channelListings {
  __typename: "CollectionChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  channel: SearchCatalog_collections_edges_node_channelListings_channel;
}

export interface SearchCatalog_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of channels in which the collection is available.
   */
  channelListings: SearchCatalog_collections_edges_node_channelListings[] | null;
}

export interface SearchCatalog_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchCatalog_collections_edges_node;
}

export interface SearchCatalog_collections {
  __typename: "CollectionCountableConnection";
  edges: SearchCatalog_collections_edges[];
}

export interface SearchCatalog_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchCatalog_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  category: SearchCatalog_products_edges_node_category | null;
  name: string;
}

export interface SearchCatalog_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchCatalog_products_edges_node;
}

export interface SearchCatalog_products {
  __typename: "ProductCountableConnection";
  edges: SearchCatalog_products_edges[];
}

export interface SearchCatalog {
  /**
   * List of the shop's categories.
   */
  categories: SearchCatalog_categories | null;
  /**
   * List of the shop's collections.
   */
  collections: SearchCatalog_collections | null;
  /**
   * List of the shop's products.
   */
  products: SearchCatalog_products | null;
}

export interface SearchCatalogVariables {
  first: number;
  query: string;
}
