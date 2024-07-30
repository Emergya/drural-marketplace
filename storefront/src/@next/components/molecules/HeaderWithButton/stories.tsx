import React from "react";

import { HeaderWithButton } from "./HeaderWithButton";

export default {
  title: "@components/molecules/HeaderWithButton",
  component: HeaderWithButton,
};

export const wishListHeader = () => (
  <HeaderWithButton title="My wish lists" buttonText="New wish list" />
);
