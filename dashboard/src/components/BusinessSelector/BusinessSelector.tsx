import { makeStyles } from "@drural/macaw-ui";
import { UilAngleDown, UilArrowRight } from "@iconscout/react-unicons";
import { Radio } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { lighten } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";

import Avatar from "../TableCellAvatar/Avatar";
import { IProps } from "./types";

const useStyles = makeStyles(
  theme => ({
    root: {
      display: "flex"
    },
    menuItem: {
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "0",
      "&:hover": {
        backgroundColor: lighten(theme.palette.primary.main, 0.7) + "!important"
      }
    },
    listTitle: {
      fontSize: theme.typography.h6.fontSize,
      fontWeight: theme.typography.h6.fontWeight,
      lineHeight: theme.typography.h6.lineHeight,
      borderBottom: `1px solid ${lighten(theme.palette.secondary.main, 0.7)}`,
      paddingTop: theme.spacing(2.25),
      paddingBottom: theme.spacing(0.75),
      pointerEvents: "none"
    },
    buttonSelector: {
      width: "300px",
      borderRadius: "0",
      backgroundColor: "#FFFFFF",
      boxShadow: "0px 4px 16px rgb(0 0 0 / 10%)",
      minHeight: "48px",
      marginRight: "20px",
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: "5px",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingRight: "10px",
      [theme.breakpoints.down("sm")]: {
        width: "90px"
      }
    },
    selectedName: {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight,
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    popper: {
      zIndex: 3
    },
    paper: {
      borderRadius: 0,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      marginTop: "10px",
      width: "360px",
      maxWidth: "100vw"
    },
    selectionList: {
      padding: "0px !important"
    },

    allShops: {
      borderRadius: "0",
      height: "48px",
      backgroundColor: "#000 ",
      "&:hover, &:active": {
        backgroundColor: theme.palette.primary.main + "!important"
      },
      "& div": {
        color: "#FFF",
        textDecoration: "none"
      },
      "& svg": {
        marginRight: theme.spacing(1.25),
        verticalAlign: "middle"
      }
    },
    activeItem: {
      borderLeft: `6px solid ${theme.palette.primary.main}`,
      paddingLeft: "18px"
    },
    inActiveItem: {
      borderLeft: "",
      paddingLeft: "24px"
    },
    spacer: {
      height: theme.spacing(3.5)
    }
  }),
  { name: "BusinessSelector" }
);

export const BusinessSelector: React.FC<IProps> = ({
  onActiveItem,
  activeItemName = "",
  activeItemImage = "",
  activeItemIndex,
  itemList = [],
  lastItemName,
  lastItemUrl,
  onLastItemClick,
  listTitle
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          className={classes.buttonSelector}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar thumbnail={activeItemImage}>
            <div className={classes.selectedName}>{activeItemName}</div>
          </Avatar>
          <UilAngleDown />
        </Button>
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement={"bottom-end"}
          transition
          disablePortal
          popperOptions={{
            modifiers: {
              flip: { enabled: false },
              offset: {
                enabled: true,
                offset: "0px, 0px"
              }
            }
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "top bottom" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    className={classes.selectionList}
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem className={classes.listTitle}>
                      {listTitle}
                    </MenuItem>
                    {itemList.map((itemName, index) => (
                      <MenuItem
                        key={itemName}
                        className={classNames(
                          classes.menuItem,
                          index === activeItemIndex
                            ? classes.activeItem
                            : classes.inActiveItem
                        )}
                        onClick={event => {
                          handleClose(event);
                          onActiveItem(index);
                        }}
                      >
                        {itemName}
                        <Radio
                          size="small"
                          checked={index === activeItemIndex}
                        />
                      </MenuItem>
                    ))}
                    <div className={classes.spacer} />
                    <MenuItem
                      onClick={event => {
                        handleClose(event);
                        onLastItemClick(lastItemUrl);
                      }}
                      className={classes.allShops}
                    >
                      <div>
                        <UilArrowRight />
                        {lastItemName}
                      </div>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};
