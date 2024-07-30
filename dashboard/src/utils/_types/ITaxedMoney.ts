import { IMoney } from "./IMoney";

export interface ITaxedMoney {
  __typename: "TaxedMoney";
  currency?: string;
  gross?: IMoney;
  net?: IMoney;
  tax?: IMoney;
}
