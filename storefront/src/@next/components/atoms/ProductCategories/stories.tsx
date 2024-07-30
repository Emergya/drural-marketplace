import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductCategories } from "..";
import { PRODUCT_CATEGORIES } from "./fixures";

storiesOf("@components/atoms/ProductCategories", module)
  .addParameters({ component: ProductCategories })
  .add("default", () => <ProductCategories categories={PRODUCT_CATEGORIES} />);
