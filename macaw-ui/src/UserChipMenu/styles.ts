import { makeStyles } from "../theme";

const useStyles = makeStyles(
  (theme) => ({
    arrow: {
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
      marginLeft: theme.spacing(2),
      transition: theme.transitions.duration.standard + "ms",
    },
    avatar: {
      "&&": {
        height: 38,
        marginLeft: 6,
        width: 38,
      },
    },
    avatarInitials: {
      color: theme.palette.primary.contrastText,
    },
    avatarPlaceholder: {
      alignItems: "center",
      background: theme.palette.primary.main,
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
    },
    label: {
      fontSize: theme.typography.body1.fontSize,
      lineHeight: theme.typography.body1.lineHeight,
      color: "black",
    },
    labelContainer: {
      alignItems: "center",
      display: "inline-flex",
      justifyContent: "space-between",
      width: "100%",
    },
    paper: {
      "& .MuiList-padding": {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    popover: {
      left: -69,
      marginTop: theme.spacing(2),
      zIndex: 10,
    },
    rotate: {
      transform: "rotate(180deg)",
    },
    userChip: {
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 24,
      color: theme.palette.text.primary,
      height: 48,
      padding: theme.spacing(0.5),

      "& .MuiChip-label": {
        alignItems: "center",
        display: "flex",
        minWidth: "260px",

        [theme.breakpoints.down("sm")]: {
          minWidth: "inherit",
        },
      },
    },
    userMenuContainer: {
      position: "relative",
    },
  }),
  {
    name: "UserChipMenu",
  }
);

export default useStyles;
