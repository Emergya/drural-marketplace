import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  () => ({
    tableCell: {
      padding: "12px 24px"
    },
    tableCellSwitch: {
      textAlign: "right"
    },
    tableRow: {
      "&:last-child .MuiTableCell-root": {
        borderBottom: 0
      }
    }
  }),
  { name: "ProductBookableResourceList" }
);
