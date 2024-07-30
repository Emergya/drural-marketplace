/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalAverage
// ====================================================

export interface PaymentTotalAverage {
  /**
   * Return the average amount from a specific period.
   */
  paymentTotalAverage: number | null;
}

export interface PaymentTotalAverageVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
