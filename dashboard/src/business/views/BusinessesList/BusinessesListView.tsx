import BusinessesListPage from "@saleor/business/components/BusinessesListPage";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import {
  DEFAULT_INITIAL_PAGINATION_DATA,
  defaultListSettings
} from "@saleor/config";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { maybe } from "@saleor/misc";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";

import { useBusinessesListQuery } from "../../queries";
import {
  businessCreatePath,
  businessesListUrl,
  BusinessesListUrlDialog,
  BusinessesListUrlQueryParams,
  businessUrl
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

interface BusinessesListProps {
  params: BusinessesListUrlQueryParams;
}

export const BusinessesListView: React.FC<BusinessesListProps> = ({
  params
}) => {
  const paginate = usePaginator();
  const navigate = useNavigator();
  const { reset } = useBulkActions();

  // Pagination section + settings
  const { updateListSettings, settings } = useListSettings(
    ListViews.BUSINESSES_LIST
  );
  React.useEffect(() => {
    if (params.columns) {
      updateListSettings("columns", params.columns);
    }
  }, []);

  const paginationState = createPaginationState(settings.rowNumber, params);

  // Reset pagination
  React.useEffect(
    () =>
      navigate(
        businessesListUrl({
          ...params,
          ...DEFAULT_INITIAL_PAGINATION_DATA
        }),
        true
      ),
    [settings.rowNumber]
  );

  // Data section
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params, settings.rowNumber]
  );

  const {
    data,
    loading
    // refetch
  } = useBusinessesListQuery({
    displayLoader: true,
    variables: queryVariables,
    fetchPolicy: "network-only"
  });

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    data?.companies?.pageInfo,
    paginationState,
    params
  );

  // Columns section
  const handleSort = createSortHandler(navigate, businessesListUrl, params);

  // Tabs section
  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      businessesListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  // Filters section
  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: businessesListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  // Dialogs section
  const [openModal, closeModal] = createDialogActionHandlers<
    BusinessesListUrlDialog,
    BusinessesListUrlQueryParams
  >(navigate, businessesListUrl, params);

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(businessesListUrl());
  };

  return (
    <>
      <BusinessesListPage
        businesses={mapEdgesToItems(data?.companies)}
        disabled={loading}
        defaultSettings={defaultListSettings[ListViews.BUSINESSES_LIST]}
        onAdd={() => navigate(businessCreatePath)}
        settings={settings}
        pageInfo={pageInfo}
        onUpdateListSettings={updateListSettings}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onRowClick={id => () => navigate(businessUrl(id))}
        // Column section
        sort={getSortParams(params)}
        onSort={handleSort}
        // Filter section
        currentTab={currentTab}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ""}
        tabs={getFilterTabs().map(tab => tab.name)}
        onAll={resetFilters}
        onFilterChange={filter => changeFilters(filter)}
        onSearchChange={handleSearchChange}
        onTabChange={handleTabChange}
        onTabSave={() => openModal("save-search")}
        onTabDelete={() => openModal("delete-search")}
        totalCount={data?.companies?.totalCount}
      />
      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabDelete}
        tabName={maybe(() => tabs[currentTab - 1].name, "...")}
      />
    </>
  );
};
export default BusinessesListView;
