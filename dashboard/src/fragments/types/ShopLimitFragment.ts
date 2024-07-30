/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShopLimitFragment
// ====================================================

export interface ShopLimitFragment_limits_currentUsage {
  __typename: "Limits";
  channels: number | null;
  orders: number | null;
  productVariants: number | null;
  staffUsers: number | null;
  warehouses: number | null;
}

export interface ShopLimitFragment_limits_allowedUsage {
  __typename: "Limits";
  channels: number | null;
  orders: number | null;
  productVariants: number | null;
  staffUsers: number | null;
  warehouses: number | null;
}

export interface ShopLimitFragment_limits {
  __typename: "LimitInfo";
  /**
   * Defines the current resource usage.
   */
  currentUsage: ShopLimitFragment_limits_currentUsage;
  /**
   * Defines the allowed maximum resource usage, null means unlimited.
   */
  allowedUsage: ShopLimitFragment_limits_allowedUsage;
}

export interface ShopLimitFragment {
  __typename: "Shop";
  /**
   * Resource limitations and current usage if any set for a shop
   */
  limits: ShopLimitFragment_limits;
}
