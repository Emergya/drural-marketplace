import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow
} from "@material-ui/core";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import StatusLabel from "@saleor/components/StatusLabel";
import TablePagination from "@saleor/components/TablePagination";
import { commonMessages } from "@saleor/intl";
import { renderCollection } from "@saleor/misc";
import classNames from "classnames";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { ProductBookableResourceListProps } from "./types";

const ProductBookableResourceList: React.FC<ProductBookableResourceListProps> = ({
  bookableResources,
  data,
  disabled,
  pageInfo,
  totalCount,
  onBookableResourceChange,
  onNextPage,
  onPreviousPage,
  onRowClick
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const numberOfColumns = 4;

  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCell>
            <span>{intl.formatMessage(commonMessages.name)}</span>
          </TableCell>
          <TableCell>
            <span>{intl.formatMessage(commonMessages.state)}</span>
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
            numberOfRows={bookableResources?.length}
            tableName={
              bookableResources?.length === 1
                ? intl.formatMessage({
                    defaultMessage: "resource"
                  })
                : intl.formatMessage({
                    defaultMessage: "resources"
                  })
            }
            totalCount={totalCount}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {bookableResources &&
          renderCollection(bookableResources, (bookableResource, index) => (
            <TableRow
              key={bookableResource ? bookableResource.id : index}
              className={classes.tableRow}
              onClick={bookableResource && onRowClick(bookableResource.id)}
            >
              <TableCell className={classes.tableCell}>
                {bookableResource?.name}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <StatusLabel
                  status={bookableResource?.isActive ? "success" : "neutral"}
                  label={
                    bookableResource?.isActive
                      ? intl.formatMessage(commonMessages.statusActive)
                      : intl.formatMessage(commonMessages.statusInactive)
                  }
                />
              </TableCell>
              <TableCell
                className={classNames(
                  classes.tableCell,
                  classes.tableCellSwitch
                )}
              >
                <ControlledSwitch
                  name={bookableResource.id}
                  label=""
                  checked={data.bookableResources.some(
                    bookableResourceId =>
                      bookableResourceId === bookableResource.id
                  )}
                  onChange={onBookableResourceChange}
                  disabled={disabled}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </ResponsiveTable>
  );
};
ProductBookableResourceList.displayName = "ProductBookableResourceList";
export default ProductBookableResourceList;
