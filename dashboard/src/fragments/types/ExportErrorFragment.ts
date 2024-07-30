/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExportErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ExportErrorFragment
// ====================================================

export interface ExportErrorFragment {
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
