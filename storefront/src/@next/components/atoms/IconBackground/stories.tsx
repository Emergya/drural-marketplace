import { storiesOf } from "@storybook/react";
import React from "react";

import { IconBackground } from "@components/atoms";

storiesOf("@components/atoms/IconBackground", module)
  .addParameters({ component: IconBackground })
  .add("default icon", () => (
    <IconBackground iconId={null} iconBackgroundSize="144px" iconSize={42} />
  ))
  .add("custom icon", () => (
    <IconBackground
      iconId="UilAmazon"
      iconBackgroundSize="144px"
      iconSize={42}
    />
  ));
