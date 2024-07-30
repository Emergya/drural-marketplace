/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerCreateData
// ====================================================

export interface CustomerCreateData_shop_countries {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CustomerCreateData_shop {
  __typename: "Shop";
  /**
   * List of countries available in the shop.
   */
  countries: CustomerCreateData_shop_countries[];
}

export interface CustomerCreateData {
  /**
   * Return information about the shop.
   */
  shop: CustomerCreateData_shop;
}
