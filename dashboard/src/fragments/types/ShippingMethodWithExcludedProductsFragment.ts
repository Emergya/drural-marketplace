/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostalCodeRuleInclusionTypeEnum, WeightUnitsEnum, ShippingMethodTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ShippingMethodWithExcludedProductsFragment
// ====================================================

export interface ShippingMethodWithExcludedProductsFragment_postalCodeRules {
  __typename: "ShippingMethodPostalCodeRule";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Inclusion type of the postal code rule.
   */
  inclusionType: PostalCodeRuleInclusionTypeEnum | null;
  /**
   * Start address range.
   */
  start: string | null;
  /**
   * End address range.
   */
  end: string | null;
}

export interface ShippingMethodWithExcludedProductsFragment_metadata {
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

export interface ShippingMethodWithExcludedProductsFragment_privateMetadata {
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

export interface ShippingMethodWithExcludedProductsFragment_minimumOrderWeight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: WeightUnitsEnum;
  /**
   * Weight value.
   */
  value: number;
}

export interface ShippingMethodWithExcludedProductsFragment_maximumOrderWeight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: WeightUnitsEnum;
  /**
   * Weight value.
   */
  value: number;
}

export interface ShippingMethodWithExcludedProductsFragment_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ShippingMethodWithExcludedProductsFragment_channelListings_price {
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

export interface ShippingMethodWithExcludedProductsFragment_channelListings_minimumOrderPrice {
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

export interface ShippingMethodWithExcludedProductsFragment_channelListings_maximumOrderPrice {
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

export interface ShippingMethodWithExcludedProductsFragment_channelListings {
  __typename: "ShippingMethodChannelListing";
  /**
   * The ID of the object.
   */
  id: string;
  channel: ShippingMethodWithExcludedProductsFragment_channelListings_channel;
  price: ShippingMethodWithExcludedProductsFragment_channelListings_price | null;
  minimumOrderPrice: ShippingMethodWithExcludedProductsFragment_channelListings_minimumOrderPrice | null;
  maximumOrderPrice: ShippingMethodWithExcludedProductsFragment_channelListings_maximumOrderPrice | null;
}

export interface ShippingMethodWithExcludedProductsFragment_excludedProducts_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface ShippingMethodWithExcludedProductsFragment_excludedProducts_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ShippingMethodWithExcludedProductsFragment_excludedProducts_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ShippingMethodWithExcludedProductsFragment_excludedProducts_edges_node_thumbnail | null;
}

export interface ShippingMethodWithExcludedProductsFragment_excludedProducts_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShippingMethodWithExcludedProductsFragment_excludedProducts_edges_node;
}

export interface ShippingMethodWithExcludedProductsFragment_excludedProducts {
  __typename: "ProductCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ShippingMethodWithExcludedProductsFragment_excludedProducts_pageInfo;
  edges: ShippingMethodWithExcludedProductsFragment_excludedProducts_edges[];
}

export interface ShippingMethodWithExcludedProductsFragment {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Postal code ranges rule of exclusion or inclusion of the shipping method.
   */
  postalCodeRules: (ShippingMethodWithExcludedProductsFragment_postalCodeRules | null)[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShippingMethodWithExcludedProductsFragment_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (ShippingMethodWithExcludedProductsFragment_privateMetadata | null)[];
  minimumOrderWeight: ShippingMethodWithExcludedProductsFragment_minimumOrderWeight | null;
  maximumOrderWeight: ShippingMethodWithExcludedProductsFragment_maximumOrderWeight | null;
  minimumDeliveryDays: number | null;
  maximumDeliveryDays: number | null;
  name: string;
  description: any | null;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
  /**
   * List of channels available for the method.
   */
  channelListings: ShippingMethodWithExcludedProductsFragment_channelListings[] | null;
  /**
   * List of excluded products for the shipping method.
   */
  excludedProducts: ShippingMethodWithExcludedProductsFragment_excludedProducts | null;
}
