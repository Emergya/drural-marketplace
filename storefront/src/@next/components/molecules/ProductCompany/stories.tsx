import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductCompany } from ".";
import { PRODUCT_COMPANY } from "./fixures";

storiesOf("@components/molecules/ProductCompany", module)
  .addParameters({
    component: ProductCompany,
  })
  .add("default", () => <ProductCompany company={PRODUCT_COMPANY} />);
