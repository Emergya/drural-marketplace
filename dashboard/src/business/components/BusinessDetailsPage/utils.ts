import { BusinessDetails_company } from "@saleor/business/types/BusinessDetails";
import { CompanyUpdate_companyUpdate_errors } from "@saleor/business/types/CompanyUpdate";
import { LanguageCodeEnum } from "@saleor/types/globalTypes";

import {
  ActiveBusinessPageFormData,
  BusinessDetailsPageFormData
} from "./types";

export const getInitialActiveValue = (
  business: BusinessDetails_company,
  errors: CompanyUpdate_companyUpdate_errors[]
): ActiveBusinessPageFormData => ({
  isEnabled: business?.isEnabled,
  errors: errors || []
});

export const getInitialValues = (
  business: BusinessDetails_company,
  errors: CompanyUpdate_companyUpdate_errors[]
): BusinessDetailsPageFormData => ({
  name: business?.name || "",
  cif: business?.cif || "",
  phone: business?.phone || "",
  email: business?.email || "",
  publicName: business?.publicName || "",
  languageCode: business?.languageCode || LanguageCodeEnum.EN,
  description: business?.description || "",
  hasChat: !!business?.chatwootCredentials?.id,
  isChatActive: !!business?.chatwootCredentials?.isActive,
  chatPassword: "",
  chatPasswordRepeat: "",
  errors: errors || []
});
