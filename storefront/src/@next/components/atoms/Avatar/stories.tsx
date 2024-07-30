import { storiesOf } from "@storybook/react";
import React from "react";

import { Avatar } from ".";

storiesOf("@components/atoms/Avatar", module)
  .addParameters({ component: Avatar })
  .add("default", () => <Avatar />)
  .add("image", () => <Avatar source="image" />);
