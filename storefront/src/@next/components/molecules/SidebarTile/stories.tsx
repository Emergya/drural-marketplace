import { storiesOf } from "@storybook/react";
import React from "react";

import { FraudulentProductReportQuery_product } from "@pages/ProductReport/gqlTypes/FraudulentProductReportQuery";

import { SidebarTile } from ".";

const product: FraudulentProductReportQuery_product = {
  __typename: "Product",
  id: "1",
  name: "Product 1",
  slug: "product-1",
  thumbnail: {
    __typename: "Image",
    alt: "",
    url: "https://unsplash.com/photos/7ZWVnVSaafY",
  },
  thumbnail2x: {
    __typename: "Image",
    url: "https://unsplash.com/photos/7ZWVnVSaafY",
  },
};

storiesOf("@components/molecules/SidebarItemTile", module)
  .addParameters({ component: SidebarTile })
  .add("default", () => (
    <SidebarTile
      title="Reporting service"
      image={{ thumbnail: product.thumbnail, thumbnail2x: product.thumbnail2x }}
      itemName="Service 01"
    />
  ));
