import { OrderList_orders_edges_node } from "@saleor/orders/types/OrderList";
import { BookingListUrlSortField } from "@saleor/orders/urls";
import { ListProps, SortPage } from "@saleor/types";

export interface IBookingListProps
  extends ListProps,
    SortPage<BookingListUrlSortField> {
  orders: OrderList_orders_edges_node[];
}
