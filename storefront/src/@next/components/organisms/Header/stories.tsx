import { Story } from "@storybook/react";
import React from "react";

import { user } from "./fixtures";
import { Header } from "./Header";
import { IProps } from "./types";

export default {
  title: "@components/organisms/Header",
  component: Header,
};

const Template: Story<IProps> = args => <Header {...args} />;

export const LogInFrontPage = Template.bind({});
LogInFrontPage.args = { loading: false, location: "/", user: null };

export const LogInSecondaryPageOrScroll = Template.bind({});
LogInSecondaryPageOrScroll.args = {
  loading: false,
  location: "/other-page",
  user: null,
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

export const LoggedFrontPage = Template.bind({});
LoggedFrontPage.args = {
  loading: false,
  location: "/",
  user,
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

export const LoggedOtherPageOrScroll = Template.bind({});
LoggedOtherPageOrScroll.args = {
  loading: false,
  location: "/other-page",
  user,
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
