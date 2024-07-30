/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkRemoveCompanyAgent
// ====================================================

export interface BulkRemoveCompanyAgent_bulkRemoveCompanyAgent_errors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface BulkRemoveCompanyAgent_bulkRemoveCompanyAgent {
  __typename: "BulkRemoveCompanyAgent";
  errors: BulkRemoveCompanyAgent_bulkRemoveCompanyAgent_errors[];
}

export interface BulkRemoveCompanyAgent {
  /**
   * Removes agents from the company
   */
  bulkRemoveCompanyAgent: BulkRemoveCompanyAgent_bulkRemoveCompanyAgent | null;
}

export interface BulkRemoveCompanyAgentVariables {
  company: string;
  ids: (string | null)[];
}
