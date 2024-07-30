import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AccountAvatar } from ".";

storiesOf("@components/atoms/AccountAvatar", module)
  .addParameters({ component: AccountAvatar })
  .add("default", () => (
    <AccountAvatar
      source=""
      imageUpload={action("imageUpload!")}
      imageDelete={action("image delete!")}
    />
  ))
  .add("image", () => (
    <AccountAvatar
      source="https://picsum.photos/104/104"
      imageUpload={action("imageUpload!")}
      imageDelete={action("image delete!")}
    />
  ));
