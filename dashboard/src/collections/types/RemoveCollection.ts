/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveCollection
// ====================================================

export interface RemoveCollection_collectionDelete_errors {
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

export interface RemoveCollection_collectionDelete {
  __typename: "CollectionDelete";
  errors: RemoveCollection_collectionDelete_errors[];
}

export interface RemoveCollection {
  /**
   * Deletes a collection.
   */
  collectionDelete: RemoveCollection_collectionDelete | null;
}

export interface RemoveCollectionVariables {
  id: string;
}
