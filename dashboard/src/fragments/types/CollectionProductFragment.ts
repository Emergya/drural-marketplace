/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionProductFragment
// ====================================================

export interface CollectionProductFragment_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionProductFragment_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CollectionProductFragment_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface CollectionProductFragment_channelListings {
  __typename: "ProductChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
  channel: CollectionProductFragment_channelListings_channel;
}

export interface CollectionProductFragment {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  productType: CollectionProductFragment_productType;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CollectionProductFragment_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: CollectionProductFragment_channelListings[] | null;
}
