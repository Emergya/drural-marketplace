import {
  UilMoneyInsert,
  UilMoneyWithdraw,
  UilSuitcase
} from "@iconscout/react-unicons";
import {
  Button,
  Card,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import AnalyticsCard from "@saleor/components/AnalyticsCard";
import CardMenu from "@saleor/components/CardMenu";
import ColumnPicker from "@saleor/components/ColumnPicker";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import Money from "@saleor/components/Money";
import PageHeader from "@saleor/components/PageHeader";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import useNumberLocalize from "@saleor/hooks/useNumberLocalize";
import useUser from "@saleor/hooks/useUser";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { sortArray } from "@saleor/utils/arrays";
import { hasLimits, isLimitReached } from "@saleor/utils/limits";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import OrderLimitReached from "../OrderLimitReached";
import OrderList from "../OrderList";
import { createFilterStructure } from "./filters";
import { useStyles } from "./styles";
import { OrderListColumns, OrderListPageProps } from "./types";
import { getColumns, orderListColumnMessages } from "./utils";

const OrderListPage: React.FC<OrderListPageProps> = ({
  // Totals data
  paymentTotalNet,
  paymentTotalCaptured,
  paymentTotalRefunds,
  paymentTotalFee,
  paymentTotalDruralFee,
  paymentTotalStripeFee,
  paymentTotalQuantity,
  paymentTotalQuantityRefund,
  paymentTotalAverage,
  loadingAnatyticsCards,
  loadingAnalyticsTable,

  currentTab,
  defaultSettings,
  initialSearch,
  filterOpts,
  limits,
  settings,
  tabs,
  onAdd,
  onAll,
  onSearchChange,
  onSettingsOpen,
  onFilterChange,
  onUpdateListSettings,
  onTabChange,
  onTabDelete,
  onTabSave,
  ...listProps
}) => {
  const { user } = useUser();
  const intl = useIntl();
  const classes = useStyles({});
  const filterStructure = createFilterStructure(intl, filterOpts);
  const limitsReached = isLimitReached(limits, "orders");

  const columns = getColumns(intl);

  const handleColumnsSave = (columns: Array<Partial<OrderListColumns>>) => {
    const sortedColumns = sortArray(columns, Object.values(OrderListColumns));
    return onUpdateListSettings("columns", sortedColumns);
  };

  return (
    <Container>
      <PageHeader
        title={intl.formatMessage(sectionNames.orders)}
        limitText={
          hasLimits(limits, "orders") &&
          intl.formatMessage(
            {
              defaultMessage: "{count}/{max} orders",
              description: "placed order counter"
            },
            {
              count: limits.currentUsage.orders,
              max: limits.allowedUsage.orders
            }
          )
        }
      >
        {!!onSettingsOpen && user.isStaff && (
          <CardMenu
            className={classes.settings}
            menuItems={[
              {
                label: intl.formatMessage({
                  defaultMessage: "Order Settings",
                  description: "button"
                }),
                onSelect: onSettingsOpen
              }
            ]}
          />
        )}
        <ColumnPicker
          className={classes.columnPicker}
          columns={columns}
          defaultColumns={defaultSettings.columns}
          initialColumns={settings.columns}
          total={columns.length}
          onSave={handleColumnsSave}
        />
        <Button
          disabled={limitsReached}
          color="primary"
          variant="contained"
          onClick={onAdd}
          data-test-id="create-order-button"
        >
          <FormattedMessage
            defaultMessage="Create order"
            description="button"
          />
        </Button>
      </PageHeader>

      {limitsReached && <OrderLimitReached />}

      <div className={classes.cardsWrapper}>
        <AnalyticsCard
          backgroundColor="primary"
          icon={<UilMoneyWithdraw />}
          childrenWrapperClassName={classes.cardContentWrapper}
          title={intl.formatMessage(orderListColumnMessages.totalSeller)}
          loading={loadingAnatyticsCards}
        >
          <Money
            convertedMoneyClassName={classes.convertedMoney}
            money={paymentTotalNet}
          />
        </AnalyticsCard>
        <AnalyticsCard
          backgroundColor="secondary"
          icon={<UilMoneyInsert />}
          childrenWrapperClassName={classes.cardContentWrapper}
          title={intl.formatMessage(orderListColumnMessages.capturedAmount)}
          loading={loadingAnatyticsCards}
        >
          <Money
            convertedMoneyClassName={classes.convertedMoney}
            money={paymentTotalCaptured}
          />
        </AnalyticsCard>
        <AnalyticsCard
          backgroundColor="blueGrey"
          icon={<UilSuitcase />}
          childrenWrapperClassName={classes.cardContentWrapper}
          title={intl.formatMessage(orderListColumnMessages.refunded)}
          loading={loadingAnatyticsCards}
        >
          <Money
            convertedMoneyClassName={classes.convertedMoney}
            money={paymentTotalRefunds}
          />
        </AnalyticsCard>
        <AnalyticsCard
          backgroundColor="red"
          icon={<UilSuitcase />}
          childrenWrapperClassName={classes.cardContentWrapper}
          title={intl.formatMessage(orderListColumnMessages.totalFee)}
          loading={loadingAnatyticsCards}
        >
          <Money
            convertedMoneyClassName={classes.convertedMoney}
            money={paymentTotalFee}
          />
        </AnalyticsCard>
      </div>

      <Card className={classes.table}>
        <ResponsiveTable>
          <TableBody>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>
                {intl.formatMessage({
                  defaultMessage: "Number of orders"
                })}
              </TableCell>
              <TableCell className={classes.cell}>
                {maybe<React.ReactNode>(
                  () => useNumberLocalize(paymentTotalQuantity),
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>
                {intl.formatMessage({
                  defaultMessage: "Number of refunds"
                })}
              </TableCell>
              <TableCell className={classes.cell}>
                {maybe<React.ReactNode>(
                  () => useNumberLocalize(paymentTotalQuantityRefund),
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>
                {intl.formatMessage(orderListColumnMessages.druralFee)}
              </TableCell>
              <TableCell className={classes.cell}>
                {maybe(() => paymentTotalDruralFee) ? (
                  <Money money={paymentTotalDruralFee} />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>
                {intl.formatMessage(orderListColumnMessages.stripeFee)}
              </TableCell>
              <TableCell className={classes.cell}>
                {maybe(() => paymentTotalStripeFee) ? (
                  <Money money={paymentTotalStripeFee} />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.cell}>
                {intl.formatMessage({
                  defaultMessage: "Average quantity per order"
                })}
              </TableCell>
              <TableCell className={classes.cell}>
                {maybe<React.ReactNode>(
                  () => (
                    <Money
                      money={{
                        amount: paymentTotalAverage,
                        currency: paymentTotalNet.currency
                      }}
                    />
                  ),
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </ResponsiveTable>
      </Card>

      <Card>
        <FilterBar
          currentTab={currentTab}
          initialSearch={initialSearch}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          tabs={tabs}
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Orders",
            description: "tab name"
          })}
          filterStructure={filterStructure}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Orders..."
          })}
        />
        <OrderList
          columns={columns}
          settings={settings}
          onUpdateListSettings={onUpdateListSettings}
          {...listProps}
        />
      </Card>
    </Container>
  );
};
OrderListPage.displayName = "OrderListPage";
export default OrderListPage;
