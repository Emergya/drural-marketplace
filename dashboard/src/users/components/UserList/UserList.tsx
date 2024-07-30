import { TableBody, TableCell, TableFooter, TableRow } from "@material-ui/core";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import useLocale from "@saleor/hooks/useLocale";
import { getUserName, maybe, renderCollection } from "@saleor/misc";
import { UserListUrlSortField } from "@saleor/users/urls";
import { getUserTypeMessage } from "@saleor/users/utils";
import { dateFormat } from "@saleor/utils/date/contants";
import { getArrowDirection } from "@saleor/utils/sort";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Moment from "react-moment";

import { useStyles } from "./styles";
import { UserListProps } from "./types";

const numberOfColumns = 4;

const UserList: React.FC<UserListProps> = props => {
  const {
    settings,
    disabled,
    users,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    toolbar,
    toggle,
    toggleAll,
    selected,
    sort,
    isChecked,
    totalCount,
    type
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const { locale } = useLocale();

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={users}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === UserListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(UserListUrlSortField.name)}
          className={classNames(classes.colName, classes.tableHeader)}
        >
          <FormattedMessage
            defaultMessage="{user} Name"
            values={{ user: getUserTypeMessage(intl, type) }}
          />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === UserListUrlSortField.email
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(UserListUrlSortField.email)}
          className={classNames(classes.colEmail, classes.tableHeader)}
        >
          <FormattedMessage
            defaultMessage="{user} Email"
            values={{ user: getUserTypeMessage(intl, type) }}
          />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === UserListUrlSortField.dateJoined
              ? getArrowDirection(sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(UserListUrlSortField.dateJoined)}
          className={classNames(classes.dateJoined, classes.tableHeader)}
        >
          <FormattedMessage defaultMessage="User since" />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
            numberOfRows={users?.length}
            tableName={
              users?.length === 1
                ? intl.formatMessage({
                    defaultMessage: "client"
                  })
                : intl.formatMessage({
                    defaultMessage: "clients"
                  })
            }
            totalCount={totalCount}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          users,
          user => {
            const isSelected = user ? isChecked(user.id) : false;

            return (
              <TableRow
                className={!!user ? classes.tableRow : undefined}
                hover={!!user}
                key={user ? user.id : "skeleton"}
                selected={isSelected}
                onClick={user ? onRowClick(user.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(user.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {getUserName(user)}
                </TableCell>
                <TableCell className={classes.colEmail}>
                  {maybe<React.ReactNode>(() => user.email, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colDateJoined}>
                  {maybe<React.ReactNode>(
                    () => (
                      <Moment format={dateFormat} locale={locale}>
                        {user.dateJoined}
                      </Moment>
                    ),
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage
                  defaultMessage="No {users} found"
                  values={{ users: getUserTypeMessage(intl, type, true) }}
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
UserList.displayName = "UserList";
export default UserList;
