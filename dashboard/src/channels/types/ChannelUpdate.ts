/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelUpdateInput, ChannelErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ChannelUpdate
// ====================================================

export interface ChannelUpdate_channelUpdate_channel {
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

export interface ChannelUpdate_channelUpdate_errors {
  __typename: "ChannelError";
  /**
   * The error code.
   */
  code: ChannelErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ChannelUpdate_channelUpdate {
  __typename: "ChannelUpdate";
  channel: ChannelUpdate_channelUpdate_channel | null;
  errors: ChannelUpdate_channelUpdate_errors[];
}

export interface ChannelUpdate {
  /**
   * Update a channel.
   */
  channelUpdate: ChannelUpdate_channelUpdate | null;
}

export interface ChannelUpdateVariables {
  id: string;
  input: ChannelUpdateInput;
}
