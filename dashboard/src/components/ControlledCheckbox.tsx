import { FormControlLabel } from "@material-ui/core";
import React from "react";

import Checkbox from "./Checkbox";

interface ControlledCheckboxProps {
  className?: string;
  name: string;
  label?: React.ReactNode;
  checked: boolean;
  disabled?: boolean;
  checkedIcon?: React.ReactNode;
  onChange(event: any);
}

export const ControlledCheckbox: React.FC<ControlledCheckboxProps> = ({
  checked,
  disabled,
  name,
  label,
  onChange,
  checkedIcon,
  ...props
}) => (
  <FormControlLabel
    disabled={disabled}
    control={
      <Checkbox
        checked={!!checked}
        disabled={disabled}
        name={name}
        onChange={() => onChange({ target: { name, value: !checked } })}
      />
    }
    label={label}
    {...props}
  />
);
ControlledCheckbox.displayName = "ControlledCheckbox";
export default ControlledCheckbox;
