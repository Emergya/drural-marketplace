import { makeStyles } from "@drural/macaw-ui";
import {
  ClickAwayListener,
  darken,
  Grow,
  IconButton,
  lighten,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";

const ITEM_HEIGHT = 48;

export interface CardMenuItem {
  disabled?: boolean;
  label: string;
  testId?: string;
  onSelect: () => void;
}

export interface CardMenuProps {
  className?: string;
  disabled?: boolean;
  menuItems: CardMenuItem[];
}

const useStyles = makeStyles(
  theme => ({
    container: {
      zIndex: 3
    },
    iconButton: {
      backgroundColor: theme.palette.common.white,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      color: darken(theme.palette.primary.main, 0.1),
      "&:hover": {
        backgroundColor: lighten(theme.palette.primary.main, 0.9)
      }
    },
    paper: {
      borderRadius: 0,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      marginTop: theme.spacing(2),
      maxHeight: ITEM_HEIGHT * 4.5,

      "& .MuiList-root": {
        paddingBottom: 0,
        paddingTop: 0
      }
    }
  }),
  { name: "CardMenu" }
);

const CardMenu: React.FC<CardMenuProps> = props => {
  const { className, disabled, menuItems, ...rest } = props;
  const classes = useStyles(props);

  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen(prevOpen => !prevOpen);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleMenuClick = (index: number) => {
    menuItems[index].onSelect();
    setOpen(false);
  };

  return (
    <div className={className} {...rest}>
      <IconButton
        data-test-id="showMoreButton"
        aria-label="More"
        aria-owns={open ? "long-menu" : null}
        aria-haspopup="true"
        className={classes.iconButton}
        color="primary"
        disabled={disabled}
        ref={anchorRef}
        onClick={handleToggle}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        placement="bottom-end"
        className={classes.container}
        open={open}
        anchorEl={anchorRef.current}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "right top" : "right bottom"
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {menuItems.map((menuItem, menuItemIndex) => (
                    <MenuItem
                      data-test-id={menuItem.testId}
                      disabled={menuItem.disabled}
                      onClick={() => handleMenuClick(menuItemIndex)}
                      key={menuItem.label}
                      data-test={menuItem.testId}
                    >
                      {menuItem.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
CardMenu.displayName = "CardMenu";
export default CardMenu;
