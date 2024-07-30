/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Channel
// ====================================================

export interface Channel_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  isActive: boolean;
  name: string;
  slug: string;
  currencyCode: string;
  /**
   * Whether a channel has associated orders.
   */
  hasOrders: boolean;
}

export interface Channel {
  /**
   * Look up a channel by ID.
   */
  channel: Channel_channel | null;
}

export interface ChannelVariables {
  id: string;
}
