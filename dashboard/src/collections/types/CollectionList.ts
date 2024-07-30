/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionFilterInput, CollectionSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: CollectionList
// ====================================================

export interface CollectionList_collections_edges_node_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionList_collections_edges_node_channelListings {
  __typename: "CollectionChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  channel: CollectionList_collections_edges_node_channelListings_channel;
}

export interface CollectionList_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CollectionList_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of channels in which the collection is available.
   */
  channelListings: CollectionList_collections_edges_node_channelListings[] | null;
  /**
   * List of products in this collection.
   */
  products: CollectionList_collections_edges_node_products | null;
}

export interface CollectionList_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionList_collections_edges_node;
}

export interface CollectionList_collections_pageInfo {
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

export interface CollectionList_collections {
  __typename: "CollectionCountableConnection";
  edges: CollectionList_collections_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionList_collections_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CollectionList {
  /**
   * List of the shop's collections.
   */
  collections: CollectionList_collections | null;
}

export interface CollectionListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: CollectionFilterInput | null;
  sort?: CollectionSortingInput | null;
  channel?: string | null;
}
