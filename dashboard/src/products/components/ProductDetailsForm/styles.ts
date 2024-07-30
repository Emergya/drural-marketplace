import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    customSpacer: {
      marginTop: theme.spacing(2.75),

      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1.5)
      }
    },
    hasNoPrice: {
      marginTop: theme.spacing()
    },
    priceWrapper: {
      alignItems: "start",
      display: "flex",

      [theme.breakpoints.up("xs")]: {
        flexWrap: "wrap-reverse"
      }
    },
    price: {
      marginRight: theme.spacing(5),

      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(),
        marginRight: theme.spacing(3)
      }
    }
  }),
  { name: "ProductDetailsForm" }
);
