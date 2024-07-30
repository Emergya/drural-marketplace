import { darken } from "@material-ui/core";

import { makeStyles } from "../theme";

const useStyles = makeStyles(
  (theme) => ({
    button: {
      marginRight: theme.spacing(1),
    },
    cancelButton: {
      marginRight: theme.spacing(2),
    },
    content: {
      "&:last-child": {
        paddingBottom: theme.spacing(2),
      },
      display: "flex",
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1),
      },
    },
    deleteButton: {
      "& span": {
        color: "#FFFFFF",
      },
      "&:active": {
        backgroundColor: darken(theme.palette.secondary.main, 0.4),
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.error.contrastText,
      marginRight: theme.spacing(2),
    },
    paper: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    root: {
      height: 70,
    },
    spacer: {
      flex: "1",
    },
  }),
  { name: "Savebar" }
);

export default useStyles;
