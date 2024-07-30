import React from "react";

import { Address, Checkbox } from "@components/atoms";

import { IProps } from "./types";

/**
 * Address tile option.
 */
const AddressTileOption: React.FC<IProps> = ({
  id,
  inputName,
  address,
  onChange,
  checked,
  testingContext,
  ...props
}: IProps) => {
  return (
    <Checkbox
      name={inputName}
      checked={checked}
      onChange={onChange as (event: React.SyntheticEvent) => void}
    >
      <Address {...address} />
    </Checkbox>
  );
};

export { AddressTileOption };
