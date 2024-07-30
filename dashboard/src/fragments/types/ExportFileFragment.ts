/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { JobStatusEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ExportFileFragment
// ====================================================

export interface ExportFileFragment {
  __typename: "ExportFile";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Job status.
   */
  status: JobStatusEnum;
  /**
   * The URL of field to download.
   */
  url: string | null;
}
