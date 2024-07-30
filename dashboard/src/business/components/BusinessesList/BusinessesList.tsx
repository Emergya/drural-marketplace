import { makeStyles } from "@drural/macaw-ui";
import { UilCheckCircle } from "@iconscout/react-unicons";
import {
  darken,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from "@material-ui/core";
import { BusinessesListUrlSortField } from "@saleor/business/urls";
import { ColumnPickerChoice } from "@saleor/components/ColumnPicker";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import StatusLabel from "@saleor/components/StatusLabel";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import { AVATAR_MARGIN } from "@saleor/components/TableCellAvatar/Avatar";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import useLocale from "@saleor/hooks/useLocale";
import { getBusinessStatus, maybe, renderCollection } from "@saleor/misc";
import { ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import classNames from "classnames";
import React from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import Moment from "react-moment";

import { dateFormat } from "../../../utils/date/contants";
import { BusinessesList_companies_edges_node } from "../../types/BusinessesList";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.down("sm")]: {
      colAddress: {
        display: "none"
      },
      colPhone: {
        display: "none"
      },
      colStatus: {},
      colType: {}
    },
    colNameHeader: {
      marginLeft: AVATAR_MARGIN + 25
    },
    colAddress: {
      textAlign: "right"
    },
    colName: {
      "&$colNameFixed": {
        width: 250
      }
    },
    colNameFixed: {},
    colPhone: {
      textAlign: "right"
    },
    colStatus: {
      width: 250
    },
    colType: {
      width: 150
    },
    activeShopIcon: {
      color: darken(theme.palette.primary.main, 0.1)
    },
    tableRow: {
      cursor: "pointer"
    },
    publicName: {
      overflow: "hidden",
      paddingRight: 20,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }),
  { name: "BussinessesList" }
);

export interface BusinessesListProps
  extends ListProps,
    // ListActions,
    SortPage<BusinessesListUrlSortField> {
  businesses: BusinessesList_companies_edges_node[];
  columns: ColumnPickerChoice[];
}

const BusinessesList: React.FC<BusinessesListProps> = props => {
  const {
    settings,
    disabled,
    businesses,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onSort,
    onUpdateListSettings,
    onRowClick,
    sort,
    totalCount,
    columns
  } = props;

  const { locale } = useLocale();

  const numberOfColumns = 4 + settings.columns.length;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        disabled={disabled}
        items={businesses}
        hideCheckbox
      >
        <TableCellHeader
          className={classNames(classes.colName, {
            [classes.colNameFixed]: settings.columns.length > 2
          })}
          data-test-id="colTypeHeader"
          direction={
            sort.sort === BusinessesListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(BusinessesListUrlSortField.name)}
        >
          <span className={classes.colNameHeader}>
            <FormattedMessage defaultMessage="Name" />
          </span>
        </TableCellHeader>

        <TableCellHeader
          data-test-id="colTypeHeader"
          className={classes.colStatus}
          direction={
            sort.sort === BusinessesListUrlSortField.status
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(BusinessesListUrlSortField.status)}
        >
          <FormattedMessage defaultMessage="Status" />
        </TableCellHeader>

        <TableCellHeader
          data-test-id="colTypeHeader"
          className={classes.colType}
          direction={
            sort.sort === BusinessesListUrlSortField.activeShop
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(BusinessesListUrlSortField.activeShop)}
        >
          <FormattedMessage defaultMessage="Active shop" />
        </TableCellHeader>

        {settings.columns.map(column => (
          <TableCellHeader
            className={classes.colType}
            direction={
              sort.sort === BusinessesListUrlSortField[column]
                ? getArrowDirection(sort.asc)
                : undefined
            }
            onClick={() => onSort(BusinessesListUrlSortField[column])}
            key={column}
          >
            {maybe<React.ReactNode>(() => {
              const selectedColumn = columns.find(col => col.value === column);
              return selectedColumn.label;
            }, <Skeleton />)}
          </TableCellHeader>
        ))}
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
            // New ones
            numberOfRows={businesses?.length}
            tableName={
              businesses?.length === 1
                ? intl.formatMessage({
                    defaultMessage: "shop"
                  })
                : intl.formatMessage({
                    defaultMessage: "shops"
                  })
            }
            totalCount={totalCount}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(businesses, business => {
          const businessStatus = getBusinessStatus(business?.status, intl);

          return (
            <TableRow
              className={!!business ? classes.tableRow : undefined}
              hover={!!business}
              key={business ? business.id : "skeleton"}
              onClick={business ? onRowClick(business.id) : undefined}
            >
              <TableCellAvatar
                className={classes.colName}
                thumbnail={maybe(() => business.imageUrl)}
              >
                {business ? (
                  <div className={classes.publicName}>
                    {business?.publicName}
                  </div>
                ) : (
                  <Skeleton />
                )}
              </TableCellAvatar>
              <TableCell className={classes.colStatus}>
                {business ? (
                  <StatusLabel
                    status={businessStatus?.status}
                    label={businessStatus?.localized}
                  />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colType}>
                {business &&
                  (business.isEnabled ? (
                    <UilCheckCircle className={classes.activeShopIcon} />
                  ) : (
                    "-"
                  ))}
              </TableCell>
              {settings.columns.map(column => (
                <TableCell
                  className={classes.colType}
                  key={column}
                  data-test="business-attribute"
                  data-test-attribute={column}
                >
                  {maybe<React.ReactNode>(() => {
                    const value =
                      column === "locality" || column === "postalCode"
                        ? business.address[column]
                        : business[column];

                    if (value) {
                      if (column === "modified") {
                        return (
                          <Moment format={dateFormat} locale={locale}>
                            {value as string}
                          </Moment>
                        );
                      }
                      return value.trim();
                    }
                    return "-";
                  }, <Skeleton />)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};
BusinessesList.displayName = "BusinessesList";
export default BusinessesList;
