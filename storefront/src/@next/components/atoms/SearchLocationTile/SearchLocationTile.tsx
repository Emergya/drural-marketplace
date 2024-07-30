import React from "react";
import { FormattedMessage } from "react-intl";

import * as SliderStyles from "@components/atoms/RangeInput/styles";

import { SliderInput } from "../RangeInput/Slider/SliderInput";
import * as S from "./styles";
import { IProps } from "./types";

const sliderMarks = {
  100: {
    label: "100 Km",
    style: SliderStyles.rangeInput.markStyle,
  },
};

export const SearchLocationTile: React.FC<IProps> = ({
  distance,
  onChange,
}) => {
  return (
    <S.Overlay onClick={event => event.stopPropagation()}>
      <h4>
        <FormattedMessage defaultMessage="Distance from my location:" />
      </h4>
      <SliderInput
        value={distance}
        min={0}
        max={1000}
        step={10}
        marks={sliderMarks}
        units="Km"
        onChange={onChange}
        zIndex={20}
      />
    </S.Overlay>
  );
};
