import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductAddress } from ".";
import { PRODUCT_ADDRESS } from "./fixures";

storiesOf("@components/molecules/ProductAddress", module)
  .addParameters({
    component: ProductAddress,
  })
  .add("default", () => <ProductAddress address={PRODUCT_ADDRESS} />);
