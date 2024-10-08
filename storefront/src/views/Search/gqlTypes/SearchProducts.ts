/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder, ClosenessRangeInput } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: SearchProducts
// ====================================================

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface SearchProducts_products_edges_node_pricing_priceRange_start_gross {
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

export interface SearchProducts_products_edges_node_pricing_priceRange_start_net {
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

export interface SearchProducts_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_products_edges_node_pricing_priceRange_start_net;
}

export interface SearchProducts_products_edges_node_pricing_priceRange_stop_gross {
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

export interface SearchProducts_products_edges_node_pricing_priceRange_stop_net {
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

export interface SearchProducts_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_products_edges_node_pricing_priceRange_stop_net;
}

export interface SearchProducts_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SearchProducts_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SearchProducts_products_edges_node_pricing_priceRange_stop | null;
}

export interface SearchProducts_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SearchProducts_products_edges_node_pricing_priceRange | null;
}

export interface SearchProducts_products_edges_node_address {
  __typename: "ProductAddressType";
  latitude: number | null;
  longitude: number | null;
}

export interface SearchProducts_products_edges_node_reviews {
  __typename: "ProductRatingCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface SearchProducts_products_edges_node_thumbnail {
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

export interface SearchProducts_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SearchProducts_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchProducts_products_edges_node_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchProducts_products_edges_node_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProducts_products_edges_node_categories_edges_node;
}

export interface SearchProducts_products_edges_node_categories {
  __typename: "CategoryCountableConnection";
  edges: SearchProducts_products_edges_node_categories_edges[];
}

export interface SearchProducts_products_edges_node {
  __typename: "Product";
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SearchProducts_products_edges_node_pricing | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  hasNoPrice: boolean | null;
  rating: number;
  address: SearchProducts_products_edges_node_address | null;
  /**
   * Reviews of the products by users.
   */
  reviews: SearchProducts_products_edges_node_reviews | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SearchProducts_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: SearchProducts_products_edges_node_thumbnail2x | null;
  category: SearchProducts_products_edges_node_category | null;
  categories: SearchProducts_products_edges_node_categories;
}

export interface SearchProducts_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProducts_products_edges_node;
}

export interface SearchProducts_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface SearchProducts_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: SearchProducts_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchProducts_products_pageInfo;
}

export interface SearchProducts_attributes_edges_node_choices_edges_node {
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
}

export interface SearchProducts_attributes_edges_node_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProducts_attributes_edges_node_choices_edges_node;
}

export interface SearchProducts_attributes_edges_node_choices {
  __typename: "AttributeValueCountableConnection";
  edges: SearchProducts_attributes_edges_node_choices_edges[];
}

export interface SearchProducts_attributes_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of attribute's values.
   */
  choices: SearchProducts_attributes_edges_node_choices | null;
}

export interface SearchProducts_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProducts_attributes_edges_node;
}

export interface SearchProducts_attributes {
  __typename: "AttributeCountableConnection";
  edges: SearchProducts_attributes_edges[];
}

export interface SearchProducts {
  /**
   * List of the shop's products.
   */
  products: SearchProducts_products | null;
  /**
   * List of the shop's attributes.
   */
  attributes: SearchProducts_attributes | null;
}

export interface SearchProductsVariables {
  query: string;
  channel: string;
  attributes?: (AttributeInput | null)[] | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  after?: string | null;
  categories?: (string | null)[] | null;
  closeness?: ClosenessRangeInput | null;
  priceGte?: number | null;
  priceLte?: number | null;
}
