/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExportProductsInput, JobStatusEnum, ExportErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductExport
// ====================================================

export interface ProductExport_exportProducts_exportFile {
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

export interface ProductExport_exportProducts_errors {
  __typename: "ExportError";
  /**
   * The error code.
   */
  code: ExportErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface ProductExport_exportProducts {
  __typename: "ExportProducts";
  /**
   * The newly created export file job which is responsible for export data.
   */
  exportFile: ProductExport_exportProducts_exportFile | null;
  errors: ProductExport_exportProducts_errors[];
}

export interface ProductExport {
  /**
   * Export products to csv file.
   */
  exportProducts: ProductExport_exportProducts | null;
}

export interface ProductExportVariables {
  input: ExportProductsInput;
}
