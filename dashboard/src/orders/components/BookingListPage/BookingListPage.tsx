import { Card } from "@material-ui/core";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import { hasLimits, isLimitReached } from "@saleor/utils/limits";
import React from "react";
import { useIntl } from "react-intl";

import BookingList from "../BookingList/BookingList";
import OrderLimitReached from "../OrderLimitReached";
import { createFilterStructure } from "./filters";
import { IBookingListPageProps } from "./types";

const BookingListPage: React.FC<IBookingListPageProps> = ({
  currentTab,
  initialSearch,
  filterOpts,
  limits,
  tabs,
  onAll,
  onSearchChange,
  onFilterChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  ...listProps
}) => {
  const intl = useIntl();
  const filterStructure = createFilterStructure(intl, filterOpts);
  const limitsReached = isLimitReached(limits, "orders");

  return (
    <Container>
      <PageHeader
        title={intl.formatMessage(sectionNames.bookings)}
        limitText={
          hasLimits(limits, "orders") &&
          intl.formatMessage(
            {
              defaultMessage: "{count}/{max} bookings",
              description: "placed booking counter"
            },
            {
              count: limits.currentUsage.orders,
              max: limits.allowedUsage.orders
            }
          )
        }
      />
      {limitsReached && <OrderLimitReached />}
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
            defaultMessage: "All Bookings",
            description: "tab name"
          })}
          filterStructure={filterStructure}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Bookings..."
          })}
        />
        <BookingList {...listProps} />
      </Card>
    </Container>
  );
};
BookingListPage.displayName = "BookingListPage";
export default BookingListPage;
