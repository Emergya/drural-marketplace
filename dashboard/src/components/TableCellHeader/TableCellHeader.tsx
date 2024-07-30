import { makeStyles } from "@drural/macaw-ui";
import { UilArrowDown } from "@iconscout/react-unicons";
import { lighten, TableCell } from "@material-ui/core";
import { TableCellProps } from "@material-ui/core/TableCell";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    arrow: {
      color: lighten("#000000", 0.4),
      transition: theme.transitions.duration.short + "ms"
    },
    arrowLeft: {
      marginLeft: -24
    },
    arrowUp: {
      transform: "rotate(180deg)"
    },
    disabled: {
      opacity: 0.7,
      "&&": {
        cursor: "unset"
      }
    },
    label: {
      alignSelf: "center",
      display: "inline-block"
    },
    labelContainer: {
      "&:hover": {
        color: lighten("#000000", 0.4)
      },
      display: "flex",
      height: 24
    },
    labelContainerCenter: {
      justifyContent: "center"
    },
    labelContainerRight: {
      justifyContent: "flex-end"
    },
    root: {
      cursor: "pointer"
    }
  }),
  { name: "TableCellHeader" }
);

export type TableCellHeaderArrowDirection = "asc" | "desc";
export type TableCellHeaderArrowPosition = "left" | "right";
export interface TableCellHeaderProps extends TableCellProps {
  arrowPosition?: TableCellHeaderArrowPosition;
  direction?: TableCellHeaderArrowDirection;
  textAlign?: "left" | "center" | "right";
  disabled?: boolean;
}

const TableCellHeader: React.FC<TableCellHeaderProps> = props => {
  const classes = useStyles(props);
  const {
    arrowPosition,
    children,
    className,
    direction,
    textAlign,
    disabled = false,
    onClick,
    ...rest
  } = props;

  return (
    <TableCell
      {...rest}
      onClick={e => {
        if (!disabled) {
          onClick(e);
        }
      }}
      className={classNames(classes.root, className, {
        [classes.disabled]: disabled
      })}
    >
      <div
        className={classNames(classes.labelContainer, {
          // [classes.labelContainerActive]: !!direction && !!arrowPosition,
          [classes.labelContainerCenter]: textAlign === "center",
          [classes.labelContainerRight]: textAlign === "right"
        })}
      >
        {!!direction && arrowPosition === "left" && (
          <UilArrowDown
            className={classNames(classes.arrow, classes.arrowLeft, {
              [classes.arrowUp]: direction === "asc"
            })}
          />
        )}
        <div className={classes.label}>{children}</div>
        {!!direction && arrowPosition === "right" && (
          <UilArrowDown
            className={classNames(classes.arrow, {
              [classes.arrowUp]: direction === "asc"
            })}
          />
        )}
      </div>
    </TableCell>
  );
};

TableCellHeader.displayName = "TableCellHeader";
TableCellHeader.defaultProps = {
  arrowPosition: "left",
  textAlign: "left"
};
export default TableCellHeader;
