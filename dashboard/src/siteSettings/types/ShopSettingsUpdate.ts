/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SiteDomainInput, ShopSettingsInput, AddressInput, ShopErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ShopSettingsUpdate
// ====================================================

export interface ShopSettingsUpdate_shopSettingsUpdate_errors {
  __typename: "ShopError";
  /**
   * The error code.
   */
  code: ShopErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface ShopSettingsUpdate_shopSettingsUpdate_shop_companyAddress_country {
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

export interface ShopSettingsUpdate_shopSettingsUpdate_shop_companyAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: ShopSettingsUpdate_shopSettingsUpdate_shop_companyAddress_country;
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

export interface ShopSettingsUpdate_shopSettingsUpdate_shop_countries {
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

export interface ShopSettingsUpdate_shopSettingsUpdate_shop_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
}

export interface ShopSettingsUpdate_shopSettingsUpdate_shop_googleAnalytics {
  __typename: "ShopGoogleAnalyticsType";
  isActive: boolean;
  measurementId: string | null;
}

export interface ShopSettingsUpdate_shopSettingsUpdate_shop {
  __typename: "Shop";
  /**
   * Company address.
   */
  companyAddress: ShopSettingsUpdate_shopSettingsUpdate_shop_companyAddress | null;
  /**
   * List of countries available in the shop.
   */
  countries: ShopSettingsUpdate_shopSettingsUpdate_shop_countries[];
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
  domain: ShopSettingsUpdate_shopSettingsUpdate_shop_domain;
  /**
   * google_analytics
   */
  googleAnalytics: ShopSettingsUpdate_shopSettingsUpdate_shop_googleAnalytics | null;
  /**
   * Shop's name.
   */
  name: string;
}

export interface ShopSettingsUpdate_shopSettingsUpdate {
  __typename: "ShopSettingsUpdate";
  errors: ShopSettingsUpdate_shopSettingsUpdate_errors[];
  /**
   * Updated shop.
   */
  shop: ShopSettingsUpdate_shopSettingsUpdate_shop | null;
}

export interface ShopSettingsUpdate_shopDomainUpdate_errors {
  __typename: "ShopError";
  /**
   * The error code.
   */
  code: ShopErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface ShopSettingsUpdate_shopDomainUpdate_shop_domain {
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

export interface ShopSettingsUpdate_shopDomainUpdate_shop {
  __typename: "Shop";
  /**
   * Shop's domain data.
   */
  domain: ShopSettingsUpdate_shopDomainUpdate_shop_domain;
}

export interface ShopSettingsUpdate_shopDomainUpdate {
  __typename: "ShopDomainUpdate";
  errors: ShopSettingsUpdate_shopDomainUpdate_errors[];
  /**
   * Updated shop.
   */
  shop: ShopSettingsUpdate_shopDomainUpdate_shop | null;
}

export interface ShopSettingsUpdate_shopAddressUpdate_errors {
  __typename: "ShopError";
  /**
   * The error code.
   */
  code: ShopErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface ShopSettingsUpdate_shopAddressUpdate_shop_companyAddress_country {
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

export interface ShopSettingsUpdate_shopAddressUpdate_shop_companyAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: ShopSettingsUpdate_shopAddressUpdate_shop_companyAddress_country;
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

export interface ShopSettingsUpdate_shopAddressUpdate_shop {
  __typename: "Shop";
  /**
   * Company address.
   */
  companyAddress: ShopSettingsUpdate_shopAddressUpdate_shop_companyAddress | null;
}

export interface ShopSettingsUpdate_shopAddressUpdate {
  __typename: "ShopAddressUpdate";
  errors: ShopSettingsUpdate_shopAddressUpdate_errors[];
  /**
   * Updated shop.
   */
  shop: ShopSettingsUpdate_shopAddressUpdate_shop | null;
}

export interface ShopSettingsUpdate {
  /**
   * Updates shop settings.
   */
  shopSettingsUpdate: ShopSettingsUpdate_shopSettingsUpdate | null;
  /**
   * Updates site domain of the shop.
   */
  shopDomainUpdate: ShopSettingsUpdate_shopDomainUpdate | null;
  /**
   * Update the shop's address. If the `null` value is passed, the currently selected address will be deleted.
   */
  shopAddressUpdate: ShopSettingsUpdate_shopAddressUpdate | null;
}

export interface ShopSettingsUpdateVariables {
  shopDomainInput: SiteDomainInput;
  shopSettingsInput: ShopSettingsInput;
  addressInput?: AddressInput | null;
}
