import { BusinessDetails_company } from "@saleor/business/types/BusinessDetails";
import { CompanyChatwootCreate_companyChatwootCreate_errors } from "@saleor/business/types/CompanyChatwootCreate";
import { CompanyUpdate_companyUpdate_errors } from "@saleor/business/types/CompanyUpdate";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import {
  FormChange,
  SubmitPromise,
  UseFormResult
} from "@saleor/hooks/useForm";
import { LanguageCodeEnum } from "@saleor/types/globalTypes";
import { MutationFetchResult } from "react-apollo";

import { CompanyChatwootCreate } from "../../types/CompanyChatwootCreate";
import { CompanyChatwootUpdate } from "../../types/CompanyChatwootUpdate";
import { BusinessValidationFormData } from "../BusinessValidation";

export interface BusinessDetailsPageProps {
  business: BusinessDetails_company;
  disabled: boolean;
  onActiveSubmit: (data: ActiveBusinessPageFormData) => void;
  onBack: () => void;
  onSubmit: (data: BusinessDetailsPageFormData) => void;
  saveButtonBar: ConfirmButtonTransitionState;
  onAddressManageClick: () => void;
  errors: CompanyUpdate_companyUpdate_errors[];
  chatwootErrors: CompanyChatwootCreate_companyChatwootCreate_errors[];
  onValidateBusiness: () => SubmitPromise;
  onDismissBusiness: (data: BusinessValidationFormData) => SubmitPromise;
  onSuspendBusiness: (data: BusinessValidationFormData) => SubmitPromise;
  onImageUpload: (file: File) => void;
  onBannerDelete: () => void;
  onBannerUpload: (file: File) => void;
  onCreateChatwoot: (
    data: Partial<BusinessDetailsPageFormData>
  ) => Promise<
    MutationFetchResult<
      CompanyChatwootCreate,
      Record<string, any>,
      Record<string, any>
    >
  >;
  onToggleChatwoot: (
    data: Partial<BusinessDetailsPageFormData>
  ) => Promise<
    MutationFetchResult<
      CompanyChatwootUpdate,
      Record<string, any>,
      Record<string, any>
    >
  >;
  onResetChatwootPassword: (data: Partial<BusinessDetailsPageFormData>) => void;
}

export interface BusinessDetailsFormProps {
  children: (props: ChildrenProps) => React.ReactNode;
  confirmLeave?: boolean;
  initial?: BusinessDetailsPageFormData;
  resetOnSubmit?: boolean;
  onSubmit?: (data: BusinessDetailsPageFormData) => SubmitPromise | void;
}

interface ChildrenProps extends UseFormResult<BusinessDetailsPageFormData> {
  outerChange: FormChange;
}

export interface BusinessDetailsPageFormData {
  name: string;
  cif: string;
  phone: string;
  email: string;
  publicName: string;
  languageCode: LanguageCodeEnum;
  description: string;
  hasChat: boolean;
  isChatActive: boolean;
  chatPassword: string;
  chatPasswordRepeat: string;
  errors: CompanyUpdate_companyUpdate_errors[];
}

export interface ActiveBusinessPageFormData {
  isEnabled: boolean;
  errors: CompanyUpdate_companyUpdate_errors[];
}
