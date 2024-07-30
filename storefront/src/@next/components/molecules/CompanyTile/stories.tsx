import { storiesOf } from "@storybook/react";
import React from "react";

import { CompanyTile } from ".";

storiesOf("@components/molecules/CompanyTile", module)
  .addParameters({ component: CompanyTile })
  .add("default", () => (
    <CompanyTile
      address="c/ Manuel Cacicedo 12"
      image={{ url: "" }}
      publishedProducts={0}
      rating={3}
      title="Company one"
    />
  ));
