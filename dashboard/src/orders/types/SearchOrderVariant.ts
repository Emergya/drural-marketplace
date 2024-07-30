/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyStatus } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: SearchOrderVariant
// ====================================================

export interface SearchOrderVariant_search_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SearchOrderVariant_search_edges_node_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
}

export interface SearchOrderVariant_search_edges_node_company {
  __typename: "CompanyType";
  isEnabled: boolean;
  status: CompanyStatus;
}

export interface SearchOrderVariant_search_edges_node_variants_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  isActive: boolean;
  name: string;
  currencyCode: string;
}

export interface SearchOrderVariant_search_edges_node_variants_channelListings_price {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SearchOrderVariant_search_edges_node_variants_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: SearchOrderVariant_search_edges_node_variants_channelListings_channel;
  price: SearchOrderVariant_search_edges_node_variants_channelListings_price | null;
}

export interface SearchOrderVariant_search_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of price information in channels for the product.
   */
  channelListings: SearchOrderVariant_search_edges_node_variants_channelListings[] | null;
}

export interface SearchOrderVariant_search_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SearchOrderVariant_search_edges_node_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: SearchOrderVariant_search_edges_node_channelListings[] | null;
  company: SearchOrderVariant_search_edges_node_company;
  /**
   * List of variants for the product.
   */
  variants: (SearchOrderVariant_search_edges_node_variants | null)[] | null;
}

export interface SearchOrderVariant_search_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchOrderVariant_search_edges_node;
}

export interface SearchOrderVariant_search_pageInfo {
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

export interface SearchOrderVariant_search {
  __typename: "ProductCountableConnection";
  edges: SearchOrderVariant_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchOrderVariant_search_pageInfo;
}

export interface SearchOrderVariant {
  /**
   * List of the shop's products.
   */
  search: SearchOrderVariant_search | null;
}

export interface SearchOrderVariantVariables {
  channel: string;
  company?: string | null;
  first: number;
  query: string;
  after?: string | null;
}
