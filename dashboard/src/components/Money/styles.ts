import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  () => ({
    convertedMoney: {
      color: "inherit",
      fontSize: 13,
      fontWeight: "inherit",
      lineHeight: "21px"
    },
    orginialMoney: {
      color: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit"
    }
  }),
  { name: "MoneyRange" }
);
