import { Range } from "rc-slider";
import React from "react";

import * as S from "../styles";
import { IRangeProps } from "../types";
import { handleWithUnits } from "../utils";

import "rc-slider/assets/index.css";

export const RangeInput: React.FC<IRangeProps> = ({
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
      <Range
        dotStyle={S.rangeInput.dotStyle}
        marks={marks}
        max={max}
        min={min}
        railStyle={S.rangeInput.rialStyle}
        step={step}
        trackStyle={[S.rangeInput.trackStyle]}
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
