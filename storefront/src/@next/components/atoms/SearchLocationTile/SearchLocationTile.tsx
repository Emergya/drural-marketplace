import React from "react";
import { FormattedMessage } from "react-intl";

import { locationFilterMaxValue } from "@temp/constants";

import { SliderInput } from "../RangeInput/Slider/SliderInput";
import * as S from "./styles";
import { IProps } from "./types";

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
        max={locationFilterMaxValue}
        step={10}
        units="Km"
        unlimited
        onChange={onChange}
        zIndex={20}
      />
    </S.Overlay>
  );
};
