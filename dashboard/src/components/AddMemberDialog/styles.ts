import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    sectionTitle: {
      fontWeight: 600 as 600,
      marginBottom: theme.spacing(),
      marginTop: theme.spacing(2)
    },
    textFieldGrid: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gridRowGap: "40px"
      }
    },
    paperProps: {
      maxWidth: "800px",
      width: "100%",
      borderRadius: "16px",
      minHeight: "416px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "30px",
      paddingRight: "30px",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: "100vw",
        marginRight: "10px",
        marginLeft: "10px"
      }
    },
    actions: {
      paddingTop: "35px",
      borderTop: "none",
      justifyContent: "center"
    },

    backButton: {
      paddingLeft: "48px",
      paddingRight: "48px"
    },
    title: {
      borderBottom: "none",
      textAlign: "center",
      "& h2": {
        fontSize: "28px",
        fontWeight: "600",
        [theme.breakpoints.down("sm")]: {
          fontSize: "18px"
        }
      }
    },
    closeIcon: {
      position: "absolute",
      top: "3%",
      left: "95%",
      [theme.breakpoints.down("sm")]: {
        top: "2%",
        left: "95%"
      },
      [theme.breakpoints.down("xs")]: {
        top: "2%",
        left: "91%",
        "& svg": {
          width: "16px",
          height: "16px"
        }
      }
    }
  }),
  { name: "AddMemberDialog" }
);
