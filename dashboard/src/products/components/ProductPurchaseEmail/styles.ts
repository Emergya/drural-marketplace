import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    iconButton: {
      marginRight: theme.spacing(1.5)
    },
    text: {
      color: theme.palette.secondary.main,
      fontSize: 12,
      lineHeight: "20px",
      marginBottom: theme.spacing(2.75)
    }
  }),
  { name: "ProductPurchaseEmail" }
);
