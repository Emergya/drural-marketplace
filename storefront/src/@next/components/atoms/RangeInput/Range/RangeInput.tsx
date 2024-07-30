import { Range } from "rc-slider";
import React from "react";

import * as S from "../styles";
import { IRangeProps } from "../types";
import { handleWithUnits } from "../utils";

import "rc-slider/assets/index.css";

export const RangeInput: React.FC<IRangeProps> = ({
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
      <Range
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        step={step}
        marks={marks}
        handle={handleWithUnits(units, zIndex, () => parentRef.current!)}
        trackStyle={[S.rangeInput.trackStyle]}
        railStyle={S.rangeInput.rialStyle}
        dotStyle={S.rangeInput.dotStyle}
      />
    </S.StyleWrapper>
  );
};
