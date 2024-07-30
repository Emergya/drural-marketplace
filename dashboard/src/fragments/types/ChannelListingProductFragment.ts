/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelListingProductFragment
// ====================================================

export interface ChannelListingProductFragment_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ChannelListingProductFragment_pricing_priceRange_start_net {
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

export interface ChannelListingProductFragment_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ChannelListingProductFragment_pricing_priceRange_start_net;
}

export interface ChannelListingProductFragment_pricing_priceRange_stop_net {
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

export interface ChannelListingProductFragment_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ChannelListingProductFragment_pricing_priceRange_stop_net;
}

export interface ChannelListingProductFragment_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ChannelListingProductFragment_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ChannelListingProductFragment_pricing_priceRange_stop | null;
}

export interface ChannelListingProductFragment_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ChannelListingProductFragment_pricing_priceRange | null;
}

export interface ChannelListingProductFragment {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: ChannelListingProductFragment_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ChannelListingProductFragment_pricing | null;
}
