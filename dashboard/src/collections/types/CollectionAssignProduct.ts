/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CollectionAssignProduct
// ====================================================

export interface CollectionAssignProduct_collectionAddProducts_collection_products_edges_node_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionAssignProduct_collectionAddProducts_collection_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CollectionAssignProduct_collectionAddProducts_collection_products_edges_node_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface CollectionAssignProduct_collectionAddProducts_collection_products_edges_node_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: CollectionAssignProduct_collectionAddProducts_collection_products_edges_node_channelListings_channel;
}

export interface CollectionAssignProduct_collectionAddProducts_collection_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  productType: CollectionAssignProduct_collectionAddProducts_collection_products_edges_node_productType;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CollectionAssignProduct_collectionAddProducts_collection_products_edges_node_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: CollectionAssignProduct_collectionAddProducts_collection_products_edges_node_channelListings[] | null;
}

export interface CollectionAssignProduct_collectionAddProducts_collection_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionAssignProduct_collectionAddProducts_collection_products_edges_node;
}

export interface CollectionAssignProduct_collectionAddProducts_collection_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface CollectionAssignProduct_collectionAddProducts_collection_products {
  __typename: "ProductCountableConnection";
  edges: CollectionAssignProduct_collectionAddProducts_collection_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionAssignProduct_collectionAddProducts_collection_products_pageInfo;
}

export interface CollectionAssignProduct_collectionAddProducts_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of products in this collection.
   */
  products: CollectionAssignProduct_collectionAddProducts_collection_products | null;
}

export interface CollectionAssignProduct_collectionAddProducts_errors {
  __typename: "CollectionError";
  /**
   * The error code.
   */
  code: CollectionErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface CollectionAssignProduct_collectionAddProducts {
  __typename: "CollectionAddProducts";
  /**
   * Collection to which products will be added.
   */
  collection: CollectionAssignProduct_collectionAddProducts_collection | null;
  errors: CollectionAssignProduct_collectionAddProducts_errors[];
}

export interface CollectionAssignProduct {
  /**
   * Adds products to a collection.
   */
  collectionAddProducts: CollectionAssignProduct_collectionAddProducts | null;
}

export interface CollectionAssignProductVariables {
  collectionId: string;
  productIds: string[];
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
