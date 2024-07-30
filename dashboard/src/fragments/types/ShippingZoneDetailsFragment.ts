/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostalCodeRuleInclusionTypeEnum, WeightUnitsEnum, ShippingMethodTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ShippingZoneDetailsFragment
// ====================================================

export interface ShippingZoneDetailsFragment_metadata {
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

export interface ShippingZoneDetailsFragment_privateMetadata {
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

export interface ShippingZoneDetailsFragment_countries {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ShippingZoneDetailsFragment_shippingMethods_postalCodeRules {
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

export interface ShippingZoneDetailsFragment_shippingMethods_metadata {
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

export interface ShippingZoneDetailsFragment_shippingMethods_privateMetadata {
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

export interface ShippingZoneDetailsFragment_shippingMethods_minimumOrderWeight {
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

export interface ShippingZoneDetailsFragment_shippingMethods_maximumOrderWeight {
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

export interface ShippingZoneDetailsFragment_shippingMethods_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ShippingZoneDetailsFragment_shippingMethods_channelListings_price {
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

export interface ShippingZoneDetailsFragment_shippingMethods_channelListings_minimumOrderPrice {
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

export interface ShippingZoneDetailsFragment_shippingMethods_channelListings_maximumOrderPrice {
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

export interface ShippingZoneDetailsFragment_shippingMethods_channelListings {
  __typename: "ShippingMethodChannelListing";
  /**
   * The ID of the object.
   */
  id: string;
  channel: ShippingZoneDetailsFragment_shippingMethods_channelListings_channel;
  price: ShippingZoneDetailsFragment_shippingMethods_channelListings_price | null;
  minimumOrderPrice: ShippingZoneDetailsFragment_shippingMethods_channelListings_minimumOrderPrice | null;
  maximumOrderPrice: ShippingZoneDetailsFragment_shippingMethods_channelListings_maximumOrderPrice | null;
}

export interface ShippingZoneDetailsFragment_shippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Postal code ranges rule of exclusion or inclusion of the shipping method.
   */
  postalCodeRules: (ShippingZoneDetailsFragment_shippingMethods_postalCodeRules | null)[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShippingZoneDetailsFragment_shippingMethods_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (ShippingZoneDetailsFragment_shippingMethods_privateMetadata | null)[];
  minimumOrderWeight: ShippingZoneDetailsFragment_shippingMethods_minimumOrderWeight | null;
  maximumOrderWeight: ShippingZoneDetailsFragment_shippingMethods_maximumOrderWeight | null;
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
  channelListings: ShippingZoneDetailsFragment_shippingMethods_channelListings[] | null;
}

export interface ShippingZoneDetailsFragment_warehouses {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ShippingZoneDetailsFragment {
  __typename: "ShippingZone";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShippingZoneDetailsFragment_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (ShippingZoneDetailsFragment_privateMetadata | null)[];
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of countries available for the method.
   */
  countries: (ShippingZoneDetailsFragment_countries | null)[] | null;
  name: string;
  /**
   * Description of a shipping zone.
   */
  description: string | null;
  default: boolean;
  /**
   * List of shipping methods available for orders shipped to countries within this shipping zone.
   */
  shippingMethods: (ShippingZoneDetailsFragment_shippingMethods | null)[] | null;
  /**
   * List of warehouses for shipping zone.
   */
  warehouses: ShippingZoneDetailsFragment_warehouses[];
}
