/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WebhookErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: WebhookDelete
// ====================================================

export interface WebhookDelete_webhookDelete_errors {
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

export interface WebhookDelete_webhookDelete {
  __typename: "WebhookDelete";
  errors: WebhookDelete_webhookDelete_errors[];
}

export interface WebhookDelete {
  /**
   * Deletes a webhook subscription.
   */
  webhookDelete: WebhookDelete_webhookDelete | null;
}

export interface WebhookDeleteVariables {
  id: string;
}
