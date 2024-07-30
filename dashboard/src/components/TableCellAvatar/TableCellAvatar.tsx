import { makeStyles } from "@drural/macaw-ui";
import { TableCell } from "@material-ui/core";
import { TableCellProps } from "@material-ui/core/TableCell";
import classNames from "classnames";
import React from "react";

import Avatar, { AvatarProps } from "./Avatar";

const useStyles = makeStyles(
  theme => ({
    root: {
      "&:not(first-child)": {
        paddingLeft: 0
      },
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  }),
  { name: "TableCellAvatar" }
);

interface TableCellAvatarProps extends AvatarProps, TableCellProps {
  className?: string;
}

const TableCellAvatar: React.FC<TableCellAvatarProps> = props => {
  const { className, ...rest } = props;

  const classes = useStyles(props);

  return (
    <TableCell className={classNames(classes.root, className)} {...rest}>
      <Avatar {...rest} />
    </TableCell>
  );
};

export default TableCellAvatar;
