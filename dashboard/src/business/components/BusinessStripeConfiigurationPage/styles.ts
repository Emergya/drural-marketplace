import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    grid: {
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
      }
    }
  }),
  { name: "BusinessStripeConfiigurationPage" }
);
