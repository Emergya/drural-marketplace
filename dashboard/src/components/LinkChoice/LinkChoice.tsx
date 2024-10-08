import { makeStyles } from "@drural/macaw-ui";
import { ClickAwayListener, MenuItem, Paper, Popper } from "@material-ui/core";
import { FormChange } from "@saleor/hooks/useForm";
import ArrowDropdown from "@saleor/icons/ArrowDropdown";
import classNames from "classnames";
import { codes } from "keycode";
import React from "react";

import Link from "../Link";
import { SingleAutocompleteChoiceType } from "../SingleAutocompleteSelectField";

const useStyles = makeStyles(
  theme => ({
    arrow: {
      position: "relative",
      top: 6,
      transition: theme.transitions.duration.short + "ms"
    },
    highlighted: {
      background: theme.palette.background.default
    },
    menuItem: {
      "&:not(:last-of-type)": {
        marginBottom: theme.spacing()
      }
    },
    paper: {
      borderRadius: 0,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      padding: theme.spacing()
    },
    popper: {
      marginTop: theme.spacing(1),
      zIndex: 2
    },
    root: {
      "&:focus": {
        textDecoration: "underline"
      },
      outline: 0,
      position: "relative"
    },
    rotate: {
      transform: "rotate(180deg)"
    }
  }),
  {
    name: "LinkChoice"
  }
);

export interface LinkChoiceProps {
  className?: string;
  choices: SingleAutocompleteChoiceType[];
  name?: string;
  value: string;
  onChange: FormChange;
}

const LinkChoice: React.FC<LinkChoiceProps> = ({
  className,
  choices,
  name,
  value,
  onChange
}) => {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const anchor = React.useRef<HTMLInputElement>(null);
  const current = choices.find(c => c.value === value);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);

  const handleChange = (value: string) => {
    setOpen(false);
    onChange({
      target: {
        name,
        value
      }
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    switch (event.keyCode) {
      case codes.down:
        setHighlightedIndex(
          highlightedIndex => (highlightedIndex + 1) % choices.length
        );
        break;
      case codes.up:
        setHighlightedIndex(highlightedIndex =>
          highlightedIndex === 0
            ? choices.length - 1
            : (highlightedIndex - 1) % choices.length
        );
        break;
      case codes.enter:
        if (open) {
          handleChange(choices[highlightedIndex].value);
        } else {
          setOpen(true);
        }
        break;
    }
  };

  return (
    <span
      className={classNames(classes.root, className)}
      ref={anchor}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <Link onClick={() => setOpen(open => !open)}>
        {current.label}
        <ArrowDropdown
          className={classNames(classes.arrow, {
            [classes.rotate]: open
          })}
          color="primary"
        />
      </Link>

      <Popper
        className={classes.popper}
        open={open}
        anchorEl={anchor.current}
        transition
        disablePortal
        placement="bottom-start"
      >
        <ClickAwayListener
          onClickAway={() => setOpen(false)}
          mouseEvent="onClick"
        >
          <Paper className={classes.paper}>
            {choices.map((choice, choiceIndex) => (
              <MenuItem
                className={classNames(classes.menuItem, {
                  [classes.highlighted]: highlightedIndex === choiceIndex
                })}
                selected={choice.value === value}
                key={choice.value}
                onClick={() => handleChange(choice.value)}
                data-test="select-option"
              >
                {choice.label}
              </MenuItem>
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </span>
  );
};

LinkChoice.displayName = "LinkChoice";
export default LinkChoice;
