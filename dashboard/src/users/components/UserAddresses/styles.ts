import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    label: {
      fontWeight: 600,
      marginBottom: theme.spacing(1)
    }
  }),
  { name: "UserAddresses" }
);
