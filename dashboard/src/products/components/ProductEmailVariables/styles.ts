import { makeStyles } from "@drural/macaw-ui";
import { lighten } from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    separator: {
      margin: `${theme.spacing(2.5)} 0`
    },
    varaibleHelperText: {
      fontSize: 12
    },
    varaibleSpan: {
      fontWeight: 500
    },
    variableWrapper: {
      color: lighten(theme.palette.common.black, 0.3),
      marginBottom: theme.spacing(1)
    },
    variablesWrapper: {
      background: lighten(theme.palette.secondary.main, 0.9),
      padding: theme.spacing(2),
      borderRadius: 6
    }
  }),
  { name: "ProductDuration" }
);
