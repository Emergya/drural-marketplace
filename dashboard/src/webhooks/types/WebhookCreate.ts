/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WebhookCreateInput, WebhookErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: WebhookCreate
// ====================================================

export interface WebhookCreate_webhookCreate_errors {
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

export interface WebhookCreate_webhookCreate_webhook_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface WebhookCreate_webhookCreate_webhook_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: WebhookCreate_webhookCreate_webhook_app_user | null;
}

export interface WebhookCreate_webhookCreate_webhook {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: WebhookCreate_webhookCreate_webhook_app;
}

export interface WebhookCreate_webhookCreate {
  __typename: "WebhookCreate";
  errors: WebhookCreate_webhookCreate_errors[];
  webhook: WebhookCreate_webhookCreate_webhook | null;
}

export interface WebhookCreate {
  /**
   * Creates a new webhook subscription.
   */
  webhookCreate: WebhookCreate_webhookCreate | null;
}

export interface WebhookCreateVariables {
  input: WebhookCreateInput;
}
