import { makeStyles, useTheme } from "@drural/macaw-ui";
import { UilAngleLeft, UilAngleRight } from "@iconscout/react-unicons";
import { IconButton } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    dark: {
      "& svg": {
        color: theme.palette.primary.main
      },
      "&$disabled": {
        "& svg": {
          color: fade(theme.palette.primary.main, 0.2)
        }
      },
      "&:focus, &:hover": {
        "& > span:first-of-type": {
          backgroundColor: fade(theme.palette.primary.main, 0.2)
        }
      }
    },
    disabled: {},
    iconButton: {
      "&:first-child": {
        marginRight: 8
      },
      "& > span:first-of-type": {
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "100%",
        height: "100%",
        transition: theme.transitions.duration.standard + "ms",
        width: "100%"
      },
      "& svg": {
        borderRadius: "50%",
        color: theme.palette.primary.light
      },
      "&:focus, &:hover": {
        "& > span:first-of-type": {
          backgroundColor: fade(theme.palette.primary.main, 0.2)
        },
        backgroundColor: "transparent"
      },
      "&$disabled": {
        "& svg": {
          color: fade(theme.palette.primary.main, 0.2)
        }
      },
      height: 40,
      padding: 0,
      width: 40
    },
    root: {
      color: theme.palette.text.secondary,
      flexShrink: 0,
      margin: theme.spacing(0, 2.5)
    }
  }),
  { name: "TablePaginationActions" }
);

export interface TablePaginationActionsProps {
  backIconButtonProps?: any;
  className?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextIconButtonProps?: any;
  onNextPage(event);
  onPreviousPage(event);
}

export const TablePaginationActions: React.FC<TablePaginationActionsProps> = props => {
  const {
    backIconButtonProps,
    className,
    hasNextPage,
    hasPreviousPage,
    nextIconButtonProps,
    onNextPage,
    onPreviousPage,
    ...other
  } = props;
  const classes = useStyles(props);

  const { direction, themeType } = useTheme();

  const isDark = themeType === "dark";

  return (
    <div className={classNames(classes.root, className)} {...other}>
      <IconButton
        className={classNames(classes.iconButton, {
          [classes.dark]: isDark,
          [classes.disabled]: !hasPreviousPage
        })}
        onClick={onPreviousPage}
        disabled={!hasPreviousPage}
        data-test="button-pagination-back"
        {...backIconButtonProps}
      >
        {direction === "rtl" ? <UilAngleRight /> : <UilAngleLeft />}
      </IconButton>
      <IconButton
        className={classNames(classes.iconButton, {
          [classes.dark]: isDark,
          [classes.disabled]: !hasNextPage
        })}
        onClick={onNextPage}
        disabled={!hasNextPage}
        data-test="button-pagination-next"
        {...nextIconButtonProps}
      >
        {direction === "rtl" ? <UilAngleLeft /> : <UilAngleRight />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.displayName = "TablePaginationActions";
export default TablePaginationActions;
