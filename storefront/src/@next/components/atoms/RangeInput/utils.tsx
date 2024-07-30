import { Handle, SliderTooltip } from "rc-slider";
import React from "react";

import * as S from "./styles";
import { HandleWithUnits } from "./types";

type TypedAriaValueTextFormatter = (val: number) => string;

// Overlay & Handler
export const handleWithUnits: HandleWithUnits = (
  units,
  zIndex,
  getTooltipContainer
) => props => {
  const { ariaValueTextFormatter, value, index, ...restProps } = props;

  // Workaround to match ariaValueTextFormatter types.
  // rc-slider has a mismatching types between Slider.onCahnge({ ariaValueTextFormatter }) and Handle component ariaValueTextFormatter prop.
  const typedAriaValueTextFormatter = (ariaValueTextFormatter as unknown) as TypedAriaValueTextFormatter;

  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} ${units}`}
      visible
      placement="bottom"
      key={index}
      overlayInnerStyle={S.rangeInput.overlayInnerStyle}
      zIndex={zIndex}
      getTooltipContainer={getTooltipContainer}
    >
      <Handle
        {...restProps}
        ariaValueTextFormatter={typedAriaValueTextFormatter}
        style={S.rangeInput.handleStyle}
        value={value}
      >
        <div style={S.rangeInput.handleDotStyle} />
      </Handle>
    </SliderTooltip>
  );
};
