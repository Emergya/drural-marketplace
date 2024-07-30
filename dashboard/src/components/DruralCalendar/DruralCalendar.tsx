import useLocale from "@saleor/hooks/useLocale";
import React from "react";
import DatePicker from "react-datepicker";

import { useStyles } from "./styles";
import { IDruralCalendarProps } from "./types";
import { registerDatePickerLocales } from "./utils";

// Required: register locales in react-datepicker make to component translatable
registerDatePickerLocales();

const DruralCalendar: React.FC<IDruralCalendarProps> = ({
  onChange,
  ...props
}) => {
  const { ...calendarProps } = props;
  const classes = useStyles();
  const { locale } = useLocale();

  return (
    <div className={classes.datePicker}>
      <DatePicker {...calendarProps} onChange={onChange} locale={locale} />
    </div>
  );
};
export default DruralCalendar;
