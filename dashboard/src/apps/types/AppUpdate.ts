/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppInput, AppTypeEnum, PermissionEnum, AppErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppUpdate
// ====================================================

export interface AppUpdate_appUpdate_app_privateMetadata {
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

export interface AppUpdate_appUpdate_app_metadata {
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

export interface AppUpdate_appUpdate_app_tokens {
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

export interface AppUpdate_appUpdate_app_webhooks_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface AppUpdate_appUpdate_app_webhooks_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: AppUpdate_appUpdate_app_webhooks_app_user | null;
}

export interface AppUpdate_appUpdate_app_webhooks {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: AppUpdate_appUpdate_app_webhooks_app;
}

export interface AppUpdate_appUpdate_app_permissions {
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

export interface AppUpdate_appUpdate_app {
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
  privateMetadata: (AppUpdate_appUpdate_app_privateMetadata | null)[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (AppUpdate_appUpdate_app_metadata | null)[];
  /**
   * Last 4 characters of the tokens.
   */
  tokens: (AppUpdate_appUpdate_app_tokens | null)[] | null;
  /**
   * List of webhooks assigned to this app.
   */
  webhooks: (AppUpdate_appUpdate_app_webhooks | null)[] | null;
  /**
   * List of the app's permissions.
   */
  permissions: (AppUpdate_appUpdate_app_permissions | null)[] | null;
}

export interface AppUpdate_appUpdate_errors {
  __typename: "AppError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: AppErrorCode;
  /**
   * List of permissions which causes the error.
   */
  permissions: PermissionEnum[] | null;
}

export interface AppUpdate_appUpdate {
  __typename: "AppUpdate";
  app: AppUpdate_appUpdate_app | null;
  errors: AppUpdate_appUpdate_errors[];
}

export interface AppUpdate {
  /**
   * Updates an existing app.
   */
  appUpdate: AppUpdate_appUpdate | null;
}

export interface AppUpdateVariables {
  id: string;
  input: AppInput;
}
