/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum, AppErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppFetch
// ====================================================

export interface AppFetch_appFetchManifest_manifest_permissions {
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

export interface AppFetch_appFetchManifest_manifest {
  __typename: "Manifest";
  identifier: string;
  version: string;
  about: string | null;
  name: string;
  appUrl: string | null;
  configurationUrl: string | null;
  tokenTargetUrl: string | null;
  dataPrivacy: string | null;
  dataPrivacyUrl: string | null;
  homepageUrl: string | null;
  supportUrl: string | null;
  permissions: (AppFetch_appFetchManifest_manifest_permissions | null)[] | null;
}

export interface AppFetch_appFetchManifest_errors {
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

export interface AppFetch_appFetchManifest {
  __typename: "AppFetchManifest";
  manifest: AppFetch_appFetchManifest_manifest | null;
  errors: AppFetch_appFetchManifest_errors[];
}

export interface AppFetch {
  /**
   * Fetch and validate manifest.
   */
  appFetchManifest: AppFetch_appFetchManifest | null;
}

export interface AppFetchVariables {
  manifestUrl: string;
}
