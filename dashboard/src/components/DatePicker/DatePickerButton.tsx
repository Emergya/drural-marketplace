import { makeStyles } from "@drural/macaw-ui";
import { UilAngleDown } from "@iconscout/react-unicons";
import { Button } from "@material-ui/core";
import useDateLocalize from "@saleor/hooks/useDateLocalize";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    icon: {
      marginLeft: theme.spacing(2)
    },
    rootActive: {
      "& .MuiButton-label": {
        color: theme.palette.primary.main
      },
      borderColor: theme.palette.primary.main
    },
    rotate: {
      transform: "rotate(180deg)"
    }
  }),
  {
    name: "ColumnPickerButton"
  }
);

interface DatePickerButtonProps {
  active: boolean;
  className?: string;
  onClick: () => void;
  endDate: Date;
  startDate: Date;
}
const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  active,
  endDate,
  onClick,
  startDate
}) => {
  const classes = useStyles();
  const localizeDate = useDateLocalize();

  const firstDate = localizeDate(startDate);
  const secondDate = localizeDate(endDate);

  return (
    <Button variant="outlined" color="secondary" onClick={onClick}>
      {(startDate ? firstDate : "") + " - " + (endDate ? secondDate : "")}
      <UilAngleDown
        className={classNames(classes.icon, {
          [classes.rotate]: active
        })}
      />
    </Button>
  );
};

export default DatePickerButton;
