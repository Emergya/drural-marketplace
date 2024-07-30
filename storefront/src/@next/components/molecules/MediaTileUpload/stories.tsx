import { storiesOf } from "@storybook/react";
import React from "react";

import { MediaTileUpload } from ".";

storiesOf("@components/molecules/MediaTileUpload", module)
  .addParameters({ component: MediaTileUpload })
  .add("default", () => <MediaTileUpload />);
