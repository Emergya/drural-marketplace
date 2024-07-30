import React from "react";
import { useIntl } from "react-intl";

import { EUR_TO_HRK_RATE } from "@temp/constants";
import { Currency } from "@types";
import { convertEuroToKuna } from "@utils/money";

import * as S from "./styles";
import { IProps } from "./types";
import { formatMoney } from "./utils";

export const Money: React.FC<IProps> = ({
  money,
  defaultValue,
  ...props
}: IProps) => {
  const { locale } = useIntl();

  if (!money) {
    return <span {...props}>{defaultValue}</span>;
  }

  return (
    <S.Wrapper>
      <S.Money>{formatMoney(money, locale)}</S.Money>
      {EUR_TO_HRK_RATE && money.currency === Currency.EUR && (
        <S.ConvertedMoney>
          {formatMoney(
            {
              amount: convertEuroToKuna(money.amount),
              currency: Currency.HRK,
            },
            locale
          )}
        </S.ConvertedMoney>
      )}
    </S.Wrapper>
  );
};

Money.displayName = "Money";
export default Money;
