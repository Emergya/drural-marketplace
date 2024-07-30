import { UserSortField } from "@saleor/types/globalTypes";
import { UserListUrlSortField } from "@saleor/users/urls";
import { createGetSortQueryVariables } from "@saleor/utils/sort";

export function getSortQueryField(sort: UserListUrlSortField): UserSortField {
  switch (sort) {
    case UserListUrlSortField.email:
      return UserSortField.EMAIL;
    case UserListUrlSortField.name:
      return UserSortField.LAST_NAME;
    case UserListUrlSortField.dateJoined:
      return UserSortField.DATE_JOINED;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
