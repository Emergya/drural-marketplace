import { IOrder } from "@saleor/users/_types/IOrder";

export interface UserOrdersProps {
  orders: IOrder[];
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
}
