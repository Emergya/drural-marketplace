import { UilBooks } from "@iconscout/react-unicons";
import React from "react";

import { CheckboxIcon } from "./CheckboxIcon";

export default {
  title: "@components/molecules/CheckboxIcon",
  component: CheckboxIcon,
};

export const unchecked = () => (
  <CheckboxIcon
    icon={<UilBooks color="#3CDCAA" size={40} />}
    title="Food and beverages"
  />
);

export const checked = () => (
  <CheckboxIcon
    checked
    icon={<UilBooks color="#3CDCAA" size={40} />}
    title="Food and beverages"
  />
);
export const disabled = () => (
  <CheckboxIcon
    disabled
    icon={<UilBooks color="#3CDCAA" size={40} />}
    title="Food and beverages"
  />
);
