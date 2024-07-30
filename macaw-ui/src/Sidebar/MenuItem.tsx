import { lighten } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import SVG from "react-inlinesvg";

import { makeStyles } from "../theme";
import { SidebarMenuItem } from "./types";

export interface MenuItemProps {
  active: boolean;
  isMenuShrunk: boolean;
  menuItem: SidebarMenuItem;
  onClick: (url: string) => void;
}

export const menuWidth = 210;
export const shrunkMenuWidth = 72;

const useStyles = makeStyles(
  (theme) => ({
    hideLabel: {
      "&$label": {
        opacity: 0,
      },
    },
    icon: {
      "& svg": {
        height: 24,
        width: 24,
      },
      marginRight: theme.spacing(1.5),
      transition: "0.5s ease",
    },
    label: {
      cursor: "pointer",
      display: "block",
      fontSize: 16,
      fontWeight: 400,
      opacity: 1,
      transition: "0.5s ease",
    },
    labelRoot: {
      position: "absolute",
      left: 72,
      width: 200,
      textAlign: "left",
      pointerEvents: "none",
    },
    menuItemBtn: {
      "&:focus": {
        color: theme.palette.primary.main,
        outline: 0,
      },
      background: "none",
      border: "none",
      color: "inherit",
      cursor: "pointer",
      display: "inline-flex",
      margin: 0,
      padding: 0,
    },
    paper: {
      borderRadius: 16,
      boxShadow: "0px 4px 16px rgb(0 0 0 / 10%)",
      cursor: "default",
      padding: `${theme.spacing(3)} 0`,
      textAlign: "left",
    },
    popper: {
      marginLeft: theme.spacing(2),
      zIndex: 2,
    },
    root: {
      "&:hover, &:focus": {
        backgroundColor: lighten(theme.palette.primary.main, 0.7),
        outline: 0,
      },
      alignItems: "center",
      color: "#000000",
      cursor: "pointer",
      display: "flex",
      height: 56,
      marginBottom: "0.5rem",
      overflow: "hidden",
      padding: "12px 26px",
      transition: "0.5s ease",
      width: shrunkMenuWidth,
    },
    rootActive: {
      "&$root": {
        "&::before": {
          content: "''",
          backgroundColor: theme.palette.primary.main,
          height: 56,
          left: 0,
          position: "absolute",
          width: 6,
          zIndex: 100,
        },
      },
    },
    rootExpanded: {
      width: menuWidth,
    },
    subMenuLabel: {
      "&:hover, &:focus": {
        backgroundColor: lighten(theme.palette.primary.main, 0.7),
        outline: 0,
      },
      background: "none",
      border: "none",
      color: "#000000",
      minWidth: "24rem",
      padding: "12px 26px",
      textAlign: "left",
      textDecoration: "none",
      whiteSpace: "nowrap",
    },
  }),
  {
    name: "MenuItem",
  }
);

export const MenuItem: React.FC<MenuItemProps> = ({
  active,
  menuItem,
  isMenuShrunk,
  onClick,
}) => {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const anchor = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent, menuItem: SidebarMenuItem) => {
    event.stopPropagation();
    if (menuItem.children) {
      setOpen(true);
    } else {
      onClick(menuItem.url!);
      setOpen(false);
    }
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.rootActive]: active,
        [classes.rootExpanded]: !isMenuShrunk,
      })}
      ref={anchor}
      onClick={(event) => handleClick(event, menuItem)}
    >
      <button
        className={classes.menuItemBtn}
        data-test="menu-item-label"
        data-test-id={menuItem.id}
      >
        {menuItem.iconSrc && (
          <SVG className={classes.icon} src={menuItem.iconSrc} />
        )}
        <Typography
          aria-label={menuItem.ariaLabel}
          className={clsx(classes.label, classes.labelRoot, {
            [classes.hideLabel]: isMenuShrunk,
          })}
          variant="body2"
        >
          {menuItem.label}
        </Typography>
      </button>
      {menuItem.children && (
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchor.current}
          transition
          disablePortal
          placement="right-start"
        >
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Paper className={classes.paper}>
              {menuItem.children.map((subMenuItem) => {
                const linkProps = subMenuItem.external
                  ? { href: subMenuItem.url, target: "_blank" }
                  : {};

                return (
                  <Typography
                    aria-label={subMenuItem.ariaLabel}
                    component={subMenuItem.external ? "a" : "button"}
                    className={clsx(classes.label, classes.subMenuLabel)}
                    key={subMenuItem.url}
                    onClick={(event: React.MouseEvent<any>) =>
                      handleClick(event, subMenuItem)
                    }
                    data-test="submenu-item-label"
                    data-test-id={subMenuItem.id}
                    variant="body2"
                    {...linkProps}
                  >
                    {subMenuItem.label}
                  </Typography>
                );
              })}
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </div>
  );
};

MenuItem.displayName = "MenuItem";
