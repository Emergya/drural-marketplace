import { storiesOf } from "@storybook/react";
import React from "react";

import { MediaIconUpload } from ".";

storiesOf("@components/molecules/MediaIconUpload", module)
  .addParameters({ component: MediaIconUpload })
  .add("default", () => <MediaIconUpload onImageSelect={() => {}} />);
