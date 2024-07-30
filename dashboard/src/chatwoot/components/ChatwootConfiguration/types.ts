import { CompanyChatwootCreate_companyChatwootCreate_errors } from "@saleor/business/types/CompanyChatwootCreate";
import { MutationFetchResult } from "react-apollo";

import { CompanyChatwootCreate } from "../../../business/types/CompanyChatwootCreate";
import { CompanyChatwootUpdate } from "../../../business/types/CompanyChatwootUpdate";
import {
  ShopChatwootCreate,
  ShopChatwootCreate_shopChatwootCreate_errors
} from "../../types/ShopChatwootCreate";
import { ShopChatwootUpdate } from "../../types/ShopChatwootUpdate";
import { ChatwootConfigurationFormData } from "../ChatwootConfigurationForm/types";

export enum ChatwootConfigurationType {
  company = "company",
  shop = "shop"
}

export type ChatwootConfigurationError =
  | CompanyChatwootCreate_companyChatwootCreate_errors
  | ShopChatwootCreate_shopChatwootCreate_errors;

export interface IChatwootConfigurationProps {
  data: ChatwootConfigurationFormData;
  disabled: boolean;
  errors: ChatwootConfigurationError[];
  type: ChatwootConfigurationType;
  onChange: (event: React.ChangeEvent<any>) => void;
  onCreateChatwoot: (
    data: ChatwootConfigurationFormData
  ) => Promise<
    MutationFetchResult<
      ShopChatwootCreate | CompanyChatwootCreate,
      Record<string, any>,
      Record<string, any>
    >
  >;
  onResetChatwootPassword: (data: ChatwootConfigurationFormData) => void;
  onToggleChatwoot: (
    data: ChatwootConfigurationFormData
  ) => Promise<
    MutationFetchResult<
      ShopChatwootUpdate | CompanyChatwootUpdate,
      Record<string, any>,
      Record<string, any>
    >
  >;
  onSet: (data: Partial<ChatwootConfigurationFormData>) => void;
}
