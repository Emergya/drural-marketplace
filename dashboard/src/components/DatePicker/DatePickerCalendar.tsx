import moment from "moment";
import React from "react";

import DruralCalendar from "../DruralCalendar";

export interface DatePickerCalendarProps {
  endDate: Date;
  onDatesChange: (date: Date) => void;
  startDate: Date;
}
const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  endDate,
  onDatesChange,
  startDate
}) => (
  <DruralCalendar
    selected={startDate}
    onChange={onDatesChange}
    startDate={startDate}
    endDate={endDate}
    selectsRange
    monthsShown={3}
    calendarStartDay={1}
    maxDate={moment().toDate()}
    disabledKeyboardNavigation
    inline
  />
);

export default DatePickerCalendar;
