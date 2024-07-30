import "jest-styled-components";

import { mount, ReactWrapper } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { dRuralTheme } from "@styles";

import { ProductRatingAverage } from ".";
import { DEFAULT_PROPS } from "./fixures";

describe("<ProductInfo />", () => {
  // 1. Variables
  let wrapper: ReactWrapper;

  // 2. Wrapper
  beforeEach(() => {
    wrapper = mount(<ProductRatingAverage {...DEFAULT_PROPS} />);
  });

  // 3. Tests
  it("exists", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("contains provided data", () => {
    expect(wrapper.find("StarsRating").prop("rating")).toBe(
      DEFAULT_PROPS.rating
    );
    expect(wrapper.text()).toContain(DEFAULT_PROPS.reviewsCount);
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={dRuralTheme}>
          <ProductRatingAverage {...DEFAULT_PROPS} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
