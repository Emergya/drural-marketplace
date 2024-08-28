/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterInput, ProductOrder } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetCompanyProducts
// ====================================================

export interface GetCompanyProducts_company_products_edges_node_thumbnail {
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

export interface GetCompanyProducts_company_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRange_start_gross {
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

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRange_start_net {
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

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: GetCompanyProducts_company_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: GetCompanyProducts_company_products_edges_node_pricing_priceRange_start_net;
}

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRange_stop_gross {
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

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRange_stop_net {
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

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: GetCompanyProducts_company_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: GetCompanyProducts_company_products_edges_node_pricing_priceRange_stop_net;
}

export interface GetCompanyProducts_company_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: GetCompanyProducts_company_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: GetCompanyProducts_company_products_edges_node_pricing_priceRange_stop | null;
}

export interface GetCompanyProducts_company_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: GetCompanyProducts_company_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: GetCompanyProducts_company_products_edges_node_pricing_priceRange | null;
}

export interface GetCompanyProducts_company_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  hasNoPrice: boolean | null;
  rating: number;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: GetCompanyProducts_company_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: GetCompanyProducts_company_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: GetCompanyProducts_company_products_edges_node_pricing | null;
}

export interface GetCompanyProducts_company_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCompanyProducts_company_products_edges_node;
}

export interface GetCompanyProducts_company_products_pageInfo {
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

export interface GetCompanyProducts_company_products {
  __typename: "ProductCountableConnection";
  edges: GetCompanyProducts_company_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetCompanyProducts_company_products_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GetCompanyProducts_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of the shop's products.
   */
  products: GetCompanyProducts_company_products | null;
}

export interface GetCompanyProducts {
  /**
   * Look up a company by ID
   */
  company: GetCompanyProducts_company | null;
}

export interface GetCompanyProductsVariables {
  id: string;
  channel?: string | null;
  first: number;
  after?: string | null;
  filter?: ProductFilterInput | null;
  sortBy?: ProductOrder | null;
}
