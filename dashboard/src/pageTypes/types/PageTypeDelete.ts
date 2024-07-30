/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PageTypeDelete
// ====================================================

export interface PageTypeDelete_pageTypeDelete_errors {
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

export interface PageTypeDelete_pageTypeDelete_pageType {
  __typename: "PageType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface PageTypeDelete_pageTypeDelete {
  __typename: "PageTypeDelete";
  errors: PageTypeDelete_pageTypeDelete_errors[];
  pageType: PageTypeDelete_pageTypeDelete_pageType | null;
}

export interface PageTypeDelete {
  /**
   * Delete a page type.
   */
  pageTypeDelete: PageTypeDelete_pageTypeDelete | null;
}

export interface PageTypeDeleteVariables {
  id: string;
}
