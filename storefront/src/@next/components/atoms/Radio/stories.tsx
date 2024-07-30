import { storiesOf } from "@storybook/react";
import React from "react";

import { Radio } from ".";

storiesOf("@components/atoms/Radio", module)
  .addParameters({ component: Radio })
  .add("unchecked", () => (
    <Radio name="name" value="value" checked={false}>
      Radio with label
    </Radio>
  ))
  .add("checked", () => (
    <Radio name="name" value="value" checked>
      Radio with label
    </Radio>
  ))
  .add("uncheked disabled", () => (
    <Radio name="name" value="value" disabled checked={false}>
      Disabled radio with label
    </Radio>
  ))
  .add("disabled", () => (
    <Radio name="name" value="value" disabled checked>
      Disabled radio with label
    </Radio>
  ));
