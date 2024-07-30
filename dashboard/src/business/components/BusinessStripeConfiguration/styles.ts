import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    unenabledContent: {
      display: "flex"
    },
    unenabledIcon: {
      width: "32px"
    },
    unenabledtext: {
      marginLeft: theme.spacing(1.5)
    },
    enabledContent: {
      marginBottom: theme.spacing(3)
    },
    stripeIcon: {
      marginRight: theme.spacing(1.5)
    }
  }),
  { name: "BusinessStripeConfiguration" }
);
