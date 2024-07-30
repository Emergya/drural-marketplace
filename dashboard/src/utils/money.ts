import { EUR_TO_HRK_RATE } from "@saleor/config";

export const convertEuroToKuna = (eur: string | number): number => {
  if (typeof eur === "string") {
    eur = parseFloat(eur);
  }
  if (!eur) {
    eur = 0;
  }
  return eur * EUR_TO_HRK_RATE;
};
