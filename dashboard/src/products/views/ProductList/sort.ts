import {
  ProductListUrlQueryParams,
  ProductListUrlSortField
} from "@saleor/products/urls";
import { ProductOrder, ProductOrderField } from "@saleor/types/globalTypes";
import { getOrderDirection } from "@saleor/utils/sort";

export const DEFAULT_SORT_KEY = ProductListUrlSortField.name;

export function canBeSorted(
  sort: ProductListUrlSortField
  // isChannelSelected: boolean
) {
  switch (sort) {
    case ProductListUrlSortField.name:
    case ProductListUrlSortField.category:
    case ProductListUrlSortField.shop:
    case ProductListUrlSortField.status:
    case ProductListUrlSortField.createdDate:
      return true;
    default:
      return false;
  }
}

export function getSortQueryField(
  sort: ProductListUrlSortField
): ProductOrderField {
  switch (sort) {
    case ProductListUrlSortField.name:
      return ProductOrderField.NAME;
    case ProductListUrlSortField.status:
      return ProductOrderField.PUBLISHED;
    case ProductListUrlSortField.category:
      return ProductOrderField.CATEGORY;
    case ProductListUrlSortField.shop:
      return ProductOrderField.COMPANY_NAME;
    case ProductListUrlSortField.createdDate:
      return ProductOrderField.CREATED_DATE;
    default:
      return undefined;
  }
}

export function getSortQueryVariables(
  params: ProductListUrlQueryParams
  // isChannelSelected: boolean
): ProductOrder {
  if (!canBeSorted(params.sort /* isChannelSelected */)) {
    return;
  }

  const direction = getOrderDirection(params.asc);
  const field = getSortQueryField(params.sort);
  return {
    direction,
    field
  };
}
