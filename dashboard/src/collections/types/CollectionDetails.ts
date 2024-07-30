/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionDetails
// ====================================================

export interface CollectionDetails_collection_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionDetails_collection_channelListings {
  __typename: "CollectionChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  channel: CollectionDetails_collection_channelListings_channel;
}

export interface CollectionDetails_collection_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface CollectionDetails_collection_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface CollectionDetails_collection_backgroundImage {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CollectionDetails_collection_products_edges_node_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionDetails_collection_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CollectionDetails_collection_products_edges_node_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface CollectionDetails_collection_products_edges_node_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: CollectionDetails_collection_products_edges_node_channelListings_channel;
}

export interface CollectionDetails_collection_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  productType: CollectionDetails_collection_products_edges_node_productType;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CollectionDetails_collection_products_edges_node_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: CollectionDetails_collection_products_edges_node_channelListings[] | null;
}

export interface CollectionDetails_collection_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionDetails_collection_products_edges_node;
}

export interface CollectionDetails_collection_products_pageInfo {
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

export interface CollectionDetails_collection_products {
  __typename: "ProductCountableConnection";
  edges: CollectionDetails_collection_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionDetails_collection_products_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CollectionDetails_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of channels in which the collection is available.
   */
  channelListings: CollectionDetails_collection_channelListings[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (CollectionDetails_collection_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (CollectionDetails_collection_privateMetadata | null)[];
  backgroundImage: CollectionDetails_collection_backgroundImage | null;
  slug: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * List of products in this collection.
   */
  products: CollectionDetails_collection_products | null;
}

export interface CollectionDetails {
  /**
   * Look up a collection by ID.
   */
  collection: CollectionDetails_collection | null;
}

export interface CollectionDetailsVariables {
  id: string;
  company?: string | null;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
