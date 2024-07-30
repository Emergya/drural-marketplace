/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AgentCreateInput, AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AddCompanyAgent
// ====================================================

export interface AddCompanyAgent_addCompanyAgent_errors {
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

export interface AddCompanyAgent_addCompanyAgent {
  __typename: "AddCompanyAgent";
  errors: AddCompanyAgent_addCompanyAgent_errors[];
}

export interface AddCompanyAgent {
  /**
   * Creates a new agent user.
   */
  addCompanyAgent: AddCompanyAgent_addCompanyAgent | null;
}

export interface AddCompanyAgentVariables {
  company: string;
  input: AgentCreateInput;
}
