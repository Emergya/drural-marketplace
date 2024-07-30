/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ChannelActivate
// ====================================================

export interface ChannelActivate_channelActivate_channel {
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

export interface ChannelActivate_channelActivate_errors {
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

export interface ChannelActivate_channelActivate {
  __typename: "ChannelActivate";
  /**
   * Activated channel.
   */
  channel: ChannelActivate_channelActivate_channel | null;
  errors: ChannelActivate_channelActivate_errors[];
}

export interface ChannelActivate {
  /**
   * Activate a channel.
   */
  channelActivate: ChannelActivate_channelActivate | null;
}

export interface ChannelActivateVariables {
  id: string;
}
