/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: WebhookFragment
// ====================================================

export interface WebhookFragment_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface WebhookFragment_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: WebhookFragment_app_user | null;
}

export interface WebhookFragment {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: WebhookFragment_app;
}
