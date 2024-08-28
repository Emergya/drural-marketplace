import React from "react";
import { FormattedMessage } from "react-intl";

import { priceFilterMaxValue } from "@temp/constants";

import { RangeInput } from "../RangeInput/Range/RangeInput";
import * as S from "./styles";
import { IProps } from "./types";

export const SearchPriceTile: React.FC<IProps> = ({ price, onChange }) => {
  return (
    <S.Overlay onClick={event => event.stopPropagation()}>
      <h4>
        <FormattedMessage defaultMessage="Select price range" />
      </h4>
      <RangeInput
        value={[price[0], price[1]]}
        min={0}
        max={priceFilterMaxValue}
        step={10}
        units="€"
        unlimited
        onChange={onChange}
        zIndex={20}
      />
    </S.Overlay>
  );
};
