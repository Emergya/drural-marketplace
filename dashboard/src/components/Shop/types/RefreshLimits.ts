/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RefreshLimits
// ====================================================

export interface RefreshLimits_shop_limits_currentUsage {
  __typename: "Limits";
  channels: number | null;
  orders: number | null;
  productVariants: number | null;
  staffUsers: number | null;
  warehouses: number | null;
}

export interface RefreshLimits_shop_limits_allowedUsage {
  __typename: "Limits";
  channels: number | null;
  orders: number | null;
  productVariants: number | null;
  staffUsers: number | null;
  warehouses: number | null;
}

export interface RefreshLimits_shop_limits {
  __typename: "LimitInfo";
  /**
   * Defines the current resource usage.
   */
  currentUsage: RefreshLimits_shop_limits_currentUsage;
  /**
   * Defines the allowed maximum resource usage, null means unlimited.
   */
  allowedUsage: RefreshLimits_shop_limits_allowedUsage;
}

export interface RefreshLimits_shop {
  __typename: "Shop";
  /**
   * Resource limitations and current usage if any set for a shop
   */
  limits: RefreshLimits_shop_limits;
}

export interface RefreshLimits {
  /**
   * Return information about the shop.
   */
  shop: RefreshLimits_shop;
}

export interface RefreshLimitsVariables {
  channels: boolean;
  orders: boolean;
  productVariants: boolean;
  staffUsers: boolean;
  warehouses: boolean;
}
