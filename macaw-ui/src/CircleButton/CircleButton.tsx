import { darken, lighten } from "@material-ui/core";
import ButtonBase, { ButtonBaseProps } from "@material-ui/core/ButtonBase";
import clsx from "clsx";
import React from "react";

import { makeStyles } from "../theme";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      borderRadius: 100,
      color: theme.palette.primary.main,
      height: 40,
      transition: theme.transitions.duration.shortest + "ms",
      width: 40,
    },
    primary: {
      "&:hover": {
        background: theme.palette.primary.main,
      },
      background: darken(theme.palette.primary.main, 0.1),
    },
    secondary: {
      "&:hover": {
        background: theme.palette.primary.main,
      },
      background: lighten(theme.palette.secondary.main, 0.6),
    },
  }),
  {
    name: "ExpandButton",
  }
);

interface CircleButtonProps extends ButtonBaseProps {
  butonColor?: "primary" | "secondary";
}

export const CircleButton: React.FC<CircleButtonProps> = ({
  className,
  butonColor,
  ...rest
}) => {
  const classes = useStyles({});

  return (
    <ButtonBase
      className={clsx(
        classes.root,
        butonColor === "primary" ? classes.primary : classes.secondary,
        className
      )}
      {...rest}
    />
  );
};

CircleButton.displayName = "CircleButton";
