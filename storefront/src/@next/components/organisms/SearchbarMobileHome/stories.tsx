import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchbarMobileHome } from "./SearchbarMobileHome";

const suggestions = [
  { id: "874590380fdaf", name: "home electronics" },
  { id: "874590380f123f", name: "health" },
  { id: "874dfg380fdaf", name: "food and snacks" },
];

storiesOf("@components/organisms/SearchbarMobileHome", module)
  .addParameters({ component: SearchbarMobileHome })
  .add("default", () => (
    <SearchbarMobileHome
      query=""
      suggestions={suggestions}
      onChange={action("change search")}
      onItemClick={action("suggestion item click")}
      onSubmit={action("submit")}
    />
  ));
