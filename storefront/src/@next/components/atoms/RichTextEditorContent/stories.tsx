import { storiesOf } from "@storybook/react";
import React from "react";

import * as fixtures from "./fixtures";
import { RichTextEditorContent } from "./RichTextEditorContent";
import { IProps } from "./types";

const props: IProps = {
  jsonData: fixtures.jsonData,
};

storiesOf("@components/atoms/RichTextEditorContent", module)
  .addParameters({ component: RichTextEditorContent })
  .add("default", () => <RichTextEditorContent {...props} />);
