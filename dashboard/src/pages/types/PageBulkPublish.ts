/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PageBulkPublish
// ====================================================

export interface PageBulkPublish_pageBulkPublish_errors {
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

export interface PageBulkPublish_pageBulkPublish {
  __typename: "PageBulkPublish";
  errors: PageBulkPublish_pageBulkPublish_errors[];
}

export interface PageBulkPublish {
  /**
   * Publish pages.
   */
  pageBulkPublish: PageBulkPublish_pageBulkPublish | null;
}

export interface PageBulkPublishVariables {
  ids: (string | null)[];
  isPublished: boolean;
}
