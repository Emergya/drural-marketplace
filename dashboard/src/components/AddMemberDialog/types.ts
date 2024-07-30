import { ConfirmButtonTransitionState } from "@drural/macaw-ui";
import { SearchPermissionGroups_search_edges_node } from "@saleor/searches/types/SearchPermissionGroups";
import { SearchPageProps } from "@saleor/types";
import { IAccountError } from "@saleor/utils/_types/IAccountError";

import { FetchMoreProps } from "../../types";

export interface AddMemberDialogProps extends SearchPageProps {
  availablePermissionGroups?: SearchPermissionGroups_search_edges_node[];
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: IAccountError[];
  fetchMorePermissionGroups?: FetchMoreProps;
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: (data: AddMemberFormData) => void;
}

export interface AddMemberFormData {
  email: string;
  firstName: string;
  lastName: string;
  permissionGroups: string[];
}
