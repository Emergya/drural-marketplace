import { UilClock, UilTimes } from "@iconscout/react-unicons";
import { TimePicker as AntdTimePicker } from "antd";
import classNames from "classnames";
import React from "react";

import { useStyles } from "./styles";
import { TimePickerProps } from "./types";

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  disabled,
  format,
  fullWidth,
  inputReadOnly,
  minuteStep,
  placeholder,
  error,
  helperText,
  showNow = false,
  disabledHours,
  onChange
}) => {
  const classes = useStyles();

  return (
    <div>
      <AntdTimePicker
        className={classNames(
          classes.timePicker,
          fullWidth ? classes.fullwidth : classes.width,
          error ? classes.timePickerErrorColors : classes.timePickerColors
        )}
        value={value}
        disabled={disabled}
        disabledHours={disabledHours}
        inputReadOnly={inputReadOnly}
        format={format}
        minuteStep={minuteStep}
        placeholder={placeholder}
        popupClassName={classes.popup}
        suffixIcon={<UilClock />}
        clearIcon={<UilTimes />}
        showNow={showNow}
        onChange={onChange}
      />
      {helperText && (
        <p
          className={classNames(
            classes.helperText,
            error ? classes.errorMessageColor : classes.helperTextColor
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
TimePicker.displayName = "TimePicker";
