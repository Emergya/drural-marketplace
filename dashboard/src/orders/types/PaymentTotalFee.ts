/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalFee
// ====================================================

export interface PaymentTotalFee_paymentTotalFee {
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

export interface PaymentTotalFee {
  /**
   * Return the total fee amount from a specific period.
   */
  paymentTotalFee: PaymentTotalFee_paymentTotalFee | null;
}

export interface PaymentTotalFeeVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
