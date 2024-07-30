/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyStripeAccountCreate
// ====================================================

export interface CompanyStripeAccountCreate_companyStripeAccountCreate_errors {
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

export interface CompanyStripeAccountCreate_companyStripeAccountCreate {
  __typename: "CompanyStripeAccountCreate";
  errors: CompanyStripeAccountCreate_companyStripeAccountCreate_errors[];
}

export interface CompanyStripeAccountCreate {
  /**
   * Create an Stripe account for a company
   */
  companyStripeAccountCreate: CompanyStripeAccountCreate_companyStripeAccountCreate | null;
}

export interface CompanyStripeAccountCreateVariables {
  id: string;
}
