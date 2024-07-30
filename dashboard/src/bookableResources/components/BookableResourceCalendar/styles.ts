import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    copyToAllDaysButton: {
      transition: "0s all",

      "& .MuiButton-label": {
        transition: "0s all"
      }
    },
    description: {
      color: theme.palette.secondary.main,
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(1)
    },
    day: {
      marginRight: "1%",
      paddingTop: theme.spacing(1),
      flexBasis: "24%",

      [theme.breakpoints.down("sm")]: {
        flexBasis: "100%"
      }
    },
    dayWrapper: {
      alignItems: "flex-start",
      display: "flex",
      flexWrap: "wrap",
      paddingBottom: theme.spacing(3)
    },
    extraInfoWrapper: {
      alignItems: "center",
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-between"
    },
    generalInput: {
      minWidth: "24%",

      "&:last-child": {
        flexGrow: 1
      },

      [theme.breakpoints.down("sm")]: {
        "&:last-child": {
          marginLeft: theme.spacing(2)
        }
      }
    },
    generalInputsWrapper: {
      display: "flex"
    },
    rangePickerWrapper: {
      marginRight: theme.spacing(5),

      [theme.breakpoints.down("xs")]: {
        flexBasis: "100%",
        marginRight: 0,
        paddingBottom: theme.spacing()
      }
    },
    separator: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(2)
    },
    slotsWrapper: {
      flexBasis: "75%",

      [theme.breakpoints.down("sm")]: {
        flexBasis: "100%",
        paddingTop: theme.spacing(2)
      }
    },
    slotWrapper: {
      display: "flex",

      "&:not(:last-child)": {
        paddingBottom: theme.spacing(3)
      },

      [theme.breakpoints.down("xs")]: {
        flexWrap: "wrap"
      }
    }
  }),
  { name: "BookableResourceCalendar" }
);
