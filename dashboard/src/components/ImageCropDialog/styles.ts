import { makeStyles } from "@drural/macaw-ui";

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
    }
  }),
  { name: "ImageCropDialog" }
);
