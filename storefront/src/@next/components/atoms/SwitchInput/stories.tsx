import { storiesOf } from "@storybook/react";
import React from "react";

import { SwitchInput } from "..";

storiesOf("@components/atoms/SwitchInput", module)
  .addParameters({ component: SwitchInput })
  .add("default", () => (
    <div style={{ width: "400px", padding: "22px 52px 32px 32px" }}>
      <SwitchInput />
    </div>
  ))
  .add("with content", () => (
    <div style={{ width: "400px", padding: "22px 52px 32px 32px" }}>
      <SwitchInput checkedChildren="开" unCheckedChildren="关" />
    </div>
  ))
  .add("disabled", () => (
    <div style={{ width: "400px", padding: "22px 52px 32px 32px" }}>
      <SwitchInput disabled />
    </div>
  ));
