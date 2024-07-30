import { storiesOf } from "@storybook/react";
import React from "react";

import { StarsRating } from ".";

storiesOf("@components/atoms/Rating", module)
  .addParameters({ component: StarsRating })
  .add("default", () => <StarsRating />);
