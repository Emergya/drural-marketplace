import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchInput } from ".";

storiesOf("@components/atoms/SearchInput", module)
  .addParameters({ component: SearchInput })
  .add("light", () => (
    <SearchInput placeholder="Search" theming="light" onChange={() => null} />
  ))
  .add("dark", () => (
    <SearchInput placeholder="Search" theming="dark" onChange={() => null} />
  ));
