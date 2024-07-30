/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductChannelListingUpdateInput, ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductChannelListingUpdate
// ====================================================

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange_start_net {
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

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange_start_net;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange_stop_net {
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

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange_stop_net;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange_stop | null;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing_priceRange | null;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings_pricing | null;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_variants_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_variants_channelListings_price {
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

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_variants_channelListings_costPrice {
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

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_variants_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: ProductChannelListingUpdate_productChannelListingUpdate_product_variants_channelListings_channel;
  price: ProductChannelListingUpdate_productChannelListingUpdate_product_variants_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: ProductChannelListingUpdate_productChannelListingUpdate_product_variants_channelListings_costPrice | null;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of price information in channels for the product.
   */
  channelListings: ProductChannelListingUpdate_productChannelListingUpdate_product_variants_channelListings[] | null;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of availability in channels for the product.
   */
  channelListings: ProductChannelListingUpdate_productChannelListingUpdate_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductChannelListingUpdate_productChannelListingUpdate_product_variants | null)[] | null;
}

export interface ProductChannelListingUpdate_productChannelListingUpdate_errors {
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

export interface ProductChannelListingUpdate_productChannelListingUpdate {
  __typename: "ProductChannelListingUpdate";
  /**
   * An updated product instance.
   */
  product: ProductChannelListingUpdate_productChannelListingUpdate_product | null;
  errors: ProductChannelListingUpdate_productChannelListingUpdate_errors[];
}

export interface ProductChannelListingUpdate {
  /**
   * Manage product's availability in channels.
   */
  productChannelListingUpdate: ProductChannelListingUpdate_productChannelListingUpdate | null;
}

export interface ProductChannelListingUpdateVariables {
  id: string;
  input: ProductChannelListingUpdateInput;
}
