import "jest-styled-components";

import { mount, ReactWrapper } from "enzyme";
import { Range } from "rc-slider";
import React from "react";

import * as S from "../styles";
import { RangeInput } from "./RangeInput";

describe("<RangeInput />", () => {
  // 1. Variables
  let wrapper: ReactWrapper;
  const value = [20, 50];
  const min = 0;
  const max = 100;
  const step = 5;
  const marks = {
    100: {
      label: "100 €",
      style: S.rangeInput.markStyle,
    },
  };
  const units = "€";

  // 2. Wrapper
  beforeEach(() => {
    wrapper = mount(
      <RangeInput
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
    expect(wrapper.find(Range).props().value).toEqual(value);
    expect(wrapper.find(Range).props().min).toEqual(min);
    expect(wrapper.find(Range).props().max).toEqual(max);
    expect(wrapper.find(Range).props().step).toEqual(step);
    expect(wrapper.find(Range).props().marks).toEqual(marks);
    expect(wrapper.text()).toContain(units);
  });
});
