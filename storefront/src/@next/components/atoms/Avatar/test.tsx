import { shallow } from "enzyme";
import React from "react";

import { Avatar } from ".";

describe("<Icon />", () => {
  it("renders an icon", () => {
    const wrapper = shallow(<Avatar />);

    expect(wrapper.exists()).toEqual(true);
  });
});
