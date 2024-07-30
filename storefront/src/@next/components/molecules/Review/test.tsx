import "jest-styled-components";

import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { dRuralTheme } from "@styles";

import { Review } from ".";
import { PRODUCT_REVIEW } from "./fixures";

describe("<ProductInfo />", () => {
  // 1. Variables
  let wrapper: ShallowWrapper;

  // 2. Wrapper
  beforeEach(() => {
    wrapper = shallow(<Review review={PRODUCT_REVIEW} />);
  });

  // 3. Tests
  it("exists", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("contains provided data", () => {
    expect(wrapper.text()).toContain(PRODUCT_REVIEW.user);
    expect(wrapper.find("StarsRating").prop("rating")).toBe(
      PRODUCT_REVIEW.rating
    );
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={dRuralTheme}>
          <Review review={PRODUCT_REVIEW} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
