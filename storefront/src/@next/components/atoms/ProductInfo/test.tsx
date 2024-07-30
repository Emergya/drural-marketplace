import "jest-styled-components";

import { mount, ReactWrapper } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { dRuralTheme } from "@styles";

import { ProductInfo } from ".";
import { DEFAULT_PROPS } from "./fixures";

describe("<ProductInfo />", () => {
  // 1. Variables
  let wrapper: ReactWrapper;

  // 2. Wrapper
  beforeEach(() => {
    wrapper = mount(<ProductInfo {...DEFAULT_PROPS} />);
  });

  // 3. Tests
  it("exists", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("contains provided data", () => {
    const keys = Object.keys(DEFAULT_PROPS);

    keys.map(value => {
      if (value !== "data") {
        expect(wrapper.text()).toContain((DEFAULT_PROPS as any)[value]);
      }
    });
    expect(wrapper.text()).toContain("This is the product description");
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={dRuralTheme}>
          <ProductInfo {...DEFAULT_PROPS} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
