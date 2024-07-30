import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    activeWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between"
    },
    buttonsWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
      paddingTop: theme.spacing(3),
      width: "100%",

      "& button:first-child": {
        marginRight: theme.spacing(2)
      }
    },
    emailInput: {
      width: "100%",
      marginBottom: theme.spacing(3)
    },
    formWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
    input: {
      width: "48.4%",

      [theme.breakpoints.down("sm")]: {
        width: "100%",

        "&:not(:last-child)": {
          marginBottom: theme.spacing(3)
        }
      }
    },
    subtitleDescription: {
      color: theme.palette.grey[600]
    },
    switch: {
      marginRight: 0,
      marginLeft: theme.spacing(3)
    }
  }),
  { name: "ChatwootConfigurationForm" }
);
