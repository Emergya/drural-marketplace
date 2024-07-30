import {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps
} from "@saleor/types";
import { ListUsers_users_edges_node } from "@saleor/users/_types/ListUsers_users_edges_node";
import { UserType } from "@saleor/users/_types/UserType";
import { UserListUrlSortField } from "@saleor/users/urls";

import { UserFilterKeys, UserListFilterOpts } from "./filters";

export interface UserListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<UserFilterKeys, UserListFilterOpts>,
    SortPage<UserListUrlSortField>,
    TabPageProps {
  hasAddButton: boolean;
  users: ListUsers_users_edges_node[];
  type: UserType;
}
