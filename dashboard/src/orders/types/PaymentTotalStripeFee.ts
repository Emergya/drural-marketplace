/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalStripeFee
// ====================================================

export interface PaymentTotalStripeFee_paymentTotalStripeFee {
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

export interface PaymentTotalStripeFee {
  /**
   * Return the total Stripe fee amount from a specific period.
   */
  paymentTotalStripeFee: PaymentTotalStripeFee_paymentTotalStripeFee | null;
}

export interface PaymentTotalStripeFeeVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
