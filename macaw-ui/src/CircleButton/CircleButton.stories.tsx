import CloseIcon from "@material-ui/icons/Close";
import { Meta, Story } from "@storybook/react";
import React from "react";

import { CircleButton } from "./CircleButton";

export const Default: Story = () => (
  <CircleButton>
    <CloseIcon />
  </CircleButton>
);

export default {
  title: "Circle button",
} as Meta;
