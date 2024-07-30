import { PaymentChargeStatusEnum } from "@drural/sdk";

import { ColorStatusEnum } from "../../types/ColorStatusEnum";

export const getPaymentStatusCode = (status: PaymentChargeStatusEnum) => {
  switch (status) {
    case PaymentChargeStatusEnum.FULLY_CHARGED:
      return ColorStatusEnum.success;
    case PaymentChargeStatusEnum.FULLY_REFUNDED:
      return ColorStatusEnum.neutral;
    case PaymentChargeStatusEnum.NOT_CHARGED:
      return ColorStatusEnum.error;
    case PaymentChargeStatusEnum.PARTIALLY_CHARGED:
      return ColorStatusEnum.alert;
    case PaymentChargeStatusEnum.PARTIALLY_REFUNDED:
      return ColorStatusEnum.alert;
    case PaymentChargeStatusEnum.PENDING:
      return ColorStatusEnum.alert;
    case PaymentChargeStatusEnum.REFUSED:
      return ColorStatusEnum.error;
    default:
      return ColorStatusEnum.neutral;
  }
};
