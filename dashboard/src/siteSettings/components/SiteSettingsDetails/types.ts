import { ShopErrorFragment } from "@saleor/fragments/types/ShopErrorFragment";

import { SiteSettingsPageFormData } from "../SiteSettingsPage/types";

export interface SiteSettingsDetailsProps {
  data: SiteSettingsPageFormData;
  errors: ShopErrorFragment[];
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}
