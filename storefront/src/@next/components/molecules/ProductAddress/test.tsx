import "jest-styled-components";

import { mount, ReactWrapper } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { dRuralTheme } from "@styles";

import { ProductAddress } from ".";
import { PRODUCT_ADDRESS } from "./fixures";

describe("<ProductInfo />", () => {
  // 1. Variables
  let wrapper: ReactWrapper;

  // 2. Wrapper
  beforeEach(() => {
    wrapper = mount(<ProductAddress address={PRODUCT_ADDRESS} />);
  });

  // 3. Tests
  it("exists", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("contains provided data", () => {
    expect(wrapper.text()).toContain(PRODUCT_ADDRESS.postalCode);
    expect(wrapper.text()).toContain(PRODUCT_ADDRESS.street);
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={dRuralTheme}>
          <ProductAddress address={PRODUCT_ADDRESS} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
