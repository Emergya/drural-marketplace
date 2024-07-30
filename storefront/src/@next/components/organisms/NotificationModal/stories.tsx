import React from "react";

import { NotificationModal } from "./NotificationModal";

export default {
  title: "@components/organisms/NotificationModal",
  component: NotificationModal,
};

export const NotificationModalComponent = () => (
  <NotificationModal
    title="Title"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices nisl nec nisi ultrices commodo non a arcu. "
    onClick={() => {}}
    hide={() => {}}
    buttonText="OK"
  />
);
