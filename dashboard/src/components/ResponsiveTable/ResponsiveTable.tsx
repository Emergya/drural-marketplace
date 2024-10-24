import { makeStyles } from "@drural/macaw-ui";
import { Table } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(
  theme => ({
    root: {
      [theme.breakpoints.up("md")]: {
        "&& table": {
          tableLayout: "auto"
        }
      },
      "& table": {
        tableLayout: "auto"
      },
      borderRadius: "8px",
      overflowX: "auto",
      width: "100%"
    }
  }),
  {
    name: "ResponsiveTable"
  }
);

interface ResponsiveTableProps {
  children: React.ReactNode | React.ReactNodeArray;
  className?: string;
  key?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = props => {
  const { children, className } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Table className={className}>{children}</Table>
    </div>
  );
};

ResponsiveTable.displayName = "ResponsiveTable";
export default ResponsiveTable;
