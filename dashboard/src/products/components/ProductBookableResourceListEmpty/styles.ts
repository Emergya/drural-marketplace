import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    container: {
      display: "flex",
      alignItems: "center"
    },
    image: {
      width: 122
    },
    imageWrapper: {
      paddingRight: theme.spacing(3.75)
    },
    infoWrapper: {},
    text: {
      color: theme.palette.secondary.main,

      "&:not(:last-child)": {
        marginBottom: theme.spacing(1.5)
      }
    },
    title: {
      marginBottom: theme.spacing(1.25)
    }
  }),
  { name: "ProductBookableResourceListEmpty" }
);
