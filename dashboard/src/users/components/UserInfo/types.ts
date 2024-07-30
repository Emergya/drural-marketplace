import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";

export interface UserInfoProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}
