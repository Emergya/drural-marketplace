/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyCreate
// ====================================================

export interface CompanyCreate_companyCreate_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  image: string;
}

export interface CompanyCreate_companyCreate_errors {
  __typename: "CompanyError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface CompanyCreate_companyCreate {
  __typename: "CompanyCreate";
  company: CompanyCreate_companyCreate_company | null;
  errors: CompanyCreate_companyCreate_errors[];
}

export interface CompanyCreate {
  /**
   * Creates a new company
   */
  companyCreate: CompanyCreate_companyCreate | null;
}

export interface CompanyCreateVariables {
  input: CompanyInput;
}
