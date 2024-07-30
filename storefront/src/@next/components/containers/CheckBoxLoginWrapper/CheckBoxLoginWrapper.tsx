import React from "react";

import { Checkbox } from "@components/atoms";

import { IProps } from "./types";

export const CheckBoxLoginWrapper: React.FC<IProps> = ({
  children,
  defaultValue,
  name,
  onChange,
}: IProps) => {
  return (
    <Checkbox checked={defaultValue} name={name} onChange={onChange}>
      {children}
    </Checkbox>
  );
};
