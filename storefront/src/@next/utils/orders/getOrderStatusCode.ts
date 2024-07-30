import { OrderStatus } from "gqlTypes/globalTypes";

import { ColorStatusEnum } from "../../types/ColorStatusEnum";

export const getOrderStatusCode = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELED:
      return ColorStatusEnum.error;
    case OrderStatus.DRAFT:
      return ColorStatusEnum.neutral;
    case OrderStatus.FULFILLED:
      return ColorStatusEnum.success;
    case OrderStatus.PARTIALLY_FULFILLED:
      return ColorStatusEnum.alert;
    case OrderStatus.PARTIALLY_RETURNED:
      return ColorStatusEnum.alert;
    case OrderStatus.RETURNED:
      return ColorStatusEnum.neutral;
    case OrderStatus.UNCONFIRMED:
      return ColorStatusEnum.neutral;
    case OrderStatus.UNFULFILLED:
      return ColorStatusEnum.neutral;
    default:
      return ColorStatusEnum.neutral;
  }
};
