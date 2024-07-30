import { storiesOf } from "@storybook/react";
import React from "react";

import { TextAreaLabel } from "./TextAreaLabel";

storiesOf("@components/atoms/TextAreaLabel", module)
  .addParameters({ component: TextAreaLabel })
  .add("active false", () => (
    <TextAreaLabel labelBackground="#FFF" active={false}>
      This is input
    </TextAreaLabel>
  ))
  .add("active true", () => (
    <TextAreaLabel labelBackground="#FFF" active>
      This is input
    </TextAreaLabel>
  ));
