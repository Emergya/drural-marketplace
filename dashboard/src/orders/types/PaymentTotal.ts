/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotal
// ====================================================

export interface PaymentTotal_paymentTotal {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface PaymentTotal {
  /**
   * Return the total sales amount from a specific period.
   */
  paymentTotal: PaymentTotal_paymentTotal | null;
}

export interface PaymentTotalVariables {
  company?: string | null;
  period?: DateRangeInput | null;
}
