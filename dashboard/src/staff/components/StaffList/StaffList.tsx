import { makeStyles } from "@drural/macaw-ui";
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TablePagination from "@saleor/components/TablePagination";
import {
  getUserInitials,
  getUserName,
  maybe,
  renderCollection
} from "@saleor/misc";
import { StaffListUrlSortField } from "@saleor/staff/urls";
import { ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { StaffList_staffUsers_edges_node } from "../../types/StaffList";

const useStyles = makeStyles(
  theme => ({
    avatar: {
      alignItems: "center",
      borderRadius: "100%",
      display: "grid",
      float: "left",
      height: 47,
      justifyContent: "center",
      marginRight: theme.spacing(1),
      overflow: "hidden",
      width: 47
    },
    avatarDefault: {
      "& div": {
        color: theme.palette.primary.contrastText,
        lineHeight: "47px"
      },
      background: theme.palette.primary.main,
      height: 47,
      textAlign: "center",
      width: 47
    },
    avatarImage: {
      pointerEvents: "none",
      width: "100%"
    },
    colRole: {
      width: 250
    },
    colEmail: {
      width: 400
    },
    tableHeader: {
      fontSize: "16px",
      fontWeight: 400
    },
    statusText: {
      color: "#9E9D9D"
    },
    tableRow: {
      cursor: "pointer"
    },
    wideColumn: {
      /* width: "80%" */
    }
  }),
  { name: "StaffList" }
);

interface StaffListProps extends ListProps, SortPage<StaffListUrlSortField> {
  staffMembers: StaffList_staffUsers_edges_node[];
}

const numberOfColumns = 3;

const StaffList: React.FC<StaffListProps> = props => {
  const {
    settings,
    disabled,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    pageInfo,
    sort,
    staffMembers,
    totalCount
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <ResponsiveTable>
      <colgroup>
        <col />
        <col className={classes.colRole} />
        <col className={classes.colEmail} />
      </colgroup>
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === StaffListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(StaffListUrlSortField.name)}
            className={classNames(classes.wideColumn, classes.tableHeader)}
          >
            <FormattedMessage
              defaultMessage="Name"
              description="staff member full name"
            />
          </TableCellHeader>
          <TableCellHeader
            className={classes.tableHeader}
            onClick={() => null}
            /*    
         TODO: implement sort filter for the role, once the different roles are defined and implemented in backend
         
         direction={
              sort.sort === StaffListUrlSortField.role
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(StaffListUrlSortField.role)} */
          >
            <FormattedMessage defaultMessage="Role" />
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === StaffListUrlSortField.email
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(StaffListUrlSortField.email)}
            className={classes.tableHeader}
          >
            <FormattedMessage defaultMessage="Email Address" />
          </TableCellHeader>
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={
              pageInfo && !disabled ? pageInfo.hasNextPage : undefined
            }
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : undefined
            }
            onPreviousPage={onPreviousPage}
            // New ones
            numberOfRows={staffMembers?.length}
            tableName={
              staffMembers?.length === 1
                ? intl.formatMessage({
                    defaultMessage: "staff member"
                  })
                : intl.formatMessage({
                    defaultMessage: "staff members"
                  })
            }
            totalCount={totalCount}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          staffMembers,
          staffMember => (
            <TableRow
              className={classNames({
                [classes.tableRow]: !!staffMember
              })}
              hover={!!staffMember}
              onClick={!!staffMember ? onRowClick(staffMember.id) : undefined}
              key={staffMember ? staffMember.id : "skeleton"}
            >
              <TableCell>
                <div className={classes.avatar}>
                  {maybe(() => staffMember.avatar.url) ? (
                    <img
                      className={classes.avatarImage}
                      src={maybe(() => staffMember.avatar.url)}
                    />
                  ) : (
                    <div className={classes.avatarDefault}>
                      <Typography>{getUserInitials(staffMember)}</Typography>
                    </div>
                  )}
                </div>
                <Typography>
                  {getUserName(staffMember) || <Skeleton />}
                </Typography>
                <Typography variant={"caption"} className={classes.statusText}>
                  {maybe<React.ReactNode>(
                    () =>
                      staffMember.isActive
                        ? intl.formatMessage({
                            defaultMessage: "Active",
                            description: "staff member status"
                          })
                        : intl.formatMessage({
                            defaultMessage: "Inactive",
                            description: "staff member status"
                          }),
                    <Skeleton />
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                {/* TODO: intermediate solution until the different staff roles are defined and implemented. 
                Until then shows only if a user is Admin if isStaff = true*/}
                {maybe<React.ReactNode>(
                  () =>
                    staffMember.isStaff
                      ? intl.formatMessage({
                          defaultMessage: "Admin",
                          description: "staff member role"
                        })
                      : intl.formatMessage({
                          defaultMessage: "no Admin",
                          description: "staff member role"
                        }),
                  <Skeleton />
                )}
              </TableCell>
              <TableCell>
                {maybe<React.ReactNode>(() => staffMember.email, <Skeleton />)}
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No staff members found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
StaffList.displayName = "StaffList";
export default StaffList;
