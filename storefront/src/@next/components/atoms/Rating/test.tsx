import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";

import { StarsRating } from ".";

describe("<StarsRating />", () => {
  it("exists", () => {
    const wrapper = shallow(<StarsRating />);

    expect(wrapper.exists()).toEqual(true);
  });
});
