/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalCaptured
// ====================================================

export interface PaymentTotalCaptured_paymentTotalCaptured {
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

export interface PaymentTotalCaptured {
  /**
   * Return the total captured amount from a specific period.
   */
  paymentTotalCaptured: PaymentTotalCaptured_paymentTotalCaptured | null;
}

export interface PaymentTotalCapturedVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
