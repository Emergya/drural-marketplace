import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    text: {
      color: theme.palette.secondary.main
    },
    title: {
      fontWeight: 600,
      marginBottom: theme.spacing(1.5)
    }
  }),
  { name: "ProductBookableResources" }
);
