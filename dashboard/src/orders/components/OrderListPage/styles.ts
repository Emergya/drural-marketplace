import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    cardContentWrapper: {
      fontSize: 40,
      lineHeight: "56px"
    },
    cardsWrapper: {
      display: "grid",
      gridColumnGap: "2.6rem",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr 1fr"
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr"
      }
    },
    columnPicker: {
      marginRight: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        marginRight: theme.spacing(1),
        "& > button": {
          padding: "10px 12px",
          width: "100%"
        }
      }
    },
    cell: {
      ...theme.typography.subtitle1,
      color: theme.palette.common.black,
      padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,

      "&:last-child": {
        textAlign: "right"
      }
    },
    row: {
      "&:hover": {
        color: "inherit",
        cursor: "auto",
        backgroundColor: "inherit"
      },

      "&:last-child .MuiTableCell-body": {
        borderBottom: "none"
      }
    },
    table: {
      marginBottom: theme.spacing(4)
    },
    convertedMoney: {
      fontSize: 24,
      lineHeight: "32px"
    },
    settings: {
      marginRight: theme.spacing(2)
    }
  }),
  { name: "OrderListPage" }
);
