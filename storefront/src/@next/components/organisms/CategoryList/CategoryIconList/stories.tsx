import { storiesOf } from "@storybook/react";
import React from "react";

import { ICON_CATEGORIES } from "../fixtures";
import { CategoryIconList } from "./CategoryIconList";

storiesOf("@components/organisms/CategoryList", module)
  .addParameters({ component: CategoryIconList })
  .add("CategoryIconList", () => (
    <CategoryIconList
      categories={ICON_CATEGORIES}
      canLoadMore
      loading={false}
      onLoadMore={() => null}
      testingContextId="testCategory"
    />
  ));
