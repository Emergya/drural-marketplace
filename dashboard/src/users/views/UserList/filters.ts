import { IFilterElement } from "@saleor/components/Filter";
import { maybe } from "@saleor/misc";
import { UserFilterInput } from "@saleor/users/_types/UserFilterInput";
import {
  UserFilterKeys,
  UserListFilterOpts
} from "@saleor/users/components/UserListPage";
import {
  UserListUrlFilters,
  UserListUrlFiltersEnum,
  UserListUrlQueryParams
} from "@saleor/users/urls";

import {
  createFilterTabUtils,
  createFilterUtils,
  getGteLteVariables,
  getMinMaxQueryParam
} from "../../../utils/filters";

export const USER_FILTERS_KEY = "userFilters";

export function getFilterOpts(params: UserListUrlFilters): UserListFilterOpts {
  return {
    joined: {
      active: maybe(
        () =>
          [params.joinedFrom, params.joinedTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.joinedTo, ""),
        min: maybe(() => params.joinedFrom, "")
      }
    }
  };
}

export function getFilterVariables(
  params: UserListUrlFilters
): UserFilterInput {
  return {
    dateJoined: getGteLteVariables({
      gte: params.joinedFrom,
      lte: params.joinedTo
    }),
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<UserFilterKeys>
): UserListUrlFilters {
  const { name } = filter;

  switch (name) {
    case UserFilterKeys.joined:
      return getMinMaxQueryParam(
        filter,
        UserListUrlFiltersEnum.joinedFrom,
        UserListUrlFiltersEnum.joinedTo
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<UserListUrlFilters>(USER_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  UserListUrlQueryParams,
  UserListUrlFilters
>(UserListUrlFiltersEnum);
