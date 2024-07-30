import { Locale } from "@saleor/components/Locale";
import { maybe } from "@saleor/misc";
import { SiteSettings_shop } from "@saleor/siteSettings/types/SiteSettings";

import {
  SiteSettingsPageAddressFormData,
  SiteSettingsPageCommisionRateFormData,
  SiteSettingsPageFormData,
  SiteSettingsPageTagsFormData
} from "./types";

export function areAddressInputFieldsModified(
  data: SiteSettingsPageAddressFormData
): boolean {
  return ([
    "city",
    "country",
    "countryArea",
    "phone",
    "postalCode",
    "streetAddress1",
    "streetAddress2"
  ] as Array<keyof SiteSettingsPageAddressFormData>)
    .map(key => data[key])
    .some(field => field !== "");
}

const getInitialFormAddress = (
  shop: SiteSettings_shop
): SiteSettingsPageAddressFormData => ({
  city: maybe(() => shop.companyAddress.city, ""),
  companyName: maybe(() => shop.companyAddress.companyName, ""),
  country: maybe(() => shop.companyAddress.country.code, ""),
  countryArea: maybe(() => shop.companyAddress.countryArea, ""),
  phone: maybe(() => shop.companyAddress.phone, ""),
  postalCode: maybe(() => shop.companyAddress.postalCode, ""),
  streetAddress1: maybe(() => shop.companyAddress.streetAddress1, ""),
  streetAddress2: maybe(() => shop.companyAddress.streetAddress2, "")
});

const getInitialFormTags = (
  shop: SiteSettings_shop
): SiteSettingsPageTagsFormData => ({
  ga4: maybe(() => shop.googleAnalytics.measurementId, ""),
  ga4Active: maybe(() => shop.googleAnalytics.isActive, false)
});

const getInitialFormCommisionRate = (
  shop: SiteSettings_shop
): SiteSettingsPageCommisionRateFormData => ({
  comissionRate: maybe(() => `${shop.commissionRate}`, "")
});

export const getInitialFormData = (
  shop: SiteSettings_shop
): SiteSettingsPageFormData => ({
  ...getInitialFormAddress(shop),
  ...getInitialFormTags(shop),
  ...getInitialFormCommisionRate(shop),
  description: maybe(() => shop.description, ""),
  domain: maybe(() => shop.domain.host, ""),
  name: maybe(() => shop.name, ""),
  defaultLanguage: maybe(() => shop.defaultLanguage, Locale.EN)
});
