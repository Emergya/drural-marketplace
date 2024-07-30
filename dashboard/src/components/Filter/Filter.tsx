import { makeStyles } from "@drural/macaw-ui";
import {
  Button,
  ClickAwayListener,
  Grow,
  Popper,
  Typography
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import { FilterContent } from ".";
import {
  FilterErrorMessages,
  IFilter,
  IFilterElement,
  InvalidFilters
} from "./types";
import useFilter from "./useFilter";
import { extractInvalidFilters } from "./utils";

export interface FilterProps<TFilterKeys extends string = string> {
  currencySymbol?: string;
  errorMessages?: FilterErrorMessages<TFilterKeys>;
  menu: IFilter<TFilterKeys>;
  onFilterAdd: (filter: Array<IFilterElement<string>>) => void;
  onFilterAttributeFocus?: (id?: string) => void;
}

const useStyles = makeStyles(
  theme => ({
    addFilterButton: {
      marginRight: theme.spacing(2),
      transition: theme.transitions.duration.short + "ms",

      "&:hover": {
        "& $separator": {
          backgroundColor: theme.palette.primary.main
        },

        "& $filterNumber": {
          color: theme.palette.primary.main
        }
      }
    },
    addFilterButtonActive: {
      "&$addFilterButton": {
        backgroundColor: fade(theme.palette.primary.main, 0.1)
      }
    },
    addFilterIcon: {
      transition: theme.transitions.duration.short + "ms"
    },
    filterNumber: {
      transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    popover: {
      marginTop: "0.8rem",
      width: 376,
      zIndex: 3,

      [theme.breakpoints.down("xs")]: {
        left: "-24px !important",
        width: "96%"
      }
    },
    rotate: {
      transform: "rotate(180deg)"
    },
    separator: {
      backgroundColor: "#000000",
      display: "inline-block",
      height: 24,
      margin: theme.spacing(0, 1.5, 0, 1),
      transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      width: 1
    }
  }),
  { name: "Filter" }
);
const Filter: React.FC<FilterProps> = props => {
  const {
    currencySymbol,
    menu,
    onFilterAdd,
    onFilterAttributeFocus,
    errorMessages
  } = props;
  const classes = useStyles(props);

  const anchor = React.useRef<HTMLDivElement>();
  const [isFilterMenuOpened, setFilterMenuOpened] = useState(false);
  const [filterErrors, setFilterErrors] = useState<InvalidFilters<string>>({});
  const [data, dispatch, reset] = useFilter(menu);

  const isFilterActive = menu.some(filterElement => filterElement.active);

  const handleSubmit = () => {
    const invalidFilters = extractInvalidFilters(data, menu);

    if (Object.keys(invalidFilters).length > 0) {
      setFilterErrors(invalidFilters);
      return;
    }

    setFilterErrors({});
    onFilterAdd(data);
    setFilterMenuOpened(false);
  };

  const handleClear = () => {
    reset();
    setFilterErrors({});
  };

  return (
    <ClickAwayListener
      onClickAway={event => {
        if ((event.target as HTMLElement).getAttribute("role") !== "option") {
          setFilterMenuOpened(false);
        }
      }}
      mouseEvent="onMouseUp"
    >
      <div ref={anchor}>
        <Button
          className={classes.addFilterButton}
          color="secondary"
          variant="outlined"
          onClick={() => setFilterMenuOpened(!isFilterMenuOpened)}
          data-test-id="show-filters-button"
        >
          <FormattedMessage defaultMessage="Filters" description="button" />
          {isFilterActive && (
            <>
              <span className={classes.separator} />
              <Typography className={classes.filterNumber}>
                {menu.reduce((acc, filterElement) => {
                  const dataFilterElement = data.find(
                    ({ name }) => name === filterElement.name
                  );

                  if (!dataFilterElement) {
                    return acc;
                  }

                  return acc + (dataFilterElement.active ? 1 : 0);
                }, 0)}
              </Typography>
            </>
          )}
        </Button>
        <Popper
          className={classes.popover}
          open={isFilterMenuOpened}
          anchorEl={anchor.current}
          transition
          disablePortal
          placement="bottom-start"
          modifiers={{
            flip: {
              enabled: false
            },
            hide: {
              enabled: false
            },
            preventOverflow: {
              boundariesElement: "scrollParent",
              enabled: false
            }
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "right top" : "right bottom"
              }}
            >
              <FilterContent
                errorMessages={errorMessages}
                errors={filterErrors}
                dataStructure={menu}
                currencySymbol={currencySymbol}
                filters={data}
                onClear={handleClear}
                onFilterPropertyChange={dispatch}
                onFilterAttributeFocus={onFilterAttributeFocus}
                onSubmit={handleSubmit}
              />
            </Grow>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};
Filter.displayName = "Filter";
export default Filter;
