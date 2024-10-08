import clsx from "clsx";
import React from "react";

import { Logo as SaleorLogo } from "../icons/Logo";
import { localStorageKeys } from "../localStorageKeys";
import { makeStyles } from "../theme";
import useLocalStorage from "../tools/useLocalStorage";
import { ExpandButton } from "./ExpandButton";
import { MenuItem, menuWidth, shrunkMenuWidth } from "./MenuItem";
import { BaseSidebarProps } from "./types";

const useStyles = makeStyles(
  (theme) => ({
    expandButton: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(3),
    },
    float: {
      height: "100vh",
      position: "fixed",
      boxShadow: "0px 4px 16px rgb(0 0 0 / 10%)",
      backgroundColor: "#ffffff",
    },
    logo: {
      margin: `36px 0 ${theme.spacing(3)} ${theme.spacing(3)}`,
      height: 64,
      width: 38,
    },
    root: {
      minWidth: menuWidth,
      transition: "0.5s ease",
      zIndex: 100,
    },
    rootShrink: {
      minWidth: shrunkMenuWidth,
    },
    toolbarContainer: {
      margin: theme.spacing(1, 0, 1, 2),
    },
  }),
  {
    name: "SideBar",
  }
);

export interface SidebarProps extends BaseSidebarProps {
  active: string;
  shrunkLogo?: JSX.Element;
}

export const Sidebar: React.FC<SidebarProps> = ({
  active,
  logo,
  menuItems,
  shrunkLogo,
  toolbar,
  onMenuItemClick,
}) => {
  const classes = useStyles({});
  const { value: isShrunkStr, setValue: setShrink } = useLocalStorage(
    localStorageKeys.menuShrink,
    false.toString()
  );
  const isShrunk = isShrunkStr === "true";

  return (
    <div
      className={clsx(classes.root, {
        [classes.rootShrink]: isShrunk,
      })}
    >
      <div className={classes.float}>
        <div>
          <div className={classes.logo}>
            {isShrunk ? (
              shrunkLogo ? (
                shrunkLogo
              ) : (
                <SaleorLogo />
              )
            ) : logo ? (
              logo
            ) : (
              <SaleorLogo />
            )}
          </div>
          {menuItems.map((menuItem) => (
            <MenuItem
              active={active === menuItem.id}
              isMenuShrunk={isShrunk}
              menuItem={menuItem}
              onClick={onMenuItemClick}
              key={menuItem.ariaLabel}
            />
          ))}
          {toolbar && <div className={classes.toolbarContainer}>{toolbar}</div>}
          <ExpandButton
            className={classes.expandButton}
            isShrunk={isShrunk}
            onClick={() => setShrink((!isShrunk).toString())}
          />
        </div>
      </div>
    </div>
  );
};

Sidebar.displayName = "SideBar";
