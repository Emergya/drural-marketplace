import Slider from "rc-slider";
import React from "react";

import * as S from "../styles";
import { ISliderProps } from "../types";
import { handleWithUnits } from "../utils";

import "rc-slider/assets/index.css";

export const SliderInput: React.FC<ISliderProps> = ({
  value,
  min,
  marks,
  max,
  onChange,
  step,
  units,
  zIndex,
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  return (
    <S.StyleWrapper ref={parentRef} style={{ position: "relative" }}>
      <Slider
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        step={step}
        marks={marks}
        handle={handleWithUnits(units, zIndex, () => parentRef.current!)}
        trackStyle={S.rangeInput.trackStyle}
        railStyle={S.rangeInput.rialStyle}
        dotStyle={S.rangeInput.dotStyle}
      />
    </S.StyleWrapper>
  );
};
