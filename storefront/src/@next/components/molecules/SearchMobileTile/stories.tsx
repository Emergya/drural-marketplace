import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchMobileTile } from "./SearchMobileTile";

const suggestions = [
  { id: "874590380fdaf", name: "home electronics" },
  { id: "874590380f123f", name: "health" },
  { id: "874dfg380fdaf", name: "food and snacks" },
];

storiesOf("@components/molecules/SearchMobileTile", module)
  .addParameters({ component: SearchMobileTile })
  .add("default", () => (
    <SearchMobileTile
      query=""
      suggestions={suggestions}
      onChange={action("change search")}
      onClose={action("close modal")}
      onItemClick={action("suggestion item click")}
      onSubmit={action("submit")}
    />
  ));
