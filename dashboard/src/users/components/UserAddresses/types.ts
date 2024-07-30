import { UserDetails_user } from "@saleor/users/_types/UserDetails_user";

export interface UserAddressesProps {
  user: UserDetails_user;
  disabled: boolean;
  onAddressManageClick: () => void;
}
