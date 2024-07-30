import { BusinessesListUrlSortField } from "@saleor/business/urls";
import { CompanySortField } from "@saleor/types/globalTypes";
import { createGetSortQueryVariables } from "@saleor/utils/sort";

export function getSortQueryField(
  sort: BusinessesListUrlSortField
): CompanySortField {
  switch (sort) {
    case BusinessesListUrlSortField.name:
      return CompanySortField.NAME;
    case BusinessesListUrlSortField.status:
      return CompanySortField.STATUS;
    case BusinessesListUrlSortField.activeShop:
      return CompanySortField.ACTIVE_SHOP;
    case BusinessesListUrlSortField.email:
      return CompanySortField.EMAIL;
    case BusinessesListUrlSortField.phone:
      return CompanySortField.PHONE;
    case BusinessesListUrlSortField.locality:
      return CompanySortField.LOCALITY;
    case BusinessesListUrlSortField.postalCode:
      return CompanySortField.POSTAL_COCE;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
