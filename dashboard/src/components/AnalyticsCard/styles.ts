import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    cardBackgroundPrimary: {
      backgroundColor: theme.palette.primary.main
    },
    cardBackgroundSecondary: {
      backgroundColor: theme.palette.alert.paper.warning
    },
    cardBackgroundBlue: {
      backgroundColor: theme.customColors.blueGray
    },
    cardBackgroundRed: {
      backgroundColor: "#FFA3A3"
    },
    cardContent: {
      padding: "4.2rem 2.4rem"
    },
    cardIconPrimary: {
      color: theme.palette.primary.main
    },
    cardIconSecondary: {
      color: theme.palette.alert.paper.warning
    },
    cardIconBlue: {
      color: theme.customColors.blueGray
    },
    cardIconRed: {
      color: "#FFA3A3"
    },
    cardSpacing: {
      [theme.breakpoints.up("xs")]: {
        marginBottom: theme.spacing(2)
      },
      [theme.breakpoints.up("sm")]: {
        marginBottom: theme.spacing(4)
      },
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
      marginBottom: theme.spacing(5)
    },
    cardTitle: {
      color: theme.palette.common.white,
      textAlign: "right"
    },
    clickable: {
      cursor: "pointer"
    },
    notClickable: {
      cursor: "grab"
    },
    flexContainer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between"
    },
    icon: {
      color: theme.palette.primary.contrastText,
      fontSize: 54,
      margin: ".5rem .3rem"
    },
    iconButton: {
      backgroundColor: theme.palette.common.white,
      borderRadius: 100,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",

      "&:hover": {
        backgroundColor: theme.palette.common.white
      }
    },
    skeleton: {
      opacity: 0.8
    },
    value: {
      lineHeight: "62px"
    },
    valueWrapper: {
      marginLeft: theme.spacing(3),
      textAlign: "right",
      width: "100%"
    }
  }),
  { name: "AnalyticsCard" }
);
