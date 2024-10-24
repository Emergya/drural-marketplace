/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveCompanyAgent
// ====================================================

export interface RemoveCompanyAgent_removeCompanyAgent_errors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * A type of address that causes the error.
   */
  addressType: AddressTypeEnum | null;
}

export interface RemoveCompanyAgent_removeCompanyAgent {
  __typename: "RemoveCompanyAgent";
  errors: RemoveCompanyAgent_removeCompanyAgent_errors[];
}

export interface RemoveCompanyAgent {
  /**
   * Remove a agent from the company.
   */
  removeCompanyAgent: RemoveCompanyAgent_removeCompanyAgent | null;
}

export interface RemoveCompanyAgentVariables {
  company: string;
  id: string;
}
