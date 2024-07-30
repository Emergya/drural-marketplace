/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PageRemove
// ====================================================

export interface PageRemove_pageDelete_errors {
  __typename: "PageError";
  /**
   * The error code.
   */
  code: PageErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface PageRemove_pageDelete {
  __typename: "PageDelete";
  errors: PageRemove_pageDelete_errors[];
}

export interface PageRemove {
  /**
   * Deletes a page.
   */
  pageDelete: PageRemove_pageDelete | null;
}

export interface PageRemoveVariables {
  id: string;
}
