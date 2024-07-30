/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalDruralFee
// ====================================================

export interface PaymentTotalDruralFee_paymentTotalDruralFee {
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

export interface PaymentTotalDruralFee {
  /**
   * Return the total dRural fee amount from a specific period.
   */
  paymentTotalDruralFee: PaymentTotalDruralFee_paymentTotalDruralFee | null;
}

export interface PaymentTotalDruralFeeVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
