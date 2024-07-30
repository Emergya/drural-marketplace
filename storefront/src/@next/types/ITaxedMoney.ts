import { IMoney } from "@components/containers/Money/types";

export interface ITaxedMoney {
  net: IMoney;
  gross: IMoney;
}
