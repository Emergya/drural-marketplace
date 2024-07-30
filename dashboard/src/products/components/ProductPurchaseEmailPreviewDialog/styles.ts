import { makeStyles } from "@drural/macaw-ui";
import { lighten } from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    actionsWrapper: {
      borderTop: "none",
      justifyContent: "center",

      "& .Button": {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
        marginRight: "10px",
        [theme.breakpoints.down("md")]: {
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(4),
          marginRight: "0px"
        },
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(2)
        }
      }
    },
    closeIcon: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        top: theme.spacing(2.5),
        right: theme.spacing(2.5),
        "& svg": {
          width: "16px",
          height: "16px"
        }
      }
    },
    contentWrapper: {
      padding: 0,
      [theme.breakpoints.down("md")]: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3)
      },
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
      }
    },
    dialog: {
      position: "relative",
      padding: `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(0)}`,
      [theme.breakpoints.down("md")]: {
        padding: "0px"
      }
    },
    titleWrapper: {
      paddingTop: 0,
      [theme.breakpoints.down("md")]: {
        paddingTop: theme.spacing(3),
        margin: "auto"
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2)
      }
    },
    title: {
      [theme.breakpoints.down("md")]: {
        fontSize: "18px",
        lineHeight: "30px"
      }
    },
    // Emial styles
    emailContainer: {
      background: "#F7F6F8",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(3)
    },
    emailLogoWrapper: {
      textAlign: "center"
    },
    emailLogo: {
      maxHeight: 64
    },
    emailSubjectWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: theme.spacing(3)
    },
    emailSubject: {
      background: lighten(theme.palette.primary.main, 0.7),
      borderRadius: 4,
      padding: "4px 16px"
    },
    emailWrapper: {
      background: theme.palette.common.white,
      boxShadow: "0px 4px 16px rgb(0 0 0 / 10%)",
      margin: "32px auto 24px",
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "95%"
      }
    },
    emailWrapperInner: {
      padding: "40px 40px 64px",
      [theme.breakpoints.down("sm")]: {
        padding: "24px 24px 46px"
      }
    },
    emailTitle: {
      marginBottom: theme.spacing(2.75)
    },
    emailFooterWrapper: {
      padding: `0 ${theme.spacing(2)}`,
      fontSize: 14,
      lineHeight: "24px",
      opacity: 0.6,
      textAlign: "center"
    },
    emailIconLogo: {
      marginTop: theme.spacing(),
      maxHeight: theme.spacing(5)
    }
  }),
  { name: "ProductPurchaseEmailPreviewDialog" }
);
