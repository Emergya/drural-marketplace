/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopDefaultLanguage
// ====================================================

export interface ShopDefaultLanguage_shop {
  __typename: "Shop";
  /**
   * Default shop language.
   */
  defaultLanguage: string | null;
}

export interface ShopDefaultLanguage {
  /**
   * Return information about the shop.
   */
  shop: ShopDefaultLanguage_shop;
}
