import { makeStyles } from "@drural/macaw-ui";
import { darken, lighten } from "@material-ui/core";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    disabled: {
      color: lighten(theme.palette.secondary.main, 0.8),

      "&:hover": {
        color: lighten(theme.palette.secondary.main, 0.8),
        cursor: "grab"
      }
    },
    link: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: "21px"
    },
    primary: {
      color: darken(theme.palette.primary.main, 0.1),

      "&:hover": {
        color: theme.palette.primary.main,
        cursor: "pointer"
      }
    },
    secondary: {
      color: theme.palette.common.black,

      "&:hover": {
        color: theme.palette.primary.main,
        cursor: "pointer"
      }
    },
    underline: {
      textDecoration: "underline"
    }
  }),
  { name: "StyledLink" }
);

interface StyledLinkProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "primary" | "secondary";
  underline?: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

export const StyledLink: React.FC<StyledLinkProps> = ({
  children,
  disabled,
  type = "primary",
  underline,
  onClick
}) => {
  const classes = useStyles();

  const onLinkClick = event => {
    if (!disabled) {
      onClick(event);
    }
  };

  return (
    <span
      className={classNames(classes.link, {
        [classes.disabled]: disabled,
        [classes[type]]: type && !disabled,
        [classes.underline]: underline
      })}
      onClick={onLinkClick}
    >
      {children}
    </span>
  );
};
export default StyledLink;
