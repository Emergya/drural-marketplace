import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    uploadContainer: {
      display: "flex",
      alignItems: "start",
      textAlign: "left",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center"
      }
    },
    ImageUploadWrapper: {
      cursor: "pointer"
    },
    photoWrapper: {
      width: "fit-content",
      flexShrink: 0,
      marginRight: "22px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginRight: "0"
      }
    },
    contentWrapper: {
      flex: 1,

      [theme.breakpoints.down("xs")]: {}
    },
    photoTitle: { marginTop: "20px", marginBottom: "20px" },
    imageLabel: {},
    input: {
      display: "none"
    },
    icon: {
      marginRight: "0.25rem"
    },
    description: {
      opacity: "0.6",
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
