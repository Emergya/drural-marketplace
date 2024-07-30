import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchLocationTile } from "./SearchLocationTile";

storiesOf("@components/atoms/SearchLocationTile", module)
  .addParameters({ component: SearchLocationTile })
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
      <SearchLocationTile distance={50} onChange={action("onchange slider")} />
    </div>
  ));
