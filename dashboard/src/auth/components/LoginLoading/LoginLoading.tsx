import { makeStyles } from "@drural/macaw-ui";
import { CircularProgress } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(
  {
    root: {
      alignItems: "center",
      display: "flex",
      height: "100vh",
      justifyContent: "center"
    }
  },
  { name: "LoginLoading" }
);
const LoginLoading: React.FC = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CircularProgress size={128} />
    </div>
  );
};
LoginLoading.displayName = "LoginLoading";
export default LoginLoading;
