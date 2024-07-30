import { storiesOf } from "@storybook/react";
import React from "react";

import { StatusLabel } from ".";

storiesOf("@components/atoms/StatusLabel", module)
  .addParameters({ component: StatusLabel })
  .add("success", () => <StatusLabel label="success" status="success" />)
  .add("neutral", () => <StatusLabel label="neutral" status="neutral" />)
  .add("alert", () => <StatusLabel label="alert" status="alert" />)
  .add("error", () => <StatusLabel label="error" status="error" />);
