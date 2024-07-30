/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: CollectionErrorFragment
// ====================================================

export interface CollectionErrorFragment {
  __typename: "CollectionError";
  /**
   * The error code.
   */
  code: CollectionErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
