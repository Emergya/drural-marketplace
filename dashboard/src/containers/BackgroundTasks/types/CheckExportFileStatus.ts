/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { JobStatusEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: CheckExportFileStatus
// ====================================================

export interface CheckExportFileStatus_exportFile {
  __typename: "ExportFile";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Job status.
   */
  status: JobStatusEnum;
}

export interface CheckExportFileStatus {
  /**
   * Look up a export file by ID.
   */
  exportFile: CheckExportFileStatus_exportFile | null;
}

export interface CheckExportFileStatusVariables {
  id: string;
}
