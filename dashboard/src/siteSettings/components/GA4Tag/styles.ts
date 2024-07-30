import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  () => ({
    formWrapper: {
      alignItems: "flex-start",
      display: "flex",
      justifyContent: "space-between"
    },
    controledSwitch: {
      alignItems: "self-start",
      marginTop: 8,
      marginRight: 0,
      display: "flex",
      justifyContent: "flex-end"
    }
  }),
  { name: "GA4Tag" }
);
