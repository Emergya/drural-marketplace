/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryDetails
// ====================================================

export interface CategoryDetails_category_metadata {
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

export interface CategoryDetails_category_privateMetadata {
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

export interface CategoryDetails_category_parent {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CategoryDetails_category_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CategoryDetails_category_children_edges_node_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CategoryDetails_category_children_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of children of the category.
   */
  children: CategoryDetails_category_children_edges_node_children | null;
  /**
   * List of products in the category.
   */
  products: CategoryDetails_category_children_edges_node_products | null;
}

export interface CategoryDetails_category_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_category_children_edges_node;
}

export interface CategoryDetails_category_children_pageInfo {
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

export interface CategoryDetails_category_children {
  __typename: "CategoryCountableConnection";
  edges: CategoryDetails_category_children_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CategoryDetails_category_children_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CategoryDetails_category_products_pageInfo {
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

export interface CategoryDetails_category_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryDetails_category_products_edges_node_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CategoryDetails_category_products_edges_node_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange_start_net {
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

export interface CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange_start_net;
}

export interface CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange_stop_net {
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

export interface CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange_stop_net;
}

export interface CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange_stop | null;
}

export interface CategoryDetails_category_products_edges_node_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: CategoryDetails_category_products_edges_node_channelListings_pricing_priceRange | null;
}

export interface CategoryDetails_category_products_edges_node_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: CategoryDetails_category_products_edges_node_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CategoryDetails_category_products_edges_node_channelListings_pricing | null;
}

export interface CategoryDetails_category_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CategoryDetails_category_products_edges_node_thumbnail | null;
  productType: CategoryDetails_category_products_edges_node_productType;
  /**
   * List of availability in channels for the product.
   */
  channelListings: CategoryDetails_category_products_edges_node_channelListings[] | null;
}

export interface CategoryDetails_category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_category_products_edges_node;
}

export interface CategoryDetails_category_products {
  __typename: "ProductCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: CategoryDetails_category_products_pageInfo;
  edges: CategoryDetails_category_products_edges[];
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CategoryDetails_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (CategoryDetails_category_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (CategoryDetails_category_privateMetadata | null)[];
  name: string;
  slug: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  iconId: string | null;
  parent: CategoryDetails_category_parent | null;
  /**
   * List of children of the category.
   */
  children: CategoryDetails_category_children | null;
  /**
   * List of products in the category.
   */
  products: CategoryDetails_category_products | null;
}

export interface CategoryDetails {
  /**
   * Look up a category by ID or slug.
   */
  category: CategoryDetails_category | null;
}

export interface CategoryDetailsVariables {
  id: string;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  company?: string | null;
}
