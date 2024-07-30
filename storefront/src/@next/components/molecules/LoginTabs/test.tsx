import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";

import { LoginTabs } from ".";

const DEFAULT_PROPS = {
  active: "login" as "login",
  setActive: jest.fn(),
};

describe("<LoginTabs />", () => {
  it("exists", () => {
    const renderTabs = shallow(<LoginTabs {...DEFAULT_PROPS} />);
    expect(renderTabs.exists()).toEqual(true);
  });
});
