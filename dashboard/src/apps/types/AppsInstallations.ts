/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { JobStatusEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: AppsInstallations
// ====================================================

export interface AppsInstallations_appsInstallations {
  __typename: "AppInstallation";
  /**
   * Job status.
   */
  status: JobStatusEnum;
  /**
   * Job message.
   */
  message: string | null;
  appName: string;
  manifestUrl: string;
  /**
   * The ID of the object.
   */
  id: string;
}

export interface AppsInstallations {
  /**
   * List of all apps installations
   */
  appsInstallations: AppsInstallations_appsInstallations[];
}
