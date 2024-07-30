import { makeStyles } from "@drural/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    gridWrapper: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexWrap: "wrap",
        gridRowGap: theme.spacing(3),

        "& > *": {
          width: "100%"
        }
      }
    },
    hr: {
      gridColumnEnd: "span 2",
      margin: theme.spacing(1, 0)
    }
  }),
  {
    name: "SiteSettingsPage"
  }
);
