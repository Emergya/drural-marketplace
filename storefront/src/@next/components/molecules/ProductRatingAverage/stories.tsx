import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductRatingAverage } from ".";
import { DEFAULT_PROPS } from "./fixures";

storiesOf("@components/molecules/ProductRatingAverage", module)
  .addParameters({
    component: ProductRatingAverage,
  })
  .add("default", () => <ProductRatingAverage {...DEFAULT_PROPS} />);
