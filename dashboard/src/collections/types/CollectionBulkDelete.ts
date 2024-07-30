/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CollectionBulkDelete
// ====================================================

export interface CollectionBulkDelete_collectionBulkDelete_errors {
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

export interface CollectionBulkDelete_collectionBulkDelete {
  __typename: "CollectionBulkDelete";
  errors: CollectionBulkDelete_collectionBulkDelete_errors[];
}

export interface CollectionBulkDelete {
  /**
   * Deletes collections.
   */
  collectionBulkDelete: CollectionBulkDelete_collectionBulkDelete | null;
}

export interface CollectionBulkDeleteVariables {
  ids: (string | null)[];
}
