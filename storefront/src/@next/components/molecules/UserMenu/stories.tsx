import { storiesOf } from "@storybook/react";
import React from "react";

import { UserMenu } from "./index";

storiesOf("@components/molecules/UserMenu", module)
  .addParameters({ component: UserMenu })
  .add("default", () => (
    <div style={{ width: "360px" }}>
      <UserMenu name="Olivia" messages={0} notifications={0} />
    </div>
  ));
