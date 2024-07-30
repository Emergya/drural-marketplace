import { ShopErrorFragment } from "../../../fragments/types/ShopErrorFragment";
import { SiteSettingsPageTagsFormData } from "../SiteSettingsPage/types";

export interface IGA4TagProps {
  data: SiteSettingsPageTagsFormData;
  errors: ShopErrorFragment[];
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}
