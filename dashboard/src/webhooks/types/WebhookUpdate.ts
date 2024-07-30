/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WebhookUpdateInput, WebhookErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: WebhookUpdate
// ====================================================

export interface WebhookUpdate_webhookUpdate_errors {
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

export interface WebhookUpdate_webhookUpdate_webhook_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface WebhookUpdate_webhookUpdate_webhook_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: WebhookUpdate_webhookUpdate_webhook_app_user | null;
}

export interface WebhookUpdate_webhookUpdate_webhook {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: WebhookUpdate_webhookUpdate_webhook_app;
}

export interface WebhookUpdate_webhookUpdate {
  __typename: "WebhookUpdate";
  errors: WebhookUpdate_webhookUpdate_errors[];
  webhook: WebhookUpdate_webhookUpdate_webhook | null;
}

export interface WebhookUpdate {
  /**
   * Updates a webhook subscription.
   */
  webhookUpdate: WebhookUpdate_webhookUpdate | null;
}

export interface WebhookUpdateVariables {
  id: string;
  input: WebhookUpdateInput;
}
