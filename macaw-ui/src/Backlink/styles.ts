import { darken } from "@material-ui/core";

import { makeStyles } from "../theme";

const useStyles = makeStyles(
  (theme) => ({
    backArrow: {
      fontSize: 30,
      color: theme.palette.primary.main,
    },
    menuButton: {
      flex: "0 0 auto",
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(),
      marginTop: theme.spacing(-2),
    },
    root: {
      "&:hover": {
        color: theme.typography.body1.color,
      },
      alignItems: "center",
      color: theme.palette.grey[500],
      cursor: "pointer",
      display: "flex",
      marginTop: theme.spacing(0.5),
      transition: theme.transitions.duration.standard + "ms",
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(4, 0, 0, 0),
      },
    },
    skeleton: {
      width: "10rem",
    },
    title: {
      color: darken(theme.palette.primary.main, 0.1),
      cursor: "pointer",
      flex: 1,
      fontWeight: "bold",
      fontSize: 14,
      lineHeight: "22px",
      marginLeft: 4,
      textDecoration: "underline",

      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  }),
  { name: "AppHeader" }
);

export default useStyles;
