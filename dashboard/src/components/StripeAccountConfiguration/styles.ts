import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    actionWrapper: {
      marginBottom: theme.spacing(5)
    },
    actionWrapperCenter: {
      display: "flex",
      justifyContent: "center"
    },
    completeFlowImagWrapper: {
      [theme.breakpoints.down("xs")]: {
        paddingBottom: theme.spacing(5),
        textAlign: "center",
        width: "100%"
      }
    },
    flexContainer: {
      alignItems: "center",
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        flexWrap: "wrap"
      }
    },
    iconButton: {
      marginLeft: theme.spacing(1.5)
    },
    contentWrapper: {
      marginBottom: theme.spacing(6)
    },
    contentCol: {
      paddingLeft: theme.spacing(5.5),
      [theme.breakpoints.down("xs")]: {
        paddingLeft: 0
      }
    },
    dRuralLogo: {
      filter: "drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25))",
      height: "64px",
      width: "64px"
    },
    loader: {
      margin: `0 ${theme.spacing(6.5)}`
    },
    loadingActionWrapper: {
      alignItems: "center"
    },
    loadingPretitle: {
      color: theme.palette.secondary.main,
      marginTop: theme.spacing(5),
      textAlign: "center"
    },
    mobileActionWrapper: {
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing(5)
      }
    },
    mobileActionWrapperCenter: {
      display: "flex",
      justifyContent: "center"
    },
    paragraphSpacer: {
      marginBottom: theme.spacing(1.5)
    }
  }),
  { name: "StripeAccountConfiguration" }
);
