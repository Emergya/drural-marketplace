import { storiesOf } from "@storybook/react";
import React from "react";

import { IMAGE_CATEGORIES } from "../fixtures";
import { CategoryImageList } from "./CategoryImageList";

storiesOf("@components/organisms/CategoryList", module)
  .addParameters({ component: CategoryImageList })
  .add("CategoryImageList", () => (
    <CategoryImageList
      categories={IMAGE_CATEGORIES}
      canLoadMore
      loading={false}
      onLoadMore={() => null}
      testingContextId="testCategory"
    />
  ));
