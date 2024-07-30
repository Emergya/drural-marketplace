import { Moment } from "moment-timezone";

interface PickerProps {
  error?: boolean;
  format?: string;
  fullWidth?: boolean;
  helperText?: string;
  inputReadOnly?: boolean;
  minuteStep?: number;
  showNow?: boolean;
  disabledHours?: () => number[];
}

export interface TimePickerProps extends PickerProps {
  disabled?: boolean;
  placeholder?: string;
  value?: Moment;
  onChange?: (values: Moment, formatString: string) => void;
}

export interface RangePickerProps extends PickerProps {
  disabled?: boolean | [boolean, boolean];
  placeholder?: [string, string];
  value?: [Moment, Moment];
  onChange?: (values: [Moment, Moment], formatString: [string, string]) => void;
}
