/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShopFragment
// ====================================================

export interface ShopFragment_companyAddress_country {
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

export interface ShopFragment_companyAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: ShopFragment_companyAddress_country;
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

export interface ShopFragment_countries {
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

export interface ShopFragment_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
}

export interface ShopFragment_googleAnalytics {
  __typename: "ShopGoogleAnalyticsType";
  isActive: boolean;
  measurementId: string | null;
}

export interface ShopFragment {
  __typename: "Shop";
  /**
   * Company address.
   */
  companyAddress: ShopFragment_companyAddress | null;
  /**
   * List of countries available in the shop.
   */
  countries: ShopFragment_countries[];
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
  domain: ShopFragment_domain;
  /**
   * google_analytics
   */
  googleAnalytics: ShopFragment_googleAnalytics | null;
  /**
   * Shop's name.
   */
  name: string;
}
