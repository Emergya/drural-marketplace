import { makeStyles } from "@drural/macaw-ui";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    spacer: {
      marginTop: theme.spacing(3)
    }
  }),
  { name: "FormSpacer" }
);

interface FormSpacerProps {
  className?: string;
  children?: React.ReactNode;
}

export const FormSpacer: React.FC<FormSpacerProps> = props => {
  const { className, children } = props;

  const classes = useStyles(props);

  return (
    <div className={className ? className : classes.spacer}>{children}</div>
  );
};

FormSpacer.displayName = "FormSpacer";
export default FormSpacer;
