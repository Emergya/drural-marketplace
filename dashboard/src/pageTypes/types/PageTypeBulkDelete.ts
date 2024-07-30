/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PageTypeBulkDelete
// ====================================================

export interface PageTypeBulkDelete_pageTypeBulkDelete_errors {
  __typename: "PageError";
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

export interface PageTypeBulkDelete_pageTypeBulkDelete {
  __typename: "PageTypeBulkDelete";
  errors: PageTypeBulkDelete_pageTypeBulkDelete_errors[];
}

export interface PageTypeBulkDelete {
  /**
   * Delete page types.
   */
  pageTypeBulkDelete: PageTypeBulkDelete_pageTypeBulkDelete | null;
}

export interface PageTypeBulkDeleteVariables {
  ids: string[];
}
