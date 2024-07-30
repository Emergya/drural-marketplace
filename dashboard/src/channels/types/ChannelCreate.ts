/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelCreateInput, ChannelErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ChannelCreate
// ====================================================

export interface ChannelCreate_channelCreate_channel {
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

export interface ChannelCreate_channelCreate_errors {
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

export interface ChannelCreate_channelCreate {
  __typename: "ChannelCreate";
  channel: ChannelCreate_channelCreate_channel | null;
  errors: ChannelCreate_channelCreate_errors[];
}

export interface ChannelCreate {
  /**
   * Creates new channel.
   */
  channelCreate: ChannelCreate_channelCreate | null;
}

export interface ChannelCreateVariables {
  input: ChannelCreateInput;
}
