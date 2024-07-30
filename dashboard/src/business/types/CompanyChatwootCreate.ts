/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompnayChatwootCreateInput, CompanyErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyChatwootCreate
// ====================================================

export interface CompanyChatwootCreate_companyChatwootCreate_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CompanyChatwootCreate_companyChatwootCreate_errors {
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

export interface CompanyChatwootCreate_companyChatwootCreate {
  __typename: "CompnayChatwootCreate";
  company: CompanyChatwootCreate_companyChatwootCreate_company | null;
  errors: CompanyChatwootCreate_companyChatwootCreate_errors[];
}

export interface CompanyChatwootCreate {
  /**
   * It enables the company chat
   */
  companyChatwootCreate: CompanyChatwootCreate_companyChatwootCreate | null;
}

export interface CompanyChatwootCreateVariables {
  id: string;
  input: CompnayChatwootCreateInput;
}
