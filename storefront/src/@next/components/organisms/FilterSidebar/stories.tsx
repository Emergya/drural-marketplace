import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { FilterSidebar } from ".";
import { categories, categoriesFilter, DEFAULT_PROPS } from "./testData";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

storiesOf("@components/organisms/FilterSidebar", module)
  .addParameters({ component: FilterSidebar })
  .add("default", () => (
    <FilterSidebar
      target={portalRoot}
      {...DEFAULT_PROPS}
      hide={action("hide")}
      onAttributeFiltersChange={action("onAttributesFiltersChange")}
      categories={categories}
      categoriesFilter={categoriesFilter}
      onCategoriesFilterChange={action("click")}
      distance={500}
      onDistanceFilterChange={action("click")}
      priceLte={0}
      priceGte={500}
      onPriceFilterChange={action("click")}
    />
  ));
