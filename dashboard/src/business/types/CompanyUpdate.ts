/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput, CompanyStatus, CompanyErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyUpdate
// ====================================================

export interface CompanyUpdate_companyUpdate_company {
  __typename: "CompanyType";
  status: CompanyStatus;
}

export interface CompanyUpdate_companyUpdate_errors {
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

export interface CompanyUpdate_companyUpdate {
  __typename: "CompanyUpdate";
  company: CompanyUpdate_companyUpdate_company | null;
  errors: CompanyUpdate_companyUpdate_errors[];
}

export interface CompanyUpdate {
  /**
   * Updates a company
   */
  companyUpdate: CompanyUpdate_companyUpdate | null;
}

export interface CompanyUpdateVariables {
  id: string;
  input: CompanyInput;
}
