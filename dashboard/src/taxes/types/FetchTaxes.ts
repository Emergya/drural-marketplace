/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FetchTaxes
// ====================================================

export interface FetchTaxes_shopFetchTaxRates_errors {
  __typename: "ShopError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface FetchTaxes_shopFetchTaxRates_shop_countries {
  __typename: "CountryDisplay";
  /**
   * Country name.
   */
  country: string;
  /**
   * Country code.
   */
  code: string;
}

export interface FetchTaxes_shopFetchTaxRates_shop {
  __typename: "Shop";
  /**
   * List of countries available in the shop.
   */
  countries: FetchTaxes_shopFetchTaxRates_shop_countries[];
}

export interface FetchTaxes_shopFetchTaxRates {
  __typename: "ShopFetchTaxRates";
  errors: FetchTaxes_shopFetchTaxRates_errors[];
  /**
   * Updated shop.
   */
  shop: FetchTaxes_shopFetchTaxRates_shop | null;
}

export interface FetchTaxes {
  /**
   * Fetch tax rates.
   */
  shopFetchTaxRates: FetchTaxes_shopFetchTaxRates | null;
}
