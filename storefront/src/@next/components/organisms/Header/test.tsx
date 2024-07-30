import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";

import { Header } from "./Header";

const DEFAULT_PROPS = {
  handleSignOut: jest.fn(),
  loading: false,
  user: null,
  location: "/",
  query: "",
  onQueryChange: () => {},
  suggestions: [],
  onSearchItemClick: () => {},
  distance: 100,
  onDistanceChange: () => {},
  price: [],
  onPriceChange: () => {},
  onSubmit: () => {},
  onMobileItemClick: () => {},
  resetSearch: () => {},
};

describe("<Header />", () => {
  it("exists", () => {
    const wrapper = shallow(<Header {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
