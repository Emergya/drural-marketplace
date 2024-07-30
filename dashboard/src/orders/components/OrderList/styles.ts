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
        colDate: {
          width: 120
        },
        colFulfillment: {
          width: 200
        },
        colNumber: {
          width: 120
        },
        colPayment: {
          width: 200
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
  { name: "OrderList" }
);
