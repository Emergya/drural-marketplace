import { makeStyles } from "@drural/macaw-ui";
import { lighten } from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    bodyTableRow: {
      "& .MuiTableCell-body": {
        borderBottom: "0"
      },

      "&:hover": {
        cursor: "default",
        backgroundColor: theme.palette.common.white,

        "& .MuiTableCell-body": {
          color: lighten(theme.palette.common.black, 0.4)
        }
      }
    },
    content: {
      padding: "0 !important"
    },
    dateTableCell: {
      width: "20%"
    },
    nameTableCell: {
      width: "25%"
    }
  }),
  { name: "OrderBookingDetails" }
);
