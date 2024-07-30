import { IMoney } from "@components/containers/Money/types";
import { EUR_TO_HRK_RATE } from "@temp/constants";

export const isPriceEqual = (first: IMoney, second: IMoney) =>
  first.amount === second.amount && first.currency === second.currency;

export const convertEuroToKuna = (eur: string | number): number => {
  if (typeof eur === "string") {
    eur = parseFloat(eur);
  }
  if (!eur) {
    eur = 0;
  }
  return eur * (EUR_TO_HRK_RATE || 1);
};
