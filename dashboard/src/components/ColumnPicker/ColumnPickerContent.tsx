import { makeStyles } from "@drural/macaw-ui";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography
} from "@material-ui/core";
import useElementScroll from "@saleor/hooks/useElementScroll";
import { buttonMessages } from "@saleor/intl";
import { FetchMoreProps } from "@saleor/types";
import { isSelected } from "@saleor/utils/lists";
import classNames from "classnames";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";

import ControlledCheckbox from "../ControlledCheckbox";
import Hr from "../Hr";

export interface ColumnPickerChoice {
  label: string;
  value: string;
}
export interface ColumnPickerContentProps extends Partial<FetchMoreProps> {
  columns: ColumnPickerChoice[];
  selectedColumns: string[];
  total?: number;
  onCancel: () => void;
  onColumnToggle: (column: string) => void;
  onReset: () => void;
  onSave: () => void;
}

const useStyles = makeStyles(
  theme => ({
    actionBar: {
      display: "flex",
      flexWrap: "wrap-reverse",
      justifyContent: "space-between"
    },
    actionBarContainer: {
      boxShadow: `0px 0px 0px 0px ${theme.palette.background.paper}`,
      padding: "16px 24px !important",
      transition: theme.transitions.duration.short + "ms"
    },
    buttonsContainer: {
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    },
    cancelButton: {
      marginRight: theme.spacing(2),

      [theme.breakpoints.down("xs")]: {
        marginRight: "2%",
        width: "48%"
      }
    },
    content: {
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(2, 1fr)"
      },
      display: "grid",
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "repeat(3, 1fr)",
      padding: theme.spacing(2, 3)
    },
    contentContainer: {
      maxHeight: 256,
      overflowX: "visible",
      overflowY: "scroll",
      padding: 0
    },
    columnInput: {
      padding: theme.spacing(1, 0)
    },
    dropShadow: {
      boxShadow: `0px -5px 10px 0px ${theme.palette.divider}`
    },
    loadMoreLoaderContainer: {
      alignItems: "center",
      display: "flex",
      gridColumnEnd: "span 3",
      height: theme.spacing(3),
      justifyContent: "center"
    },
    resetButton: {
      [theme.breakpoints.down("xs")]: {
        marginTop: "1rem",
        width: "100%"
      }
    },
    root: {
      boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.3)"
    },
    saveButton: {
      [theme.breakpoints.down("xs")]: {
        width: "48%"
      }
    },
    titleContainer: {
      padding: theme.spacing(1.5, 3.5)
    }
  }),
  { name: "ColumnPickerContent" }
);

const scrollableTargetId = "columnPickerScrollableDiv";

const ColumnPickerContent: React.FC<ColumnPickerContentProps> = props => {
  const {
    columns,
    hasMore,
    selectedColumns,
    total,
    onCancel,
    onColumnToggle,
    onFetchMore,
    onReset,
    onSave
  } = props;
  const classes = useStyles(props);
  const anchor = React.useRef<HTMLDivElement>();
  const scrollPosition = useElementScroll(anchor);

  const dropShadow =
    anchor.current && scrollPosition
      ? scrollPosition.y + anchor.current.clientHeight <
        anchor.current.scrollHeight
      : false;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.titleContainer}>
        <Typography color="textPrimary">
          <FormattedMessage
            defaultMessage="{numberOfSelected} columns selected out of {numberOfTotal}"
            description="pick columns to display"
            values={{
              numberOfSelected: selectedColumns.length,
              numberOfTotal: total || columns.length
            }}
          />
        </Typography>
      </CardContent>
      <Hr />
      <CardContent
        className={classes.contentContainer}
        ref={anchor}
        id={scrollableTargetId}
      >
        <InfiniteScroll
          dataLength={columns.length}
          next={onFetchMore}
          hasMore={hasMore}
          scrollThreshold="100px"
          loader={
            <div className={classes.loadMoreLoaderContainer}>
              <CircularProgress size={16} />
            </div>
          }
          scrollableTarget={scrollableTargetId}
        >
          <div className={classes.content}>
            {columns.map(column => (
              <ControlledCheckbox
                checked={isSelected(
                  column.value,
                  selectedColumns,
                  (a, b) => a === b
                )}
                className={classes.columnInput}
                name={column.value}
                label={column.label}
                onChange={() => onColumnToggle(column.value)}
                key={column.value}
              />
            ))}
          </div>
        </InfiniteScroll>
      </CardContent>
      <Hr />
      <CardContent
        className={classNames(classes.actionBarContainer, {
          [classes.dropShadow]: dropShadow
        })}
      >
        <div className={classes.actionBar}>
          <Button
            className={classes.resetButton}
            color="secondary"
            variant="outlined"
            onClick={onReset}
          >
            <FormattedMessage defaultMessage="Reset" description="button" />
          </Button>
          <div className={classes.buttonsContainer}>
            <Button
              className={classes.cancelButton}
              color="default"
              onClick={onCancel}
            >
              <FormattedMessage {...buttonMessages.cancel} />
            </Button>
            <Button
              className={classes.saveButton}
              color="primary"
              variant="contained"
              onClick={onSave}
            >
              <FormattedMessage {...buttonMessages.save} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColumnPickerContent;
