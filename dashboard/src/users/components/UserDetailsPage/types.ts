import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import { MetadataFormData } from "@saleor/components/Metadata/types";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { UserDetails_user } from "@saleor/users/_types/UserDetails_user";
import { UserType } from "@saleor/users/_types/UserType";

export interface UserDetailsPageFormData extends MetadataFormData {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  note: string;
}

export interface UserDetailsPageProps {
  user: UserDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  type: UserType;
  onBack: () => void;
  onSubmit: (data: UserDetailsPageFormData) => SubmitPromise;
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
  onAddressManageClick: () => void;
  onDelete: () => void;
}
