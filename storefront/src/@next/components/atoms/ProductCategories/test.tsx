import "jest-styled-components";

import { mount, ReactWrapper } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { dRuralTheme } from "@styles";

import { ProductCategories } from ".";
import { PRODUCT_CATEGORIES } from "./fixures";

describe("<ProductInfo />", () => {
  // 1. Variables
  let wrapper: ReactWrapper;

  // 2. Wrapper
  beforeEach(() => {
    wrapper = mount(<ProductCategories categories={PRODUCT_CATEGORIES} />);
  });

  // 3. Tests
  it("exists", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("contains provided data", () => {
    PRODUCT_CATEGORIES.forEach(category => {
      expect(wrapper.text()).toContain(category.name);
    });
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={dRuralTheme}>
          <ProductCategories categories={PRODUCT_CATEGORIES} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
