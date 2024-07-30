/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UploadErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: FileUpload
// ====================================================

export interface FileUpload_fileUpload_uploadedFile {
  __typename: "File";
  /**
   * The URL of the file.
   */
  url: string;
  /**
   * Content type of the file.
   */
  contentType: string | null;
}

export interface FileUpload_fileUpload_errors {
  __typename: "UploadError";
  /**
   * The error code.
   */
  code: UploadErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface FileUpload_fileUpload {
  __typename: "FileUpload";
  uploadedFile: FileUpload_fileUpload_uploadedFile | null;
  errors: FileUpload_fileUpload_errors[];
}

export interface FileUpload {
  /**
   * Upload a file. This mutation must be sent as a `multipart` request. More
   * detailed specs of the upload format can be found here:
   * https: // github.com/jaydenseric/graphql-multipart-request-spec
   */
  fileUpload: FileUpload_fileUpload | null;
}

export interface FileUploadVariables {
  file: any;
}
