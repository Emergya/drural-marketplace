/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterInput, ProductOrder } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductsByCompanyList
// ====================================================

export interface ProductsByCompanyList_productsByCompany_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductsByCompanyList_productsByCompany_edges_node_categories_edges_node;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_categories {
  __typename: "CategoryCountableConnection";
  edges: ProductsByCompanyList_productsByCompany_edges_node_categories_edges[];
}

export interface ProductsByCompanyList_productsByCompany_edges_node_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  publicName: string;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  hasVariants: boolean;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange_start_net {
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

export interface ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange_start_net;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange_stop_net {
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

export interface ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange_stop_net;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange_stop | null;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing_priceRange | null;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: ProductsByCompanyList_productsByCompany_edges_node_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductsByCompanyList_productsByCompany_edges_node_channelListings_pricing | null;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_attributes_values_file {
  __typename: "File";
  /**
   * The URL of the file.
   */
  url: string;
  /**
   * Content type of the file.
   */
  contentType: string | null;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
  /**
   * Represents file URL and content type (if attribute value is a file).
   */
  file: ProductsByCompanyList_productsByCompany_edges_node_attributes_values_file | null;
  /**
   * The ID of the attribute reference.
   */
  reference: string | null;
  /**
   * Represents the text (JSON) of the attribute value.
   */
  richText: any | null;
  /**
   * Represents the boolean value of the attribute value.
   */
  boolean: boolean | null;
  /**
   * Represents the date value of the attribute value.
   */
  date: any | null;
  /**
   * Represents the date time value of the attribute value.
   */
  dateTime: any | null;
}

export interface ProductsByCompanyList_productsByCompany_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductsByCompanyList_productsByCompany_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductsByCompanyList_productsByCompany_edges_node_attributes_values | null)[];
}

export interface ProductsByCompanyList_productsByCompany_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductsByCompanyList_productsByCompany_edges_node_thumbnail | null;
  categories: ProductsByCompanyList_productsByCompany_edges_node_categories;
  company: ProductsByCompanyList_productsByCompany_edges_node_company;
  createdAt: any | null;
  updatedAt: any | null;
  productType: ProductsByCompanyList_productsByCompany_edges_node_productType;
  /**
   * List of availability in channels for the product.
   */
  channelListings: ProductsByCompanyList_productsByCompany_edges_node_channelListings[] | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductsByCompanyList_productsByCompany_edges_node_attributes[];
}

export interface ProductsByCompanyList_productsByCompany_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductsByCompanyList_productsByCompany_edges_node;
}

export interface ProductsByCompanyList_productsByCompany_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface ProductsByCompanyList_productsByCompany {
  __typename: "ProductCountableConnection";
  edges: ProductsByCompanyList_productsByCompany_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductsByCompanyList_productsByCompany_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface ProductsByCompanyList {
  /**
   * List of the products related to the company.
   */
  productsByCompany: ProductsByCompanyList_productsByCompany | null;
}

export interface ProductsByCompanyListVariables {
  company: string;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: ProductFilterInput | null;
  channel: string;
  sort?: ProductOrder | null;
}
