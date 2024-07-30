import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  () => ({
    shrinkDisabledLabel: {
      "& label": {
        transform: " translate(12px, 9px) scale(0.75)"
      }
    }
  }),
  { name: "CustomAppInformation" }
);
