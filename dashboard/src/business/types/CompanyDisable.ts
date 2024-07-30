/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompanyDisable
// ====================================================

export interface CompanyDisable_companyDisable_company {
  __typename: "CompanyType";
  isEnabled: boolean;
}

export interface CompanyDisable_companyDisable_errors {
  __typename: "CompanyError";
  /**
   * The error message.
   */
  message: string | null;
}

export interface CompanyDisable_companyDisable {
  __typename: "CompanyDisable";
  company: CompanyDisable_companyDisable_company | null;
  errors: CompanyDisable_companyDisable_errors[];
}

export interface CompanyDisable {
  /**
   * Disables a company
   */
  companyDisable: CompanyDisable_companyDisable | null;
}

export interface CompanyDisableVariables {
  id: string;
}
