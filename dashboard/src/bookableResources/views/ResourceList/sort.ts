import {
  ResourceListUrlQueryParams,
  ResourceListUrlSortField
} from "@saleor/bookableResources/urls";
import {
  BookableResourceOrderField,
  BookableResourceSortingInput
} from "@saleor/types/globalTypes";
import { getOrderDirection } from "@saleor/utils/sort";

export const DEFAULT_SORT_KEY = ResourceListUrlSortField.name;

export function canBeSorted(
  sort: ResourceListUrlSortField
  // isChannelSelected: boolean
) {
  switch (sort) {
    case ResourceListUrlSortField.name:
    case ResourceListUrlSortField.quantity:

    case ResourceListUrlSortField.isActive:
      return true;
    default:
      return false;
  }
}

export function getSortQueryField(
  sort: ResourceListUrlSortField
): BookableResourceOrderField {
  switch (sort) {
    case ResourceListUrlSortField.name:
      return BookableResourceOrderField.NAME;
    case ResourceListUrlSortField.quantity:
      return BookableResourceOrderField.QUANTITY;
    case ResourceListUrlSortField.isActive:
      return BookableResourceOrderField.IS_ACTIVE;
    case ResourceListUrlSortField.shop:
      return BookableResourceOrderField.COMPANY_NAME;
    default:
      return undefined;
  }
}

export function getSortQueryVariables(
  params: ResourceListUrlQueryParams
): BookableResourceSortingInput {
  if (!canBeSorted(params.sort)) {
    return;
  }

  const direction = getOrderDirection(params.asc);
  const field = getSortQueryField(params.sort);
  return {
    direction,
    field
  };
}
