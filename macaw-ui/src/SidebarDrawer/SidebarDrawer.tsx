import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import SVG from "react-inlinesvg";

import { CircleButton } from "..";
import { Logo as SaleorLogo } from "../icons/Logo";
import { BaseSidebarProps, SidebarMenuItem } from "../Sidebar/types";
import { SquareButton } from "../SquareButton";
import { MenuItemBtn } from "./MenuItemBtn";
import useStyles from "./styles";

export type SideBarDrawerProps = BaseSidebarProps;

export const SidebarDrawer: React.FC<SideBarDrawerProps> = ({
  logo,
  menuItems,
  onMenuItemClick,
}) => {
  const [isOpened, setOpened] = React.useState(false);
  const classes = useStyles({});
  const [activeMenu, setActiveMenu] = React.useState<SidebarMenuItem | null>(
    null
  );
  const [showSubmenu, setShowSubmenu] = React.useState(false);
  const container = React.useRef<HTMLDivElement>(null);

  const handleMenuItemClick = (url: string) => {
    setOpened(false);
    setShowSubmenu(false);
    onMenuItemClick(url);
  };

  const handleMenuItemWithChildrenClick = (menuItem: SidebarMenuItem) => {
    setActiveMenu(menuItem);
    setShowSubmenu(true);
    container.current?.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <SquareButton onClick={() => setOpened(true)}>
        <MenuIcon className={classes.menuIcon} />
      </SquareButton>
      <Drawer
        classes={{
          paper: classes.root,
        }}
        open={isOpened}
        onClose={() => setOpened(false)}
      >
        <div
          className={clsx(classes.container, {
            [classes.containerSubMenu]: showSubmenu,
          })}
          ref={container}
        >
          <div
            className={clsx(classes.innerContainer, {
              [classes.secondaryContentActive]: showSubmenu,
            })}
          >
            <div className={classes.content}>
              <div className={classes.logo}>{logo ? logo : <SaleorLogo />}</div>
              {menuItems.map((menuItem) => (
                <MenuItemBtn
                  menuItem={menuItem}
                  onClick={
                    menuItem.children
                      ? () => handleMenuItemWithChildrenClick(menuItem)
                      : handleMenuItemClick
                  }
                  key={menuItem.ariaLabel}
                />
              ))}
            </div>
            {activeMenu && (
              <div className={classes.content}>
                <div className={classes.subMenuTopBar}>
                  <div className={classes.activeMenuLabel}>
                    {activeMenu.iconSrc && (
                      <SVG className={classes.icon} src={activeMenu.iconSrc} />
                    )}
                    <Typography>{activeMenu.label}</Typography>
                  </div>
                  <CircleButton
                    butonColor="primary"
                    onClick={() => setShowSubmenu(false)}
                  >
                    <ArrowIcon className={clsx(classes.arrow)} />
                  </CircleButton>
                </div>
                {activeMenu.children?.map((subMenuItem) => (
                  <MenuItemBtn
                    menuItem={subMenuItem}
                    onClick={handleMenuItemClick}
                    key={subMenuItem.ariaLabel}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

SidebarDrawer.displayName = "SideBarDrawer";
