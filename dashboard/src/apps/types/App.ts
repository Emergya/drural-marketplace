/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppTypeEnum, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: App
// ====================================================

export interface App_app_privateMetadata {
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

export interface App_app_metadata {
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

export interface App_app_tokens {
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

export interface App_app_webhooks_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface App_app_webhooks_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: App_app_webhooks_app_user | null;
}

export interface App_app_webhooks {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: App_app_webhooks_app;
}

export interface App_app_permissions {
  __typename: "Permission";
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * Describe action(s) allowed to do by permission.
   */
  name: string;
}

export interface App_app_user_userPermissions {
  __typename: "UserPermission";
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * Describe action(s) allowed to do by permission.
   */
  name: string;
}

export interface App_app_user {
  __typename: "User";
  email: string;
  isStaff: boolean;
  /**
   * List of user's permissions.
   */
  userPermissions: (App_app_user_userPermissions | null)[] | null;
}

export interface App_app {
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
  privateMetadata: (App_app_privateMetadata | null)[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (App_app_metadata | null)[];
  /**
   * Last 4 characters of the tokens.
   */
  tokens: (App_app_tokens | null)[] | null;
  /**
   * List of webhooks assigned to this app.
   */
  webhooks: (App_app_webhooks | null)[] | null;
  /**
   * Description of this app.
   */
  aboutApp: string | null;
  /**
   * Description of the data privacy defined for this app.
   */
  dataPrivacy: string | null;
  /**
   * Url to details about the privacy policy on the app owner page.
   */
  dataPrivacyUrl: string | null;
  /**
   * List of the app's permissions.
   */
  permissions: (App_app_permissions | null)[] | null;
  user: App_app_user | null;
}

export interface App {
  /**
   * Look up an app by ID. If ID is not provided, return the currently authenticated app.
   */
  app: App_app | null;
}

export interface AppVariables {
  id: string;
}
