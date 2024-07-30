import { storiesOf } from "@storybook/react";
import React from "react";

import { TextArea } from ".";

storiesOf("@components/atoms/TextArea", module)
  .addParameters({ component: TextArea })
  .add("default", () => <TextArea value="" label="Empty" />)
  .add("with value", () => (
    <TextArea
      label="Text goes here"
      value="Example text"
      contentRight={<div>Content right</div>}
    />
  ))
  .add("with value and rows", () => (
    <TextArea
      label="Text goes here"
      value="Example text"
      rows={10}
      contentRight={<div>Content right</div>}
    />
  ))
  .add("error", () => (
    <TextArea value="Some text" label="Text goes here" error />
  ))
  .add("disabled", () => <TextArea value="" label="Text goes here" disabled />);
