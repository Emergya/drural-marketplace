/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AttributeBulkDelete
// ====================================================

export interface AttributeBulkDelete_attributeBulkDelete_errors {
  __typename: "AttributeError";
  /**
   * The error code.
   */
  code: AttributeErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface AttributeBulkDelete_attributeBulkDelete {
  __typename: "AttributeBulkDelete";
  errors: AttributeBulkDelete_attributeBulkDelete_errors[];
}

export interface AttributeBulkDelete {
  /**
   * Deletes attributes.
   */
  attributeBulkDelete: AttributeBulkDelete_attributeBulkDelete | null;
}

export interface AttributeBulkDeleteVariables {
  ids: string[];
}
