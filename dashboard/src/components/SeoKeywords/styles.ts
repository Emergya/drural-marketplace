import { makeStyles } from "@drural/macaw-ui";
import { darken, lighten } from "@material-ui/core";

export const useStyles = makeStyles(
  theme => {
    const colAction: React.CSSProperties = {
      textAlign: "right",
      width: 130
    };
    const colName: React.CSSProperties = {
      width: 220
    };

    return {
      buttonHeader: {
        "& .MuiButton-label": {
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 700,
          lineHeight: "21px",
          textTransform: "uppercase"
        }
      },
      colAction: {
        "&:last-child": {
          ...colAction,
          paddingRight: theme.spacing(3)
        }
      },
      colActionHeader: {
        ...colAction
      },
      colName: {
        ...colName,
        verticalAlign: "top"
      },
      colNameHeader: {
        ...colName
      },
      colValue: {},
      content: {
        paddingBottom: 0,
        paddingTop: theme.spacing()
      },
      emptyContainer: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(3),
        textAlign: "center"
      },
      emptyImage: {
        marginBottom: theme.spacing(2)
      },
      input: {
        padding: theme.spacing(0.5, 2)
      },
      iconButtonDelete: {
        backgroundColor: theme.palette.common.white,
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        color: darken(theme.palette.primary.main, 0.1),
        "&:hover": {
          backgroundColor: lighten(theme.palette.primary.main, 0.9)
        }
      },
      nameInput: {
        padding: `13px 16px`
      },
      table: {
        tableLayout: "fixed"
      },
      title: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5)
      },
      togglable: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between"
      }
    };
  },
  {
    name: "SeoKeywords"
  }
);
