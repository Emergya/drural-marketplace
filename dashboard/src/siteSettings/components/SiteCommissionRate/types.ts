import { ShopErrorFragment } from "@saleor/fragments/types/ShopErrorFragment";

import { SiteSettingsPageCommisionRateFormData } from "../SiteSettingsPage/types";

export interface ISiteCommissionRateProps {
  data: SiteSettingsPageCommisionRateFormData;
  errors: ShopErrorFragment[];
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}
