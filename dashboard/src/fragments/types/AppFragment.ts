/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: AppFragment
// ====================================================

export interface AppFragment_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface AppFragment_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface AppFragment_tokens {
  __typename: "AppToken";
  /**
   * Last 4 characters of the token.
   */
  authToken: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the authenticated token.
   */
  name: string | null;
}

export interface AppFragment_webhooks_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface AppFragment_webhooks_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: AppFragment_webhooks_app_user | null;
}

export interface AppFragment_webhooks {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: AppFragment_webhooks_app;
}

export interface AppFragment {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  /**
   * The date and time when the app was created.
   */
  created: any | null;
  /**
   * Determine if app will be set active or not.
   */
  isActive: boolean | null;
  /**
   * Type of the app.
   */
  type: AppTypeEnum | null;
  /**
   * Homepage of the app.
   */
  homepageUrl: string | null;
  /**
   * Url to iframe with the app.
   */
  appUrl: string | null;
  /**
   * Url to iframe with the configuration for the app.
   */
  configurationUrl: string | null;
  /**
   * Support page for the app.
   */
  supportUrl: string | null;
  /**
   * Version number of the app.
   */
  version: string | null;
  /**
   * JWT token used to authenticate by thridparty app.
   */
  accessToken: string | null;
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (AppFragment_privateMetadata | null)[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (AppFragment_metadata | null)[];
  /**
   * Last 4 characters of the tokens.
   */
  tokens: (AppFragment_tokens | null)[] | null;
  /**
   * List of webhooks assigned to this app.
   */
  webhooks: (AppFragment_webhooks | null)[] | null;
}
