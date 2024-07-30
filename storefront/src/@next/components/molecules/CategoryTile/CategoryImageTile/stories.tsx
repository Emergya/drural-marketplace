import { storiesOf } from "@storybook/react";
import React from "react";

import { CategoryImageTile } from "..";
import { IMAGE_CATEGORY } from "../fixtures";

storiesOf("@components/molecules/CategoryTile", module)
  .addParameters({ component: CategoryImageTile })
  .add("CategoryImageTile", () => (
    <div style={{ width: "400px" }}>
      <CategoryImageTile category={IMAGE_CATEGORY} />
    </div>
  ));
