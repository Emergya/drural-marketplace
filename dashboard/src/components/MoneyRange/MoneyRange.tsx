import { Typography } from "@material-ui/core";
import { EUR_TO_HRK_RATE } from "@saleor/config";
import { Currency } from "@saleor/utils/_types/Currency";
import { convertEuroToKuna } from "@saleor/utils/money";
import React from "react";
import { useIntl } from "react-intl";

import { LocaleConsumer } from "../Locale";
import { formatMoney, IMoney } from "../Money";
import { useStyles } from "./styles";

export interface MoneyRangeProps {
  from?: IMoney;
  to?: IMoney;
}

export const MoneyRange: React.FC<MoneyRangeProps> = ({ from, to }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <div>
          <Typography className={classes.orginialMoney}>
            {from && to
              ? intl.formatMessage(
                  {
                    defaultMessage: "{fromMoney} - {toMoney}",
                    description: "money"
                  },
                  {
                    fromMoney: formatMoney(from, locale),
                    toMoney: formatMoney(to, locale)
                  }
                )
              : from && !to
              ? intl.formatMessage(
                  {
                    defaultMessage: "from {money}",
                    description: "money"
                  },
                  {
                    money: formatMoney(from, locale)
                  }
                )
              : !from && to
              ? intl.formatMessage(
                  {
                    defaultMessage: "to {money}",
                    description: "money"
                  },
                  {
                    money: formatMoney(to, locale)
                  }
                )
              : "-"}
          </Typography>

          {EUR_TO_HRK_RATE &&
          (from?.currency === Currency.EUR || to?.currency === Currency.EUR) ? (
            <Typography className={classes.convertedMoney}>
              {from && to
                ? intl.formatMessage(
                    {
                      defaultMessage: "{fromMoney} - {toMoney}",
                      description: "money"
                    },
                    {
                      fromMoney: formatMoney(
                        {
                          amount: convertEuroToKuna(from.amount),
                          currency: Currency.HRK
                        },
                        locale
                      ),
                      toMoney: formatMoney(
                        {
                          amount: convertEuroToKuna(to.amount),
                          currency: Currency.HRK
                        },
                        locale
                      )
                    }
                  )
                : from && !to
                ? intl.formatMessage(
                    {
                      defaultMessage: "from {money}",
                      description: "money"
                    },
                    {
                      money: formatMoney(
                        {
                          amount: convertEuroToKuna(from.amount),
                          currency: Currency.HRK
                        },
                        locale
                      )
                    }
                  )
                : !from && to
                ? intl.formatMessage(
                    {
                      defaultMessage: "from {money}",
                      description: "money"
                    },
                    {
                      money: formatMoney(
                        {
                          amount: convertEuroToKuna(to.amount),
                          currency: Currency.HRK
                        },
                        locale
                      )
                    }
                  )
                : "-"}
            </Typography>
          ) : null}
        </div>
      )}
    </LocaleConsumer>
  );
};

MoneyRange.displayName = "MoneyRange";
export default MoneyRange;
