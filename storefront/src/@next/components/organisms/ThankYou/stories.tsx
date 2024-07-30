import { OrderStatus } from "@drural/sdk";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ThankYou } from ".";

storiesOf("@components/organisms/ThankYou", module)
  .addParameters({ component: ThankYou })
  .add("default", () => (
    <ThankYou
      orderStatus={OrderStatus.UNFULFILLED}
      orderNumber="#341414"
      continueShoppingUrl="/"
      orderDetailsUrl="/order/xyz"
      onButtonClick={() => null}
    />
  ))
  .add("with order unfulfilled", () => (
    <ThankYou
      orderStatus={OrderStatus.UNFULFILLED}
      orderNumber="#341414"
      continueShoppingUrl="/"
      orderDetailsUrl="/order/xyz"
      onButtonClick={() => null}
    />
  ))
  .add("with order unconfirmed", () => (
    <ThankYou
      orderStatus={OrderStatus.UNCONFIRMED}
      orderNumber="#341414"
      continueShoppingUrl="/"
      orderDetailsUrl="/order/xyz"
      onButtonClick={() => null}
    />
  ));
