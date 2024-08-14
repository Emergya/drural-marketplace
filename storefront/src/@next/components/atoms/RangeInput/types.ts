import { RangeProps, SliderProps } from "rc-slider";
import { GenericSliderProps } from "rc-slider/lib/interface";

// Props
export interface IGeneralProps {
  min?: GenericSliderProps["min"];
  marks?: GenericSliderProps["marks"];
  max?: GenericSliderProps["max"];
  step?: GenericSliderProps["step"];
  unlimited?: boolean;
  units: string;
  zIndex?: number;
}

export interface ISliderProps extends IGeneralProps {
  value?: SliderProps["value"];
  onChange?: SliderProps["onChange"];
}

export interface IRangeProps extends IGeneralProps {
  value?: RangeProps["value"];
  onChange?: RangeProps["onChange"];
}

// Handle funtion
export type HandleWithUnits = (
  params: HandleWithUnitsParams
) => SliderProps["handle"];

interface HandleWithUnitsParams {
  units: string;
  unlimited?: boolean;
  zIndex?: number;
  getTooltipContainer?: (node: HTMLElement) => HTMLElement;
}
