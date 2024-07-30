import { storiesOf } from "@storybook/react";
import React from "react";

import { Review } from ".";
import { PRODUCT_REVIEW } from "./fixures";

storiesOf("@components/molecules/Review", module)
  .addParameters({
    component: Review,
  })
  .add("default", () => <Review review={PRODUCT_REVIEW} />);
