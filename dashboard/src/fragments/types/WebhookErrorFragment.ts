/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WebhookErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: WebhookErrorFragment
// ====================================================

export interface WebhookErrorFragment {
  __typename: "WebhookError";
  /**
   * The error code.
   */
  code: WebhookErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
