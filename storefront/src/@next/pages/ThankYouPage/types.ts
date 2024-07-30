import { OrderStatus } from "@drural/sdk";

export type IProps = {
  query: {
    orderNumber?: string;
    token?: string;
    orderStatus?: OrderStatus;
  };
};
