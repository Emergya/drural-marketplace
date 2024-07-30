import { storiesOf } from "@storybook/react";
import React from "react";

import { Checkbox } from ".";

storiesOf("@components/atoms/Checkbox", module)
  .addParameters({ component: Checkbox })
  .add("default", () => (
    <Checkbox name="default-checkbox" helpText="Helper text">
      Checkbox with label
    </Checkbox>
  ))
  .add("checked", () => (
    <Checkbox name="checked-checkbox" helpText="Helper text" checked>
      Checked
    </Checkbox>
  ))
  .add("disabled", () => (
    <Checkbox name="disabled-checkbox" helpText="Helper text" disabled>
      Disabled with label
    </Checkbox>
  ))
  .add("checked disabled", () => (
    <Checkbox
      name="disabled-checked-checkbox"
      helpText="Helper text"
      disabled
      checked
    >
      Disabled checkbox with label
    </Checkbox>
  ));
