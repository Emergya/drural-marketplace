import { storiesOf } from "@storybook/react";
import React from "react";

import { CategoryIconTile } from "..";
import { ICON_CATEGORY } from "../fixtures";

storiesOf("@components/molecules/CategoryTile", module)
  .addParameters({ component: CategoryIconTile })
  .add("CategoryIconTile", () => (
    <div style={{ width: "400px" }}>
      <CategoryIconTile category={ICON_CATEGORY} />
    </div>
  ));
