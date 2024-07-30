import { makeStyles } from "@drural/macaw-ui";
import { CSSProperties } from "@material-ui/styles";

export const useStyles = makeStyles(
  theme => {
    const overflowing: CSSProperties = {
      overflow: "hidden",
      textOverflow: "ellipsis"
    };

    return {
      [theme.breakpoints.up("lg")]: {
        colCustomer: {
          width: 220
        },
        colDate: {},
        colFulfillment: {
          width: 230
        },
        colNumber: {
          width: 120
        },
        colPayment: {
          width: 220
        },
        colTotal: {}
      },
      colCustomer: overflowing,
      colDate: {},
      colFulfillment: overflowing,
      colNumber: {},
      colPayment: overflowing,
      colTotal: {
        textAlign: "right"
      },
      link: {
        cursor: "pointer"
      }
    };
  },
  { name: "BookingList" }
);
