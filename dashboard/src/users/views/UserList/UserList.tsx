import { DialogContentText, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@saleor/components/ActionDialog";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import { DEFAULT_INITIAL_PAGINATION_DATA } from "@saleor/config";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator from "@saleor/hooks/usePaginator";
import { maybe } from "@saleor/misc";
import UserListPage from "@saleor/users/components/UserListPage";
import { getUserTypeMessage } from "@saleor/users/utils";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFilterTabs,
  saveFilterTab
} from "./filters";
import { UserListViewProps } from "./types";

export const UserList: React.FC<UserListViewProps> = ({
  bulkRemoveUsersOpts,
  hasAddButton,
  listElements,
  loading,
  paginationState,
  params,
  settings,
  type,
  users,
  bulkRemoveUsers,
  closeModal,
  detailsUrl,
  isSelected,
  listUrl,
  onAdd,
  openModal,
  reset,
  toggle,
  toggleAll,
  updateListSettings
}) => {
  const navigate = useNavigator();
  const paginate = usePaginator();

  const intl = useIntl();

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
    cleanupFn: reset,
    createUrl: listUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      listUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  // Reset pagination
  React.useEffect(() => {
    navigate(
      listUrl({
        ...params,
        ...DEFAULT_INITIAL_PAGINATION_DATA
      }),
      true
    );
  }, [settings?.rowNumber]);

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(listUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => users.pageInfo),
    paginationState,
    params
  );

  const handleSort = createSortHandler(navigate, listUrl, params);

  return (
    <>
      <UserListPage
        hasAddButton={hasAddButton}
        currentTab={currentTab}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ""}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal("delete-search")}
        onTabSave={() => openModal("save-search")}
        tabs={tabs.map(tab => tab.name)}
        users={mapEdgesToItems(users)}
        settings={settings}
        disabled={loading}
        pageInfo={pageInfo}
        onAdd={onAdd}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onUpdateListSettings={updateListSettings}
        onRowClick={id => () => navigate(detailsUrl(id))}
        onSort={handleSort}
        toolbar={
          <IconButton
            color="primary"
            onClick={() =>
              openModal("remove", {
                ids: listElements
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
        totalCount={users?.totalCount}
        type={type}
      />
      <ActionDialog
        open={params.action === "remove" && maybe(() => params.ids.length > 0)}
        onClose={closeModal}
        confirmButtonState={bulkRemoveUsersOpts.status}
        disabled={bulkRemoveUsersOpts.loading}
        onConfirm={bulkRemoveUsers}
        variant="delete"
        title={intl.formatMessage({
          defaultMessage: "Delete Users",
          description: "dialog header"
        })}
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete this {user}?} other{Are you sure you want to delete {displayQuantity} {users}?}}"
            values={{
              counter: maybe(() => params.ids.length),
              displayQuantity: (
                <strong>{maybe(() => params.ids.length)}</strong>
              ),
              user: getUserTypeMessage(intl, type),
              users: getUserTypeMessage(intl, type, true)
            }}
          />
        </DialogContentText>
      </ActionDialog>
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
export default UserList;
