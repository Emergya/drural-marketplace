import { makeStyles } from "@drural/macaw-ui";
import { darken, lighten } from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    actionWarpper: {
      display: "flex",
      flexWrap: "wrap-reverse",
      justifyContent: "center",
      paddingTop: theme.spacing(2),

      "& button:last-child": {
        marginLeft: theme.spacing()
      },

      [theme.breakpoints.down("xs")]: {
        "& button": {
          width: "100%"
        },
        "& button:last-child": {
          marginLeft: 0,
          marginBottom: theme.spacing(1.25)
        }
      }
    },
    container: {
      background: lighten(theme.palette.primary.main, 0.7),
      borderRadius: "2px",
      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.25)",
      padding: theme.spacing(2)
    },
    closeIconWrapper: {
      textAlign: "right"
    },
    contentInnerWrapper: {},
    contentWrapper: {
      display: "flex",
      marginTop: `-${theme.spacing(3.75)}`,
      paddingRight: theme.spacing(4.5),

      [theme.breakpoints.down("xs")]: {
        marginTop: `-${theme.spacing(1.5)}`,
        paddingRight: theme.spacing()
      }
    },
    title: {
      marginBottom: theme.spacing()
    },
    warningIconWrapper: {
      marginRight: theme.spacing(2)
    },
    warningIconInnerWrapper: {
      backgroundColor: darken(theme.palette.primary.main, 0.1),
      borderRadius: 100,
      color: theme.palette.common.white,
      padding: "8px 8px 1px 8px"
    }
  }),
  { name: "StripeWarning" }
);
