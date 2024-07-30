import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { TextAreaField } from ".";

const DEFAULT_PROPS = {
  errors: [],
  label: "Label",
  onChange: action("onChange"),
  value: "Value",
};

const ContentLeft = () => <span>Content Left</span>;
const ContentRight = () => <span>Content Right</span>;

storiesOf("@components/molecules/TextAreaField", module)
  .addParameters({ component: TextAreaField })
  .add("default", () => <TextAreaField {...DEFAULT_PROPS} />)
  .add("with errors", () => (
    <TextAreaField
      {...DEFAULT_PROPS}
      errors={[{ field: "field", message: "Some error" }]}
    />
  ))
  .add("with errors and 20 default rows", () => (
    <TextAreaField
      {...DEFAULT_PROPS}
      rows={20}
      errors={[{ field: "field", message: "Some error" }]}
    />
  ))
  .add("with content left", () => (
    <TextAreaField {...DEFAULT_PROPS} contentLeft={<ContentLeft />} />
  ))
  .add("with content right", () => (
    <TextAreaField {...DEFAULT_PROPS} contentRight={<ContentRight />} />
  ));
