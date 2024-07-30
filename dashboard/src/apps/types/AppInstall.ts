/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppInstallInput, JobStatusEnum, AppErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppInstall
// ====================================================

export interface AppInstall_appInstall_appInstallation {
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

export interface AppInstall_appInstall_errors {
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

export interface AppInstall_appInstall {
  __typename: "AppInstall";
  appInstallation: AppInstall_appInstall_appInstallation | null;
  errors: AppInstall_appInstall_errors[];
}

export interface AppInstall {
  /**
   * Install new app by using app manifest.
   */
  appInstall: AppInstall_appInstall | null;
}

export interface AppInstallVariables {
  input: AppInstallInput;
}
