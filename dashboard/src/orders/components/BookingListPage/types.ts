import { RefreshLimits_shop_limits } from "@saleor/components/Shop/types/RefreshLimits";
import { OrderList_orders_edges_node } from "@saleor/orders/types/OrderList";
import { BookingListUrlSortField } from "@saleor/orders/urls";
import {
  FilterOpts,
  FilterPageProps,
  MinMax,
  PageListProps,
  SortPage
} from "@saleor/types";

export interface IBookingListPageProps
  extends PageListProps,
    FilterPageProps<BookingFilterKeys, BookingListFilterOpts>,
    SortPage<BookingListUrlSortField> {
  limits: RefreshLimits_shop_limits;
  orders: OrderList_orders_edges_node[];
}

export enum BookingFilterKeys {
  bookingDate = "bookingDate",
  bookableResource = "bookableResource",
  customer = "customer"
}

export interface BookingListFilterOpts {
  bookingDate: FilterOpts<MinMax>;
  bookableResource: FilterOpts<string>;
  customer: FilterOpts<string>;
}
