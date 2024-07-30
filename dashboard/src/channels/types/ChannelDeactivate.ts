/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ChannelDeactivate
// ====================================================

export interface ChannelDeactivate_channelDeactivate_channel {
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

export interface ChannelDeactivate_channelDeactivate_errors {
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

export interface ChannelDeactivate_channelDeactivate {
  __typename: "ChannelDeactivate";
  /**
   * Deactivated channel.
   */
  channel: ChannelDeactivate_channelDeactivate_channel | null;
  errors: ChannelDeactivate_channelDeactivate_errors[];
}

export interface ChannelDeactivate {
  /**
   * Deactivate a channel.
   */
  channelDeactivate: ChannelDeactivate_channelDeactivate | null;
}

export interface ChannelDeactivateVariables {
  id: string;
}
