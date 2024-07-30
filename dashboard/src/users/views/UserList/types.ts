import { UseListSettings } from "@saleor/hooks/useListSettings";
import { PaginationState } from "@saleor/hooks/usePaginator";
import {
  ListSettings,
  MutationResultAdditionalProps,
  Node
} from "@saleor/types";
import { ListUsers_users_edges_node } from "@saleor/users/_types/ListUsers_users_edges_node";
import { UserType } from "@saleor/users/_types/UserType";
import {
  UserListUrlDialog,
  UserListUrlQueryParams,
  UserUrlQueryParams
} from "@saleor/users/urls";
import { ICountableConnection } from "@saleor/utils/_types/ICountableConnection";
import { MutationResult } from "react-apollo";

export interface UserListViewProps {
  bulkRemoveUsersOpts: MutationResult & MutationResultAdditionalProps;
  hasAddButton: boolean;
  listElements: string[];
  loading: boolean;
  paginationState: PaginationState;
  params: UserListUrlQueryParams;
  settings: ListSettings<string>;
  type: UserType;
  users: ICountableConnection<ListUsers_users_edges_node>;
  bulkRemoveUsers: () => void;
  closeModal: () => void;
  detailsUrl: (customerId: string, params?: UserUrlQueryParams) => string;
  isSelected: (data: string) => boolean;
  listUrl: (params?: UserListUrlQueryParams) => string;
  onAdd: () => void;
  openModal: (
    action: UserListUrlDialog,
    newParams?: UserListUrlQueryParams
  ) => void;
  reset: () => void;
  toggle: (data: string) => void;
  toggleAll: (items: Node[], selected: number) => void;
  updateListSettings: UseListSettings["updateListSettings"];
}
