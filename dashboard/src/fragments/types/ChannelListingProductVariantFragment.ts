/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelListingProductVariantFragment
// ====================================================

export interface ChannelListingProductVariantFragment_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ChannelListingProductVariantFragment_price {
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

export interface ChannelListingProductVariantFragment_costPrice {
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

export interface ChannelListingProductVariantFragment {
  __typename: "ProductVariantChannelListing";
  channel: ChannelListingProductVariantFragment_channel;
  price: ChannelListingProductVariantFragment_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: ChannelListingProductVariantFragment_costPrice | null;
}
