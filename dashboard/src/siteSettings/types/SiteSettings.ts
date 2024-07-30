/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SiteSettings
// ====================================================

export interface SiteSettings_shop_companyAddress_country {
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

export interface SiteSettings_shop_companyAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: SiteSettings_shop_companyAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SiteSettings_shop_countries {
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

export interface SiteSettings_shop_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
}

export interface SiteSettings_shop_googleAnalytics {
  __typename: "ShopGoogleAnalyticsType";
  isActive: boolean;
  measurementId: string | null;
}

export interface SiteSettings_shop {
  __typename: "Shop";
  /**
   * Company address.
   */
  companyAddress: SiteSettings_shop_companyAddress | null;
  /**
   * List of countries available in the shop.
   */
  countries: SiteSettings_shop_countries[];
  /**
   * Commission rate of the shop.
   */
  commissionRate: number | null;
  /**
   * URL of a view where customers can set their password.
   */
  customerSetPasswordUrl: string | null;
  /**
   * Default shop language.
   */
  defaultLanguage: string | null;
  /**
   * Default shop's email sender's address.
   */
  defaultMailSenderAddress: string | null;
  /**
   * Default shop's email sender's name.
   */
  defaultMailSenderName: string | null;
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Shop's domain data.
   */
  domain: SiteSettings_shop_domain;
  /**
   * google_analytics
   */
  googleAnalytics: SiteSettings_shop_googleAnalytics | null;
  /**
   * Shop's name.
   */
  name: string;
}

export interface SiteSettings {
  /**
   * Return information about the shop.
   */
  shop: SiteSettings_shop;
}
