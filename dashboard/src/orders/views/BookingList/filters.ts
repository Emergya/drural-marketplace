import {
  BookingFilterKeys,
  BookingListFilterOpts
} from "@saleor/orders/components/BookingListPage/types";

import { IFilterElement } from "../../../components/Filter";
import { OrderFilterInput } from "../../../types/globalTypes";
import {
  createFilterTabUtils,
  createFilterUtils,
  getGteLteVariables,
  getMinMaxQueryParam,
  getSingleValueQueryParam
} from "../../../utils/filters";
import {
  BookingListUrlFilters,
  BookingListUrlFiltersEnum,
  BookingListUrlQueryParams
} from "../../urls";

export const BOOKING_FILTERS_KEY = "bookingFilters";

export function getFilterOpts(
  params: BookingListUrlFilters
): BookingListFilterOpts {
  return {
    bookingDate: {
      active: [params?.bookingFrom, params?.bookingTo].some(
        field => field !== undefined
      ),
      value: {
        max: params?.bookingTo || "",
        min: params?.bookingFrom || ""
      }
    },
    bookableResource: {
      active: !!params?.bookableResource,
      value: params?.bookableResource
    },
    customer: {
      active: !!params?.customer,
      value: params?.customer
    }
  };
}

export function getFilterVariables(
  params: BookingListUrlFilters
): OrderFilterInput {
  return {
    hasBooking: true,
    bookingDate: getGteLteVariables({
      gte: params.bookingFrom,
      lte: params.bookingTo
    }),
    bookableResourceName: params.bookableResource,
    customer: params.customer,
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<BookingFilterKeys>
): BookingListUrlFilters {
  const { name } = filter;

  switch (name) {
    case BookingFilterKeys.bookingDate:
      return getMinMaxQueryParam(
        filter,
        BookingListUrlFiltersEnum.bookingFrom,
        BookingListUrlFiltersEnum.bookingTo
      );

    case BookingFilterKeys.bookableResource:
      return getSingleValueQueryParam(
        filter,
        BookingListUrlFiltersEnum.bookableResource
      );

    case BookingFilterKeys.customer:
      return getSingleValueQueryParam(
        filter,
        BookingListUrlFiltersEnum.customer
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<BookingListUrlFilters>(BOOKING_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  BookingListUrlQueryParams,
  BookingListUrlFilters
>({ ...BookingListUrlFiltersEnum });
