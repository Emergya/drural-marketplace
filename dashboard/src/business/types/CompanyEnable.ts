/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompanyEnable
// ====================================================

export interface CompanyEnable_companyEnable_company {
  __typename: "CompanyType";
  isEnabled: boolean;
}

export interface CompanyEnable_companyEnable_errors {
  __typename: "CompanyError";
  /**
   * The error message.
   */
  message: string | null;
}

export interface CompanyEnable_companyEnable {
  __typename: "CompanyEnable";
  company: CompanyEnable_companyEnable_company | null;
  errors: CompanyEnable_companyEnable_errors[];
}

export interface CompanyEnable {
  /**
   * Enables a company
   */
  companyEnable: CompanyEnable_companyEnable | null;
}

export interface CompanyEnableVariables {
  id: string;
}
