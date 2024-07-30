/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PopularServicesQuery
// ====================================================

export interface PopularServicesQuery_products_edges_node_thumbnail {
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

export interface PopularServicesQuery_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface PopularServicesQuery_products_edges_node_pricing_priceRange_start_gross {
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

export interface PopularServicesQuery_products_edges_node_pricing_priceRange_start_net {
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

export interface PopularServicesQuery_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: PopularServicesQuery_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: PopularServicesQuery_products_edges_node_pricing_priceRange_start_net;
}

export interface PopularServicesQuery_products_edges_node_pricing_priceRange_stop_gross {
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

export interface PopularServicesQuery_products_edges_node_pricing_priceRange_stop_net {
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

export interface PopularServicesQuery_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: PopularServicesQuery_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: PopularServicesQuery_products_edges_node_pricing_priceRange_stop_net;
}

export interface PopularServicesQuery_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: PopularServicesQuery_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: PopularServicesQuery_products_edges_node_pricing_priceRange_stop | null;
}

export interface PopularServicesQuery_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: PopularServicesQuery_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: PopularServicesQuery_products_edges_node_pricing_priceRange | null;
}

export interface PopularServicesQuery_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface PopularServicesQuery_products_edges_node_reviews {
  __typename: "ProductRatingCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface PopularServicesQuery_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  hasNoPrice: boolean;
  rating: number;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: PopularServicesQuery_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: PopularServicesQuery_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: PopularServicesQuery_products_edges_node_pricing | null;
  category: PopularServicesQuery_products_edges_node_category | null;
  /**
   * Reviews of the products by users.
   */
  reviews: PopularServicesQuery_products_edges_node_reviews | null;
}

export interface PopularServicesQuery_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: PopularServicesQuery_products_edges_node;
}

export interface PopularServicesQuery_products {
  __typename: "ProductCountableConnection";
  edges: PopularServicesQuery_products_edges[];
}

export interface PopularServicesQuery {
  /**
   * List of the shop's products.
   */
  products: PopularServicesQuery_products | null;
}

export interface PopularServicesQueryVariables {
  channel: string;
}
