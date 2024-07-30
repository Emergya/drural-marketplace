/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopGAQuery
// ====================================================

export interface ShopGAQuery_shop_googleAnalytics {
  __typename: "ShopGoogleAnalyticsType";
  isActive: boolean;
  measurementId: string | null;
}

export interface ShopGAQuery_shop {
  __typename: "Shop";
  /**
   * google_analytics
   */
  googleAnalytics: ShopGAQuery_shop_googleAnalytics | null;
}

export interface ShopGAQuery {
  /**
   * Return information about the shop.
   */
  shop: ShopGAQuery_shop;
}
