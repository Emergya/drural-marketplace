import { ColumnPickerChoice } from "@saleor/components/ColumnPicker";
import { StatusType } from "@saleor/components/StatusChip/types";
import { StatusLabelProps } from "@saleor/components/StatusLabel";
import { OrderList_orders_edges_node_payments } from "@saleor/orders/types/OrderList";
import { OrderListUrlSortField } from "@saleor/orders/urls";
import { ListProps, SortPage } from "@saleor/types";

import { OrderList_orders_edges_node } from "../../types/OrderList";
import { OrderListColumns } from "../OrderListPage/types";

export interface OrderListProps
  extends ListProps<OrderListColumns>,
    SortPage<OrderListUrlSortField> {
  orders: OrderList_orders_edges_node[];
  columns: ColumnPickerChoice[];
}

export interface OrderNodeStatusModified
  extends Omit<OrderList_orders_edges_node, "paymentStatus" | "status"> {
  paymentStatus: {
    localized: string;
    status: StatusLabelProps["status"];
  };
  status: {
    localized: string;
    status: StatusType;
  };
}

export type AmountType = keyof Omit<
  OrderList_orders_edges_node_payments,
  "__typename"
>;
