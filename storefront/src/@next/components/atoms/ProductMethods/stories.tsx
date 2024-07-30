import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductMethods } from ".";
import { DEFAULT_PROPS } from "./fixures";

storiesOf("@components/atoms/ProductMethods", module)
  .addParameters({
    component: ProductMethods,
  })
  .add("default", () => <ProductMethods {...DEFAULT_PROPS} />);
