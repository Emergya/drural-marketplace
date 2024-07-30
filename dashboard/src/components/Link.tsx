import { makeStyles } from "@drural/macaw-ui";
import { darken, Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    primary: {
      color: darken(theme.palette.primary.main, 0.1),

      "&:hover": {
        color: theme.palette.primary.main
      }
    },
    root: {
      cursor: "pointer",
      display: "inline",
      fontWeight: "bold",
      fontSize: 14,
      lineHeight: "21px",
      textTransform: "uppercase"
    },
    secondary: {
      color: theme.palette.secondary.main,

      "&:hover": {
        color: theme.palette.primary.main
      }
    },
    underline: {
      textDecoration: "underline"
    },
    disabled: {
      cursor: "default",
      color: theme.palette.textHighlighted.inactive
    }
  }),
  { name: "Link" }
);

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: "primary" | "secondary";
  underline?: boolean;
  typographyProps?: TypographyProps;
  onClick: () => void;
  disabled?: boolean;
}

const Link: React.FC<LinkProps> = props => {
  const {
    className,
    children,
    color = "primary",
    underline = false,
    onClick,
    disabled,
    ...linkProps
  } = props;

  const classes = useStyles(props);

  return (
    <Typography
      component="a"
      className={classNames(className, {
        [classes.root]: true,
        [classes[color]]: true,
        [classes.underline]: underline,
        [classes.disabled]: disabled
      })}
      onClick={event => {
        if (disabled) {
          return;
        }

        event.preventDefault();
        onClick();
      }}
      {...linkProps}
    >
      {children}
    </Typography>
  );
};
Link.displayName = "Link";
export default Link;
