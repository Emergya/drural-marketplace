/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: WebhooksDetailsFragment
// ====================================================

export interface WebhooksDetailsFragment_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface WebhooksDetailsFragment_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: WebhooksDetailsFragment_app_user | null;
}

export interface WebhooksDetailsFragment {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: WebhooksDetailsFragment_app;
}
