import { AppErrorFragment } from "@saleor/fragments/types/AppErrorFragment";
import { FormChange } from "@saleor/hooks/useForm";

export interface ICustomAppInfoProps {
  data: {
    name: string;
    user?: string;
  };
  disabled: boolean;
  errors: AppErrorFragment[];
  onChange: FormChange;
}
