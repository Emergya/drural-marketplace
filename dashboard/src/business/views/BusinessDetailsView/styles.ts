import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("md")]: {
      validationModal: {
        "& div": {
          padding: theme.spacing(2),
          "& .MuiDialogTitle-root": {
            marginTop: theme.spacing(3),
            marginBottom: 0
          },
          "& .MuiDialogContent-root": {
            paddingTop: 0
          }
        },
        "& button": {
          marginTop: theme.spacing(3),
          padding: theme.spacing(1.5, 7.5)
        }
      },
      dialogText: {
        margin: theme.spacing(5),
        marginBottom: theme.spacing(2)
      }
    },
    // closeIcon:{
    //   cursor: "pointer",
    // },
    validationModal: {
      textAlign: "center",
      "& .MuiDialogTitle-root": {
        borderBottom: "none"
      },
      "& button": {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1.5, 7.5)
      }
    },
    dialogText: {
      color: "#616161",
      marginBottom: theme.spacing(2),
      marginTop: 0,
      paddingTop: 0,
      textAlign: "center"
    }
  }),
  { name: "BusinessDetailsView" }
);
