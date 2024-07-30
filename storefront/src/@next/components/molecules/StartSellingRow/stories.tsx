import { storiesOf } from "@storybook/react";
import React from "react";

import { StartSellingRow } from "@components/molecules";

storiesOf("@components/molecules/StartSellingRow", module)
  .addParameters({ component: StartSellingRow })
  .add("default", () => (
    <StartSellingRow
      title="Sell your services in dRural"
      description="Millions of shoppers are waiting for you to join"
      buttonText="Start selling now"
      onButtonClick={() => null}
    />
  ));
