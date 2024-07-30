import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    title: {
      fontWeight: 600,
      marginBottom: theme.spacing(1.5)
    }
  }),
  { name: "ProductDuration" }
);
