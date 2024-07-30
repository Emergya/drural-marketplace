import { makeStyles } from "@drural/macaw-ui";
import { TableHead } from "@material-ui/core";
import {
  darken,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from "@material-ui/core";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TablePagination from "@saleor/components/TablePagination";
import useLocale from "@saleor/hooks/useLocale";
import { maybe, renderCollection } from "@saleor/misc";
import { GetFraudulentProductReports_fraudulentProductReports_edges_node } from "@saleor/products/types/GetFraudulentProductReports";
import { ListProps } from "@saleor/types";
import { dateFormat } from "@saleor/utils/date/contants";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Moment from "react-moment";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto"
      },
      colPrice: {
        width: 300
      },
      colPublished: {
        width: 200
      },
      colType: {
        width: 200
      }
    },
    activeShopIcon: {
      color: darken(theme.palette.primary.main, 0.1)
    },
    checkItemsWrapper: {
      display: "flex",
      alignItems: "center"
    },
    colAttribute: {
      width: 150
    },
    colUser: {
      maxWidth: 220,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    colReportDate: {
      textAlign: "right"
    },
    colFill: {
      padding: 0,
      width: "100%"
    },
    colName: {
      "&$colNameFixed": {
        width: 250
      }
    },
    colNameHeader: {
      paddingLeft: "80px !important"
    },
    colNameWrapper: {
      display: "block"
    },
    colReportDateHeader: {
      "& > div": {
        justifyContent: "flex-end"
      }
    },
    colStatus: {
      textAlign: "center"
    },
    colType: {},
    link: {
      cursor: "pointer"
    },
    starEmpty: {
      opacity: 0.5,
      "&:hover": {
        opacity: 1
      }
    },
    startWrapper: {
      lineHeight: theme.spacing(0.75),
      padding: theme.spacing(1.5)
    },
    table: {
      tableLayout: "fixed",
      "& .MuiTableHead-root .MuiTableCell-paddingCheckbox": {
        textAlign: "left"
      }
    },
    tableContainer: {
      overflowX: "scroll"
    },
    textLeft: {
      textAlign: "left"
    },
    textRight: {
      textAlign: "right"
    }
  }),
  { name: "ProductList" }
);

interface ProductListProps extends ListProps {
  reports: GetFraudulentProductReports_fraudulentProductReports_edges_node[];
  totalCount?: number;
  onOpenModal: (
    report: GetFraudulentProductReports_fraudulentProductReports_edges_node
  ) => void;
}

export const ProductReportList: React.FC<ProductListProps> = props => {
  const {
    settings,
    disabled,
    pageInfo,
    reports,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onOpenModal,
    totalCount
  } = props;

  const intl = useIntl();
  const classes = useStyles(props);
  const { locale } = useLocale();
  const numberOfColumns = 5;

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCellHeader
              data-test-id="colNameHeader"
              className={classNames(classes.colNameHeader, classes.colName)}
            >
              <FormattedMessage
                defaultMessage="Service"
                description="service"
              />
            </TableCellHeader>
            <TableCellHeader
              data-test-id="colTypeHeader"
              className={classes.colUser}
            >
              <FormattedMessage defaultMessage="User" description="user" />
            </TableCellHeader>
            <TableCellHeader
              data-test-id="colTypeHeader"
              className={classes.colType}
            >
              <FormattedMessage
                defaultMessage="Phone"
                description="service phone"
              />
            </TableCellHeader>
            <TableCellHeader
              data-test-id="colTypeHeader"
              className={classNames(
                classes.colType,
                classes.colReportDateHeader
              )}
            >
              <FormattedMessage
                defaultMessage="Report date"
                description="service report date"
              />
            </TableCellHeader>
          </TableRow>
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
              // Total count data
              numberOfRows={reports?.length}
              tableName={
                reports?.length === 1
                  ? intl.formatMessage({
                      defaultMessage: "report"
                    })
                  : intl.formatMessage({
                      defaultMessage: "reports"
                    })
              }
              totalCount={totalCount}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            reports,
            report => (
              <TableRow
                hover={!!report}
                key={report ? report.id : "skeleton"}
                onClick={report && (() => onOpenModal(report))}
                className={classes.link}
                data-test="id"
                data-test-id={report ? report?.id : "skeleton"}
              >
                <TableCellAvatar
                  className={classes.colName}
                  thumbnail={maybe(() => report.product.thumbnail.url)}
                >
                  {report ? (
                    <div className={classes.colNameWrapper}>
                      <span data-test="name">{report.product.name}</span>
                    </div>
                  ) : (
                    <Skeleton />
                  )}
                </TableCellAvatar>
                <TableCell className={classes.colUser} data-test="user">
                  {report && `${report.user.firstName} ${report.user.lastName}`}
                </TableCell>
                <TableCell className={classes.colType} data-test="phone">
                  {report?.phone || <Skeleton />}
                </TableCell>

                <TableCell
                  className={classNames(classes.colType, classes.colReportDate)}
                  data-test="report-date"
                >
                  {maybe<React.ReactNode>(
                    () => (
                      <Moment format={dateFormat} locale={locale}>
                        {report.date as string}
                      </Moment>
                    ),
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage defaultMessage="No reports found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
};
ProductReportList.displayName = "ProductReportList";
export default ProductReportList;
