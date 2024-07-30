import { makeStyles } from "@drural/macaw-ui";
import { Button, Card, CardContent } from "@material-ui/core";
import { buttonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import DatePickerCalendar from "./DatePickerCalendar";
import DatePickerInputs from "./DatePickerInputs";

const useStyles = makeStyles(
  theme => ({
    root: {
      boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.3)",
      [theme.breakpoints.up("lg")]: {
        maxWidth: "60vw"
      }
    },
    datePickerFooter: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(1.5),
      "& button": {
        margin: theme.spacing(1)
      }
    },
    pickerGrid: {
      display: "grid",
      gridTemplateColumns: "7fr 5fr",
      [theme.breakpoints.down("sm")]: {
        gridRowGap: theme.spacing(1),
        gridTemplateColumns: "1fr"
      }
    }
  }),
  { name: "DatePickerContent" }
);

interface DatePickerContentProps {
  dateRangeOpt: string;
  endDate: Date;
  onDatesChange: (date: Date) => void;
  onSelectRangeOpt: (e: React.ChangeEvent) => void;
  onToggle: () => void;
  startDate: Date;
  onSubmit: (from: Date, to: Date) => void;
}
const DatePickerContent: React.FC<DatePickerContentProps> = ({
  dateRangeOpt,
  endDate,
  onDatesChange,
  onSelectRangeOpt,
  onToggle,
  startDate,
  onSubmit
}) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.pickerGrid}>
          <DatePickerCalendar
            endDate={endDate}
            onDatesChange={onDatesChange}
            startDate={startDate}
          />
          <DatePickerInputs
            dateRangeOpt={dateRangeOpt}
            endDate={endDate}
            startDate={startDate}
            onSelectRangeOpt={onSelectRangeOpt}
          />
        </div>
        <div className={classes.datePickerFooter}>
          <Button variant="text" color="secondary" onClick={onToggle}>
            {intl.formatMessage(buttonMessages.cancel)}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onSubmit(startDate, endDate)}
          >
            {intl.formatMessage(buttonMessages.apply)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default DatePickerContent;
