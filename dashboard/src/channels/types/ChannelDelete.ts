/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelDeleteInput, ChannelErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ChannelDelete
// ====================================================

export interface ChannelDelete_channelDelete_errors {
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

export interface ChannelDelete_channelDelete {
  __typename: "ChannelDelete";
  errors: ChannelDelete_channelDelete_errors[];
}

export interface ChannelDelete {
  /**
   * Delete a channel. Orders associated with the deleted channel will be moved to
   * the target channel. Checkouts, product availability, and pricing will be removed.
   */
  channelDelete: ChannelDelete_channelDelete | null;
}

export interface ChannelDeleteVariables {
  id: string;
  input?: ChannelDeleteInput | null;
}
