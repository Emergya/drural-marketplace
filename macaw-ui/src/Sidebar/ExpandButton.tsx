import { ButtonProps } from "@material-ui/core/Button";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import clsx from "clsx";
import React from "react";

import { CircleButton } from "..";
import { makeStyles } from "../theme";

const useStyles = makeStyles(
  (theme) => ({
    arrow: {
      color: "#ffffff",
      transition: theme.transitions.duration.shortest + "ms",
      width: 20,
      height: 20,
    },
    shrunk: {
      transform: "scaleX(-1)",
    },
  }),
  {
    name: "ExpandButton",
  }
);

export interface ExpandButtonProps extends ButtonProps {
  isShrunk: boolean;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  isShrunk,
  ...rest
}) => {
  const classes = useStyles({});

  return (
    <CircleButton {...rest}>
      <ArrowIcon
        className={clsx(classes.arrow, {
          [classes.shrunk]: isShrunk,
        })}
      />
    </CircleButton>
  );
};

ExpandButton.displayName = "ExpandButton";
