import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SearchbarMobileTile } from "./SearchbarMobileTile";

storiesOf("@components/atoms/SearchbarMobileTile", module)
  .addParameters({ component: SearchbarMobileTile })
  .add("default", () => <SearchbarMobileTile onClick={action("click")} />);
