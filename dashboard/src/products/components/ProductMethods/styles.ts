import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    disabledHelperText: {
      color: theme.palette.common.black,
      opacity: 0.3
    },
    methodItem: {
      marginRight: "1%",
      width: "32%",

      [theme.breakpoints.down("xs")]: {
        marginRight: 0,
        width: "100%"
      }
    },
    methodsWrapper: {
      display: "flex",
      flexWrap: "wrap"
    },
    title: {
      fontWeight: 600,
      marginBottom: theme.spacing(1.5)
    }
  }),
  { name: "ProductMethods" }
);
