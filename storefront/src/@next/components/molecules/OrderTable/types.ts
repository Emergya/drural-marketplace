import { OrdersByUser_me_orders_edges_node } from "@drural/sdk/lib/queries/gqlTypes/OrdersByUser";

export interface IProps {
  orders: OrdersByUser_me_orders_edges_node[];
  isGuest: boolean;
}
