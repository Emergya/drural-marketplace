import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchListTile } from ".";

const suggestions = [
  { id: "874590380fdaf", name: "home electronics" },
  { id: "874590380f123f", name: "health" },
  { id: "874dfg380fdaf", name: "food and snacks" },
];

storiesOf("@components/atoms/SearchListTile", module)
  .addParameters({ component: SearchListTile })
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
      <SearchListTile
        suggestions={suggestions}
        onClick={action("click suggestion")}
      />
    </div>
  ));
