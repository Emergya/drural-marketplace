import { MutationFetchResult } from "react-apollo";

import { ShopChatwoot_shop_chatwootCredentials } from "../../types/ShopChatwoot";
import {
  ShopChatwootCreate,
  ShopChatwootCreate_shopChatwootCreate_errors
} from "../../types/ShopChatwootCreate";
import { ShopChatwootUpdate } from "../../types/ShopChatwootUpdate";
import { ChatwootConfigurationFormData } from "../ChatwootConfigurationForm/types";

export interface IChatwootConfigurationPageProps {
  chatwootCredentials: ShopChatwoot_shop_chatwootCredentials;
  disabled: boolean;
  errors: ShopChatwootCreate_shopChatwootCreate_errors[];
  onCreateChatwoot: (
    data: ChatwootConfigurationFormData
  ) => Promise<
    MutationFetchResult<
      ShopChatwootCreate,
      Record<string, any>,
      Record<string, any>
    >
  >;
  onResetChatwootPassword: (data: ChatwootConfigurationFormData) => void;
  onToggleChatwoot: (
    data: ChatwootConfigurationFormData
  ) => Promise<
    MutationFetchResult<
      ShopChatwootUpdate,
      Record<string, any>,
      Record<string, any>
    >
  >;
}
