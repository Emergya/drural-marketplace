import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    uploadContainer: {
      display: "flex",
      alignItems: "start",
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        minHeight: "350px"
      }
    },
    photoWrapper: {
      width: "324px",
      flexShrink: 0
    },
    contentWrapper: {
      flexBasis: "63%",
      paddingLeft: theme.spacing(5),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(0)
      }
    },
    photoTitle: { marginTop: "20px", marginBottom: "10px" },
    imageLabel: {
      width: "fit-content"
    },
    input: {
      display: "none"
    },
    icon: {
      marginRight: "0.25rem"
    },
    description: {
      "& div:not(:last-child)": {
        marginBottom: theme.spacing(1)
      }
    },
    baseXS: {
      fontSize: "12px",
      lineHeight: "20px",
      maxWidth: "370px"
    },
    button: {
      width: "239px",
      height: "48px",
      marginTop: "20px",
      "&:hover": {
        "& path": {
          fill: theme.palette.primary.main
        }
      }
    }
  }),
  { name: "BusinessMediaCreate" }
);
