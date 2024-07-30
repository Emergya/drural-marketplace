import { IMoney } from "./types";

export const formatMoney = (money: IMoney, locale: string) => {
  try {
    const formattedMoney = money.amount.toLocaleString(locale, {
      currency: money.currency,
      style: "currency",
    });
    return formattedMoney;
  } catch (error) {
    return `${money.amount} ${money.currency}`;
  }
};
