/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyLinkStripeAccountInput, CompanyErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CompanyLinkStripeAccount
// ====================================================

export interface CompanyLinkStripeAccount_companyLinkStripeAccount_errors {
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

export interface CompanyLinkStripeAccount_companyLinkStripeAccount {
  __typename: "CompanyLinkStripeAccount";
  /**
   * Stripe form to sign in.
   */
  stripeForm: string | null;
  errors: CompanyLinkStripeAccount_companyLinkStripeAccount_errors[];
}

export interface CompanyLinkStripeAccount {
  /**
   * Link a company with an Stripe account
   */
  companyLinkStripeAccount: CompanyLinkStripeAccount_companyLinkStripeAccount | null;
}

export interface CompanyLinkStripeAccountVariables {
  id: string;
  input: CompanyLinkStripeAccountInput;
}
