/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalNet
// ====================================================

export interface PaymentTotalNet_paymentTotalNet {
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

export interface PaymentTotalNet {
  /**
   * Return the total net amount from a specific period.
   */
  paymentTotalNet: PaymentTotalNet_paymentTotalNet | null;
}

export interface PaymentTotalNetVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
