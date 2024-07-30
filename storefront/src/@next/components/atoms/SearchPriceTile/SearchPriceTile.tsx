import React from "react";
import { FormattedMessage } from "react-intl";

import * as SliderStyles from "@components/atoms/RangeInput/styles";

import { RangeInput } from "../RangeInput/Range/RangeInput";
import * as S from "./styles";
import { IProps } from "./types";

const sliderMarks = {
  100: {
    label: "100 €",
    style: SliderStyles.rangeInput.markStyle,
  },
};

export const SearchPriceTile: React.FC<IProps> = ({ price, onChange }) => {
  return (
    <S.Overlay onClick={event => event.stopPropagation()}>
      <h4>
        <FormattedMessage defaultMessage="Select price range" />
      </h4>
      <RangeInput
        value={[price[0], price[1]]}
        min={0}
        max={100}
        step={10}
        marks={sliderMarks}
        units="€"
        onChange={onChange}
        zIndex={20}
      />
    </S.Overlay>
  );
};
