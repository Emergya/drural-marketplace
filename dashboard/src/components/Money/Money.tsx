import { Typography } from "@material-ui/core";
import { EUR_TO_HRK_RATE } from "@saleor/config";
import { Currency } from "@saleor/utils/_types/Currency";
import classNames from "classnames";
import React from "react";

import { convertEuroToKuna } from "../../utils/money";
import { LocaleConsumer } from "../Locale";
import { useStyles } from "./styles";

export interface IMoney {
  amount: number;
  currency: string;
}
export interface MoneyProps {
  convertedMoneyClassName?: string;
  money: IMoney | null;
}

export const formatMoney = (money: IMoney, locale: string) => {
  try {
    const formattedMoney = money.amount.toLocaleString(locale, {
      currency: money.currency,
      style: "currency"
    });
    return formattedMoney;
  } catch (error) {
    return `${money.amount} ${money.currency}`;
  }
};

export const Money: React.FC<MoneyProps> = ({
  convertedMoneyClassName,
  money
}) => {
  const classes = useStyles();

  return money ? (
    <LocaleConsumer>
      {({ locale }) => (
        <div>
          <Typography className={classes.orginialMoney}>
            {formatMoney(money, locale)}
          </Typography>
          {EUR_TO_HRK_RATE && money.currency === Currency.EUR && (
            <Typography
              className={classNames(classes.convertedMoney, {
                [convertedMoneyClassName]: convertedMoneyClassName
              })}
            >
              {formatMoney(
                {
                  amount: convertEuroToKuna(money.amount),
                  currency: Currency.HRK
                },
                locale
              )}
            </Typography>
          )}
        </div>
      )}
    </LocaleConsumer>
  ) : (
    <>-</>
  );
};

Money.displayName = "Money";
export default Money;
