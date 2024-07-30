/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MetadataErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: MetadataErrorFragment
// ====================================================

export interface MetadataErrorFragment {
  __typename: "MetadataError";
  /**
   * The error code.
   */
  code: MetadataErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
