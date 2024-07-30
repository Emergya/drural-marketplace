/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ChannelErrorFragment
// ====================================================

export interface ChannelErrorFragment {
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
