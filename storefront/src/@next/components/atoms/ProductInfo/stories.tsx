import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductInfo } from "..";
import { DEFAULT_PROPS } from "./fixures";

storiesOf("@components/atoms/ProductInfo", module)
  .addParameters({ component: ProductInfo })
  .add("default", () => <ProductInfo {...DEFAULT_PROPS} />);
