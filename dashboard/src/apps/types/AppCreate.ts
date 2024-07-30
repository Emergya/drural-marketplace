/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppInput, AppTypeEnum, AppErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppCreate
// ====================================================

export interface AppCreate_appCreate_app_privateMetadata {
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

export interface AppCreate_appCreate_app_metadata {
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

export interface AppCreate_appCreate_app_tokens {
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

export interface AppCreate_appCreate_app_webhooks_app_user {
  __typename: "User";
  isStaff: boolean;
}

export interface AppCreate_appCreate_app_webhooks_app {
  __typename: "App";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of the app.
   */
  name: string | null;
  user: AppCreate_appCreate_app_webhooks_app_user | null;
}

export interface AppCreate_appCreate_app_webhooks {
  __typename: "Webhook";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isActive: boolean;
  app: AppCreate_appCreate_app_webhooks_app;
}

export interface AppCreate_appCreate_app {
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
  privateMetadata: (AppCreate_appCreate_app_privateMetadata | null)[];
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (AppCreate_appCreate_app_metadata | null)[];
  /**
   * Last 4 characters of the tokens.
   */
  tokens: (AppCreate_appCreate_app_tokens | null)[] | null;
  /**
   * List of webhooks assigned to this app.
   */
  webhooks: (AppCreate_appCreate_app_webhooks | null)[] | null;
}

export interface AppCreate_appCreate_errors {
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

export interface AppCreate_appCreate {
  __typename: "AppCreate";
  /**
   * The newly created authentication token.
   */
  authToken: string | null;
  app: AppCreate_appCreate_app | null;
  errors: AppCreate_appCreate_errors[];
}

export interface AppCreate {
  /**
   * Creates a new app.
   */
  appCreate: AppCreate_appCreate | null;
}

export interface AppCreateVariables {
  input: AppInput;
}
