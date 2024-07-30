import checkboxChecked from "@assets/images/dRuralIcons/checkbox-checked.svg";
import checkboxUnchecked from "@assets/images/dRuralIcons/checkbox-unchecked.svg";
import { makeStyles } from "@drural/macaw-ui";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps
} from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import React from "react";
import ReactSVG from "react-inlinesvg";

const useStyles = makeStyles(
  theme => ({
    error: {
      color: theme.palette.error.main
    },
    checkIcon: {
      "& rect": {
        fill: theme.palette.primary.main
      }
    }
  }),
  { name: "Checkbox" }
);

export type CheckboxProps = Omit<
  MuiCheckboxProps,
  "checkedIcon" | "color" | "icon" | "indeterminateIcon" | "classes" | "onClick"
> & {
  disableClickPropagation?: boolean;
  helperText?: string;
  error?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ helperText, error, ...props }) => {
  const { disableClickPropagation, ...rest } = props;
  const classes = useStyles();

  return (
    <>
      <MuiCheckbox
        {...rest}
        checkedIcon={
          <ReactSVG className={classes.checkIcon} src={checkboxChecked} />
        }
        icon={<ReactSVG src={checkboxUnchecked} />}
        onClick={
          disableClickPropagation ? event => event.stopPropagation() : undefined
        }
      />
      {helperText && (
        <FormHelperText classes={{ root: error && classes.error }}>
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};
Checkbox.displayName = "Checkbox";
export default Checkbox;
