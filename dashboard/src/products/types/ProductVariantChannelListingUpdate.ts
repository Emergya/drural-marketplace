/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductVariantChannelListingAddInput, ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductVariantChannelListingUpdate
// ====================================================

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_channelListings_price {
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

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_channelListings_costPrice {
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

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_channelListings_channel;
  price: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_channelListings_costPrice | null;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange_start_net {
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

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange_start_net;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange_stop_net {
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

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange_stop_net;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange_stop | null;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing_priceRange | null;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings_pricing | null;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of availability in channels for the product.
   */
  channelListings: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product_channelListings[] | null;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of price information in channels for the product.
   */
  channelListings: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_channelListings[] | null;
  product: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant_product;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_errors {
  __typename: "ProductChannelListingError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * List of channels IDs which causes the error.
   */
  channels: string[] | null;
}

export interface ProductVariantChannelListingUpdate_productVariantChannelListingUpdate {
  __typename: "ProductVariantChannelListingUpdate";
  /**
   * An updated product variant instance.
   */
  variant: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_variant | null;
  errors: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_errors[];
}

export interface ProductVariantChannelListingUpdate {
  /**
   * Manage product variant prices in channels.
   */
  productVariantChannelListingUpdate: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate | null;
}

export interface ProductVariantChannelListingUpdateVariables {
  id: string;
  input: ProductVariantChannelListingAddInput[];
}
