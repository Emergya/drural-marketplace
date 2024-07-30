/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoucherTypeEnum, DiscountValueTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: VoucherDetailsFragment
// ====================================================

export interface VoucherDetailsFragment_metadata {
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

export interface VoucherDetailsFragment_privateMetadata {
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

export interface VoucherDetailsFragment_countries {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface VoucherDetailsFragment_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VoucherDetailsFragment_channelListings_minSpent {
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

export interface VoucherDetailsFragment_channelListings {
  __typename: "VoucherChannelListing";
  /**
   * The ID of the object.
   */
  id: string;
  channel: VoucherDetailsFragment_channelListings_channel;
  discountValue: number;
  currency: string;
  minSpent: VoucherDetailsFragment_channelListings_minSpent | null;
}

export interface VoucherDetailsFragment_products_edges_node_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface VoucherDetailsFragment_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface VoucherDetailsFragment_products_edges_node_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VoucherDetailsFragment_products_edges_node_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: VoucherDetailsFragment_products_edges_node_channelListings_channel;
}

export interface VoucherDetailsFragment_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  productType: VoucherDetailsFragment_products_edges_node_productType;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: VoucherDetailsFragment_products_edges_node_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: VoucherDetailsFragment_products_edges_node_channelListings[] | null;
}

export interface VoucherDetailsFragment_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: VoucherDetailsFragment_products_edges_node;
}

export interface VoucherDetailsFragment_products_pageInfo {
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

export interface VoucherDetailsFragment_products {
  __typename: "ProductCountableConnection";
  edges: VoucherDetailsFragment_products_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  /**
   * Pagination data for this connection.
   */
  pageInfo: VoucherDetailsFragment_products_pageInfo;
}

export interface VoucherDetailsFragment_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface VoucherDetailsFragment_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of products in this collection.
   */
  products: VoucherDetailsFragment_collections_edges_node_products | null;
}

export interface VoucherDetailsFragment_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: VoucherDetailsFragment_collections_edges_node;
}

export interface VoucherDetailsFragment_collections_pageInfo {
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

export interface VoucherDetailsFragment_collections {
  __typename: "CollectionCountableConnection";
  edges: VoucherDetailsFragment_collections_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  /**
   * Pagination data for this connection.
   */
  pageInfo: VoucherDetailsFragment_collections_pageInfo;
}

export interface VoucherDetailsFragment_categories_edges_node_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface VoucherDetailsFragment_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of products in the category.
   */
  products: VoucherDetailsFragment_categories_edges_node_products | null;
}

export interface VoucherDetailsFragment_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: VoucherDetailsFragment_categories_edges_node;
}

export interface VoucherDetailsFragment_categories_pageInfo {
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

export interface VoucherDetailsFragment_categories {
  __typename: "CategoryCountableConnection";
  edges: VoucherDetailsFragment_categories_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  /**
   * Pagination data for this connection.
   */
  pageInfo: VoucherDetailsFragment_categories_pageInfo;
}

export interface VoucherDetailsFragment {
  __typename: "Voucher";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (VoucherDetailsFragment_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (VoucherDetailsFragment_privateMetadata | null)[];
  /**
   * The ID of the object.
   */
  id: string;
  code: string;
  startDate: any;
  endDate: any | null;
  usageLimit: number | null;
  /**
   * Determines a type of voucher.
   */
  type: VoucherTypeEnum;
  /**
   * Determines a type of discount for voucher - value or percentage
   */
  discountValueType: DiscountValueTypeEnum;
  /**
   * List of countries available for the shipping voucher.
   */
  countries: (VoucherDetailsFragment_countries | null)[] | null;
  minCheckoutItemsQuantity: number | null;
  /**
   * List of availability in channels for the voucher.
   */
  channelListings: VoucherDetailsFragment_channelListings[] | null;
  used: number;
  applyOncePerOrder: boolean;
  applyOncePerCustomer: boolean;
  onlyForStaff: boolean;
  /**
   * List of products this voucher applies to.
   */
  products: VoucherDetailsFragment_products | null;
  /**
   * List of collections this voucher applies to.
   */
  collections: VoucherDetailsFragment_collections | null;
  /**
   * List of categories this voucher applies to.
   */
  categories: VoucherDetailsFragment_categories | null;
}
