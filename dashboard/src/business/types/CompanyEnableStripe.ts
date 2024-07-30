/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyEnableStripe
// ====================================================

export interface CompanyEnableStripe_companyEnableStripe_errors {
  __typename: "CompanyError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: CompanyErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface CompanyEnableStripe_companyEnableStripe {
  __typename: "CompanyEnbaleStripe";
  errors: CompanyEnableStripe_companyEnableStripe_errors[];
}

export interface CompanyEnableStripe {
  /**
   * Link a company with an Stripe account
   */
  companyEnableStripe: CompanyEnableStripe_companyEnableStripe | null;
}

export interface CompanyEnableStripeVariables {
  id: string;
}
