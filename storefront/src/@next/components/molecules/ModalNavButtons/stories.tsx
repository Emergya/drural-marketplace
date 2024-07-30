import React from "react";

import { ModalNavButtons } from "./ModalNavButtons";

export default {
  title: "@components/molecules/ModalNavButtons",
  component: ModalNavButtons,
};

export const SocialMediaPlaceHolder = () => (
  <ModalNavButtons
    textNext="Next"
    textBack="Skip"
    onNext={() => {}}
    onBack={() => {}}
  />
);
