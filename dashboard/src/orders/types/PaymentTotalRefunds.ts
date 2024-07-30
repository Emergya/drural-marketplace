/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalRefunds
// ====================================================

export interface PaymentTotalRefunds_paymentTotalRefunds {
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

export interface PaymentTotalRefunds {
  /**
   * Return the total refunded amount from a specific period
   */
  paymentTotalRefunds: PaymentTotalRefunds_paymentTotalRefunds | null;
}

export interface PaymentTotalRefundsVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
