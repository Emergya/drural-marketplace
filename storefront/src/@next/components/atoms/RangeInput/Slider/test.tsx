import "jest-styled-components";

import { mount, ReactWrapper } from "enzyme";
import Slider from "rc-slider";
import React from "react";

import * as S from "../styles";
import { SliderInput } from "./SliderInput";

describe("<RangeInput />", () => {
  // 1. Variables
  let wrapper: ReactWrapper;
  const value = 20;
  const min = 0;
  const max = 100;
  const step = 5;
  const marks = {
    50: {
      label: "50 €",
      style: S.rangeInput.markStyle,
    },
  };
  const units = "€";

  // 2. Wrapper
  beforeEach(() => {
    wrapper = mount(
      <SliderInput
        value={value}
        min={min}
        max={max}
        step={step}
        marks={marks}
        units={units}
      />
    );
  });

  // 3. Tests
  it("exists", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("passes correct props", () => {
    expect(wrapper.find(Slider).props().value).toEqual(value);
    expect(wrapper.find(Slider).props().min).toEqual(min);
    expect(wrapper.find(Slider).props().max).toEqual(max);
    expect(wrapper.find(Slider).props().step).toEqual(step);
    expect(wrapper.find(Slider).props().marks).toEqual(marks);
    expect(wrapper.text()).toContain(units);
  });
});
