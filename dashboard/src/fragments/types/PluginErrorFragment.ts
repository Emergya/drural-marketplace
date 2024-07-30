/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PluginErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: PluginErrorFragment
// ====================================================

export interface PluginErrorFragment {
  __typename: "PluginError";
  /**
   * The error code.
   */
  code: PluginErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
