import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchPriceTile } from "./SearchPriceTile";

storiesOf("@components/atoms/SearchPriceTile", module)
  .addParameters({ component: SearchPriceTile })
  .add("default", () => (
    <div
      style={{
        width: "376px",
        height: "112px",
        backgroundColor: "white",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      <SearchPriceTile price={[10, 60]} onChange={action("onchange slider")} />
    </div>
  ));
