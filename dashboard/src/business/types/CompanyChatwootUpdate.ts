/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyChatwootInput, CompanyErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyChatwootUpdate
// ====================================================

export interface CompanyChatwootUpdate_companyChatwootUpdate_errors {
  __typename: "CompanyError";
  /**
   * The error code.
   */
  code: CompanyErrorCode;
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

export interface CompanyChatwootUpdate_companyChatwootUpdate {
  __typename: "CompnayChatwootUpdate";
  errors: CompanyChatwootUpdate_companyChatwootUpdate_errors[];
}

export interface CompanyChatwootUpdate {
  /**
   * It updates the company Chatwoot settings.
   */
  companyChatwootUpdate: CompanyChatwootUpdate_companyChatwootUpdate | null;
}

export interface CompanyChatwootUpdateVariables {
  id: string;
  input: CompanyChatwootInput;
}
