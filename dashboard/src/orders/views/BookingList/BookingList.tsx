import { BusinessContext } from "@saleor/components/BusinessProvider";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import { useShopLimitsQuery } from "@saleor/components/Shop/query";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import useUser from "@saleor/hooks/useUser";
import { getStringOrPlaceholder } from "@saleor/misc";
import BookingListPage from "@saleor/orders/components/BookingListPage";
import { getCompany } from "@saleor/products/utils/data";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";

import { useOrderListQuery } from "../../queries";
import {
  bookingListUrl,
  BookingListUrlDialog,
  BookingListUrlQueryParams,
  orderUrl
} from "../../urls";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab
} from "./filters";
import { getSortQueryVariables } from "./sort";
import { IBookingListProps } from "./types";

export const BookingList: React.FC<IBookingListProps> = ({ params }) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const { updateListSettings, settings } = useListSettings(
    ListViews.BOOKING_LIST
  );
  const { user } = useUser();

  const limitOpts = useShopLimitsQuery({
    variables: {
      orders: true
    }
  });

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    createUrl: bookingListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    BookingListUrlDialog,
    BookingListUrlQueryParams
  >(navigate, bookingListUrl, params);

  const handleTabChange = (tab: number) =>
    navigate(
      bookingListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );

  const handleFilterTabDelete = () => {
    deleteFilterTab(currentTab);
    navigate(bookingListUrl());
  };

  const handleFilterTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { activeBusiness } = React.useContext(BusinessContext);
  const company = getCompany(user.isStaff, activeBusiness?.active.node.id);
  const paginationState = createPaginationState(settings?.rowNumber, params);

  const queryVariables = React.useMemo(
    () => ({
      ...company,
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params, settings?.rowNumber]
  );

  const { data, loading } = useOrderListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    data?.orders?.pageInfo,
    paginationState,
    params
  );

  const handleSort = createSortHandler(navigate, bookingListUrl, params);

  return (
    <>
      <BookingListPage
        currentTab={currentTab}
        disabled={loading}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ""}
        limits={limitOpts.data?.shop.limits}
        onAdd={() => null}
        onAll={resetFilters}
        onFilterChange={changeFilters}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onRowClick={id => () => navigate(orderUrl(id))}
        onSearchChange={handleSearchChange}
        onSort={handleSort}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal("delete-search")}
        onTabSave={() => openModal("save-search")}
        orders={mapEdgesToItems(data?.orders)}
        sort={getSortParams(params)}
        tabs={getFilterTabs().map(tab => tab.name)}
        onUpdateListSettings={updateListSettings}
        pageInfo={pageInfo}
        settings={settings}
        totalCount={data?.orders?.totalCount}
      />
      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabDelete}
        tabName={getStringOrPlaceholder(tabs[currentTab - 1]?.name)}
      />
    </>
  );
};

export default BookingList;
