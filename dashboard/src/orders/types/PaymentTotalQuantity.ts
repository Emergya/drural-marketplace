/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalQuantity
// ====================================================

export interface PaymentTotalQuantity {
  /**
   * Return the total sales amount from a specific period.
   */
  paymentTotalQuantity: number | null;
}

export interface PaymentTotalQuantityVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
