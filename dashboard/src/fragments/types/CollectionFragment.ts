/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionFragment
// ====================================================

export interface CollectionFragment_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionFragment_channelListings {
  __typename: "CollectionChannelListing";
  isPublished: boolean;
  publicationDate: any | null;
  channel: CollectionFragment_channelListings_channel;
}

export interface CollectionFragment {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of channels in which the collection is available.
   */
  channelListings: CollectionFragment_channelListings[] | null;
}
