import { UilEdit } from "@iconscout/react-unicons";
import { storiesOf } from "@storybook/react";
import React from "react";

import { IconButtonDrural } from ".";

storiesOf("@components/atoms/IconButtonDrural", module)
  .addParameters({ component: IconButtonDrural })
  .add("primary", () => (
    <IconButtonDrural color="primary" testingContext="test">
      <UilEdit size="24" color="#fff" />
    </IconButtonDrural>
  ))
  .add("secondary", () => (
    <IconButtonDrural color="secondary" testingContext="test">
      <UilEdit size="24" color="#fff" />
    </IconButtonDrural>
  ));
