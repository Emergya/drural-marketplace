import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { UserDetails_user } from "@saleor/users/_types/UserDetails_user";

export interface UserDetailsProps {
  user: UserDetails_user;
  data: {
    isActive: boolean;
    note: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}
