import { UilArrowRight, UilClock, UilTimes } from "@iconscout/react-unicons";
import { TimePicker } from "antd";
import classNames from "classnames";
import React from "react";

import { useStyles } from "./styles";
import { RangePickerProps } from "./types";

export const RangeTimePicker: React.FC<RangePickerProps> = ({
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
      <TimePicker.RangePicker
        className={classNames(
          classes.timePicker,
          fullWidth ? classes.fullwidth : classes.width,
          error ? classes.timePickerErrorColors : classes.timePickerColors
        )}
        popupClassName={classes.popup}
        value={value}
        disabled={disabled}
        disabledHours={disabledHours}
        inputReadOnly={inputReadOnly}
        format={format}
        minuteStep={minuteStep}
        placeholder={placeholder}
        nextIcon={<UilArrowRight />}
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
RangeTimePicker.displayName = "RangeTimePicker";
