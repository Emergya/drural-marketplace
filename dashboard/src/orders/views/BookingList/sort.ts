import { BookingListUrlSortField } from "@saleor/orders/urls";
import { OrderSortField } from "@saleor/types/globalTypes";
import { createGetSortQueryVariables } from "@saleor/utils/sort";

export function getSortQueryField(
  sort: BookingListUrlSortField
): OrderSortField {
  switch (sort) {
    case BookingListUrlSortField.number:
      return OrderSortField.NUMBER;
    case BookingListUrlSortField.customer:
      return OrderSortField.CUSTOMER;
    case BookingListUrlSortField.bookableResource:
      return OrderSortField.BOOKABLE_RESOURCE_NAME;
    case BookingListUrlSortField.bookingDate:
      return OrderSortField.BOOKING_DATE;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
