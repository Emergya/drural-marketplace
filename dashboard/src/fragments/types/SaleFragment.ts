/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaleType } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: SaleFragment
// ====================================================

export interface SaleFragment_metadata {
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

export interface SaleFragment_privateMetadata {
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

export interface SaleFragment_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SaleFragment_channelListings {
  __typename: "SaleChannelListing";
  /**
   * The ID of the object.
   */
  id: string;
  channel: SaleFragment_channelListings_channel;
  discountValue: number;
  currency: string;
}

export interface SaleFragment {
  __typename: "Sale";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SaleFragment_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (SaleFragment_privateMetadata | null)[];
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  type: SaleType;
  startDate: any;
  endDate: any | null;
  /**
   * List of channels available for the sale.
   */
  channelListings: SaleFragment_channelListings[] | null;
}
