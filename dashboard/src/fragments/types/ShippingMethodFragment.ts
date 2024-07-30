/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostalCodeRuleInclusionTypeEnum, WeightUnitsEnum, ShippingMethodTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ShippingMethodFragment
// ====================================================

export interface ShippingMethodFragment_postalCodeRules {
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

export interface ShippingMethodFragment_metadata {
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

export interface ShippingMethodFragment_privateMetadata {
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

export interface ShippingMethodFragment_minimumOrderWeight {
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

export interface ShippingMethodFragment_maximumOrderWeight {
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

export interface ShippingMethodFragment_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ShippingMethodFragment_channelListings_price {
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

export interface ShippingMethodFragment_channelListings_minimumOrderPrice {
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

export interface ShippingMethodFragment_channelListings_maximumOrderPrice {
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

export interface ShippingMethodFragment_channelListings {
  __typename: "ShippingMethodChannelListing";
  /**
   * The ID of the object.
   */
  id: string;
  channel: ShippingMethodFragment_channelListings_channel;
  price: ShippingMethodFragment_channelListings_price | null;
  minimumOrderPrice: ShippingMethodFragment_channelListings_minimumOrderPrice | null;
  maximumOrderPrice: ShippingMethodFragment_channelListings_maximumOrderPrice | null;
}

export interface ShippingMethodFragment {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Postal code ranges rule of exclusion or inclusion of the shipping method.
   */
  postalCodeRules: (ShippingMethodFragment_postalCodeRules | null)[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShippingMethodFragment_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (ShippingMethodFragment_privateMetadata | null)[];
  minimumOrderWeight: ShippingMethodFragment_minimumOrderWeight | null;
  maximumOrderWeight: ShippingMethodFragment_maximumOrderWeight | null;
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
  channelListings: ShippingMethodFragment_channelListings[] | null;
}
