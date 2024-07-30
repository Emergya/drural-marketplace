/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookableResourceErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BookableResourceBulkDelete
// ====================================================

export interface BookableResourceBulkDelete_bookableResourceBulkDelete_errors {
  __typename: "BookableResourceError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: BookableResourceErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface BookableResourceBulkDelete_bookableResourceBulkDelete {
  __typename: "BookableResourceBulkDelete";
  errors: BookableResourceBulkDelete_bookableResourceBulkDelete_errors[];
}

export interface BookableResourceBulkDelete {
  /**
   * Deletes products.
   */
  bookableResourceBulkDelete: BookableResourceBulkDelete_bookableResourceBulkDelete | null;
}

export interface BookableResourceBulkDeleteVariables {
  ids: string[];
}
