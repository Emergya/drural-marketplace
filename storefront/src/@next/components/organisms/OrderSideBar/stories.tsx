import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SORT_OPTIONS } from "@utils/collections";

import { OrderSideBar } from "./OrderSideBar";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

storiesOf("@components/organisms/OrderSideBar", module).add("default", () => (
  <OrderSideBar
    show
    hide={action("hide")}
    onChange={action("onClickSortOption")}
    sortOptions={SORT_OPTIONS}
  />
));
