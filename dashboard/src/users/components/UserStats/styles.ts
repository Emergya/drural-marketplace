import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    label: {
      marginBottom: theme.spacing(1)
    },
    value: {
      fontSize: 24
    }
  }),
  { name: "UserStats" }
);
