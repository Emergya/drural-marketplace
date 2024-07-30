import { storiesOf } from "@storybook/react";
import React from "react";

import { attributes, descriptionJSON } from "./fixtures";
import { ProductDescription } from "./ProductDescription";

storiesOf("@components/molecules/ProductDescription", module)
  .addParameters({ component: ProductDescription })
  .add("default", () => (
    <ProductDescription attributes={attributes} description={descriptionJSON} />
  ));
