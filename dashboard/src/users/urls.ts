import { stringifyQs } from "@saleor/utils/urls";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  Sort,
  TabActionDialog
} from "../types";

// 1. Sections
export enum UserSections {
  customers = "/customers/",
  agents = "/agents/"
}

// 2. List
export enum UserListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  query = "query"
}
export type UserListUrlFilters = Filters<UserListUrlFiltersEnum>;
export type UserListUrlDialog = "remove" | TabActionDialog;
export enum UserListUrlSortField {
  name = "name",
  email = "email",
  dateJoined = "dateJoined"
}
export type UserListUrlSort = Sort<UserListUrlSortField>;
export type UserListUrlQueryParams = ActiveTab &
  BulkAction &
  UserListUrlFilters &
  UserListUrlSort &
  Dialog<UserListUrlDialog> &
  Pagination;
export const userListUrl = (
  path: UserSections,
  params?: UserListUrlQueryParams
) => path + "?" + stringifyQs(params);

// 3. Details
export const userPath = (path: UserSections, id: string) => urlJoin(path, id);
export type UserUrlDialog = "remove";
export type UserUrlQueryParams = Dialog<UserUrlDialog>;
export const userUrl = (
  path: UserSections,
  id: string,
  params?: UserUrlQueryParams
) => userPath(path, encodeURIComponent(id)) + "?" + stringifyQs(params);
