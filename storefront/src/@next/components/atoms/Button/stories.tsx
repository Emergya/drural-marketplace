import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from ".";
import { Size } from "./types";

interface IStoryProps {
  color?: "primary" | "secondary" | "ghost" | "labelOnly" | "labelOnlyPrimary";
  disabled?: boolean;
  size?: Size;
}

const Template: React.FC<IStoryProps> = args => (
  <Button {...args} fullWidth={false} testingContext="testButton">
    Label
  </Button>
);

storiesOf("@components/atoms/Button", module)
  .addParameters({ component: Button })

  // Primary
  .add("Primary", () => <Template color="primary" />)
  .add("Primary disabled", () => <Template color="primary" disabled />)

  // Secondary
  .add("Secondary", () => <Template color="secondary" />)
  .add("Secondary disabled", () => <Template color="secondary" disabled />)

  // Ghost
  .add("Ghost", () => <Template color="ghost" />)
  .add("Ghost disabeld", () => <Template color="ghost" disabled />)

  // Label only
  .add("Label only", () => <Template color="labelOnly" />)
  .add("Label only disabled", () => <Template color="labelOnly" disabled />)

  // Label only primary
  .add("Label only primary", () => <Template color="labelOnlyPrimary" />)
  .add("Label only primary disabled", () => (
    <Template color="labelOnlyPrimary" disabled />
  ));
