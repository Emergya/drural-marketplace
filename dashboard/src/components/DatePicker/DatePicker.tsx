import { makeStyles } from "@drural/macaw-ui";
import { Grow, Popper } from "@material-ui/core";
import usePrevState from "@saleor/hooks/usePrevState";
import React, { useEffect } from "react";

import DatePickerButton from "./DatePickerButton";
import DatePickerContent from "./DatePickerContent";

const useStyles = makeStyles(
  theme => ({
    popper: {
      marginTop: theme.spacing(1),
      zIndex: 4,

      [theme.breakpoints.down("xs")]: {
        width: "97.5%"
      }
    }
  }),
  {
    name: "DatePicker"
  }
);

interface DatePickerProps {
  handleDates?: (from: Date, to: Date) => void;
}
const DatePicker: React.FC<DatePickerProps> = props => {
  const { handleDates } = props;
  const classes = useStyles();

  const [isExpanded, setExpansionState] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  // sets a settled time range option
  const [dateRangeOpt, setDateRangeOpt] = React.useState("lastWeek");
  // these are the states that we are going to submit and the value that is going to be displayed on the calendar toggle btn
  const [submitStartDate, setSubmitStartDate] = React.useState<Date>(
    new Date()
  );
  const [submitEndDate, setSubmitEndDate] = React.useState<Date>(new Date());

  const prevDateRangeOpt = usePrevState(dateRangeOpt);

  const anchor = React.useRef<HTMLDivElement>();
  const toggleExpand = () => setExpansionState(!isExpanded);
  const onDatesChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const onSelectRangeOpt = (event: React.ChangeEvent<any>) => {
    const value = event.target.value;
    setDateRangeOpt(value);
  };
  const onDatesSubmit = (from, to?) => {
    setSubmitStartDate(from);
    setSubmitEndDate(to);
    toggleExpand();
  };

  // sends selected dates to the parent component
  useEffect(() => {
    handleDates(submitStartDate, submitEndDate);
  }, [submitStartDate, submitEndDate]);

  // setting dates depending on selected date range option
  useEffect(() => {
    if (dateRangeOpt !== prevDateRangeOpt) {
      setStartDate(null);
      setEndDate(null);
      if (dateRangeOpt === "today") {
        setStartDate(new Date());
        setEndDate(new Date());
      }
      if (dateRangeOpt === "lastWeek") {
        const prevDay = new Date().getDate() - 7;
        const prevDate = new Date();
        prevDate.setDate(prevDay);
        setStartDate(prevDate);
        setEndDate(new Date());
        // since last week will be the opt selected by default, we are changing the state to be sent
        setSubmitStartDate(prevDate);
      }
      if (dateRangeOpt === "lastMonth") {
        const prevDay = new Date().getDate() - 30;
        const prevDate = new Date();
        prevDate.setDate(prevDay);
        setStartDate(prevDate);
        setEndDate(new Date());
      }
    }
  }, [dateRangeOpt]);

  return (
    <div ref={anchor}>
      <DatePickerButton
        active={isExpanded}
        onClick={() => setExpansionState(prevState => !prevState)}
        startDate={submitStartDate}
        endDate={submitEndDate}
      />
      <Popper
        className={classes.popper}
        open={isExpanded}
        anchorEl={anchor.current}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "right bottom" : "right top"
            }}
          >
            <DatePickerContent
              onToggle={toggleExpand}
              onDatesChange={onDatesChange}
              startDate={startDate}
              endDate={endDate}
              onSelectRangeOpt={onSelectRangeOpt}
              dateRangeOpt={dateRangeOpt}
              onSubmit={onDatesSubmit}
            />
          </Grow>
        )}
      </Popper>
    </div>
  );
};
export default DatePicker;
