import { makeStyles } from "@drural/macaw-ui";
import { UilAngleDown } from "@iconscout/react-unicons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import useDateLocalize from "@saleor/hooks/useDateLocalize";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import FormSpacer from "../FormSpacer";
import Grid from "../Grid";

const useStyles = makeStyles(
  theme => ({
    selecIcon: {
      marginRight: theme.spacing(2)
    }
  }),
  { name: "DatePickerInputs" }
);

interface DatePickerInputsProps {
  dateRangeOpt: string;
  endDate: Date;
  startDate: Date;
  onSelectRangeOpt: (e: React.ChangeEvent<any>) => void;
}

const DatePickerInputs: React.FC<DatePickerInputsProps> = ({
  dateRangeOpt,
  endDate,
  startDate,
  onSelectRangeOpt
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const localizeDate = useDateLocalize();

  const timeRageOptions = [
    {
      value: "today",
      text: intl.formatMessage({
        defaultMessage: "Today",
        description: "Time range selector option"
      })
    },
    {
      value: "lastWeek",
      text: intl.formatMessage({
        defaultMessage: "Last 7 days",
        description: "Time range selector option"
      })
    },
    {
      value: "lastMonth",
      text: intl.formatMessage({
        defaultMessage: "Last 30 days",
        description: "Time range selector option"
      })
    },
    {
      value: "custom",
      text: intl.formatMessage({
        defaultMessage: "Custom",
        description: "Time range selector option"
      })
    }
  ];
  return (
    <div>
      <FormControl variant="outlined" fullWidth>
        <InputLabel variant="filled">
          <FormattedMessage defaultMessage="Time range" />
        </InputLabel>
        <Select
          name="dateRangeOpt"
          fullWidth
          value={dateRangeOpt}
          onChange={onSelectRangeOpt}
          IconComponent={() => <UilAngleDown className={classes.selecIcon} />}
        >
          {timeRageOptions.map((opt, i) => (
            <MenuItem key={"opt" + i} value={opt.value}>
              {opt.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormSpacer />
      <Grid variant="uniform">
        <TextField
          inputProps={{ readOnly: true }}
          label={intl.formatMessage({
            defaultMessage: "From",
            description: "input label"
          })}
          value={!startDate ? "-" : localizeDate(startDate)}
        />
        <TextField
          inputProps={{ readOnly: true }}
          label={intl.formatMessage({
            defaultMessage: "To",
            description: "input label"
          })}
          value={!endDate ? "-" : localizeDate(endDate)}
        />
      </Grid>
    </div>
  );
};

export default DatePickerInputs;
