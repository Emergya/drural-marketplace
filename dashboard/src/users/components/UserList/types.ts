import { ListActions, ListProps, SortPage } from "@saleor/types";
import { ListUsers_users_edges_node } from "@saleor/users/_types/ListUsers_users_edges_node";
import { UserType } from "@saleor/users/_types/UserType";
import { UserListUrlSortField } from "@saleor/users/urls";

export interface UserListProps
  extends ListProps,
    ListActions,
    SortPage<UserListUrlSortField> {
  type: UserType;
  users: ListUsers_users_edges_node[];
}
