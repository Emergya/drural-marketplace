/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { JobStatusEnum, AppErrorCode, PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AppDeleteFailedInstallation
// ====================================================

export interface AppDeleteFailedInstallation_appDeleteFailedInstallation_appInstallation {
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
  /**
   * Job message.
   */
  message: string | null;
}

export interface AppDeleteFailedInstallation_appDeleteFailedInstallation_errors {
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

export interface AppDeleteFailedInstallation_appDeleteFailedInstallation {
  __typename: "AppDeleteFailedInstallation";
  appInstallation: AppDeleteFailedInstallation_appDeleteFailedInstallation_appInstallation | null;
  errors: AppDeleteFailedInstallation_appDeleteFailedInstallation_errors[];
}

export interface AppDeleteFailedInstallation {
  /**
   * Delete failed installation.
   */
  appDeleteFailedInstallation: AppDeleteFailedInstallation_appDeleteFailedInstallation | null;
}

export interface AppDeleteFailedInstallationVariables {
  id: string;
}
