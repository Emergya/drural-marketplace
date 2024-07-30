import DRuralIconPositive from "@assets/images/dRuralLogos/Icon-Positive.svg";
import { BusinessSelector } from "@saleor/components/BusinessSelector";
import { storiesOf } from "@storybook/react";
import React from "react";

import Decorator from "../../Decorator";

storiesOf("Generics / BusinessSelector", module)
  .addDecorator(Decorator)
  .add("default", () => (
    <BusinessSelector
      activeItemName="dRuralShop"
      activeItemImage={DRuralIconPositive}
      activeItemIndex={0}
      onActiveItem={null}
      itemList={["dRuralShop-1", "dRuralShop-2"]}
      listTitle="My Shops"
      lastItemName="See all my shops"
    />
  ));
