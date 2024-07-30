import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    helperText: {
      color: "#616161",
      fontSize: 12,
      lineHeight: "20px",
      margin: 0,
      paddingLeft: theme.spacing(4)
    }
  }),
  { name: "ProductConfiguration" }
);
