import { makeStyles } from "@drural/macaw-ui";
import { FormControlLabel, Switch } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(
  () => ({
    labelText: {
      fontSize: 14
    }
  }),
  { name: "ControlledSwitch" }
);

interface ControlledSwitchProps {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  label: string | React.ReactNode;
  name: string;
  secondLabel?: string | React.ReactNode;
  uncheckedLabel?: string | React.ReactNode;
  onClick?: () => void;
  onChange?(event: React.ChangeEvent<any>);
}

export const ControlledSwitch: React.FC<ControlledSwitchProps> = props => {
  const {
    checked,
    className,
    disabled,
    onChange,
    onClick,
    label,
    name,
    secondLabel,
    uncheckedLabel
  } = props;

  const classes = useStyles(props);

  return (
    <FormControlLabel
      className={className}
      control={
        <Switch
          onChange={() =>
            !!onChange && onChange({ target: { name, value: !checked } } as any)
          }
          onClick={onClick}
          checked={checked}
          color="primary"
          name={name}
        />
      }
      label={
        <div>
          {uncheckedLabel ? (
            checked ? (
              label
            ) : (
              uncheckedLabel
            )
          ) : typeof label === "string" ? (
            <span className={classes.labelText}>{label}</span>
          ) : (
            label
          )}
          <div>{secondLabel ? secondLabel : null}</div>
        </div>
      }
      disabled={disabled}
    />
  );
};
ControlledSwitch.displayName = "ControlledSwitch";
export default ControlledSwitch;
