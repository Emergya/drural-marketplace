import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    card: {
      cursor: "pointer",
      padding: "1px"
    },
    cardSelected: {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      padding: "0"
    }
  }),
  { name: "CustomerAddressChoiceCard" }
);
