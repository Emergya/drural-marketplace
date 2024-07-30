import { makeStyles } from "@drural/macaw-ui";
import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    label: {
      fontSize: 14
    },
    select: {
      backgroundColor: "#FFF",
      boxShadow: `0px 4px 16px rgba(0, 0, 0, 0.1)`,
      paddingLeft: "5px",
      marginLeft: theme.spacing(1),
      "&:after, &:before": {
        border: "none !important"
      },
      "& div": {
        "&:focus": {
          background: "none"
        }
      }
    }
  }),
  {
    name: "RowNumberSelect"
  }
);

interface RowNumberSelectProps {
  choices: number[];
  className?: string;
  rowNumber: number;
  onChange(value: number);
}

const RowNumberSelect: React.FC<RowNumberSelectProps> = ({
  className,
  choices,
  rowNumber,
  onChange
}) => {
  const classes = useStyles({});

  return (
    <div className={className}>
      <span className={classes.label}>
        <FormattedMessage defaultMessage="No of Rows:" />
      </span>
      <Select
        data-test-id="rowNumberSelect"
        className={classes.select}
        value={rowNumber}
        onChange={event => onChange(event.target.value as number)}
      >
        {choices.length > 0 &&
          choices.map(choice => (
            <MenuItem
              value={choice}
              key={choice}
              data-test-id="rowNumberOption"
            >
              {choice}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};

export default RowNumberSelect;
