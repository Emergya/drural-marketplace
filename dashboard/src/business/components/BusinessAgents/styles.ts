import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    content: {
      marginBottom: theme.spacing(3)
    },
    iconButton: {
      marginRight: theme.spacing(1.5)
    }
  }),
  { name: "BusinessAgents" }
);
