/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyStatusEnum, CompanyErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyValidation
// ====================================================

export interface CompanyValidation_companyValidation_errors {
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

export interface CompanyValidation_companyValidation {
  __typename: "CompanyValidation";
  errors: CompanyValidation_companyValidation_errors[];
}

export interface CompanyValidation {
  /**
   * Validates a company
   */
  companyValidation: CompanyValidation_companyValidation | null;
}

export interface CompanyValidationVariables {
  id: string;
  reason: string;
  status: CompanyStatusEnum;
}
