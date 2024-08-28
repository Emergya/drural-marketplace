import Slider from "rc-slider";
import React from "react";

import * as S from "../styles";
import { ISliderProps } from "../types";
import { handleWithUnits } from "../utils";

import "rc-slider/assets/index.css";

export const SliderInput: React.FC<ISliderProps> = ({
  marks,
  max,
  min,
  step,
  units,
  unlimited,
  value,
  zIndex,
  onChange,
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  return (
    <S.StyleWrapper ref={parentRef} style={{ position: "relative" }}>
      <Slider
        dotStyle={S.rangeInput.dotStyle}
        marks={marks}
        max={max}
        min={min}
        railStyle={S.rangeInput.rialStyle}
        step={step}
        trackStyle={S.rangeInput.trackStyle}
        value={value}
        handle={handleWithUnits({
          unlimited,
          units,
          zIndex,
          getTooltipContainer: () => parentRef.current!,
        })}
        onChange={onChange}
      />
    </S.StyleWrapper>
  );
};
