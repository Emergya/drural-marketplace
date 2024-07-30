import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductReviews } from ".";
import { PRODUCT_REVIEWS } from "./fixures";

storiesOf("@components/molecules/ProductReviews", module)
  .addParameters({
    component: ProductReviews,
  })
  .add("default", () => (
    <ProductReviews
      product={PRODUCT_REVIEWS}
      onClick={action("click")}
      onDelete={id => action(id)}
    />
  ));
