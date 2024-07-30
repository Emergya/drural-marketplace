/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum, LanguageCodeEnum, PermissionEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ShopInfo
// ====================================================

export interface ShopInfo_shop_countries {
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

export interface ShopInfo_shop_defaultCountry {
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

export interface ShopInfo_shop_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
  /**
   * Shop's absolute URL.
   */
  url: string;
}

export interface ShopInfo_shop_languages {
  __typename: "LanguageDisplay";
  /**
   * ISO 639 representation of the language name.
   */
  code: LanguageCodeEnum;
  /**
   * Full name of the language.
   */
  language: string;
}

export interface ShopInfo_shop_permissions {
  __typename: "Permission";
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * Describe action(s) allowed to do by permission.
   */
  name: string;
}

export interface ShopInfo_shop {
  __typename: "Shop";
  /**
   * List of countries available in the shop.
   */
  countries: ShopInfo_shop_countries[];
  /**
   * Shop's default country.
   */
  defaultCountry: ShopInfo_shop_defaultCountry | null;
  /**
   * Default weight unit.
   */
  defaultWeightUnit: WeightUnitsEnum | null;
  /**
   * Display prices with tax in store.
   */
  displayGrossPrices: boolean;
  /**
   * Shop's domain data.
   */
  domain: ShopInfo_shop_domain;
  /**
   * Default shop language.
   */
  defaultLanguage: string | null;
  /**
   * List of the shops's supported languages.
   */
  languages: (ShopInfo_shop_languages | null)[];
  /**
   * Include taxes in prices.
   */
  includeTaxesInPrices: boolean;
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Enable inventory tracking.
   */
  trackInventoryByDefault: boolean | null;
  /**
   * List of available permissions.
   */
  permissions: (ShopInfo_shop_permissions | null)[];
}

export interface ShopInfo {
  /**
   * Return information about the shop.
   */
  shop: ShopInfo_shop;
}
