import { storiesOf } from "@storybook/react";
import React from "react";

import { BackLink } from ".";

storiesOf("@components/molecules/BackLink", module)
  .addParameters({ component: BackLink })
  .add("default", () => <BackLink onClick={() => {}}>Back link</BackLink>);
