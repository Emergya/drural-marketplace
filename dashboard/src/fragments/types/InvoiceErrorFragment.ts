/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: InvoiceErrorFragment
// ====================================================

export interface InvoiceErrorFragment {
  __typename: "InvoiceError";
  /**
   * The error code.
   */
  code: InvoiceErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
