/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoucherTypeEnum, DiscountValueTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: VoucherFragment
// ====================================================

export interface VoucherFragment_metadata {
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

export interface VoucherFragment_privateMetadata {
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

export interface VoucherFragment_countries {
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

export interface VoucherFragment_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VoucherFragment_channelListings_minSpent {
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

export interface VoucherFragment_channelListings {
  __typename: "VoucherChannelListing";
  /**
   * The ID of the object.
   */
  id: string;
  channel: VoucherFragment_channelListings_channel;
  discountValue: number;
  currency: string;
  minSpent: VoucherFragment_channelListings_minSpent | null;
}

export interface VoucherFragment {
  __typename: "Voucher";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (VoucherFragment_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (VoucherFragment_privateMetadata | null)[];
  /**
   * The ID of the object.
   */
  id: string;
  code: string;
  startDate: any;
  endDate: any | null;
  usageLimit: number | null;
  /**
   * Determines a type of voucher.
   */
  type: VoucherTypeEnum;
  /**
   * Determines a type of discount for voucher - value or percentage
   */
  discountValueType: DiscountValueTypeEnum;
  /**
   * List of countries available for the shipping voucher.
   */
  countries: (VoucherFragment_countries | null)[] | null;
  minCheckoutItemsQuantity: number | null;
  /**
   * List of availability in channels for the voucher.
   */
  channelListings: VoucherFragment_channelListings[] | null;
}
