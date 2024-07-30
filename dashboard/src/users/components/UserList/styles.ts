import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colEmail: {},
      colName: {},
      colOrders: {
        width: 200
      }
    },
    colEmail: {},
    colName: {
      paddingLeft: 0
    },
    tableHeader: {
      fontSize: "16px",
      fontWeight: 400,
      textTransform: "capitalize"
    },
    /* colOrders: {
        textAlign: "center"
      }, */
    colDateJoined: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "UserList" }
);
