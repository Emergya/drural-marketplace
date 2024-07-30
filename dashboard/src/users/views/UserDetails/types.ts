import { ConfirmButtonTransitionState } from "@drural/macaw-ui";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { MutationResultAdditionalProps } from "@saleor/types";
import { UserDetails_user } from "@saleor/users/_types/UserDetails_user";
import { UserType } from "@saleor/users/_types/UserType";
import { UserUrlQueryParams } from "@saleor/users/urls";
import { MutationResult } from "react-apollo";

import { UserDetailsPageFormData } from "../../components/UserDetailsPage/types";

export interface UserDetailsViewProps {
  disabled: boolean;
  errors: AccountErrorFragment[];
  params: UserUrlQueryParams;
  removeUserOpts: MutationResult & MutationResultAdditionalProps;
  saveButtonBarStatus: ConfirmButtonTransitionState;
  type: UserType;
  user: UserDetails_user;
  detailsUrl: (params?: UserUrlQueryParams) => string;
  handleBack: () => void;
  handleAddressManageClick?: () => void;
  handleSubmit: (data: UserDetailsPageFormData) => SubmitPromise;
  removeUser: () => void;
}
