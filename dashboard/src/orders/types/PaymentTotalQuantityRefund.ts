/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateRangeInput, OrderStatusFilter } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PaymentTotalQuantityRefund
// ====================================================

export interface PaymentTotalQuantityRefund {
  /**
   * Return the total refunded amount from a specific period.
   */
  paymentTotalQuantityRefund: number | null;
}

export interface PaymentTotalQuantityRefundVariables {
  company?: string | null;
  customerSearch?: string | null;
  period?: DateRangeInput | null;
  status?: (OrderStatusFilter | null)[] | null;
  search?: string | null;
}
