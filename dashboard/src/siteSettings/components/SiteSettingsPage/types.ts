import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import { ShopErrorFragment } from "@saleor/fragments/types/ShopErrorFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { SiteSettings_shop } from "@saleor/siteSettings/types/SiteSettings";

export interface SiteSettingsPageAddressFormData {
  city: string;
  companyName: string;
  country: string;
  countryArea: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SiteSettingsPageTagsFormData {
  ga4: string;
  ga4Active: boolean;
}

export interface SiteSettingsPageCommisionRateFormData {
  comissionRate: string;
}

export interface SiteSettingsPageFormData
  extends SiteSettingsPageAddressFormData,
    SiteSettingsPageTagsFormData,
    SiteSettingsPageCommisionRateFormData {
  description: string;
  domain: string;
  name: string;
  defaultLanguage: string;
}

export interface SiteSettingsPageProps {
  disabled: boolean;
  errors: ShopErrorFragment[];
  shop: SiteSettings_shop;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: SiteSettingsPageFormData) => SubmitPromise;
}
