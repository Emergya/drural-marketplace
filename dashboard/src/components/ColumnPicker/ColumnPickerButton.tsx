import { makeStyles } from "@drural/macaw-ui";
import { UilAngleDown } from "@iconscout/react-unicons";
import { Button } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";

interface ColumnPickerButtonProps {
  active: boolean;
  className?: string;
  onClick: () => void;
}

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

const ColumnPickerButton: React.FC<ColumnPickerButtonProps> = props => {
  const { active, className, onClick } = props;
  const classes = useStyles(props);

  return (
    <Button
      className={classNames(className, {
        [classes.rootActive]: active
      })}
      color="secondary"
      onClick={onClick}
      variant="outlined"
    >
      <FormattedMessage
        defaultMessage="Columns"
        description="select visible columns button"
      />
      <UilAngleDown
        className={classNames(classes.icon, {
          [classes.rotate]: active
        })}
      />
    </Button>
  );
};

export default ColumnPickerButton;
