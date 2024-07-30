import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchbarDesktop } from ".";

const suggestions = [
  { id: "874590380fdaf", name: "home electronics" },
  { id: "874590380f123f", name: "health" },
  { id: "874dfg380fdaf", name: "food and snacks" },
];

storiesOf("@components/organisms/SearchbarDesktop", module)
  .addParameters({ component: SearchbarDesktop })
  .add("default", () => (
    <SearchbarDesktop
      suggestions={suggestions}
      query=""
      onQueryChange={action("change query")}
      onSearchItemClick={action("click suggestion")}
      distance={50}
      onDistanceChange={action("click distance")}
      price={[20, 60]}
      onPriceChange={action("click price")}
      onSubmit={action("submit")}
    />
  ));
