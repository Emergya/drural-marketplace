import { lighten } from "@material-ui/core";
import ButtonBase, { ButtonBaseProps } from "@material-ui/core/ButtonBase";
import clsx from "clsx";
import React from "react";

import { makeStyles } from "../theme";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      "&:hover, &:focus": {
        background: lighten(theme.palette.secondary.main, 0.95),
      },
      background: theme.palette.background.paper,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      color: theme.palette.primary.main,
      height: 48,
      transition: theme.transitions.duration.shortest + "ms",
      width: 48,
    },
  }),
  {
    name: "ExpandButton",
  }
);

export const SquareButton: React.FC<ButtonBaseProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles({});

  return <ButtonBase className={clsx(classes.root, className)} {...rest} />;
};

SquareButton.displayName = "SquareButton";
