/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductFragment
// ====================================================

export interface ProductFragment_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductFragment_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductFragment_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductFragment_categories_edges_node;
}

export interface ProductFragment_categories {
  __typename: "CategoryCountableConnection";
  edges: ProductFragment_categories_edges[];
}

export interface ProductFragment_collections {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductFragment_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  publicName: string;
}

export interface ProductFragment_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  hasVariants: boolean;
}

export interface ProductFragment_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductFragment_channelListings_pricing_priceRange_start_net {
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

export interface ProductFragment_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductFragment_channelListings_pricing_priceRange_start_net;
}

export interface ProductFragment_channelListings_pricing_priceRange_stop_net {
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

export interface ProductFragment_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductFragment_channelListings_pricing_priceRange_stop_net;
}

export interface ProductFragment_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductFragment_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductFragment_channelListings_pricing_priceRange_stop | null;
}

export interface ProductFragment_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductFragment_channelListings_pricing_priceRange | null;
}

export interface ProductFragment_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: ProductFragment_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductFragment_channelListings_pricing | null;
}

export interface ProductFragment {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductFragment_thumbnail | null;
  categories: ProductFragment_categories;
  /**
   * List of collections for the product.
   */
  collections: (ProductFragment_collections | null)[] | null;
  company: ProductFragment_company;
  createdAt: any | null;
  updatedAt: any | null;
  productType: ProductFragment_productType;
  /**
   * List of availability in channels for the product.
   */
  channelListings: ProductFragment_channelListings[] | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
}
