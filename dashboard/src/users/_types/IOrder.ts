import { PaymentChargeStatusEnum } from "@saleor/types/globalTypes";

import { ITaxedMoney } from "../../utils/_types/ITaxedMoney";

export interface IOrder {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  created: any;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum;
  /**
   * Total amount of the order.
   */
  total: ITaxedMoney;
}
