/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { JobStatusEnum, AppErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppRetryInstall
// ====================================================

export interface AppRetryInstall_appRetryInstall_appInstallation {
  __typename: "AppInstallation";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Job status.
   */
  status: JobStatusEnum;
  appName: string;
  manifestUrl: string;
}

export interface AppRetryInstall_appRetryInstall_errors {
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

export interface AppRetryInstall_appRetryInstall {
  __typename: "AppRetryInstall";
  appInstallation: AppRetryInstall_appRetryInstall_appInstallation | null;
  errors: AppRetryInstall_appRetryInstall_errors[];
}

export interface AppRetryInstall {
  /**
   * Retry failed installation of new app.
   */
  appRetryInstall: AppRetryInstall_appRetryInstall | null;
}

export interface AppRetryInstallVariables {
  id: string;
}
