import "jest-styled-components";

import { mount, ReactWrapper } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { dRuralTheme } from "@styles";

import { ProductCompany } from ".";
import { PRODUCT_COMPANY } from "./fixures";

describe("<ProductInfo />", () => {
  // 1. Variables
  let wrapper: ReactWrapper;

  // 2. Wrapper
  beforeEach(() => {
    wrapper = mount(<ProductCompany company={PRODUCT_COMPANY} />);
  });

  // 3. Tests
  it("exists", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("contains provided data", () => {
    expect(wrapper.text()).toContain(PRODUCT_COMPANY.publicName);
    expect(wrapper.text()).toContain(PRODUCT_COMPANY.products?.totalCount);
    expect(wrapper.find("img").at(0).prop("src")).toBe(
      PRODUCT_COMPANY.imageUrl
    );
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={dRuralTheme}>
          <ProductCompany company={PRODUCT_COMPANY} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
