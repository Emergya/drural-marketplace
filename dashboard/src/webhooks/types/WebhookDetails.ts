/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WebhookEventTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: WebhookDetails
// ====================================================

export interface WebhookDetails_webhook_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface WebhookDetails_webhook_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: WebhookDetails_webhook_app_user | null;
}

export interface WebhookDetails_webhook_events {
  __typename: "WebhookEvent";
  /**
   * Internal name of the event type.
   */
  eventType: WebhookEventTypeEnum;
}

export interface WebhookDetails_webhook {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: WebhookDetails_webhook_app;
  /**
   * List of webhook events.
   */
  events: WebhookDetails_webhook_events[];
  secretKey: string | null;
  targetUrl: string;
}

export interface WebhookDetails {
  /**
   * Look up a webhook by ID.
   */
  webhook: WebhookDetails_webhook | null;
}

export interface WebhookDetailsVariables {
  id: string;
}
